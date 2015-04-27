module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                    'js/*.js',
                    '!js/sminutoli*.js'
                ],
                dest: 'js/sminutoli-production.js',
            },
            vendor: {
                src: [
                    'js/vendor/*.js'
                ],
                dest: 'js/sminutoli-vendor.js',  
            }
        },

        uglify: {
            build: {
                src: 'js/sminutoli-production.js',
                dest: 'js/sminutoli-production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img-src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js', '!js/sminutoli-production.js', '!js/sminutoli-production.min.js'],
                tasks: ['concat:dist', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
        'concat:dist',
        'concat:vendor',
        'uglify',
        'imagemin',
        'watch:scripts'
    ]);

};