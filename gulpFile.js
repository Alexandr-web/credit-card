const { src, dest, parallel, watch } = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const webpack = require('webpack-stream');

function styles() {
    return src('./src/scss/*.scss')
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(concat('main.css'))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream());
}

function html() {
    return src('./src/*.html')
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream());
}

function js() {
    return src('./src/js/*.js')
        .pipe(webpack())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('main.js'))
        .pipe(dest('./dist/js/'))
        .pipe(browserSync.stream());
}

function watching() {
    watch('./src/scss/*.scss', parallel(styles));
    watch('./src/*.html', parallel(html));
    watch('./src/js/*.js', parallel(js));
}

function server() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
}

exports.build = parallel(styles, js, html);
exports.default = parallel(exports.build, server, watching);