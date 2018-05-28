export default class {
  constructor() {
    this.selected = [];
    this.checkboxes = {
      main: void 0,
      items: void 0
    };

    this.flag = false;

    this.__init();
  }

  /**
   * @return void 0
   */
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
        [].slice.call(this.table.querySelectorAll('[role="table-action"]')).forEach(action => {
          action.addEventListener('click', this.handleActionBound.bind(this), true);
        });

        this.checkboxes.items.forEach(item => {
          item.addEventListener('change', this.handleSelectChanged.bind(this), true);
        });
        this.checkboxes.main.addEventListener('click', () => {
          const value = this.checkboxes.main.checked;

          this.selected = [];

          this.checkboxes.items.forEach(item => {
            const {id, title} = item.dataset;

            if (value) {
              this.selected.push({
                id, title
              });
            }

            item.checked = value;
          });
        }, true);
      }
    } else {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => this.__init(), 150);
      }
    }
  }

  /**
   * @param  {event} e
   * @return void 0
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
    const {id, title} = target.dataset;

    if (value) {
      this.selected.push({
        id, title
      });
    } else {
      this.selected = this.selected.filter(select => select.id !== id && select.title !== title);
    }
  }

  /**
   * @param  {event} e
   * @return void 0
   */
  handleActionBound(e) {
    const {id, action} = e.currentTarget.dataset;

    switch (true) {
      case action === 'delete':
        this.handleDelete(id);
        break;
      default:
        break;
    }
  }

  /**
   * @param  {number} id
   * @return void 0
   */
  handleDelete(id) {

  }
}