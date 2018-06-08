<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {
//$collection->index(
//  [
//    "title" => "text"
//  ],
//  'textSearch',
//  null,
//  [
//    'name' => 'textSearch'
//  ]
//);

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('users', function ($collection) {
      $collection->unique('login');
      $collection->unique('email');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('users');
  }
}
