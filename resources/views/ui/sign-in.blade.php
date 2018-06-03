@extends('layouts.index')

@section('styles')
  <link rel="stylesheet" href="/css/sign.css?version={{ $version }}">
@endsection

@section('layout')
  <div class="sign-container">
    <div class="sign-container-title">Tarasov Inc.</div>
    <div class="sign-container-description">Sign-in</div>

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
      if (res.data.status === 422 && res.data.error) {
        return window.Tarasov.Notification.notify({
          type: 'warning',
          autoclose: false,
          content: res.data.error
        });
      }

      if (res.data.status === 200) {
        location.href = '/dashboard';
      }
    });
  </script>
@endsection
