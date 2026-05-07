// client/tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Amazon-inspired professional palette
        amazon_blue: {
          light: "#232f3e",
          DEFAULT: "#131921",
        },
        amazon_yellow: {
          DEFAULT: "#febd69",
          hover: "#f3a847",
        },
        amazon_action: {
          DEFAULT: "#FFD814",
          hover: "#F7CA00",
        }
      }
    },
  },
  plugins: [],
}