/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2228",
        accent: {
          teal: "#e0fcf8",
          yellow: "#fff9e6",
        }
      },
      fontFamily: {
        lexend: ["var(--font-lexend)"],
      }
    },
  },
  plugins: [],
}
