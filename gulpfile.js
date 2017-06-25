'use strict';

var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');

var dest = './dist/';
var sourceSass = './src/sass/';
var sourceJs = './src/js/';
var sourceFontAwesome = './node_modules/font-awesome/';

gulp.task('clean', function (cb) {
   rimraf(dest, cb);
});

gulp.task('build:sass', ['clean'], function () {
  return gulp.src(sourceSass + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dest));
});

gulp.task('copy:font-awesome:css', ['build:sass'], function () {
  return gulp.src(sourceFontAwesome + '/css/*.min.css')
    .pipe(gulp.dest(dest + '/font-awesome/css'));
});

gulp.task('copy:font-awesome:fonts', ['copy:font-awesome:css'], function () {
  return gulp.src(sourceFontAwesome + '/fonts/*')
    .pipe(gulp.dest(dest + '/font-awesome/fonts'));
});

gulp.task('build:csr', ['clean'], function () {
  return gulp.src(sourceJs + 'event-csr.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'clean', 'build:sass', 'copy:font-awesome:css', 'copy:font-awesome:fonts', 'build:csr']);
