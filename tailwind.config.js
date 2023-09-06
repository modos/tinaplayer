const withMT = require("@material-tailwind/react/utils/withMT");
const {createThemes} = require("tw-colors");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [
      createThemes({
        light: {
          "primary": "#570df8",
          "primary-content": "#E0D2FE",
          "secondary": "#f000b8",
          "secondary-content": "#FFD1F4",
          "accent": "#10576D",
          "accent-content": "#07312D",
          "neutral": "#F2F2F2",
          "neutral-content": "#D7DDE4",
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
        dark: {
          "primary": "#661AE6",
          "primary-content": "#ffffff",
          "secondary": "#D926AA",
          "secondary-content": "#ffffff",
          "accent": "#1FB2A5",
          "accent-content": "#ffffff",
          "neutral": "#2a323c",
          "neutral-focus": "#242b33",
          "neutral-content": "#A6ADBB",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          "base-content": "#A6ADBB",
        },
        cyberpunk: {
          "primary": "#ff7598",
          "secondary": "#75d1f0",
          "accent": "#c07eec",
          "neutral": "#423f00",
          "neutral-content": "#ffee00",
          "base-100": "#ffee00",
        },
        coffee: {
          "primary": "#DB924B",
          "secondary": "#263E3F",
          "accent": "#10576D",
          "neutral": "#120C12",
          "base-100": "#20161F",
          "base-content": "#756E63",
          "info": "#8DCAC1",
          "success": "#9DB787",
          "warning": "#FFD25F",
          "error": "#FC9581",
        },
        aqua: {
          "primary": "#09ecf3",
          "primary-content": "#005355",
          "secondary": "#966fb3",
          "accent": "#ffe999",
          "neutral": "#3b8ac4",
          "base-100": "#345da7",
          "info": "#2563eb",
          "success": "#16a34a",
          "warning": "#d97706",
          "error": "#dc2626",
        }
      })
  ],
});