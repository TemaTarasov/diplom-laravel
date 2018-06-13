export class Form {
  constructor(form, inputs, url, method, callback) {
    this.form = document.querySelector(form);
    this.controls = window.Tarasov.InputsManager.get(inputs);

    if (
      url &&
      (
        method &&
        ['get', 'post', 'put', 'patch', 'delete'].some(item => item === method)
      ) &&
      typeof callback === 'function'
    ) {
      this.url = url;
      this.method = method;
      this.callback = callback.bind(this);

      this.__init();
    }
  }

  __init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this), true);
  }

  /**
   * @param  {event} e
   * @return void 0
   */
  handleSubmit(e) {
    e.preventDefault();

    if (this.handleValidate(this.controls)) {
      const { url, method, controls } = this;

      if (method === 'get' || method === 'delete') {
        axios[method](
          url
        )
          .then(this.callback)
      } else {
        axios[method](
          url,
          window.Tarasov.InputsManager.getData(
            Object.keys(controls)
          )
        )
          .then(this.callback)
      }
    }
  }

  /**
   * @param  {array} inputs
   * @return {boolean}
   */
  handleValidate(inputs = this.controls) {
    return Object.keys(inputs).reduce((acc, key) => {
      const bool = inputs[key].validate();

      if (acc) {
        acc = bool;

        return acc;
      }

      return acc;
    }, true);
  }
}