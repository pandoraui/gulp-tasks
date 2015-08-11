'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var assign = require('object-assign');
var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var derequire = require('derequire/plugin');

module.exports = function(gulp, config) {
  var options = config.browserify || {};
  var hasBanner = !!options.banner;
  var bannerTpl = hasBanner && options.banner.template ||
    config.DEFAULTS.banner.template;
  var bannerData = hasBanner && options.banner.data ||
    config.DEFAULTS.banner.data;

  var bundleInit = function() {
    var b = browserify(assign({}, watchify.args, options.bundleOptions));

    if (process.env.NODE_ENV !== 'production') {
      b = watchify(b);
      b.on('update', function() {
        bundle(b);
      });
    }

    if (options.transforms) {
      options.transforms.forEach(function(t) {
        b.transform(t);
      });
    }

    if (options.plugins) {
      b.plugin(derequire);
      options.plugins.forEach(function(p) {
        b.plugin(p);
      });
    }

    b.on('log', $.util.log);
    return bundle(b);
  };

  var bundle = function(b) {
    return b.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source(options.filename))
      .pipe(buffer())
      // .pipe($.replace('{{VERSION}}', pkg.version))
      .pipe($.if(hasBanner, $.header(bannerTpl, bannerData)))
      .pipe(gulp.dest(options.dist))
      .pipe($.uglify())
      .pipe($.rename({suffix: '.min'}))
      .pipe($.if(hasBanner, $.header(bannerTpl, bannerData)))
      .pipe(gulp.dest(options.dist));
  };

  gulp.task('browserify', bundleInit);
};
