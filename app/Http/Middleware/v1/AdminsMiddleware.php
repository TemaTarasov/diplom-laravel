<?php namespace App\Http\Middleware\v1;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminsMiddleware {
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @return mixed
   */
  public function handle($request, Closure $next) {
    if (Auth::user()->permissions === 'admin') {
      return $next($request);
    }

    return redirect()->route('dashboard');
  }
}
