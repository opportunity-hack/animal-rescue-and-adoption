/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkestgreen: "#344E41",
        darkergreen: "#3A5A40",
        lightgreen: "#588157",
        sage: "#A3B18A",
        white: "#FFFFFF",
        wolfwhite: "#DAD7CD",
      },
    },
  },
  plugins: [],
};
