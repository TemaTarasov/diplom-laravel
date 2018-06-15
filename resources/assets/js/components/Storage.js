export const Storage = {
  /**
   * @param  {string} name
   * @param  {*} data
   * @return {* | null}
   */
  get(name, data) {
    let result = JSON.parse(localStorage.getItem(name));

    if (result === null) {
      result = data;
      window.Tarasov.storage.set(name, data);
    }

    return result;
  },
  /**
   * @param  {string} name
   * @param  {*} data
   * @return {* | null}
   */
  set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));

    return localStorage.getItem(name);
  }
};

window.Tarasov = window.Tarasov || {};

window.Tarasov.Storage = Storage;
