var
  pkg = require('./package.json'),
  gulp = require('gulp'),
  nib = require('nib'),
  rename = require('gulp-rename'),
  nodemon = require('gulp-nodemon'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  stylus = require('gulp-stylus'),
  path = require('path');

gulp.task('server', function () {
  nodemon({
    script: 'server/index.js',
    exec: 'node'
  });
});

gulp.task('js', function () {
  var bundle = browserify({
    entries: ['./scripts/index.js'],
    paths: ['./node_modules']
  });

  bundle.exclude('underscore');
  bundle.require('lodash', { expose: 'underscore' });

  bundle.bundle()
    .on('error', function (err) { console.log(err.message); })
    .pipe(source('script.js'))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('css', function () {
  gulp.src('./stylesheets/index.styl')
    .pipe(stylus({
      'paths': [path.join(__dirname, '/node_modules')],
      'include css': true,
      'use': [nib()],
      'urlfunc': 'embedurl',
      'linenos': true,
      'define': {
        '$version': pkg.version
      }
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('watch', function () {
  gulp.watch('./stylesheets/**/*.styl', ['css']);
  gulp.watch('./client/**/*.js', ['js']);
});

gulp.task('dev', ['js', 'css', 'watch', 'server']);

gulp.task('default', ['js', 'css']);
