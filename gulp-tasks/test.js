var gulp = require('gulp'),
	karma = require('karma').server,
	config = require('../config');

module.exports = function(cb) {
	karma.start({
		configFile: process.cwd() + '/karma.conf.js',
		singleRun: true
	}, cb);
};

module.exports.dependencies = [];
