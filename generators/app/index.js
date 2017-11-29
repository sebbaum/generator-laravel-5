'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log("Let's create a new " + chalk.blue('Laravel 5') + ' application');

    let noApps = ['default', '.well-known'];
    let apps = fs.readdirSync('/var/www/');
    _.remove(apps, app => {
      return _.includes(noApps, app);
    });

    const questions = [
      {
        type: 'list',
        name: 'app',
        message: 'Choose your app directory.',
        choices: apps
      },
      {
        type: 'list',
        name: 'schema',
        message: 'Which schema do you want to use?',
        choices: ['http', 'https'],
        default: 'https'
      }
    ];

    return this.prompt(questions).then(answers => {
      // To access answers later use this.answers.someAnswer;
      this.answers = answers;
    });
  }

  setDestinationFolder() {
    this.destinationRoot(
      this.destinationPath(path.join('/var', 'www', this.answers.app))
    );
  }

  installLaravel() {
    this.spawnCommandSync('composer', [
      'create-project',
      '--prefer-dist',
      'laravel/laravel',
      'application'
    ]);
  }

  setApplicationFolder() {
    this.destinationRoot(
      this.destinationPath(path.join('/var', 'www', this.answers.app, 'application'))
    );
  }

  installLaravelPackages() {
    this.spawnCommandSync('composer', [
      'require',
      '--dev',
      'doctrine/dbal',
      'barryvdh/laravel-ide-helper',
      'barryvdh/laravel-debugbar'
    ]);
  }

  removeFiles() {
    fs.unlink('webpack.mix.js');
    fs.unlink('package.json');
  }

  templates() {
    let proxy = this.answers.schema + '://localhost';

    this.fs.copyTpl(
      this.templatePath('webpack.mix.js'),
      this.destinationPath('webpack.mix.js'),
      {
        proxy: proxy
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
  }

  install() {
    this.npmInstall(['browser-sync', 'browser-sync-webpack-plugin'], {
      'save-dev': true
    });
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
