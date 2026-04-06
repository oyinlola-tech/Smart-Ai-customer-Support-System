export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Fraunces"', 'serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(24, 24, 24, 0.12)'
      }
    }
  },
  plugins: []
};
