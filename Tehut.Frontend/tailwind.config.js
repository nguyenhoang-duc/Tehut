/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        base: "#1D1D1F",
        base2: "#333235",
        base3: "#1B1B1D",
        primary: "#EDB525",
        accent: "#E4440F",
        "primary-content": "#FBF7F5",
        "secondary-content": "#827E7C",
        correct: "#2C9A44",
        wrong: "#CC3636",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
