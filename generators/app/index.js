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
        name: 'version',
        message: 'Which Laravel version do you want to use?',
        choices: ['5.7.*', '5.6.*', '5.5.*'],
        default: 0
      },
      {
        type: 'list',
        name: 'proxy',
        message: 'From where do you serve your application during development?',
        choices: ['php artisan serve (localhost:8080)', 'localhost'],
        default: 0
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
      this.answers.appname,
      this.answers.version
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
      'phpmetrics/phpmetrics',
      'beyondcode/laravel-self-diagnosis'
    ]);
  }

  composerScripts() {
    let data = fs.readFileSync('composer.json', 'utf8');
    console.log(data);
    let composer = JSON.parse(data);
    composer.scripts.analyze = ['phpmetrics --report-html=phpmetrics ./app'];

    fs.unlinkSync('composer.json');

    this.fs.write(
      this.destinationPath('composer.json'),
      JSON.stringify(composer, null, 2)
    );
  }

  removeFiles() {
    fs.unlinkSync('webpack.mix.js');
    fs.unlinkSync('package.json');
    fs.unlinkSync('.gitignore');
  }

  templates() {
    let schema = this.answers.schema || 'http';
    let proxyHost =
      this.answers.proxy === 'localhost' ? this.answers.proxy : 'localhost:8000';
    let proxy = schema + '://' + proxyHost;

    this.fs.copyTpl(
      this.templatePath('webpack.mix.ejs'),
      this.destinationPath('webpack.mix.js'),
      {
        version: this.answers.version,
        proxy: proxy
      }
    );

    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }

  preset() {
    this.spawnCommandSync('php', ['artisan', 'preset', this.answers.preset]);
  }

  install() {
    // Let packages = [];

    // this.npmInstall(packages, {
    //   'save-dev': true
    // });
    this.installDependencies({
      bower: false,
      yarn: false,
      npm: true
    });
  }

  end() {
    if (this.answers.preset !== 'none') {
      this.spawnCommandSync('npm', ['run', 'dev']);
    }

    this.spawnCommandSync('php', ['artisan', 'storage:link']);
    this.spawnCommandSync('php', ['artisan', 'self-diagnosis']);
  }
};
