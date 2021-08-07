const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    react: resolve("node_modules/react"),
    "react-dom": resolve("node_modules/react-dom"),
  })
);
