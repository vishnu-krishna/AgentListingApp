module.exports = function (config) {
	var gulpConfig = require('./gulp.config')();
	config.set({
		plugins: ['karma-mocha', 'karma-phantomjs-launcher', 'karma-mocha-reporter', 'karma-coverage'],
		browsers: ['PhantomJS'],
		frameworks: ['mocha'],
		preprocessors: {
			[gulpConfig.client + '**/!(*.spec)+(.js)']: ['coverage']
		},
		coverageReporter: {
			includeAllSources: true,
			reporters: [{
				type: 'html',
				dir: 'test/coverage',
				subdir: '.'
			}, {
				type: 'text',
			}]
		},
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/chai/chai.js',
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular-animate/angular-animate.js',
			"app/**/*.js",
			"test/*.js"
		]
	});
};