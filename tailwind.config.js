const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {

        "primary": "#a3f7f0",
        "secondary": "#abfcf5",
        "accent": "#049122",
        "neutral": "#2e3238",
        "base-100": "#f3f1f4",
        "info": "#4577e3",
        "success": "#1a7557",
        "warning": "#fc9c27",
        "error": "#f4153e",
      }
    },
  },
  plugins: [],
});