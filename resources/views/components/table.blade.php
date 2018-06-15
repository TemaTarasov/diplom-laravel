<div class="table-control">
  <div>
    @if (Auth::user()->permissions === 'admin' && isset($table['actions']))
      <div class="dropdown">
        <div class="table-bulk" data-type="dropdown" data-value="">
          <span>Bulk Action</span>

          <i class="fas fa-angle-down"></i>
        </div>

        <div class="dropdown-content">
          @foreach ($table['actions'] as $action)
            <div class="table-bulk-item" data-type="dropdown-item" data-value="{{ $action['type'] }}">
              {{ $action['label'] }}
            </div>
          @endforeach
        </div>
      </div>
    @endif
  </div>
  <div>

  </div>
</div>

<table class="table table-striped" role="table">
  <thead class="table-header">
  <tr class="table-header-row">
    @if (Auth::user()->permissions === 'admin')
      <th class="table-header-cell select">
        <input type="checkbox" role="table-select-all">
      </th>
    @endif
    @foreach ($table['items'] as $item)
      <th class="table-header-cell" style="width: {{ isset($item['width']) ? $item['width'] : 'auto' }}">
        {{ $item['label'] }}
      </th>
    @endforeach
  </tr>
  </thead>
  <tbody class="table-body">
  @foreach ($data as $result)
    <tr class="table-body-row">
      @if (Auth::user()->permissions === 'admin')
        <td class="table-body-cell select">
          @if (Auth::user()->_id !== $result['_id'])
            <input type="checkbox" role="table-select" data-id="{{ $result['_id'] }}" data-title="{{ $result[$tableTitle] }}">
          @endif
        </td>
      @endif
      @foreach ($table['items'] as $item)
        <td class="table-body-cell">
          <div class="table-body-cell-content">
            @if ($item['name'] === $tableTitle)
              <a href="{{ $route }}/{{ $result['_id'] }}/edit" class="table-body-cell-content-item">
                {{ $result[$item['name']] }}
              </a>
            @else
              <span role="{{ isset($item['role']) ? $item['role'] : '' }}">
                {{ $result[$item['name']] }}
              </span>
            @endif

            @if (Auth::user()->permissions === 'admin' && isset($item['actions']))
              <div class="table-body-actions">
                @foreach ($item['actions'] as $action)
                  @if ($action['type'] === 'edit')
                    <a href="{{ $route }}/{{ $result['_id'] }}/{{ $action['type'] }}" class="table-action {{ $action['type'] }}">
                      {{ $action['label'] }}
                    </a>
                  @else
                    @if ($action['type'] === 'delete' && Auth::user()->_id !== $result['_id'])
                      <span class="table-action {{ $action['type'] }}" role="table-action" data-type="{{ $action['type'] }}" data-id="{{ $result['_id'] }}" data-title="{{ $result[$tableTitle] }}">
                        {{ $action['label'] }}
                      </span>
                    @endif
                  @endif
                @endforeach
              </div>
            @endif
          </div>
        </td>
      @endforeach
    </tr>
  @endforeach
  </tbody>
</table>
