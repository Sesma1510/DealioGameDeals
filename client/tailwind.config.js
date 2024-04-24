/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-background": "#6288A4",
        "color-neutral-white": "#fff",
        "link-primary": "#000",
        "color-neutral-neutral": "#666",
        gainsboro: {
          100: "#e6e6e6",
          200: "#e5e5e5",
          300: "#d9d9d9",
          400: "rgba(230, 230, 230, 0.09)",
        },
        gray: "#14213d",
        orange: "#fca311",
        chocolate: "#c97000",
        darkslategray: "#333",
      },
      spacing: {},
      fontFamily: {
        "text-tiny-link": "Roboto",
      },
      borderRadius: {
        "3xs": "10px",
        xl: "20px",
        "8xs": "5px",
      },
    },
    fontSize: {
      xs: "12px",
      base: "16px",
      "5xl": "24px",
      lgi: "19px",
      sm: "14px",
      xl: "20px",
      "29xl": "48px",
      "10xl": "29px",
      "19xl": "38px",
      lg: "18px",
      "37xl": "56px",
      "15xl": "34px",
      "26xl": "45px",
      inherit: "inherit",
    },
    screens: {
      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
