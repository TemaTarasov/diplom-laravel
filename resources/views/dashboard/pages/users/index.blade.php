@extends('dashboard.layouts.index')

@section('content')
  @include('components.table')
@endsection

@section('scripts')
  <script>
    window.Tarasov.documentReady(function () {
      window.Tarasov.Breadcrumbs.set({
        name: 'users.index',
        label: 'Users',
        href: '/dashboard/users'
      });
    });
  </script>
@endsection