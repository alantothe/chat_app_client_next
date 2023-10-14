/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          100: "#EAEAEA", // lightest
          200: "#D0D0D0",
          300: "#B5B5B5",
          400: "#9B9B9B",
          500: "#808080", // mid-tone
          600: "#666666",
          700: "#4B4B4B",
          800: "#313131",
          900: "#171717", // darkest
        },
        width: {
          100: "100px",
          110: "110px",
          120: "120px",
          130: "130px",
          140: "140px",
          150: "150px",
          160: "160px",
          170: "170px",
          180: "180px",
          190: "190px",
          200: "200px",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
  },
  plugins: [require("tailwind-scrollbar")],
});
