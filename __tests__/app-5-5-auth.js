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
        version: '5.5.*',
        proxy: 'localhost',
        schema: 'http',
        preset: 'none',
        enableAuth: true,
        localGit: false
      })
      .on('end', done);
  }, 1200000);

  it('creates laravel auth layer files', done => {
    assert.file([
      'app/Http/Controllers/HomeController.php',
      'resources/views/auth/passwords/email.blade.php',
      'resources/views/auth/passwords/reset.blade.php',
      'resources/views/auth/login.blade.php',
      'resources/views/auth/register.blade.php',
      'resources/views/home.blade.php',
      'resources/views/layouts/app.blade.php'
    ]);

    done();
  });
});
