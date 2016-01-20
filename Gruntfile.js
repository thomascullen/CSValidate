module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: 'src/csvalidate.js',
        tasks: ['babel'],
        options: {
          interrupt: true,
        },
      },
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2015']
      },
      dist: {
        files: {
          "dist/csvalidate.js": "src/csvalidate.js"
        }
      }
    }
  });

  grunt.registerTask('default', ['babel', 'watch']);
};
