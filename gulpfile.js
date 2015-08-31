'use strict';

/**
 * Tasks that will zip all the files so that the zip file can be deployed to 
 * AWS Lambda.
 * 
 * @author Ændrew Rininsland      <aendrew@aendrew.com>
 * @since  30 Aug. 2015
 */

// module dependencies
var gulp = require('gulp'),
    zip = require('gulp-zip'),
    decamelize = require('decamelize');

var pkg = require('./package.json');

/**
 * Creates a zip file
 */
gulp.task('zip', function() {
    var name = decamelize(pkg.name);
    
    // Ignore all the dev dependencies and the bin folder
    var ignoreModules = Object.keys(pkg.devDependencies);
    ignoreModules.push('.bin');
    
    // Map the array to a list of globbing patterns
    var ignore = ignoreModules.map(function(dep) {
        return '!node_modules/{' + dep + ',' + dep + '/**}';
    });
    
    // Zip the code
    return gulp.src(['./**', '!README.md', '!.gitignore', '!gulpfile.js', '!./{dist,dist/**}', '!./{test,test/**}'].concat(ignore), {base: '.'})
        .pipe(zip(name + '.zip'))
        .pipe(gulp.dest('dist'));
});