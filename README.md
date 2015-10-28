#Generator Boilerplate

Simple boilerplate to uphold best practices within the HHCC Dept of Innovation and Technology.

Uses the latest builds of compass, bourbon, scss, jquery, modernizr, and grunt to optimizie workflow and create web apps quickly.

## Installation
1. Clone this repo, keep it in your root Sites/ folder
2. Within this directory, run `$ npm install --global generator-boilerplate`
3. Create a new directory and cd into it `$ mkdir my-new-webapp && cd my-new-webapp`
4. Run the installer! `$ yo boilerplate`
5. Run through the prompts, be sure to give a succinct title and a brief description
	- This will be used within the readme, and index.html file as the `<title>` and `<description>` respectively


## Building
1. Only edit assets (scss, img, and js) within the build directory
2. `$ npm install grunt` - if you haven't already
3. `$ npm install` - will loop through package.json and install all depencies
4. `$ grunt watch` - this will run through tasks within the gruntfile whenever a change is made
	- for example if a js file is modified, jslint (for errors) and copy (moved to html/ on successful lint) will be run
 