'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BoilerplateGenerator = module.exports = function BoilerplateGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BoilerplateGenerator, yeoman.generators.Base);

BoilerplateGenerator.prototype.welcome = function welcome() {
      this.log(
        '\n' +
        '\n' +
        '    ____          _  __                    __        __       ' + '\n' +
        '   / __ ) ____   (_)/ /___   _____ ____   / /____ _ / /_ ___  ' + '\n' +
        '  / __  |/ __ \\ / // // _ \\ / ___// __ \\ / // __ `// __// _ \\ ' + '\n' +
        ' / /_/ // /_/ // // //  __// /   / /_/ // // /_/ // /_ /  __/ ' + '\n' +
        '/_____/ \\____//_//_/ \\___//_/   / .___//_/ \\__,_/ \\__/ \\___/  ' + '\n' +
        'for creating static sites using compass, scss, bourbon,       ' + '\n' +
        'jquery, grunt and html5 goodness.' +
        '\n' +
        '\n'
    );
};

BoilerplateGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to name this project?',
    },
    {
      name: 'projectDesc',
      message: 'What should the description be for this project?',
    },
    {
      name: 'useES6',
      message: 'Would you like to use ES6? (Y/n)',
    }
  ];

  this.prompt(prompts, function (props) {
    this.useES6 = false;
    this.projectName = props.projectName;
    this.projectDesc = props.projectDesc;
    // Catch if people use lower or upper case Y
    if (props.useES6 === "Y" || props.useES6 === "y") {
      this.useES6 = true;
    }
    cb();
  }.bind(this));
};

BoilerplateGenerator.prototype.app = function app() {
  this.copy('_config.rb', 'config.rb');
  this.directory('build','build');
  this.directory('html','html');
  this.template('_README.md', 'README.md');
  this.template('_index.html', 'html/index.html');

  // Templating Gruntfile in order to add or remove ES6 related tasks
  this.template('_gruntfile.js', 'gruntfile.js');
  this.template('_package.json', 'package.json');
};

BoilerplateGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  if (this.useES6) {
    this.copy('babelrc', '.babelrc');
  }
};
