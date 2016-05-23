'use strict';

module.exports = function(grunt) {
  console.log(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    <% if (useES6) { %>
      babel: {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            "html/js/main.js" : "build/babel/script.js"
          }
        }
      },
    <% } %>
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
      <% if (useES6) { %>
      concat: {
        options: {
          seperator: ';',
        },
        dist: {
          // You must add files as you create them manually, (dynamic version in the works)
          src: ['node_modules/babel-polyfill/dist/polyfill.min.js','build/js/main.js'],
          dest: 'build/babel/script.js'
        }
      },
      <% } %>
      modernizr: {
        dist:{
          "dest": "html/js/modernizr.js",
          "minify": true,
          "outputFile": "html/js/vendor/modernizr.js",
          "crawl": false,
          "options": [
            "setClasses"
          ],
          "tests": [
             "audio",
            "canvas",
            "emoji",
            "fullscreen",
            "geolocation",
            "hashchange",
            "input",
            "json",
            "notification",
            "svg",
            "touchevents",
            "vibrate",
            "video",
            "getusermedia",
            "webintents",
            "animation",
            "webgl",
            "adownload",
            "audiopreload",
            "lowbattery",
            "cssanimations",
            "appearance",
            "backgroundcliptext",
            [
              "bgrepeatspace",
              "bgrepeatround"
            ],
            "backgroundsize",
            "bgsizecover",
            "borderradius",
            "boxshadow",
            "boxsizing",
            "csscalc",
            "flexbox",
            "cssgradients",
            "lastchild",
            "mediaqueries",
            "multiplebgs",
            "opacity",
            "csspointerevents",
            "rgba",
            "cssscrollbar",
            "csstransforms",
            "csstransitions",
            "userselect",
            "cssvhunit",
            "cssvwunit",
            "time",
            [
              "devicemotion",
              "deviceorientation"
            ],
            "filereader",
            "filesystem",
            "fileinput",
            "formvalidation",
            "sizes",
            "srcset",
            "localstorage",
            "sessionstorage",
            "svgasimg",
            "svgclippaths",
            "svgfilters",
            "inlinesvg",
            "datauri"
          ],
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
          <% if (useES6) { %>
          tasks: ['jshint','concat','babel'],
          <% } else { %>
          tasks: ['jshint','copy'],
          <% } %>
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
