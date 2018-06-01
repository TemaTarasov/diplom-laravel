import '../bootstrap';

import { Table, Storage } from './components';

window.Tarasov = window.Tarasov || {};
window.Tarasov.Storage = Storage;

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
    state: window.Tarasov.Storage.get('burger', false),
    navigation: doc.querySelector(_burger.dataset.target)
  };

  if (burger.state) {
    burger.navigation.classList.add(burger.data.classname);

    setTimeout(() => {
      burger.navigation.classList.remove(burger.data.classname);
      window.Tarasov.Storage.set('burger', false);
    });
  }

  burger.target.addEventListener('click', () => {
    burger.navigation.classList.toggle(burger.data.classname);

    window.Tarasov.Storage.set('burger', burger.navigation.classList.contains(burger.data.classname));
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
  window.Tarasov.TableManager = new Table();
})();
