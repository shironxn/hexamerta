import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["lofi", "black"],
  },
  theme: {
    container: {
      padding: "2rem",
      center: true,
      screens: {
        xl: "1280px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
