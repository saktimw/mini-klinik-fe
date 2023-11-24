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
        'white-card': '#fefefe', 
        'white-stroke': '#ededed',
        'base-background': '#f8f8f8',
        'main': '#10bbe5',
        'main-lighter': '#f3f5ff',
        'main-typo': '#424642',
        'secondary-typo': '#676D86'
      },
    }
  },
  plugins: [
    require('daisyui')
  ],
}
export default config
