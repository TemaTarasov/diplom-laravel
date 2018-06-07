<?php namespace App\Http\Middleware\v1;

use Closure;

class ServiceAdminMiddleware {
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @return mixed
   */
  public function handle($request, Closure $next) {
    return $next($request);
  }
}
