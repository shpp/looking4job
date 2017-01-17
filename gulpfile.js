var gulp = require('gulp-help')(require('gulp'));
var	browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

gulp.task('inject-css', 'Inject css file to the head section of index.html', function() {
	return gulp.src(config.index)
		.pipe($.inject(gulp.src(config.buildCss, {read: false}), {addRootSlash: false}))
		.pipe(gulp.dest(config.root));
});

gulp.task('inject-min-css', 'Inject min.css file to the head section of index.html', function() {
	return gulp.src(config.index)
		.pipe($.inject(gulp.src(config.buildMinCss, {read: false}), {addRootSlash: false}))
		.pipe(gulp.dest(config.root));
});

gulp.task('less', 'Convert less to css file and put it to the build folder', function() {
	return gulp.src(config.styles + '*.less')
		.pipe($.less())
		.pipe($.concat(config.name + '.css'))
		.pipe(gulp.dest(config.build));
		// .pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', 'Minify css', ['less'], function() {
	return gulp.src(config.buildCss)
		.pipe($.cssnano())
		.pipe($.concat(config.name + '.min.css'))
		.pipe(gulp.dest(config.build));
});

gulp.task('browser-sync', 'Browser-sync configuration', function() {
	browserSync({
		server: {
			baseDir: config.root
		},
		notify: true
	})
});

gulp.task('serve', 'Development build. Watch less files for changes.', ['browser-sync', 'less', 'inject-css'], function() {
	gulp.watch(config.styles + '*.less', ['less', browserSync.reload]);
}); 

gulp.task('build', 'Production build', ['less', 'minify-css']);