import moment from 'moment';
import {trim} from './helpers/string';

(doc => {
  [].slice.call(doc.querySelectorAll('[role="date"]')).forEach(item => {
    const value = item.innerHTML;

    if (trim(value) !== '') {
      item.innerHTML = moment(value).format('lll');
    }
  });
})(document);
