import { isEmpty } from "./index";

export const queryString = {
  /**
   * @param  {string} search
   * @return {object}
   */
  __mapQueryToObject(search) {
    return search.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=');

      if (key && value) {
        return { ...acc, [key]: value };
      }

      return acc;
    }, {});
  },
  /**
   * @param  {object} object
   * @return {string}
   */
  __mapQueryObjectToString(object) {
    return Object.keys(object).reduce((acc, key, index) => index > 0 ? `${acc}&${key}=${object[key]}` : `${key}=${object[key]}`, '');
  },

  /**
   * @param  {string} attr
   * @return {string | object}
   */
  get(attr) {
    const search = this.__mapQueryToObject(window.location.search.substring(1));

    return search[attr] || search;
  },
  /**
   * @param  {object} data
   * @return void 0
   */
  set(data) {
    window.location.search = this.__mapQueryObjectToString(data);
  },
  /**
   * @param  {string} attr
   * @param  {string} data
   * @return void 0
   */
  change(attr, data) {
    const search = this.get();

    if (
      search[attr] &&
      (data && !isEmpty(data))
    ) {
      search[attr] = data;

      this.set(search);
    }
  }
};

window.Tarasov = window.Tarasov || {};

window.Tarasov.queryString = queryString;
