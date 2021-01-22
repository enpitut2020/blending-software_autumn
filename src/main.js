import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';

import { FlippingWidgets } from "vue-turnjs";
import "vue-turnjs/dist/vue-turnjs.esm.css";
import VModal from 'vue-js-modal'
import ToggleButton from 'vue-js-toggle-button'

import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading)


Vue.config.productionTip = false

Vue.use(FlippingWidgets);
Vue.use(VModal)
Vue.use(ToggleButton)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
