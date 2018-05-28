<?php namespace App\Http\Controllers;

class Dashboard extends Controller {
  public function __construct() {
    parent::__construct();

    $this->navigation = [
      'navigation' => [
        'items'   => [
          ['label' => 'Dashboard', 'icon' => 'dashboard', 'href' => '/dashboard', 'name' => 'dashboard'],
          '-',
          ['label' => 'Users', 'icon' => 'users', 'href' => '/dashboard/users', 'name' => 'users'],
        ],
        'current' => ''
      ]
    ];

    $this->content = array_merge($this->navigation, $this->version);
  }
}
