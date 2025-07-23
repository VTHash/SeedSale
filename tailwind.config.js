/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  animation: {
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 15px #00ff99, 0 0 30px #00ff99",
          },
          "50%": {
            boxShadow: "0 0 15px #00ccff, 0 0 40px #00ccff",
          },
        },
      },
    },
  },
  plugins: [],
}