// require('bootstrap');

import './moment';
import { Form, Input, Notification } from "./ui/components";

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;

window.Tarasov = window.Tarasov || {};

window.Tarasov.Notification = Notification;
window.Tarasov.InputsManager = new Input();
window.Tarasov.Form = Form;
