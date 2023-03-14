const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');                  /*JavaScript compiler*/
const plumber = require('gulp-plumber');              /*Prevent pipe breaking caused by errors from gulp plugins*/
const cssnano = require('gulp-cssnano');              /*Minify CSS with cssnano.*/
const rename = require('gulp-rename'); 
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const sassVariables = require('gulp-sass-variables');
var sass = require('gulp-sass')(require('sass'));
//var sass = require('gulp-sass')(require('sass'));

// copy fonts in dist folder
const fonts = () => {
  return gulp.src('src/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/fonts'));
};

// copy assets in dist folder
const assets = () => {
  return gulp.src('src/library/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/library'));
};

// sass
const sassdev = () => {
  return gulp.src('src/scss/*.scss')
  .pipe(sourcemaps.init())  
      .pipe(plumber())
      .pipe(sass())
      .pipe(cssnano())
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemaps.write('/maps',
      {
          includeContent: false,
          sourceRoot: 'dist/css'
      }))
      //.pipe(rename('main.css'))
      .pipe(gulp.dest('dist/css'))
      //.pipe(reload({ stream: true }));
      .pipe(browserSync.stream());
      
};

// sass min
const sassmin = () => {
  return gulp.src('src/scss/main.scss')
  .pipe(sourcemaps.init())  
      .pipe(plumber())
      .pipe(sass())
      .pipe(cssnano())
      .pipe(postcss([autoprefixer()])) 
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('dist/css'))
      //.pipe(reload({ stream: true }));
      .pipe(browserSync.stream());
};

/*const sassmin = (cb) => { 
  return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())  
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(postcss([autoprefixer()])) 
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'))
  cb()
  //return gulp.src('src/scss/main.scss')
};*/

// js
const js = () => {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist/js'));
};

// js min
const jsmin = () => {
  return gulp.src(['src/js/*.js', '!src/js/slick.min.js'])
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
};

// pug html
const pugdev = () => {
  return gulp.src([
    'src/templates/**/*.pug'
  ])
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
};

// reload the Browser
const reload = (done) => {
  browserSync.reload();
  done();
};

//  dev server in borwsaer
const serve = (done) => {
  browserSync.init({
    open: true,
      server: {
        baseDir: 'dist'
      }
  });
  done();
};

const watch = () => gulp.watch([`src/templates/**/*.pug`, `src/library/*`, `src/fonts/*`, `src/js/**/*.js`, `src/scss/**/*.scss`], gulp.series(pugdev, assets, fonts, js, jsmin, sassdev, sassmin, reload));
const dev = gulp.parallel(jsmin, js, sassmin, sassdev, assets, fonts, pugdev, serve, watch);


exports.dev = dev;