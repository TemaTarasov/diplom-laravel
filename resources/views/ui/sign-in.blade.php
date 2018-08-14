@extends('layouts.index')

@section('styles')
  <link rel="stylesheet" href="/css/sign.css?version={{ $version }}">
@endsection

@section('layout')
  <div class="sign-container">
    <div class="sign-container-title">Tarasov Inc.</div>
    <div class="sign-container-description">Sign-in</div>

    <form id="sign-in">
      @include('components.input', [
        'name' => 'login',
        'placeholder' => 'Login or E-mail',
        'require' => true,
        'labelFloating' => true
      ])

      @include('components.input', [
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
@endsection
