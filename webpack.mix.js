let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .less('./resources/assets/less/dashboard/index.less', './public/css/dashboard.css')
  .js('./resources/assets/js/dashboard', './public/js/dashboard.js');
