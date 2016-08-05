import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'sprites',
		'styles'
		// 'icons',
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'styles:dependencies',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	gulp.start(
		'styles:dependencies',
		'templates',
		'scripts',
		'copy'
	)
));
