/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

const colours = [
  '#19e2ba',
  '#188899',
  '#030c19',
  '#2dbfd6',
  '#6cfc21',
  '#42e8fe',
  '#dc4ad9',
  '#045915',
  '#08ff18',
  '#2f27d6',
  '#488aff',
  '#9fa0c8',
  '#5f4166',
  '#3215ab',
  '#5f39da',
  '#e7857f',
  '#a97e12',
  '#040852',
  '#8e08a8',
  '#c5cfbc'
];
const colorIndex = Math.floor(Math.random() * 20);
const randomColor = colours[colorIndex];
 
export default withMT({
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./dist/*.html"
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      colors: {
        applegreen: {
          50: "#a4d322",
          100: "#a0c444",
          200: "#8eb74c",
          300: "#85b636",
          400: "#80b727",
          500: "#79b715",
          600: "#73b704",
          700: "#5a9003",
          800: "#467003",
          900: "#355403",
          950: "#253b02"
        },
        gold: {
          50: "#ffdc73",
          100: "#ffcf40",
          200: "#ffbf00",
          300: "#ffb910",
          400: "#E5B80B",
          500: "#D4AF37",
          600: "#bf9b30",
          700: "#a67c00"
        },
        primary: {
          50: "#fee9da", //main
          100: "#fedfc9",
          200: "#fed5b9",
          300: "#ffcba9",
          400: "#ffbd90",
          500: "#ffb380",
          600: "#ffa970",
          700: "#ffa05f",
          800: "#ff964f",
          900: "#ff8c3f",
          950: "#ff822e"
        }
        ,
        secondary: {
          50: "#ff7d26",
          100: "#ff7416",
          200: "#ff6a06",
          300: "#f46200",
          400: "#e45c00", //main
          500: "#d45500",
          600: "#c34f00",
          700: "#b34800",
          800: "#a34100",
          900: "#923b00",
          950: "#823400",
          1000: "#6a2a00"
        },
        customColors: randomColor
      },
      fontFamily: {
        'ShadowsIntoLight': ['ShadowsIntoLightRegular', 'sans-serif'],
        'KronaOne': ['KronaOneRegular', 'sans-serif'],
        'FamiljenGroteskMedium': ['FamiljenGroteskMedium', 'sans-serif'],
        'PoppinsLight': ['PoppinsLight', 'sans-serif'],
        'Sacramento': ['SacramentoRegular', 'sans-serif']
      },
      dropShadow: {
        // Define custom drop-shadow with a specific color
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
      },
      boxShadow: {
        'red': '0 0 2px rgba(239, 68, 68, 0.5), 2px 1px 10px 2px rgba(239, 68, 68, 0.5)',
        'green': '0 0 2px #8eb74c, 2px 1px 10px 2px #8eb74c',

        // Add more custom shadows if needed
      }
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',      
    }
  },
  plugins: [],
});