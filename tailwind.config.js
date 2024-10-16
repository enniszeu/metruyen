/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Thêm dòng này nếu bạn sử dụng App Directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}