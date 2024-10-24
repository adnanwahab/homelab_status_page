module.exports = {
  // https://github.com/microsoft/clarity
  //prefix: "tw-",
  darkMode: false, // or 'media' or 'class'

  variants: {
    extend: {},
  },
  plugins: [],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    // require("tailwindcss-children"),
    // require("tailwindcss-debug-screens"),
    // require("tailwindcss-gradients"),
    // require("tailwindcss-interaction-variants"),
    // require("tailwindcss-multi-theme"),
    // require("tailwindcss-pseudo-elements"),
    // require("tailwindcss-scrollbar"),
    // require("tailwindcss-textshadow"),
    // require("tailwindcss-typography")({
    //   modifiers: ['DEFAULT', 'sm', 'lg', 'xl'],
    // }),

    // require("daisyui"),
    // iconsPlugin({
    //    collections: getIconCollections(["ic", "mdi"]),
    // }),
  ],
  // daisyui: {},
};


