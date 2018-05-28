<?php namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class Requests extends FormRequest {
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize() {
    return true;
  }

  /**
   * @param Validator $validator
   */
  protected function failedValidation(Validator $validator) {
    throw new HttpResponseException(
      response()->json([
        'status' => false,
        'code'   => 422,
        'errors' => $validator->errors()
      ], 422)
    );
  }
}