module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Source Sans Pro', 'ui-sans-serif', 'system-ui']
      },
      screens: {
        sm: '500px'
      },
      height: {
        '90vh': '90vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
