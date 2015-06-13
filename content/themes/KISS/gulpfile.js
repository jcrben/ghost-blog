var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var streamqueue  = require('streamqueue');
var preprocess = require('gulp-preprocess');
var taskList = require('gulp-task-listing');
var rename = require('gulp-rename');

var paths = {
    scripts: ['assets/js/*.js'],
    css: ['assets/css/*.css']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['assets/build'], cb);
});

gulp.task('prod:minify-scripts', function() {
    // Minify and copy all JavaScript
    return streamqueue({objectMode: true},
        gulp.src('assets/js/prism.js'),
        gulp.src('assets/js/index.js'),
        gulp.src('assets/js/jquery.fitvids.js')
    )
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('assets/build'));
});

gulp.task('prod:minify-css', function() {
    return streamqueue({ objectMode: true },
        gulp.src('assets/css/normalize.css'),
        gulp.src('assets/css/boilerplate.css'),
        gulp.src('assets/css/main.css'),
        gulp.src('assets/css/prism.css')
    )
        .pipe(minifyCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('assets/build'));
});


gulp.task('dev:watch', function() {
    gulp.watch(paths.scripts);
    gulp.watch(paths.css);
});

gulp.task('process', function() {
    gulp.src('default.tmpl')
    .pipe(preprocess())
    .pipe(rename({extname: '.hbs'}))
    .pipe(gulp.dest('./'))

    // Add non-devDependencies here
    gulp.src('node_modules/prismjs/prism.js')
    .pipe(gulp.dest('assets/js'));
})

// The default task (called when you run `gulp` from cli)
gulp.task('dev', ['process', 'watch'])
gulp.task('prod', ['process', 'minify-scripts', 'minify-css'])
gulp.task('default', taskList.withFilters(/:/, 'default'));
