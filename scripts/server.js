// only ES5 is allowed in this file
require("babel-register")({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['transform-es2015-arrow-functions'],
  ignore: /(bower_components)|(node_modules)/
});

var app = require('../server/main');