import { resolve } from "path";

module.exports = {
  target: `node`,
  entry: resolve(`host`, `aws`, `server`, "event-handler", `index.ts`),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: `ts-loader`,
          options: {
            configFile: resolve(
              `host`,
              `aws`,
              `server`,
              `event-handler`,
              `tsconfig.json`
            ),
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [`.ts`, `.js`],
  },
  output: {
    filename: `index.js`,
    path: resolve(`host`, `aws`, `server`, `event-handler`, `dist`),
  },
  externals: {
    "aws-sdk": "commonjs2 aws-sdk",
  },
};
