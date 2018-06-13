export const Storage = {
  get(name, data) {
    let result = JSON.parse(localStorage.getItem(name));

    if (result === null) {
      result = data;
      window.Tarasov.storage.set(name, data);
    }

    return result;
  },
  set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));

    return localStorage.getItem(name);
  }
};