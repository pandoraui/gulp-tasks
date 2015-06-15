'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var docUtil = require('amazeui-doc-util');
var runSequence = require('run-sequence');

var config = {
  pkg: require('./package.json'),

  // release task
  ghPages: {
    src: 'dist/**/*'
  },

  // remote branch
  git: {
    branch: 'master'
  },

  browserSync: {
    notify: false,
    server: 'dist',
    logPrefix: 'AMP'
  },

  // watch files and reload browserSync
  bsWatches: 'dist/**/*',

  less: {
    src: './tests/test.less',
    autoPrefixer: docUtil.autoprefixerBrowsers,
    dist: './dist',
    watches: './tests/**/*.less'
  },

  // docs:md
  md: {
    src: ['README.md'],
    data: {
      pluginTitle: 'Gulp Tasks for Amaze UI',
      pluginDesc: 'Amaze UI 插件开发 gulp 任务',
      buttons: 'amazeui/gulp-tasks'
    },
    rename: function(file) {
      file.basename = file.basename.toLowerCase();
      if (file.basename === 'readme') {
        file.basename = 'index';
      }
      file.extname = '.html';
    },
    dist: function(file) {
      if (file.relative === 'index.html') {
        return 'dist'
      }
      return 'dist/docs';
    }
  },

  // browserify
  browserify: {
    bundleOptions: {
      entries: './tests/app.js',
      cache: {},
      packageCache: {}
    },
    filename: 'app.js',
    transforms: [['browserify-shim', {global: true}]],
    plugins: [],
    dist: 'dist'
  },

  // clean path
  clean: 'dist',

  uglify: {
    src: './plugins/*.js',
    dist: './dist'
  }
};

require('./index')(gulp, config);

gulp.task('build', function(cb) {
  runSequence('clean', ['uglify', 'browserify', 'less', 'markdown'], cb);
});

gulp.task('dev', ['build', 'server']);
