module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      uglify: {
        dev: {
          options: {
            beautify: true,
            mangle: false
          },
          files: {
            "html/js/main.js": "build/js/main.js"
          },
        },
        prod: {
          options: {
            beautify: true,
            banner: '/*! last updated <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            mangle: {
              except:['jQuery'],
            }
          },
          files: {
            "html/js/main.js": "build/js/main.js"
          },
        },
      },

      htmlmin: {                                     // Task
        dev: {                                       // Another target
          files: {
            'html/index.html': 'build/index.html',
          },
        },
        prod: {                                      // Target
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true
          },
          files: {                                   // Dictionary of files
            'html/index.hml': 'build/index.html',
          },
        },
      },

      // image optimazations
      imagemin: {                          // Task
        dev: {                         // Another target
          options: {                       // Target options
            optimizationLevel: 1,
            pngquant: true
          },
          files: [{
            expand: true,                  // Enable dynamic expansion
            cwd: 'build/img',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'html/img/'                  // Destination path prefix
          }]
        }
      },

      jshint: {
        files: ['build/js/*.js'],
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
        dev: {                     // Target
            files: [{               // Dictionary of files
                expand: true,       // Enable dynamic expansion.
                cwd: 'build/svg',     // Src matches are relative to this path.
                src: ['**/*.svg'],  // Actual pattern(s) to match.
                dest: 'html/svg/',       // Destination path prefix.
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
            'html/stylesheets/screen.css': ['stylesheets/*.css']
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
      copy: {
        main:{
          files:[
            {
              expand: true,
              flatten: true,
              src: ['build/js/**'],
              dest: 'html/js/',
              filter:'isFile'},
          ],
        },
      },

      modernizr: {
        dist:{
          "dest": "html/js/modernizr.js",
          "minify": true,
          "options": [
            "setClasses"
          ],
          "feature-detects": [
            "test/audio",
            "test/canvas",
            "test/emoji",
            "test/fullscreen-api",
            "test/geolocation",
            "test/hashchange",
            "test/input",
            "test/json",
            "test/notification",
            "test/svg",
            "test/touchevents",
            "test/vibration",
            "test/video",
            "test/web-intents",
            "test/webanimations",
            "test/webgl",
            "test/a/download",
            "test/audio/preload",
            "test/battery/lowbattery",
            "test/css/animations",
            "test/css/appearance",
            "test/css/backgroundcliptext",
            "test/css/backgroundrepeat",
            "test/css/backgroundsize",
            "test/css/backgroundsizecover",
            "test/css/borderradius",
            "test/css/boxshadow",
            "test/css/boxsizing",
            "test/css/calc",
            "test/css/flexbox",
            "test/css/gradients",
            "test/css/lastchild",
            "test/css/mediaqueries",
            "test/css/multiplebgs",
            "test/css/opacity",
            "test/css/pointerevents",
            "test/css/rgba",
            "test/css/scrollbars",
            "test/css/transforms",
            "test/css/transitions",
            "test/css/userselect",
            "test/css/vhunit",
            "test/css/vwunit",
            "test/elem/time",
            "test/event/deviceorientation-motion",
            "test/file/api",
            "test/file/filesystem",
            "test/forms/fileinput",
            "test/forms/validation",
            "test/img/sizes",
            "test/img/srcset",
            "test/storage/localstorage",
            "test/storage/sessionstorage",
            "test/svg/asimg",
            "test/svg/clippaths",
            "test/svg/filters",
            "test/svg/inline",
            "test/url/data-uri"
          ]
        }
      },

      watch: {
        options: {
          livereload: true,
        },
        html:{
          files: ['html/**/*.html','craft/**/*.html'],
          tasks: ['build'],
        },
        js:{
          files: ['build/**/*.js'],
          tasks: ['jshint','copy'],
        },
        sass:{
          options:{
            livereload: false,
          },
          files: ['build/sass/**/*.scss'],
          tasks: ['compass'],
        },
        img:{
          files: ['build/img/**/*.img'],
          tasks: ['images'],
        },
        css:{
          files: ['html/stylesheets/**/*.css'],
          tasks:[],
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('images', [], function () {
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.task.run('newer:imagemin','newer:svgmin');
  });

  // Default tasks
  grunt.registerTask('build', ['images','compass','jshint','uglify:dev']);
  grunt.registerTask('prod', ['imagemin','svgmin','compass','cssmin','uglify:prod','htmlmin:prod','modernzir:dist']);


  // Custom tasks
  grunt.registerTask("img", ['imagemin','svgmin']);

  //watchs
  grunt.registerTask('watchSetBuild', ['watch:set1','watch:set2']);


  // run grunt watch to run build every time a file changes
  // grunt.event.on('watch', function(action, filepath) {
  //   grunt.log.writeln(filepath + ' has ' + action);
  // });

};
