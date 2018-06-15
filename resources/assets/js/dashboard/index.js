import '../bootstrap';

import { Table, Storage } from '../components';
import { documentReady } from '../helpers';

/**
 * Navigation
 *
 * @return void 0
 */
documentReady(function () {
  const _burger = this.getElementById('burger');

  const burger = {
    target: _burger,
    data: _burger.dataset,
    state: window.Tarasov.Storage.get('burger', false),
    navigation: this.querySelector(_burger.dataset.target)
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

  this.addEventListener('click', e => {
    if (
      !e.composedPath().some(el => {
        if (el.classList) {
          return el.classList.contains('header-burger') || el.classList.contains('navigation-content')
        }

        return false;
      })
    ) {
      burger.navigation.classList.remove(burger.data.classname);
    }
  }, true);
});

/**
 * Table
 *
 * @return void 0
 */
documentReady(function () {
  window.Tarasov.TableManager = new Table();
});
