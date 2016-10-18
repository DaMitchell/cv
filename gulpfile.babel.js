'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gulpDefineModule from 'gulp-define-module';
import browserSync from 'browser-sync';
import del from 'del';
import fileset from 'fileset';
import merge from 'merge-stream';
import Handlebars from 'handlebars';

const deploy = require('gulp-gh-pages');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const PORT = 9000;
const TEST_PORT = PORT + 1;

gulp.task('styles', () => {
    return gulp.src('app/styles/main.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    var scripts = gulp.src('app/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            moduleIds: true,
            plugins: ['transform-es2015-modules-amd']
        }));

    var templates = gulp.src('app/scripts/**/*.hbs')
        .pipe($.plumber())
        .pipe($.handlebars({
            handlebars: Handlebars
        }))
        .pipe(gulpDefineModule('amd', {
            require: {
                Handlebars: 'handlebars.runtime'
            },
            name: (filePath) => {
                return filePath.split(process.cwd() + '/app/scripts/')[1].replace('.js', '')
            }
        }));

    return merge(scripts, templates)
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts:test', () => {
    return gulp.src('test/spec/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            moduleIds: true,
            moduleRoot: 'spec',
            plugins: ['transform-es2015-modules-amd']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/test/spec'))
        .pipe(reload({stream: true}));
});

//gulp.task('html', () => $.util.log('Fill in html task'));
gulp.task('html', ['scripts', 'styles'], function() {
    //var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

    return gulp.src('app/*.html')
        .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
        .pipe($.if('*.js', $.uglify()))
        .on('error', function(err) {
            console.log(err);
        })
        .pipe($.if('*.css', $.csso()))
        //.pipe(assets.restore())
        //.pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('html:test', () => {
    var specs = fileset.sync('test/spec/**/*.js').map((file) => {
        return {
            src: file.replace('test/', ''),
            spec: file.replace('test/', '').replace('.js', '')
        }
    });

    return gulp.src('test/**/*.mustache')
        .pipe($.plumber())
        .pipe($.mustache({
            specs: specs
        }, {
            extension: '.html'
        }))
        .pipe(gulp.dest('.tmp/test'))
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['styles', 'scripts'], () => {
    browserSync({
        notify: false,
        port: PORT,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components',
                '/polyfills': 'polyfills'
            }
        }
    });

    gulp.watch([
        'app/*.html',
        '.tmp/scripts/**/*.js'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('serve:test', ['html:test', 'scripts', 'scripts:test'], () => {
    browserSync({
        notify: false,
        port: TEST_PORT,
        server: {
            baseDir: ['.tmp/test', 'test'],
            routes: {
                '/scripts': '.tmp/scripts',
                '/bower_components': 'bower_components',
                '/polyfills': 'polyfills'
            }
        }
    });

    gulp.watch([
        '.tmp/scripts/**/*.js',
        '.tmp/test/**/*.html',
        '.tmp/test/spec/**/*.js'
    ]).on('change', reload);

    gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.hbs'], ['scripts']);
    gulp.watch('test/**/*.mustache', ['html:test']);
    gulp.watch('test/spec/**/*.js', ['scripts:test']);
});

gulp.task('extras', () => {
    var other = gulp.src([
        'app/*.*',
        '!app/*.html'
    ]).pipe(gulp.dest('dist'));

    var data = gulp.src([
        'app/data/*.*'
    ]).pipe(gulp.dest('dist/data'));

    return merge(other, data);
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['html', 'extras'], () => {
    $.util.log('Building', typeof gulp.start)
});

gulp.task('deploy', ['build'], function () {
    return gulp.src("./dist/**/*")
        .pipe(deploy())
});

gulp.task('default', () => gulp.start('build', 'test'));
