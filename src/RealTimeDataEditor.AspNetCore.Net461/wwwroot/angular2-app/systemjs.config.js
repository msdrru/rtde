/* System configuration for Angular 2. */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'angular:': 'angular2-app/js/angular/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'angular2-app/app',
            // angular bundles
            '@angular/core': 'angular:core.umd.js',
            '@angular/common': 'angular:common.umd.js',
            '@angular/compiler': 'angular:compiler.umd.js',
            '@angular/platform-browser': 'angular:platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'angular:platform-browser-dynamic.umd.js',
            '@angular/http': 'angular:http.umd.js',
            '@angular/router': 'angular:router.umd.js',
            '@angular/forms': 'angular:forms.umd.js',
            '@angular/upgrade': 'angular:upgrade.umd.js',
            // other libraries
            'rxjs': 'https://npmcdn.com/rxjs@5.0.0-rc.1'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);