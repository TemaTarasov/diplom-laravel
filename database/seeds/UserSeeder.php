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

    $service_admin = new User;

    $service_admin->login = 'service-admin';
    $service_admin->email = 'service-admin@example.com';
    $service_admin->password = Hash::make('service-admin');
    $service_admin->permissions = 'service-admin';

    $service_admin->save();

    $admin = new User;

    $admin->login = 'admin';
    $admin->email = 'admin@example.com';
    $admin->password = Hash::make('admin');
    $admin->permissions = 'admin';

    $admin->save();

    factory(App\User::class, 3)->create();
  }
}
