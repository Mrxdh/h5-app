var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./styles'))
})

gulp.task('watch', function () {
    gulp.watch('./scss/*.scss', ['sass'])
})