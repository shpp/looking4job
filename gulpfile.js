var 
	gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	del = require('del'),
	inject = require('gulp-inject');

gulp.task('clean', function(){
	return del.sync('temp');
});

gulp.task('index1', function(){
	return gulp.src('index.html')
		.pipe(inject(gulp.src('build/l4j.css')), {read: false})
		.pipe(gulp.dest(''))
})

gulp.task('index2', function(){
	return gulp.src('index.html')
		.pipe(inject(gulp.src('build/l4j.min.css')), {read: false})
		.pipe(gulp.dest(''))
})

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

gulp.task('css', function(){
	return gulp.src('temp/*.css')
		.pipe(concat('l4j.css'))
		.pipe(gulp.dest('build/'))
		//.pipe(browserSync.reload({stream: true}))
})

gulp.task('css-libs', ['less'], function(){
	return gulp.src('temp/*.css')
		.pipe(cssnano())
		.pipe(concat('l4j.css'))
		//.pipe(rename({suffix: 'min'}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(['index1'])
})

gulp.task('serve', ['browser-sync', 'less'], function(){
	gulp.watch("styles/*.less", ['css-libs']);
	gulp.watch('*.html', browserSync.reload);
})

gulp.task('build2', ['less'], function(){
	return gulp.src('temp/*.css')
		.pipe(cssnano())
		.pipe(concat('l4j.css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/'))
		//.pipe(del.sync('temp'))
});

gulp.task('build',['build2','index2'], function(){
	return del.sync('temp');
})

gulp.task('serve2', ['browser-sync', 'less'], function(){
	gulp.watch("styles/*.less", ['css','less'], browserSync.reload);
	gulp.watch('*.html', browserSync.reload);
})

gulp.task('help', function(){
	console.log('Usage:');
	console.log('gulp serve - launch server and watch changes in less files');
	console.log("gulp build - convert all less files to l4.min.css file");
})