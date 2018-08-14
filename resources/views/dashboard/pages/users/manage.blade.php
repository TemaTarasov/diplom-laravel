@extends('dashboard.layouts.index')

@section('content')
  <form id="manage">
    @include('components.input', [
    'name' => 'login',
    'placeholder' => 'Login',
    'value' => $user['login'],
    'require' => true,
    'labelFloating' => true
  ])
    @include('components.input', [
      'name' => 'email',
      'placeholder' => 'E-mail',
      'value' => $user['email'],
      'require' => true,
      'labelFloating' => true
    ])
    @include('components.input', [
      'name' => 'password',
      'placeholder' => 'New Password',
      'type' => 'password',
      'require' => true,
      'labelFloating' => true
    ])
    @include('components.input', [
      'name' => 'confirm-password',
      'placeholder' => 'Confirm Password',
      'type' => 'password',
      'require' => true,
      'labelFloating' => true
    ])

    <button type="submit" class="button primary" style="margin-top: 15px;">Update</button>
  </form>
@endsection

@section('scripts')
  <script>
    window.Tarasov.documentReady(function () {
      new window.Tarasov.Form('#manage', ['login', 'email', 'password', 'confirm-password'], '/api/v1', 'patch', function (res) {
        if (res.data.status === 422 && res.data.error) {
          return window.Tarasov.Notification.notify({
            type: 'error',
            content: res.data.error
          });
        }

        if (res.data.status === 200) {
          location.href = '/dashboard/users';
        }
      }, function () {
        var password = this.controls['password'],
          passwordValue = window.Tarasov.trim(this.controls['password'].value),
          confirm = this.controls['confirm-password'],
          confrmValue = window.Tarasov.trim(confirm.value),
          bool = passwordValue === confrmValue;

        if (!bool) {
          password.parentElement.setAttribute('data-error', 'true');
        }

        return bool;
      });

      window.Tarasov.Breadcrumbs.push({
        name: 'users.manage',
        label: 'Manage User (' + document.getElementById('login').value + ')'
      });
    });
  </script>
@endsection
