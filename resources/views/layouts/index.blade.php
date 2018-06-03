<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ $pageName }}</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
  @yield('styles')
</head>
<body>

@yield('layout')

<div id="notification"></div>

@yield('scripts')
</body>
</html>