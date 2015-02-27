module.exports = function(grunt) {
	'use strict';

	require('matchdep')
		.filterDev('grunt-*')
		.forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		jsSource: 'src/*.js',
		jsDist: 'dist/',
		banner: 
			'/**\n' +
			' * jquery.lookingfor — fast search as you type\n' +
			' * @author Alexander Burtsev, http://burtsev.me, 2014—<%= grunt.template.today("yyyy") %>\n' +
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

		copy: {
			options: {
				process: function (content, srcpath) {
					return grunt.config.get('banner') + content;
				}
			},
			source: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**'],
					dest: 'dist/'
				}]
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				sourceMap: true
			},
			lookingfor: {
				files: {
					'<%= jsDist %>jquery.lookingfor.min.js': ['<%= jsSource %>']
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

	grunt.registerTask('default', ['jshint', 'jscs', 'copy', 'uglify', 'watch']);
};
