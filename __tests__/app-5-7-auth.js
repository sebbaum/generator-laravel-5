'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-laravel-5:app', () => {
  beforeEach(done => {
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appname: 'testapp',
        version: '5.7.*',
        proxy: 'localhost',
        schema: 'http',
        preset: 'none',
        enableAuth: true
      })
      .on('end', done);
  }, 1200000);

  it('creates files', done => {
    assert.file(['webpack.mix.js', 'package.json', '.gitignore']);
    done();
  });

  it('composer.json contains laravel packages and script', done => {
    assert.fileContent('composer.json', 'doctrine/dbal');
    assert.fileContent('composer.json', 'barryvdh/laravel-ide-helper');
    assert.fileContent('composer.json', 'barryvdh/laravel-debugbar');
    assert.fileContent('composer.json', 'barryvdh/laravel-cors');
    assert.fileContent('composer.json', 'phpmetrics/phpmetrics');
    assert.fileContent('composer.json', 'beyondcode/laravel-self-diagnosis');
    assert.jsonFileContent('composer.json', {
      scripts: {
        analyze: ['phpmetrics --report-html=phpmetrics ./app']
      }
    });

    done();
  });

  it('creates laravel auth layer files', done => {
    assert.file([
      'app/Http/Controllers/HomeController.php',
      'resources/views/auth/passwords/email.blade.php',
      'resources/views/auth/passwords/reset.blade.php',
      'resources/views/auth/login.blade.php',
      'resources/views/auth/register.blade.php',
      'resources/views/auth/verify.blade.php',
      'resources/views/home.blade.php',
      'resources/views/layouts/app.blade.php'
    ]);

    done();
  });
});
