(function() {
    'use strict';

    module.exports = function(grunt) {

        grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            jshint: {
                files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'ng-pinyin.js'],
                options: {
                    globals: {
                        console: true,
                        module: true,
                        angular: true
                    }
                }
            },

            karma: {
                unit: {
                    options: { configFile: 'karma.conf.js' }
                }
            },

            ngmin: {
                build: {
                    src: ['ng-pinyin.js'],
                    dest: 'ng-pinyin.min.js'
                }
            },

            watch: {

                test: {
                    files: ['<%= jshint.files %>'],
                    tasks: ['jshint', 'karma:unit']
                }
                
            },

            bump: {
                options: {
                    files: ['package.json', 'bower.json'],
                }
            }

        });

        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-ngmin');
        grunt.loadNpmTasks('grunt-bump');

        grunt.registerTask('test', ['watch:test']);
        grunt.registerTask('unittest', ['karma:unit:start']);
        grunt.registerTask('build', ['jshint', 'karma:unit', 'ngmin:build']);

    };

})();