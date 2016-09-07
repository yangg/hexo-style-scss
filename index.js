var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var cheerio = require('cheerio');

function scss2css(code) {
  code = sass.renderSync({
    data: code,
    outputStyle: 'nested'
  }).css.toString();
  code = postcss([autoprefixer()]).process(code).css;
  return code;
}

hexo.extend.filter.register('after_render:html', function(source){
  var $ = cheerio.load(source);
  $('style[type="text/scss"]').each(function() {
    var el = $(this);
    el.html(scss2css(el.html()));
    el.removeAttr('type');
  });
  return $.html();
});
