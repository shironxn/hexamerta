import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["lofi"],
          "base-100": "#f1f5f9",
          "base-200": "#d3d4d6",
          "base-300": "#f8fafc",
          "base-content": "#475d5b",
          accent: "FAAE2B",
          primary: "#FAAE2B",
          secondary: "#134e4a",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["sunset"],
          accent: "#f2f7f5",
          primary: "#FAAE2B",
          secondary: "#FAAE2B",
        },
      },
    ],
  },
  theme: {
    container: {
      center: true,
      screens: {
        lg: "1024px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default withMT(config);
