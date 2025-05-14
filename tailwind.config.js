const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      siXl: "1090px",
      xl: "1200px",
      "2xl": "1540px",
    },
    extend: {
      // Fonts
      fontFamily: {
        OpenSan: ["OpenSan", "serif"], // Maps to --font-OpenSan
        OpenSanBold: ["OpenSanBold"], // Maps to --font-OpenSanBold
        OpenSanSemiBold: ["OpenSanSemiBold"], // Maps to --font-OpenSanSemiBold
      },
      // Colors
      colors: {
        primary: "#193370", // Maps to --color-primary
        secondary: "#FF8233", // Maps to --color-secondary
        accent_1: "#FF0800", // Maps to --color-accent_1
        accent_2: "#16A561", // Maps to --color-accent_2
        accent_3: "#B3B3B3", // Maps to --color-accent_3
        accent_4: "#56ABEB", // Maps to --color-accent_4
        black_50: "#51575C", // Maps to --color-black_50
      },
      // Font Sizes
      fontSize: {
        h1: "40px", // Maps to --text-h1
        h2: "36px", // Maps to --text-h2
        h3: "32px", // Maps to --text-h3
        h4: "28px", // Maps to --text-h4
        h5: "24px", // Maps to --text-h5
        h6: "20px", // Maps to --text-h6
        body: "16px", // Maps to --text-body
        caption: "14px", // Maps to --text-caption
        small: "12px", // Maps to --text-small
        tiny: "10px", // Maps to --text-tiny
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      addUtilities({
        ".line-clamp-custom-1": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
          overflow: "hidden",
        },
        ".line-clamp-custom-2": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
          overflow: "hidden",
        },
        // Add more custom line clamp classes if needed
      });
    },
  ],
};
