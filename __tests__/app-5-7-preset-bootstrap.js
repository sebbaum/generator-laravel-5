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
        preset: 'bootstrap',
        enableAuth: false
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

  it('packages.json contains npm packages', done => {
    assert.fileContent('package.json', 'axios');
    assert.fileContent('package.json', 'bootstrap');
    assert.fileContent('package.json', 'bootstrap-sass');
    assert.fileContent('package.json', 'browser-sync');
    assert.fileContent('package.json', 'browser-sync-webpack-plugin');
    assert.fileContent('package.json', 'cross-env');
    assert.fileContent('package.json', 'jquery');
    assert.fileContent('package.json', 'laravel-mix');
    assert.fileContent('package.json', 'lodash');
    assert.fileContent('package.json', 'popper.js');
    assert.fileContent('package.json', 'vue');

    done();
  });

  it('webpack.mix.js is configured correctly', done => {
    assert.fileContent('webpack.mix.js', "mix.js('resources/js/app.js', 'public/js');");
    assert.fileContent(
      'webpack.mix.js',
      "mix.sass('resources/sass/app.scss', 'public/css');"
    );
    assert.fileContent(
      'webpack.mix.js',
      'mix.browserSync({\n' +
        "  proxy: 'http://localhost',\n" +
        "  host: 'localhost',\n" +
        '  open: false,\n' +
        '  watchOptions: {\n' +
        '    usePolling: true\n' +
        '  }\n' +
        '});'
    );

    done();
  });
});
