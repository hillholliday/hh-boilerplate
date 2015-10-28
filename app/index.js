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
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDesc = props.projectDesc;
    cb();
  }.bind(this));
};

BoilerplateGenerator.prototype.app = function app() {
  this.copy('_package.json', 'package.json');
  this.copy('_config.rb', 'config.rb');
  this.copy('_gruntfile.js', 'gruntfile.js');
  this.directory('build','build');
  this.directory('html','html');
  this.template('_README.md', 'README.md');
  this.template('_index.html', 'html/index.html');
};

BoilerplateGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};