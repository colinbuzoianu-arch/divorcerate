/** @type {import('next').NextConfig} */
const nextConfig = {
  // @react-pdf/renderer depends on pdfkit, whose standard-font (.afm/.cjs) and
  // glyph-data files are loaded at runtime via paths Next's file tracer can't
  // follow. Without these includes the PDF route 500s on Vercel with
  // "Cannot find module .../pdfkit/js/standard-fonts/Helvetica.cjs".
  experimental: {
    outputFileTracingIncludes: {
      "/api/result/[id]/pdf": [
        "./node_modules/pdfkit/js/data/**/*",
        "./node_modules/pdfkit/js/standard-fonts/**/*",
        "./node_modules/fontkit/**/*",
      ],
    },
  },
};

module.exports = nextConfig;
