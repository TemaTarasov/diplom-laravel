export class Dropdown {
  constructor() {
    this.dropdowns = [];

    this.__init();
  }

  /**
   * @param {document} doc
   */
  __init(doc = document) {
    this.dropdowns = [].slice.call(doc.querySelectorAll('[data-type="dropdown"]'));

    this.init(this.dropdowns);

    document.addEventListener('click', this.handleBlur.bind(this), true);
  }

  /**
   * @param {array} dropdowns
   */
  init(dropdowns) {
    dropdowns.forEach(this.defineDropdown);
  }

  /**
   * @param {HTML.Element} item
   */
  defineDropdown(item) {
    item.addEventListener('click', () => {
      item.parentElement.classList.toggle('opened');

      [].slice.call(item.parentElement.querySelectorAll('[data-type="dropdown-item"]')).forEach(dropItem => {
        dropItem.addEventListener('click', () => {
          const value = dropItem.dataset.value;

          if (value) {
            item.dataset.value = dropItem.dataset.value;

            const _span = item.querySelector('span');
            if (_span) {
              _span.innerHTML = dropItem.innerHTML;
            }
          }

          item.parentElement.classList.remove('opened');
        }, true);
      });
    }, true);
  }

  /**
   * @param {*} element
   */
  define(element) {
    if (element) {
      if (element instanceof HTMLElement) {
        this.defineDropdown(element);
        this.dropdowns.push(element);
      } else {
        const el = document.querySelector(element);
        if (el) {
          this.dropdowns.push(el);
          this.init([el]);
        }
      }
    }
  }

  /**
   * @param {string} name
   */
  remove(name) {
    const element = this.dropdowns.find(dropdown => dropdown.dataset.name === name);

    if (element) {
      this.dropdowns = this.dropdowns.filter(dropdown => dropdown.dataset.name !== name);

      element.parentElement.removeChild(element);
    }
  }

  /**
   * @param {event} e
   */
  handleBlur(e) {
    this.dropdowns.filter(item => item.parentElement.classList.contains('opened')).forEach(item => {
      if (!e.composedPath().some(el => el === item.parentElement)) {
        item.parentElement.classList.remove('opened');
      }
    });
  }
}