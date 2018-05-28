<?php namespace App\Http\Controllers\v1;

use App\Http\Controllers\Dashboard;
use Illuminate\Http\Request;
use App\User;

class UserController extends Dashboard {
  public function __construct() {
    parent::__construct();

    $this->content['pageName'] = 'Users';
    $this->content['navigation']['current'] = 'Users';

    $this->content['tableTitle'] = 'login';
    $this->content['table'] = [
      [
        'label' => 'Login',
        'name'  => 'login'
      ],
      [
        'label' => 'Email',
        'name'  => 'email'
      ],
      [
        'label'   => 'Last Modified',
        'name'    => 'updated_at',
        'role'    => 'date',
        'width'   => '350px',
        'actions' => [
          ['type' => 'edit', 'label' => 'Edit'],
          ['type' => 'delete', 'label' => 'Delete']
        ]
      ]
    ];
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    return view('dashboard.pages.users.index', array_merge($this->content, [
      'data' => User::all()
    ]));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create() {
//    return view('dashboard.pages.users.manage');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    // TODO: create user
  }

  /**
   * Display the specified resource.
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id) {
//    return view('dashboard.pages.users.manage');
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    // TODO: update user info
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    // TODO: delete user
  }
}
