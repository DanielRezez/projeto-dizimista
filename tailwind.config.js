// tailwind.config.js
module.exports = {
    theme: {
      extend: {},
    },
    plugins: [
      function ({ addVariant }) {
        addVariant('print', '@media print'); // Cria a variante de impressão
      },
    ],
  };