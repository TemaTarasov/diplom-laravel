import '../bootstrap';

import { Form, Input } from './components';

(doc => {
  window.Tarasov = window.Tarasov || {};
  window.Tarasov.InputsManager = new Input(doc);
  window.Tarasov.Form = Form;
})(document);
