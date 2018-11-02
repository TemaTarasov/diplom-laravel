import { queryString } from '../helpers';

export class Table {
  constructor() {
    this.selected = [];
    this.checkboxes = {
      main: null,
      items: null
    };

    this.page = null;
    this.pageSize = null;
    this.flag = false;

    this.__init();
  }

  __initQueries() {
    const search = queryString.get();
    let flag = false;

    if (!search.page) {
      flag = true;
      this.page = search.page = '1';
    } else {
      this.page = search.page;
    }

    if (!search.pageSize) {
      flag = true;
      this.pageSize = search.pageSize = '10';
    } else {
      this.pageSize = search.pageSize;
    }

    if (flag) {
      queryString.set(search);
    }
  }

  /**
   * @param {object} attr
   * @param {} data
   */
  change(attr, data) {
    queryString.change(attr, data);
  }

  __init() {
    this.table = document.querySelector('[role="table"]');

    if (this.table) {
      this.checkboxes.main = this.table.querySelector('[role="table-select-all"]');
      this.checkboxes.items = [].slice.call(this.table.querySelectorAll('[role="table-select"]'));

      if (
        this.table &&
        this.checkboxes.main &&
        (this.checkboxes.items && this.checkboxes.items.length)
      ) {
        this.__initQueries();

        [].slice.call(this.table.querySelectorAll('[role="table-action"]')).forEach(action => {
          action.addEventListener('click', this.handleActionBound.bind(this), true);
        });

        this.__initCheckboxes(this.checkboxes);
        this.__initBulkActions(
          [].slice.call(document.querySelectorAll('[role="bulk-action"]'))
        )
      }
    } else {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => this.__init(), 150);
      }
    }
  }

  /**
   * @param  {object} checkboxes
   */
  __initCheckboxes(checkboxes) {
    checkboxes.items.forEach(item => {
      item.addEventListener('change', this.handleSelectChanged.bind(this), true);
    });
    checkboxes.main.addEventListener('click', () => {
      const value = checkboxes.main.checked;

      this.selected = [];

      checkboxes.items.forEach(item => {
        const { id, title } = item.dataset;

        if (value) {
          this.selected.push({
            id, title
          });
        }

        item.checked = value;
      });
    }, true);
  }

  /**
   * @param  {array} actions
   */
  __initBulkActions(actions) {
    actions.forEach(action => {
      action.addEventListener('click', this.handleBulkActionBound.bind(this), true);
    });
  }

  /**
   * @param {event} e
   */
  handleSelectChanged(e) {
    const selected = this.checkboxes.items.filter(checkbox => checkbox.checked);

    if (this.checkboxes.items.length === selected.length) {
      this.checkboxes.main.checked = true;
    } else if (selected.length === 0) {
      this.checkboxes.main.checked = false;
    } else {
      this.checkboxes.main.indeterminate = true;
    }

    const target = e.currentTarget;
    const value = target.checked;
    const { id, title } = target.dataset;

    if (value) {
      this.selected.push({
        id, title
      });
    } else {
      this.selected = this.selected.filter(select => select.id !== id && select.title !== title);
    }
  }

  /**
   * @param {event} e
   */
  handleActionBound(e) {
    const { id, type } = e.currentTarget.dataset;

    switch (true) {
      case type === 'delete':
        this.handleDelete(id);
        break;
      default:
        break;
    }
  }

  /**
   * @param {number} id
   */
  handleDelete(id) {

  }

  /**
   * @param {event} e
   */
  handleBulkActionBound(e) {
    const { type } = e.currentTarget.dataset;

    switch (true) {
      case type === 'delete':
        this.handleMultipleDelete(
          this.selected.map(select => select.id)
        );
        break;
      default:
        break;
    }
  }

  /**
   * @param {array} ids
   */
  handleMultipleDelete(ids) {
  }
}
