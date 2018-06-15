// require('bootstrap');

import './moment';
import { Form, Input, Notification, Dropdown } from './components';
import { documentReady } from './helpers';

/**
 * Define axios
 *
 * @return void 0
 */
(() => {
  window.axios = require('axios');

  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;
})();

/**
 * Define components
 */
documentReady(function () {
  window.Tarasov = window.Tarasov || {};

  window.Tarasov.Notification = Notification;
  window.Tarasov.InputsManager = new Input();
  window.Tarasov.Form = Form;
  window.Tarasov.Dropdown = new Dropdown();
});
