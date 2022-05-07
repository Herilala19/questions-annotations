const gulp = require('gulp');
const eslint = require('gulp-eslint');

// eslint-disable-next-line arrow-body-style
gulp.task('lint', () => {
  return gulp.src([
    '**/*.js',
    '!node_modules/**'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-commit', [
  'lint'
]);
