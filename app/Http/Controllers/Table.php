<?php namespace App\Http\Controllers;

class Table {
  static function get($model, $queries) {
    $pageSize = isset($queries['$pageSize']) ? intval($queries['$pageSize']) : 10;

    return $model::paginate($pageSize);
  }
}
