const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sequence = require('run-sequence');
const del = require('del');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const size = require('gulp-size');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

const JS = ['src/**/*.js'];
const LIB = ['lib/src/**/*.js'];

const ERROR_MESSAGE = {
	errorHandler: notify.onError("Error: <%= error.message %>")
};

const UGLIFY_OPTIONS = {
    drop_debugger : true,
    mangle: true,
    compress: true
};

gulp.task('js', () => {
	const s = size({title: 'JS -> ', pretty: true});
	return gulp.src(JS)
		.pipe(plumber(ERROR_MESSAGE))
		.pipe(babel())
		.pipe(s)
		.pipe(plumber.stop())
		.pipe(gulp.dest('./build'))
		.pipe(notify({
			onLast: true,
			message: () => `JS - Total size ${s.prettySize}`
		}));
});

gulp.task('lib', () => {
	const s = size({title: 'Lib -> ', pretty: true});
	return gulp.src(LIB)
		.pipe(plumber(ERROR_MESSAGE))
		.pipe(babel())
		.pipe(s)
		.pipe(plumber.stop())
		.pipe(gulp.dest('./lib/dist'))
		.pipe(notify({
			onLast: true,
			message: () => `JS - Total size ${s.prettySize}`
		}));
});

gulp.task('watch', () => {
	gulp.watch(JS, ['js']);
	gulp.watch(LIB, ['lib']);
});

gulp.task('clean', () => {
	return del(['./build']);
});

gulp.task('connect', () => {
	connect.server({
		root: './',
		port: 9000,
		livereload: true
	});
});

gulp.task('default', (done) => {
	sequence('clean', ['js', 'lib', 'connect', 'watch'], done);
});
