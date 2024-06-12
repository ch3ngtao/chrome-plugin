const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const packageName = "chrome-vue-plugin";

const copyFiles = [
  {
    from: path.resolve("src/manifest.json"),
    to: path.resolve(packageName, "manifest.json")
  },
  {
    from: path.resolve("public"),
    to: path.resolve(packageName)
  }
];

const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles
  })
];

module.exports = {
  pages: {
    popup: {
      entry: `src/popup/popup.js`,
      template: `src/popup/popup.html`,
      filename: `popup.html`
    }
  },
  productionSourceMap: false,
  outputDir: path.join(__dirname, packageName),
  configureWebpack: {
    watch: true,
    entry: {
      content: "./src/content-scripts/content-script.js",
      // background: "./src/background/background.js",
      popup: "./src/popup/popup.js",
    },
    output: {
      filename: "js/[name].js" //输出路径
    },
    plugins,
    optimization: {
      splitChunks: false // 不允许切分，打包时文件太大的情况会被webpack切分成几个文件
    }
  },
  css: {
    extract: {
      filename: "css/[name].css" // 提取CSS
    }
  }
};
