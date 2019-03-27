import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueFormGenerator from 'vue-form-generator';
import 'vue-form-generator/dist/vfg.css';

import { store } from './_store';
import { router } from './_helpers';
import App from './views/app/App';

Vue.use(VeeValidate);
Vue.use(VueFormGenerator);
// set the start locale to use
Vue.i18n.set('it'); // set in app based on state

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
