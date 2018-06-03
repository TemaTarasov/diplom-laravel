<?php namespace App\Http\Controllers\v1;

use App\Http\Requests\v1\SignLoginRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SignController extends Controller {
  public function __construct() {
    parent::__construct();

    $this->content = array_merge([
      'pageName' => 'Sign In'
    ], $this->version);
  }

  public function in() {
    return view('ui.sign-in', $this->content);
  }

  public function up() {
    return view('sign-up', [
      'version' => $this->VERSION
    ]);
  }

  public function out() {
    return view('sign-out', [
      'version' => $this->VERSION
    ]);
  }

  public function login(SignLoginRequest $request) {
    if (Auth::attempt(['login' => $request->login, 'password' => $request->password])) {
      return [
        'status' => 200
      ];
    }

    if (Auth::attempt(['email' => $request->login, 'password' => $request->password])) {
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
