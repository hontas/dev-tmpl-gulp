var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = require('./dependencies');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function log(progress) {
		if (answers.verbose && progress) {
			progress.replace(/\n|\r/g, '');
			console.log(chalk.gray(progress));
		}
	}

	function installBowerPackages() {
		console.log(chalk.green('Installing'), 'bower packages', chalk.gray(dependencies.bower.join(' ')));
		cmd('bower', ['install'].concat(dependencies.bower, '--save'))
			.then(done, deferred.reject, log);
	}

	function done() {
		deferred.resolve(answers);
	}

	console.log(chalk.green('Installing'), 'npm packages', chalk.gray(dependencies.npm.join(' ')));
	cmd('sudo', ['npm', 'install'].concat(dependencies.npm, '--save-dev'))
		.then(installBowerPackages, deferred.reject, log);

	return deferred.promise;
};
