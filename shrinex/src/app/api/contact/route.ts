import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter
// Note: In serverless environments, memory resets per instance, but this is enough for basic protection.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

// Basic HTML sanitizer to prevent XSS payloads in emails
function sanitize(input: string | undefined | null): string {
  if (!input) return '';
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Length validator to prevent payload bloat
function isValidLength(input: string | undefined | null, max: number): boolean {
  if (!input) return true; // Optional fields can be empty
  return input.length <= max;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
    const now = Date.now();
    const rateLimitRecord = rateLimitMap.get(ip);

    if (rateLimitRecord) {
      if (now - rateLimitRecord.timestamp < RATE_LIMIT_WINDOW_MS) {
        if (rateLimitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        rateLimitRecord.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // Clean up old entries occasionally to prevent memory leaks
    if (rateLimitMap.size > 1000) {
      rateLimitMap.clear();
    }

    // 2. Parse request
    const body = await req.json();
    const { name, email, phone, businessName, budgetRange, requiredService, description } = body;

    // 3. Basic required field validation
    if (!name || !email || !phone || !requiredService) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Advanced Validation & Sanitization
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (
      !isValidLength(name, 100) ||
      !isValidLength(email, 100) ||
      !isValidLength(phone, 30) ||
      !isValidLength(businessName, 100) ||
      !isValidLength(budgetRange, 50) ||
      !isValidLength(requiredService, 100) ||
      !isValidLength(description, 2000)
    ) {
      return NextResponse.json(
        { error: 'Input exceeds maximum allowed length' },
        { status: 400 }
      );
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeBusinessName = sanitize(businessName);
    const safeBudgetRange = sanitize(budgetRange);
    const safeRequiredService = sanitize(requiredService);
    const safeDescription = sanitize(description);

    // 5. Save to Supabase safely
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        business_name: safeBusinessName,
        budget_range: safeBudgetRange,
        required_service: safeRequiredService,
        description: safeDescription,
      });

    if (dbError) {
      // Safe error logging (do not leak dbError to client)
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { error: 'Failed to process submission. Please try again.' },
        { status: 500 }
      );
    }

    // 6. Send email notification via Resend safely
    try {
      await resend.emails.send({
        from: 'Shrinex Contact <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL!,
        subject: `New enquiry from ${safeName} — ${safeRequiredService}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">New Contact Form Submission</h2>
            <table style="width:100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeName}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeEmail}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safePhone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Business</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeBusinessName || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Budget</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeBudgetRange || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeRequiredService}</td></tr>
              <tr><td style="padding: 8px;"><strong>Description</strong></td><td style="padding: 8px;">${safeDescription || 'N/A'}</td></tr>
            </table>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">Submitted via Shrinex Studios contact form</p>
          </div>
        `,
      });
    } catch (emailError) {
      // Log email errors safely but don't fail the user request since data is saved
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    // Top level safe catch
    console.error('API critical error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
