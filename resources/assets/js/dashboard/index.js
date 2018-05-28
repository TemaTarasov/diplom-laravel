import '../bootstrap';

import Table from './Table';

window.storage = {
  get(name, data) {
    let result = JSON.parse(localStorage.getItem(name));

    if (result === null) {
      result = data;
      window.storage.set(name, data);
    }

    return result;
  },
  set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));

    return localStorage.getItem(name);
  }
};

/**
 * Navigation
 *
 * @param  {*} doc
 * @return void 0
 */
(doc => {
  const _burger = doc.getElementById('burger');

  const burger = {
    target: _burger,
    data: _burger.dataset,
    state: window.storage.get('burger', false),
    navigation: doc.querySelector(_burger.dataset.target)
  };

  if (burger.state) {
    burger.navigation.classList.add(burger.data.classname);

    setTimeout(() => {
      burger.navigation.classList.remove(burger.data.classname);
      window.storage.set('burger', false);
    });
  }

  burger.target.addEventListener('click', () => {
    burger.navigation.classList.toggle(burger.data.classname);

    window.storage.set('burger', burger.navigation.classList.contains(burger.data.classname));
  });

  doc.addEventListener('click', e => {
    if (
      !e.path.some(el => {
        if (el.classList) {
          return el.classList.contains('header-burger') || el.classList.contains('navigation-content')
        }

        return false;
      })
    ) {
      burger.navigation.classList.remove(burger.data.classname);
    }
  }, true);
})(document);

/**
 * Table
 * @param  {*} doc
 * @return void 0
 */
(() => {
  window.TableManager = new Table();
})();
