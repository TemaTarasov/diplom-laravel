<?php namespace App\Http\Controllers\v1;

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Table;
use App\Http\Requests\Requests;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\DocBlock\Tag;

class UserController extends Dashboard {
  public function __construct() {
    parent::__construct();

    $this->content['pageName'] = '';
    $this->content['navigation']['current'] = 'Users';
    $this->content['route'] = '/dashboard/users';

    $this->table = [
      'route'      => '/dashboard/users',
      'tableTitle' => 'login',
      'table'      => [
//        'actions' => [
//          [
//            'type'  => 'delete',
//            'label' => 'Delete'
//          ]
//        ],
        'items' => [
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
        ]
      ]
    ];
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request) {
    $this->content['pageName'] = 'Users';

    $pageSize = isset($request->query()['pageSize']) ? intval($request->query()['pageSize']) : 10;

    if (Auth::user()->permissions !== 'service-admin') {
      $users = User::where('permissions', '!=', 'service-admin')->paginate($pageSize);
    } else {
      $users = User::paginate($pageSize);
    }

    return view('dashboard.pages.users.index', array_merge($this->content, $this->table, [
      'data' => $users
    ]));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create() {
    $this->content['pageName'] = 'User Create';

    return view('dashboard.pages.users.manage', array_merge($this->content, [
      'action' => 'create'
    ]));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   */
  public function store(Request $request) {
    // TODO: create user
  }

  /**
   * Display the specified resource.
   *
   * @param  int or string $user
   */
  public function show($user) {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int or string $id
   * @return \Illuminate\Http\Response
   */
  public function edit($user) {
    $result = User::where('_id', $user)->orWhere('login', $user)->first();
    $this->content['pageName'] = 'Manage User ('. $result->login .')';

    if (isset($result)) {
      return view('dashboard.pages.users.manage', array_merge($this->content, [
        'user' => $result,
        'action' => 'edit'
      ]));
    }

    return redirect()->route('dashboard.users');
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @param string $user
   */
  public function update(Request $request, $user) {
    // TODO: update user info
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int or string $user
   */
  public function destroy($user) {
    // TODO: delete user
  }
}
