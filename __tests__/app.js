'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-laravel-5:app', () => {
  beforeEach(done => {
    helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        schema: 'http',
        preset: 'none'
      })
      .on('end', done);
  }, 30000);

  it('creates files', done => {
    assert.file(['webpack.mix.js', 'package.json']);
    done();
  });

  it('composer.json contains laravel packages', done => {
    assert.fileContent('composer.json', 'doctrine/dbal');
    assert.fileContent('composer.json', 'barryvdh/laravel-ide-helper');
    assert.fileContent('composer.json', 'barryvdh/laravel-debugbar');
    assert.fileContent('composer.json', 'barryvdh/laravel-cors');
    done();
  });
});
