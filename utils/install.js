var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = require('./dependencies');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function log(str) {
		if (str) {
			console.log(chalk.gray(str));
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
	cmd('npm', ['install'].concat(dependencies.npm, '--save-dev'))
		.then(installBowerPackages, deferred.reject, log);

	return deferred.promise;
};
