import '../bootstrap';
import { documentReady } from '../helpers';

/**
 * Sign-in form
 *
 * @return void 0
 */
documentReady(function () {
  new window.Tarasov.Form('#sign-in', ['login', 'password'], '/api/v1/login', 'post', function (res) {
    if (res.data.status === 422 && res.data.error) {
      return window.Tarasov.Notification.notify({
        type: 'warning',
        content: res.data.error
      });
    }

    if (res.data.status === 200) {
      location.href = '/dashboard';
    }
  });
});
