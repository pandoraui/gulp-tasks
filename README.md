# Amaze UI Gulp Tasks
---

[![NPM version](https://img.shields.io/npm/v/amazeui-gulp-tasks.svg?style=flat-square)](https://www.npmjs.com/package/amazeui-gulp-tasks)
<!--[![Build Status](https://img.shields.io/travis/amazeui/amazeui-gulp-tasks.svg?style=flat-square)](https://travis-ci.org/amazeui/amazeui-gulp-tasks)-->
[![Dependency Status](https://img.shields.io/david/amazeui/amazeui-gulp-tasks.svg?style=flat-square)](https://david-dm.org/amazeui/amazeui-gulp-tasks)
[![devDependency Status](https://img.shields.io/david/dev/amazeui/amazeui-gulp-tasks.svg?style=flat-square)](https://david-dm.org/amazeui/amazeui-gulp-tasks#info=devDependencies)

Amaze UI 插件开发 gulp 任务。

## 安装及使用

```
$ npm i amazeui-gulp-tasks --save-dev
```

在 `gulpfile.js` 中调用任务：

```js
// gulpfile.js

'use strict';

var gulp = require('gulp');
var tasks = require('amazeui-gulp-tasks');
var runSequence = require('run-sequence');

var config = {
  // 任务配置
};

tasks(gulp, config);

gulp.task('build', function(cb) {
  runSequence('clean', ['uglify', 'browserify', 'less', 'markdown'], cb);
});

gulp.task('dev', ['build', 'server']);
```

## 任务及配置说明

### `less`

编译 Less。配置如下：

```js
var config = {
  less: {
    src: '', // 源文件
    autoPrefixer: {}, // autoprefixer 设置，
    dist: '', // 部署目录
    watches: '' // watch 的文件，如果不设置则 watch `src` 里的文件
  }
}
```

### `browserify`

### `uglify`

### `markdown`

### `clean`

清理任务：

```js
var config = {
  clean: '' // 要清理的文件夹
};
```

### `server`

开发预览服务器：


### `release`

发布任务：

- 添加 `tag`
- 发布到 NPM
- Push 到 Git
