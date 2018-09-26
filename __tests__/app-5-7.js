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
        enableAuth: false,
        localGit: true
      })
      .on('end', done);
  }, 1200000);

  it('creates files', done => {
    assert.file(['webpack.mix.js', 'package.json', '.gitignore', '.git/config']);
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
