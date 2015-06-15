'use strict';

function initTasks(gulp, config) {
  // TODO: 添加默认配置

  config = config || {};

  // task: less
  config.less && require('./tasks/less')(gulp, config);

  // dev server: server
  require('./tasks/server')(gulp, config);

  // task: clean
  config.clean && require('./tasks/clean')(gulp, config);

  // task: markdown
  config.md && require('./tasks/markdown')(gulp, config);

  // task: uglify
  config.uglify && require('./tasks/uglify')(gulp, config);

  // task: browserify
  config.browserify && require('./tasks/browserify')(gulp, config);

  // Release GitHub & npm: ['release']
  require('./tasks/release')(gulp, config);
}

module.exports = initTasks;
