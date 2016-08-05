import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
// import rupture from 'rupture';
// import stylint from 'gulp-stylint';
// import stylus from 'gulp-stylus';
// import importIfExist from 'stylus-import-if-exist';
// import autoprefixer from 'autoprefixer-stylus';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
// import jeet from 'jeet';
// import axis from 'axis';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import sassGlob from 'gulp-sass-glob';
import prefix from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/*.scss')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 2 versions' , 'IE 9', '> 1%']
		}))
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
));

gulp.task('styles:lint', () => (
	gulp.src(['app/**/*.scss', '!app/styles/scss'])
		.pipe(sassLint())
   		.pipe(sassLint.format())
    	.pipe(sassLint.failOnError())
));
