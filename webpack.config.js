module.exports = {
    entry: "./src/index.ts",

    output: {
        filename: "./build/bundle.js"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', options: { transpileOnly: false } }
        ]
    }
};
