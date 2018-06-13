export class Dropdown {
  constructor() {
    this.dropdowns = [];

    this.__init();
  }

  __init(doc = document) {
    this.dropdowns = [].slice.call(doc.querySelectorAll('[data-type="dropdown"]'));

    this.dropdowns.forEach(item => {
      item.addEventListener('click', () => {
        item.parentElement.classList.toggle('opened');

        [].slice.call(item.parentElement.querySelectorAll('[data-type="dropdown-item"]')).forEach(dropItem => {
          dropItem.addEventListener('click', () => {
            const value = dropItem.dataset.value;

            if (value) {
              item.dataset.selected = dropItem.dataset.value;
            }

            item.parentElement.classList.remove('opened');
          }, true);
        });
      }, true);
    });

    document.addEventListener('click', this.handleBlur.bind(this), true);
  }

  handleBlur(e) {
    this.dropdowns.filter(item => item.parentElement.classList.contains('opened')).forEach(item => {
      if (!e.composedPath().some(el => el === item.parentElement)) {
        item.parentElement.classList.remove('opened');
      }
    });
  }
}