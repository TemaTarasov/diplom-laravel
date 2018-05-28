<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    DB::table('users')->truncate();

    $user = new User;

    $user->login = 'admin';
    $user->email = 'admin@example.com';
    $user->password = Hash::make('123');
    $user->permissions = 'sevice-admin';

    $user->save();

    factory(App\User::class, 4)->create();
  }
}
