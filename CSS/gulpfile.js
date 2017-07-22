'use strict'; 

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost'),
    precss = require('precss');

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
    //Prevents gulp from stop working after an error is detected, it just prints the error on the console
    .on('error', function(errorInfo){
			console.log(errorInfo.toString())
            this.emit('end');   
    })
    // sourcemaps help to identify which file a property belongs to when inspecting with e.g. Google Developers tools.    
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.task('default', ['styles']);

// prints on the console what file has been modified when save was hit.
var watcher = gulp.watch(paths.cssSource+'**/*.css', ['default']);

watcher.on('change', function(event) {
console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});



