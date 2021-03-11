// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "app.js": /^app/,
    },
  },
  stylesheets: { joinTo: "app.css" },
  plugins: {
    brunchTypescript: {
      removeComments: true,
      target: "es2020",
      module: "commonjs",
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
    },
  },
};

exports.plugins = {
  babel: { presets: ["latest"] },
};
