'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ErskineplateGenerator = module.exports = function ErskineplateGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ErskineplateGenerator, yeoman.generators.Base);

ErskineplateGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What would you like to name this project?',
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

ErskineplateGenerator.prototype.app = function app() {
  this.copy('_package.json', 'package.json');
  this.copy('_config.rb', 'config.rb');
  this.copy('_gruntfile.js', 'gruntfile.js');
  this.directory('build','build');
  this.directory('html','html');
  this.template('_README.md', 'README.json');
};

ErskineplateGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
