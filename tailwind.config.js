/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#26577C",
        secondary: "#F6B17A",
        tersier: "#B1B1B1",
        title: "#613D2B",
        background: "#EFEFEF",
      },
    },
  },
  plugins: [],
};
