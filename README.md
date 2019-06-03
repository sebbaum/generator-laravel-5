# generator-laravel-5 [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Installs Laravel-5 with a bunch of useful packages and enables BrowserSync

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

## Proxy
You can choose from where your application is served:
* php artisan serve (localhost:8000)
* localhost (Use this, if you serve your application via a webserver (local or remote))
The proxy configuration is required for BrowserSync and can be changed in `webpack.mix.js`

## Integrated packages
The following packages are integrated in the new Laravel project by default:
* doctrine/dbal
* barryvdh/laravel-ide-helper
* barryvdh/laravel-debugbar (for Laravel <= 5.6.*)
* barryvdh/laravel-cors
* phpmetrics/phpmetrics
* beyondcode/laravel-self-diagnosis
* laravel/telescope (for Laravel >= 5.7.*)
* symplify/easy-coding-standard

## Laravel Telescope
Laravel Telescope is integrated for Laravel 5.7+ applications. Make sure to run the migration manually,
after having prepared and configured your database.  
Laravel Telescope runs with the default configuration. Only `php artisan telescope:install` has been executed
during the setup routine. You can open the telescope GUI via: `http(s)://your-domain/telescope`.

## phpmetrics analyzes
In order to perform a code analyzes with phpmetrics you can run:
```
composer analyze
```
This will create a folder named `phpmetrics` and you can get interesting insights by opening
`phpmetrics/index.html`

## Code style check and fixing
In order to have a clean and shiny code style, your generated Laravel 5 application comes with 
[EasyCodingStandard](https://github.com/Symplify/EasyCodingStandard) support.  
You can check your code with the following command: `composer run-script ecsCheck`
This checks the whole project and applies some basic check configurations.
You can tweak the check configuration in the `easy-coding-standard.yml` file.

In order to fix your code style, you can run `composer run-script ecsFix`.

You can also run easyCodingStandard and pass other configuration by calling the tool directly:
```
vendor/bin/ecs check app --config vendor/symplify/easy-coding-standard/config/clean-code.yml
vendor/bin/ecs check app --config vendor/symplify/easy-coding-standard/config/clean-code.yml --fix
```

For more information, please consult the official 
[documentation](https://github.com/Symplify/EasyCodingStandard/blob/master/README.md).

## phpunit-watcher
Another useful php package that is integrated out of the box is spatie/phpunit-watcher. With this tool, 
you can watch changes in *.php and test files and all your automated tests will be triggered to run.
You can start phpunit-watcher with:
```bash
vendor/bin/phpunit-watcher watch
```
For more information have a look at the official documentation:
https://github.com/spatie/phpunit-watcher

## Frontend development with browserSync
If you serve your application with `php artisan serve` (http://localhost:8000) you have to start
this first before you can start watching your files with browserSync.

In order to have webpack watch your file changes and reload your browser, run `npm run watch`.
You have to open your browser an navigate to `http:localhost:3000`

## Git versioning
If you want to, you can initialize a local git repository to version your code.
This is turned on by default. After scaffolding your new laravel application there is an initial
commit in your local repository.

## License

Apache-2.0 © [Sebastian Baum](http://www.sebbaum.de)

[npm-image]: https://badge.fury.io/js/generator-laravel-5.svg
[npm-url]: https://npmjs.org/package/generator-laravel-5
[travis-image]: https://travis-ci.org/sebbaum/generator-laravel-5.svg?branch=master
[travis-url]: https://travis-ci.org/sebbaum/generator-laravel-5
[daviddm-image]: https://david-dm.org/sebbaum/generator-laravel-5.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/sebbaum/generator-laravel-5
