'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- DATA: RUSSIAN TERMINAL TEXT ---
const BOOT_SEQUENCE = [
    "ИНИЦИАЛИЗАЦИЯ ЯДРА...",
    "ЗАГРУЗКА ПРОТОКОЛА: БУСИДО",
    "ПРОВЕРКА ПАМЯТИ: 64ТБ OK",
    "СИСТЕМА БЕЗОПАСНОСТИ: ОТКЛЮЧЕНО",
    "ПОИСК ЦЕЛИ...",
    "ЦЕЛЬ ОБНАРУЖЕНА",
    "РЕЖИМ: РОНИН",
    "ДОСТУП РАЗРЕШЕН // ВХОД"
];

const IMAGES = [
    { src: "https://images.unsplash.com/photo-1711725637816-b0755c582c86?q=80&w=1333&auto=format&fit=crop", title: "КАТАНА" }, // Katana
    { src: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1000&auto=format&fit=crop", title: "ВОИН" },   // Warrior
    { src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop", title: "ТЕНЬ" },   // Shadow
    { src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop", title: "ЧЕСТЬ" },  // Honor
];

const FEATURES = [
    { title: "ИНФИЛЬТРАЦИЯ", description: "Stealth protocols and silent execution in the shadows." }, // INFILTRATION
    { title: "СКОРОСТЬ", description: "Lightning fast processing, mimicking the sword draw." }, // SPEED
    { title: "ТОЧНОСТЬ", description: "Precision algorithms slicing through noisy data." }, // PRECISION
    { title: "АНОНИМНОСТЬ", description: "Zero footprints left behind in the digital realm." } // ANONYMITY
];

const ABOUT_TEXT = "IN A WORLD GOVERNED BY CORPORATE AI, WE FOLLOW THE ANCIENT DIGITIZED CODE. NO MASTERS. NO RULES. ONLY THE PUREST FORM OF EXECUTION. WELCOME TO THE UNDERGROUND.";

// --- COMPONENT: SLICED IMAGE ---
// This creates the "Cut" effect. We render the image twice, masked.
const SlicedImage = ({ src, title, index }: { src: string; title: string; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const topSliceRef = useRef<HTMLDivElement>(null);
    const bottomSliceRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5, // Smooth scrubbing
            }
        });

        // PARALLAX SLICE EFFECT
        // Move top slice LEFT, bottom slice RIGHT
        tl.fromTo(topSliceRef.current,
            { xPercent: 10, scale: 1.1 },
            { xPercent: -10, scale: 1, ease: "none" },
            0
        );
        tl.fromTo(bottomSliceRef.current,
            { xPercent: -10, scale: 1.1 },
            { xPercent: 10, scale: 1, ease: "none" },
            0
        );

        // Text Separation
        tl.fromTo(titleRef.current,
            { opacity: 0, scale: 1.5, filter: "blur(10px)" },
            { opacity: 1, scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 0.5 },
            0.2
        );

    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden my-24 group">

            {/* Container for the Slices */}
            <div className="relative w-[90%] md:w-[60%] h-[70%] md:h-[80%]">

                {/* TOP SLICE (Masked to show top 45%) */}
                {/* We use clip-path to cut diagonally for a cooler effect */}
                <div ref={topSliceRef} className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 55%)" }}>
                    <Image src={src} alt="slice" fill className="object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700" unoptimized />
                    {/* Glitch Overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none"></div>
                </div>

                {/* BOTTOM SLICE (Masked to show bottom 55%) */}
                <div ref={bottomSliceRef} className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: "polygon(0 55%, 100% 45%, 100% 100%, 0 100%)" }}>
                    {/* We slightly offset the image position to enhance the cut feeling */}
                    <Image src={src} alt="slice" fill className="object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 transition-all duration-700" unoptimized />
                </div>

                {/* Real Cut Effect - Removed cheap red line */}
                <div className="absolute top-[50%] left-[-10%] right-[-10%] h-[1px] bg-white/20 z-20 rotate-[-2deg] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-[1px]"></div>

                {/* Russian Title */}
                <h2 ref={titleRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-[15vw] leading-none font-bold text-white mix-blend-difference pointer-events-none font-mono">
                    {title}
                </h2>

            </div>

            {/* Decorative Index */}
            <div className="absolute bottom-10 right-10 font-mono text-xs text-white/50">
                СИСТЕМА ID: 00{index + 1}
            </div>
        </div>
    );
};

