'use strict';

// basics
const gulp         = require('gulp');

// styles
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano      = require('cssnano');

// js
const babel        = require('gulp-babel');
const eslint       = require('gulp-eslint');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');

// images
const imagemin     = require('gulp-imagemin');
const cache        = require('gulp-cache');

// dev's little helpers
const sourcemaps   = require('gulp-sourcemaps');
const browsersync  = require('browser-sync').create();
const reload       = browsersync.reload;
const del          = require('del');


gulp.task('styles', () =>
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 3 version']
            }),
            cssnano({
                safe: true,
                minifyFontValues: {
                    removeQuotes: false
                }
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
);

gulp.task('serve', ['styles'], () => {
    browsersync.init({
        server: "./public"
    });

    gulp.watch('./src/sass/**/*.scss', ['styles']);
    gulp.watch('./public/*.html').on('change', reload);
});


// gulp.task('scripts', () =>
//     gulp.src('./src/js/**/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel())
//         .pipe(eslint())
//         .pipe(concat())
//         .pipe(uglify())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('./public/js'))
// );

gulp.task('default', ['styles']);
