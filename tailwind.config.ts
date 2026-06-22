import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101418",
        mist: "#f5f7fb",
        line: "#d9e0ea",
        brand: {
          DEFAULT: "#e44b2d",
          dark: "#b63116",
          soft: "#fff1ed"
        },
        accent: {
          DEFAULT: "#127a5f",
          soft: "#e9f9f4"
        }
      },
      boxShadow: {
        card: "0 18px 50px rgba(16, 20, 24, 0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
