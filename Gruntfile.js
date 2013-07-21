module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/**\n* <%= pkg.title %>.\n*\n* @author <%= pkg.author %>\n' +
                    '* @version <%= pkg.version %>\n' +
                    '* @license <%= pkg.licenses[0].title %>\n' +
                    '* @date <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '**/\n',
                compress: true
            },
            build: {
                src: 'jquery.loader.js',
                dest: 'min/jquery.loader.min.js'
            }
        },
        cssmin: {
            minify: {
                options: {
                    banner: '/**\n* <%= pkg.title %>.\n*\n* @author <%= pkg.author %>\n' +
                        '* @version <%= pkg.version %>\n' +
                        '* @license <%= pkg.licenses[0].title %>\n' +
                        '* @date <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '**/'
                },
                files: {
                    'min/jquery.loader.min.css': ['jquery.loader.css']
                }
            }
        },
        bumpup: {
            files:['package.json', 'bower.json', 'loader.jquery.json']
        },
        tagrelease:{

            file: 'package.json',
            prefix:''
        }
    });


    grunt.registerTask('updatePkg', function () {
        grunt.config.set('pkg', grunt.file.readJSON('package.json'));
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'uglify',
        'cssmin'
    ]);


    grunt.registerTask('release-minor', ['bumpup:minor','updatePkg','build','tagrelease']);
    // Default task(s).
    grunt.registerTask('default', ['build']);


};
