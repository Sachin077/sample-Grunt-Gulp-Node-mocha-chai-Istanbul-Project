var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var ts = require('gulp-tsc');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');

gulp.task('build', function(){
  gulp.src(['src/*.ts'])
    .pipe(ts({ sourceMap: true, declaration: true, outDir: './js' }))
    .pipe(gulp.dest('./js'))
});

gulp.task('buildTest', function(){
  gulp.src(['test/*.ts'])
    .pipe(ts({ sourceMap: true, declaration: true, outDir: './js-test1' }))
    .pipe(gulp.dest('./js-test1'))
});

gulp.task('testit', function () {
  return gulp.src(['js-test1/test/*.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha({reporter: 'node_modules/mocha-junit-reporter'}));
});

gulp.task('test', ['buildTest', 'testit'])

gulp.task('jtest', () =>
  gulp.src('js-test1/test/*.js')
    .pipe(jasmine({
      reporter: new reporters.JUnitXmlReporter()
    }))
);

gulp.task('jasmineTest', ['buildTest', 'jtest'])
/*gulp.task('pre-test', function () {
  return gulp.src(['js-test1/src/*.js'])
    // Covering files 
    .pipe(istanbul({includeUntested: true}))
    // Force `require` to return covered files 
    .pipe(istanbul.hookRequire());
});
 
gulp.task('coverage', ['pre-test'], function () {
  return gulp.src(['js-test1/test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran 
    .pipe(istanbul.writeReports({reporters: ['cobertura']}));
});*/
