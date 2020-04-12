const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync'),
  rigger = require('gulp-rigger'),
  sourcemaps = require('gulp-sourcemaps'),
  htmlmin = require('gulp-htmlmin'),
  babel = require('gulp-babel'),
  plumber = require('gulp-plumber'),
  del = require('del')

const path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.css',
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.css',
    img: 'src/img/**',
  },
  clean: './build',
}

gulp.task('webserver', function () {
  const files = [
    path.build.html,
    path.build.js,
    path.build.style,
    path.build.img,
  ]

  browserSync.init(files, {
    server: {
      baseDir: './build/',
      index: 'index.html',
    },
    host: 'localhost',
    port: 8000,
    tunnel: false,
  })
})

gulp.task('html', function () {
  return gulp
    .src(path.src.html)
    .pipe(rigger())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html))
})

gulp.task('js', function () {
  return gulp
    .src(path.src.js)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.build.js))
})

gulp.task('style', function () {
  return gulp
    .src(path.src.style)
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.build.css))
})

gulp.task('copy', () => {
  return gulp
    .src(['src/img/**'], {
      base: 'src',
    })
    .pipe(gulp.dest('./build'))
})

gulp.task('clean', function () {
  return del(path.clean, { force: true })
})

gulp.task('build', gulp.series('html', 'js', 'style', 'copy'))

gulp.task('watcher', function () {
  gulp.watch(path.watch.style, gulp.series('style'))
  gulp.watch(path.watch.html, gulp.series('html'))
  gulp.watch(path.watch.js, gulp.series('js'))
  gulp.watch(path.watch.img, gulp.series('copy'))
})

gulp.task(
  'start',
  gulp.series('clean', 'build', gulp.parallel('webserver', 'watcher'))
)
