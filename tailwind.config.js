import tailwindcssAnimate from "tailwindcss-animate";

module.exports = {
  darkMode: ["media"],
  theme: {
    extend: {
      borderColor: {
        border: "var(--border)",
      },
    },
  },
  plugins: [tailwindcssAnimate()],
};
