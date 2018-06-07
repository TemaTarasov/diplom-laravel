import moment from 'moment';
import { trim, isEmpty, documentReady } from './helpers';

documentReady(function () {
  [].slice.call(this.querySelectorAll('[role="date"]')).forEach(item => {
    const value = item.innerHTML;

    if (!isEmpty(trim(value))) {
      item.innerHTML = moment(value).format('lll');
    }
  });
});
