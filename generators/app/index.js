'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    this.log("Let's create a new " + chalk.blue('Laravel 5') + ' application');

    const questions = [
      {
        type: 'input',
        name: 'appname',
        message: "What's the name of your application?",
        default: 'application'
      },
      {
        type: 'list',
        name: 'proxy',
        message: 'From where you you serve your application during development?',
        choices: ['localhost:8000', 'localhost'],
        default: 1
      },
      {
        when: answers => {
          return answers.proxy === 'localhost';
        },
        type: 'list',
        name: 'schema',
        message: 'Which schema do you want to use?',
        choices: ['http', 'https'],
        default: 'https'
      },
      {
        type: 'list',
        name: 'preset',
        message: 'Which laravel frontend preset do you want to use?',
        choices: ['none', 'bootstrap', 'vue', 'react'],
        default: 'none'
      }
    ];

    return this.prompt(questions).then(answers => {
      // To access answers later use this.answers.someAnswer;
      this.answers = answers;
    });
  }

  installLaravel() {
    this.spawnCommandSync('composer', [
      'create-project',
      '--prefer-dist',
      'laravel/laravel',
      this.answers.appname
    ]);
  }

  setApplicationFolder() {
    this.destinationRoot(this.destinationPath(this.answers.appname));
  }

  installLaravelPackages() {
    this.spawnCommandSync('composer', [
      'require',
      '--dev',
      'doctrine/dbal',
      'barryvdh/laravel-ide-helper',
      'barryvdh/laravel-debugbar',
      'barryvdh/laravel-cors',
      'phpmetrics/phpmetrics'
    ]);
  }

  composerScripts() {
    let data = fs.readFileSync('composer.json', 'utf8');
    console.log(data);
    let composer = JSON.parse(data);
    composer.scripts.analyze = ['phpmetrics --report-html=phpmetrics ./app'];

    fs.unlink('composer.json');

    this.fs.write(
      this.destinationPath('composer.json'),
      JSON.stringify(composer, null, 2)
    );
  }

  removeFiles() {
    fs.unlink('webpack.mix.js');
    fs.unlink('package.json');
    fs.unlink('.gitignore');
  }

  templates() {
    let schema = this.answers.schema || 'http';
    let proxy = schema + '://' + this.answers.proxy;

    this.fs.copyTpl(
      this.templatePath('webpack.mix.js'),
      this.destinationPath('webpack.mix.js'),
      {
        proxy: proxy
      }
    );

    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }

  install() {
    this.spawnCommandSync('php', ['artisan', 'preset', this.answers.preset]);
    this.npmInstall(['browser-sync', 'browser-sync-webpack-plugin'], {
      'save-dev': true
    });
    this.installDependencies({
      bower: false,
      yarn: false
    });
  }

  end() {
    if (this.answers.preset !== 'none') {
      this.spawnCommandSync('npm', ['run', 'dev']);
    }
  }
};
