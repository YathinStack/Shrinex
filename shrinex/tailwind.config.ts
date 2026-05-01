import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Syne Mono', 'monospace'],
      },
      colors: {
        accent: '#FF771C',
        'accent-cream': '#F5EDE0',
      },
      maxWidth: {
        content: '640px',
        container: '1280px',
      }
    }
  },
  plugins: [],
};

export default config;
