'use strict'; 

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost'),
    precss = require('precss'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(); 

// Declare paths to be used
var paths = {
  cssSource: 'assets/temp-styles/',
  cssDestination: 'assets/css/'
};

gulp.task('styles', function() {
// We can specify style.css if files will be imported to consolidate them using this file, otherwise use /**/*.css
  return gulp.src(paths.cssSource + 'style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      precss(),
      autoprefixer()
    ]))
    .on('error', function(errorInfo){
			console.log(errorInfo.toString())
            this.emit('end');   
    }) 
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe(browserSync.stream());
});

// Usar Browser-sync para poder ver el sitio en dispositivos moviles, y en otros browers.
gulp.task('iniciar', function() {
    browserSync.init({
        proxy: "localhost/wordpress"
    });
    gulp.watch(paths.cssSource + '**/*.css', ['styles']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['iniciar']);