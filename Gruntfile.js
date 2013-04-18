module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        dev: {
            options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            mangle: false,
            beautify: true
            },
            files: {
              'dev/js/plugins.js': ['src/js/plugins.js'],
              'dev/js/main.js': ['src/js/main.js']
            }
        },
        distro: {
            options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            mangle: true
            },
            files: {
              'distro/js/plugins.js': ['src/js/plugins.js'],
              'distro/js/main.js': ['src/js/main.js']
            }
        }
    },
    cssmin: {
        dev: {
            options: {
                keepSpecialComments: 1
            },
            src: 'src/css/main.css',
            dest: 'dev/css/main.css'
        },
        distro: {
            options: {
                keepSpecialComments: 1
            },
            src: 'src/css/main.css',
            dest: 'distro/css/main.css'
        }
    },
    htmllint: {
        all: ["src/index.html", "tests/index.html"]
    },
    copy: {
        dev: {
            files: [
                {expand: true, cwd: 'src', src: ['*'], dest: 'dev/', filter: 'isFile'},
                {expand: true, cwd: 'src/js', src: ['vendor/*'], dest: 'dev/js/vendor'},
                {expand: true, cwd: 'src/img', src: ['*/*'], dest: 'dev/img/'},
                {expand: true, cwd: 'src/img', src: ['*'], dest: 'dev/img/', filter: 'isFile'}
            ],
        },
        distro: {
            files: [
                {expand: true, cwd: 'src', src: ['*'], dest: 'distro/', filter: 'isFile'},
                {expand: true, cwd: 'src/js', src: ['vendor/*'], dest: 'distro/js/vendor'},
                {expand: true, cwd: 'src/img', src: ['*/*'], dest: 'distro/img/'},
                {expand: true, cwd: 'src/img', src: ['*'], dest: 'distro/img/', filter: 'isFile'}
            ]
        }
    },
    watch: {
      files: 'src/**/*',
      tasks: ['uglify:dev', 'cssmin:dev', 'copy:dev']
    }, 
    clean: {
      dev: {
        src: ['dev']
      },
      distro: {
        src: ['distro']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html');

  // Default task(s).
  grunt.registerTask('default', ['uglify:dev', 'cssmin:dev' ,'copy:dev']);
  grunt.registerTask('build', ['clean:distro', 'uglify:distro', 'cssmin:distro' ,'copy:distro']);

};