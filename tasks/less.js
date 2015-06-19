'use strict';

var less = require('gulp-less');
var autoPrefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var gif = require('gulp-if');
var header = require('gulp-header');

function makeArray() {
  var arr = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if ('string' === argType || 'number' === argType) {
      arr.push(arg);
    } else if (Array.isArray(arg)) {
      arr = arr.concat(arg);
    } else if ('object' === argType) {
      for (var key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          arr.push(key);
        }
      }
    }
  }

  return arr;
}

module.exports = function(gulp, config) {
  var runSequence = require('run-sequence').use(gulp);
  var options = config.less || {};
  var hasBanner = !!options.banner;
  var bannerTpl = hasBanner && options.banner.template ||
    config.DEFAULTS.banner.template;
  var bannerData = hasBanner && options.banner.data ||
    config.DEFAULTS.banner.data;

  gulp.task('less:compile', function() {
    return gulp.src(config.less.src)
      .pipe(less())
      .pipe(autoPrefixer(config.less.autoPrefixer))
      .pipe(gif(hasBanner, header(bannerTpl, bannerData)))
      .pipe(gulp.dest(config.less.dist))
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      // .pipe(gif(hasBanner, header(bannerTpl, bannerData)))
      .pipe(gulp.dest(config.less.dist));
  });

  gulp.task('less:watch', function() {
    return gulp.watch(makeArray(config.less.src, config.less.watches), ['less:compile']);
  });

  gulp.task('less', function(cb) {
    runSequence(['less:compile', 'less:watch'], cb);
  });
};
