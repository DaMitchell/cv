'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import fileset from 'fileset';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

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
    return gulp.src('app/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            moduleIds: true,
            plugins: ['transform-es2015-modules-amd']
        }))
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts:test', () => {
    return gulp.src('test/spec/**/*.js')
        .pipe($.plumber())
        //.pipe($.sourcemaps.init())
        .pipe($.babel({
            moduleIds: true,
            plugins: ['transform-es2015-modules-amd']
        }))
        //.pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/test/spec'))
        .pipe(reload({stream: true}));
});

gulp.task('html', () => $.util.log('Fill in html task'));

gulp.task('html:test', () => {
    var specs = fileset.sync('test/spec/**/*.js').map((file) => {
        return {
            src: file.replace('test/', ''),
            spec: file.replace('test/spec/', '').replace('.js', '')
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
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/bower_components': 'bower_components'
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
        port: 9000,
        server: {
            baseDir: ['.tmp/test', 'test'],
            routes: {
                '/scripts': '.tmp/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        '.tmp/scripts/**/*.js',
        '.tmp/test/**/*.html',
        '.tmp/test/spec/**/*.js'
    ]).on('change', reload);

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('test/**/*.mustache', ['html:test']);
    gulp.watch('test/spec/**/*.js', ['scripts:test']);
});

gulp.task('extras', function() {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('build', ['html', 'styles', 'scripts', 'extras'], () => {
    $.util.log('Building', typeof gulp.start)
});

gulp.task('default', () => gulp.start('build', 'test'));
