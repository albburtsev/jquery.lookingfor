module.exports = function(grunt) {
	'use strict';

	require('matchdep')
		.filterDev('grunt-*')
		.forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		jsSource: 'jquery.lookingfor.js',
		banner: 
			'/**\n' +
			' * jquery.lookingfor\n' +
			' * @author Alexander Burtsev, http://burtsev.me, <%= grunt.template.today("yyyy") %>\n' +
			' * @license MIT\n' +
			' */\n',

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			app: ['<%= jsSource %>']
		},

		jscs: {
			options: {
				config: '.jscs.json'
			},
			app: ['<%= jsSource %>']
		},

		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			lookingfor: {
				files: {
					'jquery.lookingfor.min.js': ['<%= jsSource %>']
				}
			}
		},

		watch: {
			lookingfor: {
				files: ['<%= jsSource %>'],
				tasks: ['jshint', 'jscs', 'uglify']
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'jscs', 'uglify', 'watch']);
};
