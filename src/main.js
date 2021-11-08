import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import VueTheMask from 'vue-the-mask';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import './validation-rules';

import '@/assets/styles/icons.css';
import '@/assets/styles/overrides.css';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueTheMask);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
