'use strict';

import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import concat from 'gulp-concat';


const dirs = {
  src: 'src',
  build: 'build'
};

const libs = [
  'node_modules/jquery/dist/jquery.slim.min.js',
  'node_modules/moment/min/moment-with-locales.min.js',
  'node_modules/moment-timezone/builds/moment-timezone-with-data.min.js'
];

gulp.task('default', ['manifest', 'styles', 'markup', 'behavior', 'assets']);

gulp.task('clean', (cb) => {
  del(dirs.build).then(() => {cb();});
});

gulp.task('manifest', ['clean'], () => {
  return gulp.src(`${dirs.src}/manifest.json`)
    .pipe(gulp.dest(dirs.build));
});

gulp.task('styles', ['clean'], () => {
  return gulp.src(`${dirs.src}/*.scss`)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(dirs.build));
});

gulp.task('markup', ['clean'], () => {
  return gulp.src(`${dirs.src}/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(dirs.build));
});

gulp.task('behavior', ['clean'], () => {
  return gulp.src(libs.concat(`${dirs.src}/*.js`))
    .pipe(concat('newTab.js'))
    .pipe(gulp.dest(dirs.build));
});

gulp.task('assets', ['clean'], () => {
  return gulp.src(`${dirs.src}/assets/**/*`)
    .pipe(gulp.dest(dirs.build+'/assets/'));
});