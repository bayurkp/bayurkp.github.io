/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F5A623',
          light: '#FFB84D',
          dark: '#D4890F'
        },
        neutral: {
          light: '#FAFAFA',
          dark: '#111111'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px #000',
        'neo-sm': '2px 2px 0px 0px #000',
        'neo-lg': '6px 6px 0px 0px #000',
        'neo-dark': '4px 4px 0px 0px #FFF',
        'neo-dark-sm': '2px 2px 0px 0px #FFF',
        'neo-dark-lg': '6px 6px 0px 0px #FFF'
      },
      borderWidth: {
        '3': '3px',
        '4': '4px'
      }
    }
  },
  plugins: []
};
