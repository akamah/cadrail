const path = require('path');


module.exports = {
    entry: "./src/index.ts",

    output: {
        filename: "./bundle.js"
    },

    devtool: "source-map",

    resolve: {
        alias: {
            'three-examples': path.join(__dirname, './node_modules/three/examples/js')
        },
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', options: { transpileOnly: false } },
            { test: /three\/examples\/js/, use: 'imports-loader?THREE=three' }
        ]
    }
};
