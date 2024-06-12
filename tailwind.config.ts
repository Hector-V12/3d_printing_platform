import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to left, #2e0303, #000000)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        background: "#0F0F0F",
        whiteBackground: "#D9D9D9",
        fontBlack: "#242121",
        fontGray: "#8E8A8A",
        fontWhite: "#D9D9D9",
        linear1: "#351E1E",
        linear2: "#151515",
        almostBlackGreen: "#001f1f",
        darkGreen: "#064e3b",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
