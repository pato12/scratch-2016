(function(){
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        less = require('gulp-less'),
        jade = require('gulp-jade'),
        rename = require('gulp-rename'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        minifyCSS = require('gulp-minify-css'),
        autoprefixer = require('gulp-autoprefixer'),
        tap = require('gulp-tap'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        qunit = require('gulp-qunit'),
        util = require('gulp-util'),
        stylish = require('jshint-stylish'),
        fs = require('fs'),
        paths = {
            root: './',
            build: {
                root: 'app/build/',
                styles: 'app/build/css/',
                scripts: 'app/build/js/'
            },
            custom: {
                root: 'custom/',
                styles: 'custom/css/',
                scripts: 'custom/js/',
            },
            source: {
                root: 'src/',
                styles: {
                    ios: 'src/less/ios/',
                    material: 'src/less/material/'
                },
                scripts: 'src/js/*.js'
            }
        },
        f7 = {
            filename: 'framework7',
            jsFiles: [
                'src/js/wrap-start.js',
                'src/js/f7-intro.js',
                'src/js/views.js',
                'src/js/navbars.js',
                'src/js/searchbar.js',
                'src/js/messagebar.js',
                'src/js/xhr.js',
                'src/js/pages.js',
                'src/js/router.js',
                'src/js/modals.js',
                'src/js/progressbar.js',
                'src/js/panels.js',
                'src/js/lazy-load.js',
                'src/js/material-preloader.js',
                'src/js/messages.js',
                'src/js/swipeout.js',
                'src/js/sortable.js',
                'src/js/smart-select.js',
                'src/js/virtual-list.js',
                'src/js/pull-to-refresh.js',
                'src/js/infinite-scroll.js',
                'src/js/scroll-toolbars.js',
                'src/js/material-tabbar.js',
                'src/js/tabs.js',
                'src/js/accordion.js',
                'src/js/fast-clicks.js',
                'src/js/clicks.js',
                'src/js/resize.js',
                'src/js/forms-storage.js',
                'src/js/forms-ajax.js',
                'src/js/forms-textarea.js',
                'src/js/material-inputs.js',
                'src/js/push-state.js',
                'src/js/swiper-init.js',
                'src/js/photo-browser.js',
                'src/js/autocomplete.js',
                'src/js/picker.js',
                'src/js/calendar.js',
                'src/js/notifications.js',
                'src/js/template7-templates.js',
                'src/js/plugins.js',
                'src/js/init.js',
                'src/js/f7-outro.js',
                'src/js/dom7-intro.js',
                'src/js/dom7-methods.js',
                'src/js/dom7-ajax.js',
                'src/js/dom7-utils.js',
                'src/js/dom7-outro.js',
                'src/js/proto-support.js',
                'src/js/proto-device.js',
                'src/js/proto-plugins.js',
                'src/js/template7.js',
                'src/js/swiper.js',
                'src/js/wrap-end.js'
            ],
            date: {
                year: new Date().getFullYear(),
                month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                day: new Date().getDate()
            },

        };

    function addJSIndent (file, t) {
        var addIndent = '        ';
        var filename = file.path.split('src/js/')[1];
        if (filename === 'wrap-start.js' || filename === 'wrap-end.js') {
            addIndent = '';
        }
        var add4spaces = ('f7-intro.js f7-outro.js proto-device.js proto-plugins.js proto-support.js dom7-intro.js dom7-outro.js template7.js swiper.js').split(' ');
        if (add4spaces.indexOf(filename) >= 0) {
            addIndent = '    ';
        }
        var add8spaces = ('dom7-methods.js dom7-ajax.js dom7-utils.js').split(' ');
        if (add8spaces.indexOf(filename) >= 0) {
            addIndent = '        ';
        }
        if (addIndent !== '') {
            var fileLines = fs.readFileSync(file.path).toString().split('\n');
            var newFileContents = '';
            for (var i = 0; i < fileLines.length; i++) {
                newFileContents += addIndent + fileLines[i] + (i === fileLines.length ? '' : '\n');
            }
            file.contents = new Buffer(newFileContents);
        }
    }
    /* ==================================================================
    Build Framework7
    ================================================================== */
    // Build Styles and Scripts
    gulp.task('scripts', function (cb) {
        gulp.src(f7.jsFiles)
            .pipe(tap(function (file, t){
                addJSIndent (file, t);
            }))
            .pipe(sourcemaps.init())
            .pipe(concat(f7.filename + '.js'))
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.build.scripts))
            .pipe(connect.reload())
            .on('end', function () {
                cb();
            });

    });
    gulp.task('styles-ios', function (cb) {
        var cbs = 0;
        ['framework7.ios.less', 'framework7.ios.rtl.less', 'framework7.ios.colors.less'].forEach(function(lessFilePath, b){
            lessFilePath = paths.source.styles.ios + lessFilePath;
            gulp.src([lessFilePath])
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(gulp.dest(paths.build.styles))
                .pipe(connect.reload())
                .on('end', function () {
                    cbs ++;
                    if (cbs === 3) cb();
                });
        });
    });
    gulp.task('styles-material', function (cb) {
        var cbs = 0;
        ['framework7.material.less', 'framework7.material.rtl.less', 'framework7.material.colors.less'].forEach(function(lessFilePath, b){
            lessFilePath = paths.source.styles.material + lessFilePath;
            gulp.src([lessFilePath])
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(gulp.dest(paths.build.styles))
                .pipe(connect.reload())
                .on('end', function () {
                    cbs ++;
                    if (cbs === 3) cb();
                });
        });

    });

    gulp.task('build-js-core', function () {
      return gulp.src(['app/js/model/**/*.js', 'app/js/controller/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle-core.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/build'))
        .pipe(connect.reload());
    });

    gulp.task('build-js', function () {
      return gulp.src(['app/js/main.js', 'app/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle-view.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/build'))
        .pipe(connect.reload());
    });


    gulp.task('build-css', function () {
      return gulp.src(['app/css/**/*.css'])
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('app/build'))
        .pipe(connect.reload());
    });

    gulp.task('build-test', function () {
      return gulp.src(['app/test/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('tests.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/build'))
        .pipe(connect.reload());
    });

    gulp.task('build', ['scripts', 'styles-ios', 'styles-material', 'build-js-core', 'build-js', 'build-css', 'build-test'], function (cb) {
        cb();
    });


    /* =================================
    Watch
    ================================= */
    gulp.task('watch', function () {
        gulp.watch(paths.source.scripts, [ 'scripts' ]);
        gulp.watch(paths.source.styles.ios + '*.less', [ 'styles-ios' ]);
        gulp.watch(paths.source.styles.material + '*.less', [ 'styles-material' ]);

        gulp.watch('app/js/**/*.js', [ 'build-js-core', 'build-js' ]);
        gulp.watch('app/css/**/*.css', [ 'build-css' ]);
    });
    gulp.task('watch-test', function () {
        gulp.watch('app/js/**/*.js', [ 'build-js-core', 'build-js' ]);
        gulp.watch('app/test/**/*.js', ['build-test' ]);
    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ paths.root ],
            livereload: true,
            port:'3000'
        });
    });

    gulp.task('open', function () {
        return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/index.html'}));
    });

    gulp.task('open-test', function () {
        return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/app/test/index.html'}));
    });

    gulp.task('test', function () {
      return gulp.src('./app/test/index.html').pipe(qunit());
    });

    gulp.task('server', [ 'build-js', 'build-js-core', 'build-css', 'watch', 'connect', 'open' ]);

    gulp.task('default', [ 'server' ]);

    gulp.task('test-web', ['build-test', 'build-js-core', 'watch-test', 'connect', 'open-test']);
})();
