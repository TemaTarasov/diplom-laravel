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
  Route::get('/sign-in', 'SignController@in')->name('login');

//  Route::get('/sign-up', '')->name('register');


  Route::group([
    'middleware' => 'auth'
  ], function () {
    // Routes
    Route::group([
      'prefix' => 'dashboard'
    ], function () {
      Route::get('/', 'DashboardController@index');

      Route::group([
        'prefix' => 'users'
      ], function () {
        Route::get('/', 'UserController@index')->name('dashboard.users');
        Route::get('create', 'UserController@create')->name('dashboard.users.create');
        Route::get('{user}/edit', 'UserController@edit')->name('dashboard.users.edit');

        Route::post('/', 'UserController@store');

        Route::put('{user}', 'UserController@update');
        Route::patch('{user}', 'UserController@update');
        Route::post('{user}', 'UserController@update');

        Route::delete('{user}');
      });
    });
  });

  // Api
  Route::group([
    'prefix' => 'api/v1'
  ], function () {
    Route::post('login', 'SignController@login');
    Route::post('register', 'SignController@register');

    Route::group([
      'middleware' => 'auth'
    ], function () {
      Route::get('logout', 'SignController@logout');
    });
  });
});
