module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      // uglify: {
      //   options: {
      //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      //   },
      //   build: {
      //     src: 'js/<%= pkg.name %>.js',
      //     dest: 'build/<%= pkg.name %>.min.js'
      //   }
      // }

      uglify: {
          options: {
            beautify: true,
            mangle: false
          },
          my_target: {
            files: {
              'img/main.js': ['js/vendor/**/*.js', 'js/main.js']
            }
          }

      },

      // image optimazations
      imagemin: {                          // Task
        dynamic: {                         // Another target
          options: {                       // Target options
            optimizationLevel: 1,
            pngquant: true
          },
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'src-img/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'img/'                  // Destination path prefix
          }]
        }
      },

      jshint: {
        files: ['js/*.js'],
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        }
      },

      svgmin: {                       // Task
        options: {                  // Configuration that will be passed directly to SVGO
            plugins: [{
                removeViewBox: false
            }]
        },
        dist: {                     // Target
            files: [{               // Dictionary of files
                expand: true,       // Enable dynamic expansion.
                cwd: 'src-img/',     // Src matches are relative to this path.
                src: ['**/*.svg'],  // Actual pattern(s) to match.
                dest: 'img/',       // Destination path prefix.
                ext: '.svg'     // Dest filepaths will have this extension.
                // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
            }]
          }
      },

      cssmin: {
        add_banner: {
          options: {
            banner: '/* updated <%= grunt.template.today("yyyy-mm-dd") %> */'
          },
          files: {
            'stylesheets/screen.css': ['stylesheets/*.css']
          }
        }
      },

      compass: {                  // Task
        default: {                    // Another target
          options: {
            config: 'config.rb'
          }
        }
      },

      validation: {
        options: {
                reset: grunt.option('reset') || false,
                stoponerror: false,
                relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta."]
        },
        files: {
                src: ['**/*.html','! node_modules/**/*.html']
        }
      },

      watch: {
            src: {
              files: ['js/*.js', 'sass/*.scss', 'src-img/**/*.jpg','src-img/**/*.jpg','src-img/**/*.gif','src-img/**/*.svg','**/*.html'],
              tasks: ['build'],
              options: {
                livereload : true,
                spawn: false
              },
            },
        }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-svgmin');

  // Default tasks
  grunt.registerTask('build', ['imagemin','svgmin','jshint','compass']);
  grunt.registerTask('prod', ['imagemin','svgmin','cssmin']);

  // Custom tasks
  grunt.registerTask("validate", ['validation']);


  // run grunt watch to run build every time a file changes
  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};
