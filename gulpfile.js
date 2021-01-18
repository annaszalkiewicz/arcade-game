/* eslint-env node */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', defaultTask);

function defaultTask(done) {
	gulp.src('css/style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
		}))
		.pipe(gulp.dest('./css'));
	done();
}
