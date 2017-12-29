# generator-laravel-5 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Installs Laravel-5 and enables BrowserSync

## Installation

First, install [Yeoman](http://yeoman.io) and generator-laravel-5 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-laravel-5
```

Then generate your new project:

```bash
yo laravel-5
```

## Integrated packages
The following packages are integrated by default in the new Laravel project:
* doctrine/dbal
* barryvdh/laravel-ide-helper
* barryvdh/laravel-debugbar
* barryvdh/laravel-cors
* phpmetrics/phpmetrics

## Code analyzes
In order to perform a code analyzes you can run:
```
composer run-script analyze
```
This will create a folder named `phpmetrics` and you can get interesting insights by opening
`phpmetrics/index.html`

## License

Apache-2.0 © [Sebastian Baum](http://www.sebbaum.de)


[npm-image]: https://badge.fury.io/js/generator-laravel-5.svg
[npm-url]: https://npmjs.org/package/generator-laravel-5
[travis-image]: https://travis-ci.org/sebbaum/generator-laravel-5.svg?branch=master
[travis-url]: https://travis-ci.org/sebbaum/generator-laravel-5
[daviddm-image]: https://david-dm.org/sebbaum/generator-laravel-5.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sebbaum/generator-laravel-5
