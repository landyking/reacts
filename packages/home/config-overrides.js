const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    // Use alias to resolve the duplicate React instances problem. See here https://github.com/facebook/react/issues/13991#issuecomment-435587809
    react: resolve("node_modules/react"),
    "react-dom": resolve("node_modules/react-dom"),
  })
);
