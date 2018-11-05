<?php namespace App\Http\Controllers\v1;

use App\Http\Requests\v1\SignLoginRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SignController extends Controller {
  public function __construct() {
    parent::__construct();

    $this->content = array_merge($this->version, [
      'pageName' => ''
    ]);
  }

  public function in() {
    $this->content['pageName'] = 'Sign In';

    return view('ui.sign-in', $this->content);
  }

  public function up() {
    $this->content['pageName'] = 'Sign Up';

    return view('ui.sign-up', $this->content);
  }

  public function login(SignLoginRequest $request) {
    if (
      Auth::attempt(['login' => $request->login, 'password' => $request->password]) ||
      Auth::attempt(['email' => $request->login, 'password' => $request->password])
    ) {
      return [
        'status' => 200
      ];
    }

    return [
      'status' => 422,
      'error'  => 'Wrong Login, Email or Password!'
    ];
  }

  public function register(Request $request) {
    return $request;
  }

  public function logout() {
    Auth::logout();

    return [
      'status' => 200
    ];
  }
}
