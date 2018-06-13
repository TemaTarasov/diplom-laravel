<?php namespace App\Http\Controllers;

class Dashboard extends Controller {
  public function __construct() {
    parent::__construct();

    $this->navigation = [
      'navigation' => [
        'items'   => [
          ['label' => 'Dashboard', 'icon' => 'fa-chart-line', 'href' => '/dashboard', 'name' => 'dashboard'],
          '-',
          ['label' => 'Users', 'icon' => 'fa-users', 'href' => '/dashboard/users', 'name' => 'users', 'only' => ['service-admin', 'admin']],
        ],
        'current' => ''
      ]
    ];

    $this->content = array_merge($this->navigation, $this->version);
  }
}
