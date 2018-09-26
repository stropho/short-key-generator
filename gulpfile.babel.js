import gulp from 'gulp';
import sourceMaps from 'gulp-sourcemaps';
import run from 'gulp-run-command';
import babel from 'gulp-babel';
import path from 'path';
import del from 'del';
import fs from 'fs';
import concat from 'gulp-concat';
import gulpJsdoc2md from 'gulp-jsdoc-to-markdown';

const paths = {
  es6Path: './src/**/*.*',
  es6: [ './src/**/*.js', '!./src/**/*.json' ],
  es5: './dist',
  docs: './jsdoc2md',

  unitTest: './test/unit/**/*.spec.js',
  integrationTest: './test/integration/**/*.spec.js',
  // Must be absolute or relative to source map
  sourceRoot: path.join( __dirname, 'src' )
};

gulp.task( 'clean:dist', () => {
  return del( [
    './dist/**/*'
  ] );
} );

gulp.task( 'build', [ 'clean:dist', 'copy:nonJs' ], () => {
  return gulp.src( paths.es6 )
    .pipe( sourceMaps.init() )
    .pipe( babel( {
      presets: [ 'env' ]
    } ) )
    .pipe( sourceMaps.write( '.', { sourceRoot: paths.sourceRoot } ) )
    .pipe( gulp.dest( paths.es5 ) );
} );

// Copy all the non JavaScript files to the ./dist folder
gulp.task( 'copy:nonJs', () => {

  return gulp.src( [ paths.es6Path, '!' + paths.es6 ] )
    .pipe( gulp.dest( paths.es5 ) )

} );

gulp.task( 'watch', [ 'build' ], () => {
  gulp.watch( paths.es6, [ 'build' ] );
} );

gulp.task( 'test:unit',
  run(`mocha '${paths.unitTest}' --require './test/mocha.conf.js'`,
    {ignoreErrors: true}
  )
);

gulp.task( 'test:integration',
  run(`mocha '${paths.integrationTest}' --require './test/mocha.conf.js'`,
    {ignoreErrors: true}
  )
);

gulp.task( 'test:unit:watch', () => {
  gulp.watch( [paths.unitTest, paths.es6], [ 'test:unit' ] );
} );

gulp.task('docs', () => {
  return gulp.src(paths.es6)
    .pipe(concat('README.md'))
    .pipe(gulpJsdoc2md({
      template: fs.readFileSync(`${paths.docs}/README.hbs`, 'utf8'),
      partial: [
        `${paths.docs}/contribute.hbs`,
        `${paths.docs}/badges.hbs`,
        `${paths.docs}/intro.hbs`
      ]
    }))
    .on('error', (err) => {
      console.log('jsdoc2md failed:', err.message)
    })
    .pipe(gulp.dest('./'))
});

gulp.task( 'default', [ 'watch' ] );
