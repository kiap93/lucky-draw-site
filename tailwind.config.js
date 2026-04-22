export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0f172a',   // add this
        'brand-blue': '#4f46e5',   // add this
        'brand-muted': '#6b7280',  // add this
      },
    },
  },
  plugins: [],
}