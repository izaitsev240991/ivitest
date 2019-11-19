const gulp = require('gulp'),
      less = require('gulp-less'),
      concat = require('gulp-concat'),
      pug = require('gulp-pug'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCss = require('gulp-clean-css'),
      sourcemaps = require('gulp-sourcemaps'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify'),
      del = require('del'),
      browserSync = require('browser-sync').create();

const cssFiles = [
    './src/less/styles.less'
];

const jsFiles = [
    './src/js/main.js', 
]

async function views() {
     gulp.src('./src/pug/index.pug')
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(pug({
                    pretty : true
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./dist/'))
                .pipe(browserSync.stream())

  }

  async function styles() {
     gulp.src(cssFiles)
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(less())
                .pipe(concat('styles.css'))
                .pipe(autoprefixer({
                    cascade: false,
                    grid: true
                }))
                .pipe(cleanCss({
                    level:2
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./dist/css'))
                .pipe(browserSync.stream())
}


async function scripts() {
     gulp.src(jsFiles)
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(concat('main.js'))
                .pipe(uglify({
                    ie8: true,
                    toplevel: true

                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./dist/js'))
                .pipe(browserSync.stream())
}

async function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist/",
            stream: true
            
        }
    })
    gulp.watch('./src/pug/**/*.pug', views);
    gulp.watch('./src/less/**/*.less', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    
}
async function clean() {
    del(['dist/**'])
}


gulp.task('watch',watch);

gulp.task('build', gulp.series(clean,
                        gulp.parallel(views, styles, scripts)));

gulp.task('dev', gulp.series('build',  'watch'));