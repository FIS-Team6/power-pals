/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./app/**/*.{html,js,jsx}",
      "./node_modules/flowbite-react/**/*.js",
    ],
  },
  theme: {
    extend: {
      colors: {
        teal: '#05878a',
        indigo_dye: '#004777',
      },
      fontFamily: {
        roboto: ['Roboto', 'latin-ext'],
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require("daisyui"),
    require("flowbite/plugin"),
  ],
};




// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{html,js,jsx}",
//     "./node_modules/flowbite-react/**/*.js",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         teal: '#05878a',
//         indigo_dye: '#004777'
//       },
//       fontFamily: {      
//         roboto: ['Roboto', 'latin-ext'],
//       },
//       screens: {
//         xs: "480px",
//         ss: "620px",
//         sm: "768px",
//         md: "1060px",
//         lg: "1200px",
//         xl: "1700px",
//       },
//     },
//   },
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//     require("daisyui"),
//     require("flowbite/plugin")
//   ],
// };
