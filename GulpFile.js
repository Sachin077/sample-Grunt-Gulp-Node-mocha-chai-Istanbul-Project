var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var ts = require('gulp-typescript');
var mc = require('gulp-mocha');

gulp.task('build', function() {
  console.log('Compiling typescript');
  return gulp.src(['node/*.ts'])
    .pipe(ts({module: 'commonjs'})).js.pipe(gulp.dest('./js'))
});

gulp.task('buildTest', function() {
  console.log('Compiling typescript');
  return gulp.src(['test/*.ts'])
    .pipe(ts({module: 'commonjs'})).js.pipe(gulp.dest('./js-test1'))
});

gulp.task('testit', function () {
  return gulp.src(['js-test1/**/*.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mc({reporter: 'nyan'}));
});

gulp.task('test', ['buildTest', 'testit'])