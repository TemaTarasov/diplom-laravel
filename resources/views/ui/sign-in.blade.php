@extends('layouts.index')

@section('styles')
  <link rel="stylesheet" href="/css/sign.css?version={{ $version }}">
@endsection

@section('layout')
  <div class="sign-container">
    <div class="sign-container-title">Tarasov Inc.</div>

    <form id="sign-in">
      @include('ui.components.input', [
        'name' => 'login',
        'placeholder' => 'Login or Email',
        'require' => true,
        'labelFloating' => true
      ])

      @include('ui.components.input', [
        'name' => 'password',
        'placeholder' => 'Password',
        'type' => 'password',
        'require' => true,
        'labelFloating' => true
      ])

      <button type="submit" class="button primary">Sign-in</button>
    </form>
  </div>
@endsection

@section('scripts')
  <script src="/js/sign.js?version={{ $version }}"></script>
  <script>
    new window.Tarasov.Form('#sign-in', ['login', 'password'], '/api/v1/login', 'post', function (res) {
      debugger;
    });
  </script>
@endsection
