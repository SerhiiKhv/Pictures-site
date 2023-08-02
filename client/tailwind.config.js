/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{jsx,js,ts,tsx}",
  ],
  theme: {
    extend: {
        colors:{
            primary: '#f5385D',
            pacificblue: '#0092ca'
        },
        height:{
            '40rem': '40rem'
        }
    },
  },
  plugins: [],
}

