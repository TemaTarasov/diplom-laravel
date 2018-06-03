<?php namespace App\Http\Requests\v1;

use App\Http\Requests\Requests;

class SignLoginRequest extends Requests {
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules() {
    return [
      'login'    => 'required',
      'password' => 'required'
    ];
  }
}
