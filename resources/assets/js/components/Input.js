import { trim, isEmpty } from '../helpers';

export class Input {
  constructor() {
    this.inputs = {};

    this.__init(
      [].slice.apply(document.querySelectorAll('[role="input"]')) || []
    );
  }

  /**
   * @param  {array} blocks
   * @return void 0
   */
  __init(blocks) {
    if (blocks.length) {
      blocks.forEach(block => {
        this.defineInput(block);
      });
    }
  }

  /**
   * @param  {HTML.Element} input
   * @return void 0
   */
  defineInput(block) {
    if (block instanceof HTMLElement) {
      const input = block.querySelector('input');

      input.label = block.querySelector('label');
      input.validate = this.validate.bind(input);
      this.set(input.name, input);

      input.addEventListener('focus', this.handleFocus.bind(this), true);
      input.addEventListener('blur', this.handleBlur.bind(this), true);
      input.addEventListener('input', () => {
        if (!isEmpty(trim(input.value))) {
          input.label.classList.add('not-empty');
        } else {
          input.label.classList.remove('not-empty');
        }
      }, true);
    }
  }

  /**
   * @param  {HTML.Element} element
   * @return {HTML.Element}
   */
  define(element) {
    let block;

    if (element.getAttribute('role') === 'input') {
      block = element;
    } else if (element.parentElement.getAttribute('role') === 'input') {
      block = element.parentElement;
    }

    this.defineInput(block);

    return this.get(block.querySelector('input').name);
  }

  /**
   * @param  {*} name
   * @return {*}
   */
  get(name) {
    if (Array.isArray(name)) {
      return name.reduce((acc, key) => {
        const item = this.inputs[key];

        if (item && item instanceof HTMLElement) {
          acc[key] = item;

          return acc;
        }

        return acc;
      }, {});
    }

    if (name) {
      return this.inputs[name];
    }

    return this.inputs;
  }

  /**
   * @param  {*} name
   * @return {*}
   */
  getData(name) {
    if (name && Array.isArray(name)) {
      return name.reduce((acc, key) => {
        const item = this.get(key);

        if (item && item instanceof HTMLElement) {
          acc[key] = trim(item.value);

          return acc;
        }

        return acc;
      }, {});
    }

    const result = this.get(name);

    if (result) {
      if (typeof result === 'object' && !(result instanceof HTMLElement)) {
        return Object.keys(result).reduce((acc, key) => {
          acc[key] = trim(result[key].value);

          return acc;
        }, {});
      }

      return trim(result.value);
    }

    return result;
  }

  /**
   * @param  {string} name
   * @param  {*} element
   * @return {*}
   */
  set(name, element) {
    if (element instanceof HTMLElement) {
      this.inputs[name] = element;

      return this.get(name);
    }

    return void 0;
  }

  /**
   * @param  {*} name
   * @param  {*} value
   * @return {*}
   */
  setData(name, value) {
    if (name && Array.isArray(name)) {
      if (typeof value === 'string' || typeof value === 'number') {
        return name.reduce((acc, key) => {
          const item = this.get(key);

          if (item instanceof HTMLElement) {
            item.value = trim(value.toString());
            acc[key] = item.value;

            return acc;
          }

          return acc;
        }, {});
      }

      return void 0;
    }

    const input = this.get(name);
    if (input instanceof HTMLElement && !(value instanceof HTMLElement)) {
      if (typeof value === 'string' || typeof value === 'number') {
        input.value = trim(value.toString());

        return this.getData(name);
      }
    }

    return void 0;
  }

  /**
   * @param  {string} name
   * @return void 0
   */
  remove(name) {
    const el = this.get(name).parentElement;

    if (el) {
      el.parentElement.removeChild(el);
    }
  }

  /**
   * @param  {event} e
   * @return void 0
   */
  handleFocus(e) {
    const input = this.get(e.currentTarget.name);

    if (JSON.parse(input.dataset.labelFloating)) {
      input.parentElement.classList.add('focus');
      input.label.classList.add('focus');
    }
  }

  /**
   * @param  {event} e
   * @return void 0
   */
  handleBlur(e) {
    const input = this.get(e.currentTarget.name);

    input.value = trim(input.value);
    input.parentElement.classList.remove('focus');

    if (JSON.parse(input.dataset.labelFloating)) {
      input.label.classList.remove('focus');
    }

    input.validate();
  }

  /**
   * @return {boolean}
   */
  validate() {
    let validate = true;
    const contrains = JSON.parse(this.dataset.contains);

    if (contrains) {
      const bool = contrains.test(trim(this.value));

      if (!bool) {
        this.parentElement.setAttribute('data-error', 'true');
      } else {
        this.parentElement.removeAttribute('data-error');
      }

      if (validate) {
        validate = bool;

        return validate;
      }
    }

    const bool = isEmpty(trim(this.value));

    if (bool) {
      this.parentElement.setAttribute('data-error', 'true');
    } else {
      this.parentElement.removeAttribute('data-error');
    }

    if (validate) {
      validate = !bool;

      return validate;
    }
  }
}
