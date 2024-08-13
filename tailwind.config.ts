import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "dark-green": "#1d3400",
        "light-green": "#aeff00",
        "custom-gray": "#5D6679",
      }
    }
  },

  plugins: []
} as Config;
