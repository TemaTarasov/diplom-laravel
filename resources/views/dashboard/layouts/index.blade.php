@extends('layouts.index')

@section('styles')
  <link rel="stylesheet" href="/css/dashboard.css?version={{ $version }}">
@endsection

@section('layout')
  <header>
    <div class="flex">
      <div id="burger" class="header-burger" data-target="#navigation" data-className="opened">
        <i class="fas fa-bars"></i>
      </div>
      <div class="header-logo">
        <div class="header-logo-content">
          Tarasov Inc.
        </div>
      </div>
    </div>
    <div>
      <div class="header-user dropdown">
        <div class="header-user-target" data-type="dropdown">
          <i class="far fa-user"></i>

          {{ Auth::user()->login }}

          <i class="fas fa-angle-down"></i>
        </div>
        <div class="header-user-content dropdown-content">
          <div class="header-user-content-info">
            <span class="header-user-content-info-title">Account ID</span>
            <span class="header-user-content-info-value">{{ Auth::user()->_id }}</span>
          </div>
          <div class="header-user-content-info">
            <span class="header-user-content-info-title">Email</span>
            <span class="header-user-content-info-value">{{ Auth::user()->email }}</span>
          </div>
          <div class="header-user-content-info">
            <span class="header-user-content-info-title">Role</span>
            <span class="header-user-content-info-value">{{ Auth::user()->permissions }}</span>
          </div>
          <div class="header-user-content-item" onclick="logout(event)" data-type="dropdown-item">Logout</div>
        </div>
      </div>
    </div>
  </header>

  <div class="flex h100">
    <div class="navigation h100">
      <div id="navigation" class="navigation-content">
        @foreach ($navigation['items'] as $item)
          @if ($item === '-')
            <div class="separator">
              <span class="icon"></span>
              <span class="text"></span>
            </div>
          @else
            @if(
              !isset($item['only']) || (isset($item['only']) && in_array(Auth::user()->permissions, $item['only']))
            )
              <a href="{{ $item['href'] }}" class="{{ $item['label'] === $navigation['current'] ? 'current' : '' }}">
              <span>
                <i class="fas {{ $item['icon'] }}"></i>
              </span>
                {{ $item['label'] }}
              </a>
            @endif
          @endif
        @endforeach
      </div>
    </div>

    <div class="content h100">
      @yield('content')
    </div>
  </div>
@endsection

@section('scripts')
  <script src="/js/dashboard.js?version={{ $version }}"></script>
  <script>
    var logout = function () {
      axios.get('/api/v1/logout').then(function (res) {
        if (res.data.status === 200) {
          location.href = '/sign-in';

          return false;
        }

        return window.Tarasov.Notification.notify({
          type: 'error',
          autoclose: false,
          content: 'Something went wrong try again later!'
        })
      });
    }
  </script>
@endsection