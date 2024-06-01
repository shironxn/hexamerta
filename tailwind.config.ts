import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["lofi"],
          "base-100": "#f2f7f5",
          "base-200": "#d3d4d6",
          "base-300": "#f2f7f5",
          "base-content": "#475d5b",
          accent: "FAAE2B",
          primary: "#FAAE2B",
          secondary: "#134e4a",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["black"],
          "base-100": "#134e4a",
          "base-200": "#0f433f",
          "base-300": "#0b3835",
          accent: "#f2f7f5",
          primary: "#FAAE2B",
          secondary: "#FAAE2B",
        },
      },
    ],
  },
  theme: {
    container: {
      padding: "2rem",
      center: true,
      screens: {
        lg: "1024px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
