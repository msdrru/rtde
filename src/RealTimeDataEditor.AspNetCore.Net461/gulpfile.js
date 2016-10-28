/// <binding BeforeBuild='default' />

"use strict";

var lodash = require('lodash'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

var js = [
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/core-js/client/shim.js',
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.src.js'
];

var angular = [
    './node_modules/@angular/core/bundles/core.umd.js',
    './node_modules/@angular/common/bundles/common.umd.js',
    './node_modules/@angular/compiler/bundles/compiler.umd.js',
    './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    './node_modules/@angular/http/bundles/http.umd.js',
    './node_modules/@angular/router/bundles/router.umd.js',
    './node_modules/@angular/forms/bundles/forms.umd.js',
    './node_modules/@angular/upgrade/bundles/upgrade.umd.js'
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.css'
];

var fonts = [
    './node_modules/bootstrap/dist/fonts/*.*'
];

gulp.task('copy-js', function () {
    lodash.forEach(js, function (file, lodash) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/angular2-app/js'));
    });
});

gulp.task('copy-angular', function () {
    lodash.forEach(angular, function (file, lodash) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/angular2-app/js/angular'));
    });
});

gulp.task('copy-rxjs', function () {
    lodash.forEach(rxjs, function (file, lodash) {
        gulp.src(file)
            .pipe(gulp.dest('./wwwroot/angular2-app/js/rxjs'));
    });
});

gulp.task('copy-min-js', function () {
    lodash.forEach(js, function (file, lodash) {
        gulp.src(file)
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest('./wwwroot/angular2-app/js'));
    });
});

gulp.task('copy-css', function () {
    lodash.forEach(css,
        function (file, lodash) {
            gulp.src(file)
                .pipe(gulp.dest('./wwwroot/angular2-app/css'));
        });
});

gulp.task('copy-min-css', function () {
    lodash.forEach(css,
        function (file, lodash) {
            gulp.src(file)
                .pipe(cssmin())
                .pipe(rename({ extname: '.min.css' }))
                .pipe(gulp.dest('./wwwroot/angular2-app/css'));
        });
});

gulp.task('copy', ['copy-js', 'copy-css']);
gulp.task('minify', ['copy-min-js', 'copy-min-css']);