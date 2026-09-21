import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0d0f",
        surface: "#121519",
        concrete: "#a9adb3",
        gold: "#c49a5a"
      },
      boxShadow: {
        premium: "0 20px 60px rgba(0,0,0,.35)"
      }
    },
  },
  plugins: [],
};

export default config;
