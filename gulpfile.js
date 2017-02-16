

var gulp = require('gulp');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var karma = require('karma').server;
var server = require('gulp-live-server');
var sass = require('gulp-sass');
var port = process.env.PORT || config.defaultPort;
var postcss = require('gulp-postcss');
var $ = require('gulp-load-plugins')({ lazy: true });
var del = require('del');
var protractor = require('gulp-protractor').protractor;

var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


//Run the Sass to CSS Conversion
// Add Clean Styles Task
gulp.task('styles', function () {
    log('Compiling Sass to CSS');
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 4 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(gulp.dest(config.temp));
});
//Sass Watcher
gulp.task('sass-watcher', function () {
    gulp.watch([config.sass], ['styles']);
});

gulp.task('views', function () { //Add Views to build
    log('Copying and compressing the images');

    return gulp
        .src(config.views)
        .pipe(gulp.dest(config.build + 'views'));
});
//Cleaning the Temp Directory
gulp.task('clean-styles', function (done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});


//Cleaning the Files
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

gulp.task('clean', function (done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});
// Injecting into HTML
gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});
//Injecting Custom CSS and JS
gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up the app css into the html, and call wiredep ');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});
//Optimizing
gulp.task('optimize', ['inject','views'], function () {
    log('Optimizing the javascript, css, html');
    var cssFilter = $.filter('**/*.css', { restore: true });
    var jsFilter = $.filter(['**/' + config.optimized.app, '**/' + config.optimized.lib], { restore: true });
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.useref({ searchPath: ['./bower_components', ''] }))
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(config.build));
});

gulp.task('serve-build', ['optimize'], function () {
    serve(false /* isDev */);
});

gulp.task('serve-dev', ['inject'], function () {
    serve(true /* isDev */);
});

///////////
function serve(isDev) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({ stream: false });
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

//BrowserSync Options
function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.sass], ['styles'])
        .on('change', function (event) { changeEvent(event); });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        browser: ['chrome'],
        files: [
            config.client + '**/*.*',
            '!' + config.sass,
            config.temp + '**/*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}
//log
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
// Run the browser test
gulp.task('test-browser', function (done) {
    /* run browser tests with karma */
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        reporters: ['mocha', 'coverage'],
    }, function () {
        done();
    });
});

// Run the test coverage
gulp.task('serve-coverage', ['test-browser'], function () {
    browserSync.init({
        notify: false,
        port: 7777,
        server: {
            baseDir: ['test/coverage'],
        }
    });

    gulp.watch([
        'app/*.html',
        'app/JS/**/*.js',
        'test/**/*.js'
    ], ['test-browser']).on('change', browserSync.reload);
});

// Run the test report
gulp.task('serve-test', function () {
    browserSync.init({
        notify: false,
        browser: ['chrome'],
        port: 8081,
        server: {
            baseDir: ["test", "app"],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    })

    gulp.watch(['app/**/*.*'])
        .on('change', browserSync.reload);
});
