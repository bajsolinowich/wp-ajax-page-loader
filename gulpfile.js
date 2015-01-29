// ==== WP AJAX Page Loader gulp file ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , merge       = require('merge-stream')
  , bower       = './bower_components/'
;

// Check the main script for errors
gulp.task('lint', function() {
  return gulp.src(['wp-ajax-page-loader.js'])
  .pipe(plugins.jshint('.jshintrc'))
  .pipe(plugins.jshint.reporter('default')); // No need to pipe this anywhere
});

// Create script bundles
gulp.task('bundle', ['lint'], function(){
  var bundles = [
    ['complete', [bower+'jquery/dist/jquery.js', bower+'html5-history-api/history.iegte8.js', bower+'spin.js/spin.js', bower+'spin.js/jquery.spin.js', 'wp-ajax-page-loader.js'] ],
    ['core', [bower+'html5-history-api/history.iegte8.js', bower+'spin.js/spin.js', bower+'spin.js/jquery.spin.js', 'wp-ajax-page-loader.js'] ]
  ];

  // Define the task for each bundle in the bundles array
  var tasks = bundles.map(function(bundle) {
    return gulp.src(bundle[1]) // bundle[1]: the list of source files
    .pipe(plugins.concat('wp-ajax-page-loader-'+bundle[0]+'.js')) // bundle[0]: name of the bundle
    .pipe(gulp.dest('.'));
  });

  // Cross the streams ;)
  return merge(tasks);
});

// Minify scripts in place
gulp.task('minify', ['bundle'], function(){
  return gulp.src(['wp-ajax-page-loader*.js', '!*.min.js'])
  .pipe(plugins.rename({ suffix: '.min' }))
  .pipe(plugins.uglify())
  .pipe(gulp.dest('.'));
});

// Engage!
gulp.task('default', ['minify']);