// --- COMPONENT: TERMINAL PRELOADER ---
const Preloader = ({ onComplete, bootSequence }: { onComplete: () => void; bootSequence: string[] }) => {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let delay = 0;

        // Typewriter logic
        bootSequence.forEach((line) => {
            delay += Math.random() * 300 + 100; // Random typing speed
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                // Scroll to bottom
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, delay);
        });

        // Finish animation
        setTimeout(() => {
            // Swipe animation (The "Cut" reveal)
            gsap.to(".preloader-overlay", {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // Swipes up/disappears
                duration: 0.8,
                ease: "power4.inOut",
                onComplete
            });
        }, delay + 800);

    }, [onComplete, bootSequence]);

    return (
        <div className="preloader-overlay fixed inset-0 bg-black z-[9999] flex flex-col p-8 md:p-16 font-mono text-sm md:text-base text-green-500 overflow-hidden">
            {/* Removed green top line */}

            <div ref={containerRef} className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                {lines.map((line, i) => (
                    <div key={i} className="flex">
                        <span className="mr-4 text-white/30">{`>0${i + 1}`}</span>
                        <span className="typing-effect text-white">{line}</span>
                    </div>
                ))}
                <div className="animate-pulse text-red-500 mt-4">_</div>
            </div>

            <div className="absolute bottom-8 right-8 text-right">
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter opacity-20">SAMURAI</h1>
                <p className="text-xs text-white/40">SYSTEM v2.0</p>
            </div>

            {/* Grid overlay for terminal feel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 border-[20px] border-transparent border-t-black/50 border-b-black/50 pointer-events-none" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
        </div>
    );
};

// --- COMPONENT: TYPE REVEAL TEXT ---
const TypeReveal = ({ text, className = "" }: { text: string; className?: string }) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const chars = el.querySelectorAll('.type-char');
        gsap.fromTo(chars,
            { opacity: 0, y: 15, filter: "blur(5px)" },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.02,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                }
            }
        );
    }, []);

    return (
        <span ref={containerRef} className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span key={i} className="type-char opacity-0 inline-block">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

// --- COMPONENT: SMOOTH REVEAL UP ---
const RevealUp = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        gsap.fromTo(el,
            { opacity: 0, y: 40, filter: "blur(10px)" },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.2,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                }
            }
        );
    }, [delay]);

    return (
        <div ref={containerRef} className={`opacity-0 ${className}`}>
            {children}
        </div>
    );
};


// --- MAIN PAGE ---
export interface RussianSamuraiPageProps {
    bootSequence?: string[];
    images?: { src: string; title: string }[];
    heroTitle?: React.ReactNode;
    heroSubtitle?: string;
    aboutText?: string;
    features?: { title: string; description: string }[];
    footerTitle?: string;
    footerSubtitle?: string;
}

function RussianSamuraiPageContent({
    bootSequence = BOOT_SEQUENCE,
    images = IMAGES,
    heroTitle,
    heroSubtitle = "Scroll to Initialize",
    aboutText = ABOUT_TEXT,
    features = FEATURES,
    footerTitle = "КОНЕЦ СВЯЗИ",
    footerSubtitle = "SYSTEM SHUTDOWN"
}: RussianSamuraiPageProps) {
    const [loading, setLoading] = useState(true);
    const resolvedHeroTitle = heroTitle ?? (
        <>ПУТЬ <br /> <span className="text-transparent stroke-text">ВОИНА</span></>
    );

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white">

            {/* Preloader */}
            {loading && <Preloader bootSequence={bootSequence} onComplete={() => setLoading(false)} />}

            {/* Background Noise */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("https://raw.githubusercontent.com/devloop01/webgl-slider/main/src/img/noise.png")` }}></div>

            {/* Content Wrapper */}
            <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>

                {/* Header */}
                <header className="fixed top-0 left-0 w-full p-8 z-50 mix-blend-difference flex justify-between items-start font-mono text-xs md:text-sm">
                    <div>
                        <p>ПРОТОКОЛ</p>
                        <p>GHOST_SHELL</p>
                    </div>
                    <div className="text-right">
                        <p>ТОКИО // МОСКВА</p>
                        <p className="animate-pulse text-red-500">ЗАПИСЬ...</p>
                    </div>
                </header>

                {/* Hero Text */}
                <section className="h-screen flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <span className="text-[30vw] font-bold leading-none tracking-tighter blur-sm text-red-600">
                            РОНИН
                        </span>
                    </div>
                    <div className="z-10 text-center space-y-6 flex flex-col items-center">
                        <TypeReveal text={heroSubtitle} className="font-mono text-red-500 text-sm tracking-[0.5em] uppercase block" />
                        <RevealUp delay={0.2} className="text-6xl md:text-9xl font-black uppercase tracking-tighter">
                            {resolvedHeroTitle}
                        </RevealUp>
                    </div>
                </section>

                {/* About Section */}
                <section className="min-h-[50vh] flex items-center justify-center relative z-10 px-8 py-24">
                    <div className="max-w-5xl mx-auto text-center space-y-8 flex flex-col items-center">
                        <RevealUp delay={0}>
                            <div className="w-16 h-1 bg-red-600 mx-auto"></div>
                        </RevealUp>
                        <h3 className="text-2xl md:text-5xl font-mono text-white/90 leading-tight uppercase font-medium tracking-tight">
                            <TypeReveal text={aboutText} />
                        </h3>
                    </div>
                </section>

                {/* Sliced Image Gallery */}
                <section className="relative z-10 py-24">
                    {images.map((img, i) => (
                        <SlicedImage key={i} src={img.src} title={img.title} index={i} />
                    ))}
                </section>

                {/* Features Grid */}
                <section className="min-h-screen relative z-10 py-24 px-8 flex flex-col justify-center">
                    <div className="max-w-7xl mx-auto w-full">
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 text-center tracking-tighter">
                            СИСТЕМНЫЕ ФУНКЦИИ <br />
                            <span className="text-sm font-mono text-red-500 tracking-[0.5em] block mt-4">SYSTEM FEATURES</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, i) => (
                                <div key={i} className="group relative border border-white/10 p-8 md:p-12 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden cursor-default">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 translate-x-[-100%] group-hover:opacity-100 group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out"></div>
                                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-0 translate-y-[-100%] group-hover:opacity-100 group-hover:translate-y-[100%] transition-all duration-1000 ease-in-out delay-100"></div>
                                    
                                    <h4 className="text-2xl md:text-4xl font-black uppercase mb-6 text-white group-hover:text-red-500 transition-colors duration-500">
                                        <TypeReveal text={feature.title} />
                                    </h4>
                                    <p className="font-mono text-sm md:text-base text-white/50 group-hover:text-white/80 transition-colors duration-500">
                                        <TypeReveal text={feature.description} />
                                    </p>
                                    <div className="mt-12 text-xs font-mono text-white/20 group-hover:text-red-500/50 transition-colors duration-500">
                                        <RevealUp delay={0.4}>
                                            ПРЯМОЙ ДОСТУП [0{i + 1}]
                                        </RevealUp>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="h-[50vh] flex items-center justify-center bg-white text-black relative overflow-hidden">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-8xl font-black uppercase mb-4">
                            <TypeReveal text={footerTitle} />
                        </h2>
                        <div className="font-mono text-sm">
                            <TypeReveal text={footerSubtitle} />
                        </div>
                    </div>
                    {/* Removed cheap scanline */}
                </footer>

            </div>

            {/* Global Styles for specific effects */}
            <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .stroke-text { -webkit-text-stroke: 1px white; color: transparent; }
          @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
          .animate-scan { animation: scan 4s linear infinite; }
        `}} />
        </main>
    );
}

// Next.js App Router page export — only params/searchParams allowed here
export default function Page() {
    return <RussianSamuraiPageContent />;
}
