import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          primary: '#b00020',
          dark: '#8b0019',
          light: '#d1002a',
        },
        black: {
          primary: '#0f0f0f',
          secondary: '#1a1a1a',
        },
        gray: {
          dark: '#1a1a1a',
          light: '#cfcfcf',
        },
      },
    },
  },
  plugins: [],
}
export default config
