<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
  'namespace' => 'v1'
], function () {
//  Route::get('/sign-in', '')->name('login');

//  Route::get('/sign-up', '')->name('register');


  Route::group([
//    'middleware' => 'auth',
    'prefix'     => 'dashboard'
  ], function () {
    Route::get('/', 'DashboardController@index');
    Route::get('/users', 'UserController@index');
  });
});
