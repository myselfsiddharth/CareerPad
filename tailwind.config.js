/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // For classes in your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // For all JS, TS, JSX, TSX files in the src folder and its subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}