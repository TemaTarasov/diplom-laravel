<div class="input-block" role="input">
  <label for="{{ $name }}">
    {{ $placeholder }}
    @if (isset($require) && $require)
      <span class="required">*</span>
    @endif
  </label>
  <input id="{{ $name }}"
         type="{{ isset($type) ? $type : 'text' }}"
         name="{{ $name }}"
         data-require="{{ isset($require) && $require ? 'true' : 'false' }}"
         data-contains="{{ isset($contains) ? $contains : 'false' }}"
         data-label-floating="{{ isset($labelFloating) ? 'true' : 'false' }}"
         autocomplete="off"
  >
</div>
