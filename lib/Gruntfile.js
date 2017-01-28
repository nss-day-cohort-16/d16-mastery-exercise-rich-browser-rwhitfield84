module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
          src: ['../js/main.js'],
          dest: '../dist/app.js'
      },
      options: {
          transform: ['hbsfy'],
          browserifyOptions: {
          paths: [
            "./node_modules"
            ]
          }
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      },
      files: ['../js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/styles.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};