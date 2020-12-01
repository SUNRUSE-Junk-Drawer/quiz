import { resolve } from "path";
import { execSync } from "child_process";

import HtmlWebpackPlugin = require("html-webpack-plugin");

import FaviconsWebpackPlugin = require("favicons-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const version = execSync(`git rev-parse HEAD`, { encoding: `utf8` });

module.exports = {
  target: [`web`, `es5`],
  entry: resolve(`client`, `index.ts`),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: `ts-loader`,
          options: {
            configFile: resolve(`client`, `tsconfig.json`),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [
              [
                `@babel/preset-env`,
                {
                  useBuiltIns: `entry`,
                  corejs: 3,
                  targets: { browsers: [`IE 11`] },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, `css-loader`, `sass-loader`],
      },
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
    ],
  },
  resolve: {
    extensions: [`.ts`, `.js`],
  },
  output: {
    filename: `[contenthash].js`,
    path: resolve(`dist`),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: `head`,
      title: `SUNRUSE Quiz`,
      hash: true,
      scriptLoading: `defer`,
      template: resolve(`client`, `index.pug`),
    }),
    new FaviconsWebpackPlugin({
      logo: resolve(`client`, `logo.svg`),
      cache: true,
      publicPath: `https://sunruse.co.uk/quiz`,
      outputPath: ``,
      prefix: ``,
      inject: true,
      favicons: {
        path: ``,
        appName: `SUNRUSE Quiz`,
        appShortName: `SUNRUSE Quiz`,
        appDescription: `Some quizzes we run for ourselves.`,
        developerName: `SUNRUSE`,
        developerURL: `https://sunruse.co.uk`,
        dir: `auto`,
        lang: `en-GB`,
        background: `#fff`,
        theme_color: `#fff`,
        appleStatusBarStyle: `default`,
        display: `standalone`,
        orientation: `portrait`,
        scope: `/quiz`,
        start_url: `https://sunruse.co.uk/quiz`,
        version,
        logging: false,
        pipeHTML: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        manifestRelativePaths: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true,
        },
      },
    }),
  ],
};
