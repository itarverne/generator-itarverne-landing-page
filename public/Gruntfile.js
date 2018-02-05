'use strict';

module.exports = function (grunt) {

  // Time how long tasks take
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    // Static mapping, unabled to resolve automaticly
    i18n: 'grunt-i18n-static'
  });

  // Configurable paths
  let config = {
    app: '.',
    dist: 'dist',
    tmp: 'tmp',
    build: 'build',
    nameApp: 'ITArverne',
    banner : '/*! Generated by <%= pkg.author %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* <%= pkg.homepage %>\n' +
            '* Copyright (c) <%= pkg.license %> <%= grunt.template.today("yyyy") %> ' +
            '<%= pkg.author %>*/\n'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Load properties from npm package
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      babel: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['babel:tmp']
      },
      babelJsx: {
        files: ['<%= config.app %>/scripts/{,*/}*.jsx'],
        tasks: ['babel:jsx', 'browserify']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['clean:buildCss', 'sass', 'postcss', 'cssmin', 'includeSource']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      }
    },

    // Reload the server to refressh browser on specific files changed
    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        },
        browser: 'chrome'
      },
      livereload: {
        options: {
          files: [
            '<%= config.app %>/{,*/}*.html',
            '<%= config.app %>/styles/{,*/}*.{css,scss,sass}',
            '<%= config.app %>/images/{,*/}*',
            '<%= config.app %>/scripts/{,*/}*.js',
            '<%= config.app %>/scripts/react/{,*/}*.jsx'
          ],
          port: 9000,
          server: {
            baseDir: [
              '<%= config.app %>', 
              '<%= config.build %>'
            ]
          }
        }
      }
    },

    // Empties folders to start clean
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '<%= config.tmp %>',
            '<%= config.build %>/*',
            '.sass-cache',
            '!<%= config.app %>/.git*'
          ]
        }]
      },
      buildCss: {
        files: [{
          dot: true,
          src: [
            '<%= config.build %>/styles'
          ]
        }]
      }
    },

    // Plugin to check mistakes in JS file
    eslint: {
      target: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js'
      ]
    },

    // Compiles to ES6 
    babel: {
      options: {
        sourceMap: true,
        plugins: ['transform-react-jsx'],
        presets: ['es2015', 'react']
      },
      tmp: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scripts',
          src: '{,*/}*.js',
          dest: '<%= config.tmp %>/scripts',
          ext: '.js'
        },{
          expand: true,
          cwd: 'node_modules/react-facebook/lib',
          src: 'index.js',
          dest: '<%= config.tmp %>/scripts',
          ext: '.js'
        },{
          expand: true,
          cwd: 'node_modules/react-facebook/src',
          src: 'index.js',
          dest: '<%= config.tmp %>/scripts',
          ext: '.js'
        }]
      },
      jsx: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scripts/react',
          src: ['*.jsx'],
          dest: '<%= config.tmp %>/scripts/react',
          ext: '.js'
        }]
      }
    },

    // Allow to permit require() front side
    browserify: {
      app: {
        options: {
          browserifyOptions: { debug: true },
          // the plugin babelify allow to use babel in order to consert ES5 to ES6
          transform: [['babelify', { 'presets': ['es2015'] }]]
        },
        files: {
          '<%= config.tmp %>/scripts/bundle-require.js': [         
            'node_modules/react-facebook/lib/Facebook.js',
            'node_modules/react-facebook/lib/FacebookProvider.js',
            'node_modules/react-facebook/lib/Like.js',
            '<%= config.tmp %>/scripts/react/main-react.js'
          ]
        }
      }
    },

    // Compiles Sass to CSS
    sass: {
      options: {
        loadPath: [
          'node_modules/foundation-sites/scss', 
          'node_modules/foundation-sites/scss/settings'
        ]
      },
      tmp: {
        files: {
          '<%= config.tmp %>/styles/scss.css': '<%= config.app %>/styles/main.scss'
        }
      }
    },

    // Transform the CSS with JS plugin
    postcss: {
      options: {
        map: true,
        processors: [
          // Vendor to add prefixed styles for browser compatibility
          require('autoprefixer')({
            browsers: [
              'last 2 versions', 
              'ie >= 9', 
              'and_chr >= 2.3'
            ]
          })
        ]
      },
      tmp: {
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= config.tmp %>/styles/'
        }]
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      build: {
        src: [
          '<%= config.build %>/scripts/{,*/}*.js',
          '<%= config.build %>/styles/{,*/}*.css'
          //'<%= config.dist %>/images/{,*/}*.*',
        ]
      }
    },

    // Reduce the size image for the web
    imagemin: {
      build: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.build %>/images'
        }]
      }
    },

    // Minify html page
    htmlmin: {
      build: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>',
          src: '{,*/}*.html',
          dest: '<%= config.build %>'
        }]
      }
    },

    // Minify CSS file
    cssmin: {
      build: {
        files: {
          '<%= config.build %>/styles/assets_css_<%= config.nameApp %>.min.css': [
            'node_modules/foundation-sites/dist/css/foundation.css', 
            '<%= config.tmp %>/styles/scss.css'
          ]
        }
      }
    },

    // Minify JS files
    uglify: {
      options: {
        banner: '<%= config.banner %>'
      },
      generated: {
        files: [{
          dest : '<%= config.build %>/scripts/<%= config.nameApp %>.min.js',
          //src : ['<%= concat.assets_js.dest %>', '<%= concat.basic.dest %>']
          src : [
            'node_modules/jquery/dist/jquery.js', 
            'node_modules/foundation-sites/dist/js/foundation.js',
            'node_modules/react/dist/react.js',
            'node_modules/react-dom/dist/react-dom.js',
            '<%= config.tmp %>/scripts/bundle-require.js',
            '<%= config.app %>/scripts/main.js'
          ]
        }]
      }
    },

    copy: {
      build: {
        expand: true,
        src: 'fonts/*',
        dest: '<%= config.build %>/'
      }
    },

    // Task to include files into index.html
    includeSource: {
      options: {
        baseUrl: '',
        ordering: 'top-down',
        templates: {
          html: {
            js: '<script src="{filePath}" async></script>'
          }
        }
      },
      tmp: {
        files: [{
          dest : '<%= config.tmp %>/index.html',
          src : ['<%= config.app %>/index.html']
        }]
      },
      app: {
        files: [{
          dest : '<%= config.app %>/index.html',
          src : ['<%= config.app %>/index.html']
        }]
      }
    },

    // Translate the application
    i18n: {
      dist: {
        options: {
          baseDir: '<%= config.app %>',
          outputDir: '.'
        }
      },
      options: {
        fileFormat: 'json',
        exclude: ['.sass-cache/', 'build', 'images', 'node_modules', 'scripts', 'styles', 'tmp', 'fr', 'en'],
        locales: ['fr', 'en'],
        locale: 'fr',
        localesPath: 'locales'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      app: [
        'babel',
        'sass',
        'imagemin',
        'babel:jsx',
        'i18n'
      ]
    }

  });

  // grunt serve
  grunt.registerTask('serve', 'Start the server and preview your app', function () {
    
    grunt.log.writeln( 'Launching the grunt build process'.cyan);
    //grunt.log.writeln( ('Server starting on port ' + grunt.config.get('browserSync.livereload.options.port')).cyan);

    grunt.task.run([
      'build',
      'browserSync:livereload',
      'watch'
    ]);
  });

  // grunt build
  grunt.registerTask('build', [
    'clean:build',
    'concurrent',
    'postcss',
    'browserify',
    'cssmin',
    'uglify',
    'filerev',
    'includeSource',
    'htmlmin',
    'copy'
  ]);

  // grunt
  grunt.registerTask('default', [
    'newer:eslint',
    'build'
  ]);
};
