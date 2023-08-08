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
            pacificblue: '#0092ca',
            fuscousGray: '#515151'
        },
        height:{
            '40rem': '40rem',
            "90vh": '90vh'
        }
    },
  },
  plugins: [],
}

