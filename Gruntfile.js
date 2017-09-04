module.exports = function (grunt) {
  // Load some tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      app: {
        src: ['static/js/vendor/zepto.min.js',
              'static/js/vendor/zepto.touch.js',
              'static/js/vendor/fastclick.js',
              'static/js/app/*.js'],
        dest: 'static/js/compiled/app.js',
      },
    },

    less: {
      app: {
        files: {
          'static/css/compiled/app.css': 'static/css/app.less',
        },
      },
    },

    cssmin: {
      target: {
        files: {
          'static/css/compiled/compiled.css': [
            'static/css/bootstrap.css',
            'static/css/flat-ui.css',
            'static/css/compiled/app.css',
          ],
        },
      },
    },

    eslint: {
      target: ['Gruntfile.js', 'app.js', 'lib/**/*.js', 'test/**/*.js'],
    },

    watch: {
      scripts: {
        files: ['static/js/app/*.js', 'static/js/vendor/*.js'],
        tasks: ['uglify:app'],
      },
      stylesheets: {
        files: ['static/css/*.less'],
        tasks: ['less'],
      },
      serverscripts: {
        files: ['<%= eslint.target %>'],
        tasks: ['eslint'],
      },
    },
  });

  grunt.registerTask('develop', 'Start web server', function () {
    grunt.log.writeln('Starting web server on port 3000');
    require('./app.js').listen(3000);
  });
  grunt.registerTask('default', ['uglify', 'less', 'cssmin', 'eslint']);
  grunt.registerTask('server', ['uglify', 'less', 'cssmin', 'eslint', 'develop', 'watch']);
};
