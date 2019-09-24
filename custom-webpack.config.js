'use strict';

const webpack = require('webpack');

// https://webpack.js.org/plugins/context-replacement-plugin/
module.exports = {
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
};
//new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
