module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#333333',
      },
      width: {
        '104': '24rem',
      },
      spacing: {
        '104': '24rem',
      },
      fontFamily: {
        'grid': ['"Bitcount Grid Double"', 'monospace'],
      },
    },
  },
  variants: {},
  plugins: [],
}