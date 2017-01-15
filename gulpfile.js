var 
	gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	del = require('del');

gulp.task('clean', function(){
	return del.sync('temp');
});

gulp.task('build', ['clean', 'css-libs'], function(){

});

gulp.task('less', function(){
	return gulp.src('styles/*.less')
		.pipe(less())
		.pipe(gulp.dest('temp'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: ''
		},
		notify: true
	})
})

gulp.task('css-libs', ['less'], function(){
	return gulp.src('temp/*.css')
		.pipe(cssnano())
		.pipe(concat('l4j.css'))
		//.pipe(rename({suffix: 'min'}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({stream: true}), ['clean'])
})

gulp.task('watch', ['browser-sync', 'less'], function(){
	gulp.watch("styles/*.less", ['css-libs']);
	gulp.watch('*.html', browserSync.reload);
})