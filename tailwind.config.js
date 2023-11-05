/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "grey-bg": "#F2F2F2",
        "blue-col": "#A5C9FF",
        "green-col": "#84E3A5",
      },
    },
  },
  plugins: [],
};
