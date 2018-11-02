import { template } from '../helpers';

export class Breadcrumbs {
  constructor() {
    this.breadcrumbs = window.Tarasov.Storage.get('tarasov:breadcrumbs', []);
    this.container = document.getElementById('breadcrumbs');
  }

  /**
   * @return {array}
   */
  get() {
    return this.breadcrumbs;
  }

  /**
   * @param  {*} data
   * @return {array}
   */
  set(data) {
    if (data && typeof data === 'object') {
      if (Array.isArray(data)) {
        this.breadcrumbs = data;

        this.render();
        return this.get();
      }

      this.breadcrumbs = [data];

      this.render();
      return this.get();
    }
  }

  /**
   * @param  {*} data
   * @return {array}
   */
  push(data) {
    if (data && typeof data === 'object') {
      if (data.name) {
        const result = this.breadcrumbs.find(breadcrumb => breadcrumb.name === data.name);

        if (result) {
          this.breadcrumbs = this.breadcrumbs.map(breadcrumb => {
            if (breadcrumb.name === data.name) {
              return data;
            }

            return breadcrumb;
          });

          this.render();
          return this.get();
        }
      }

      if (Array.isArray(data)) {
        this.breadcrumbs = this.breadcrumbs.concat(data);

        this.render();
        return this.get();
      }

      this.breadcrumbs.push(data);

      this.render();
      return this.get();
    }
  }

  render() {
    while (this.container.lastElementChild) this.container.removeChild(this.container.lastElementChild);

    window.Tarasov.Storage.set('tarasov:breadcrumbs', this.breadcrumbs);

    const length = this.breadcrumbs.length;

    this.breadcrumbs.forEach((breadcrumb, i) => {
      if (length === (i + 1)) {
        this.container.appendChild(
          this.buildItem(breadcrumb)
        );
      } else {
        this.container.appendChild(
          this.buildLink(breadcrumb)
        );
      }
    });
  }

  /**
   * @param  {object} data
   * @return {template}
   */
  buildLink(data) {
    return template(`
      <div class="breadcrumbs-content">
        <a href="%href%">%label%</a> <i class="fas fa-angle-down"></i>
      </div>
    `, data);
  }

  /**
   * @param  {object} data
   * @return {template}
   */
  buildItem(data) {
    return template(`
      <span>%label%</span>
    `, data);
  }
}
