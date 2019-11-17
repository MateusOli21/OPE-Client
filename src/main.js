import "@babel/polyfill";
import dotenv from "dotenv";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import routes from "./routes";
import vueKanban from 'vue-kanban'
import { store } from './store/store'

dotenv.config();
Vue.config.productionTip = false;
Vue.use(vueKanban)

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674"
};

Vue.use(VueSweetalert2, options);

new Vue({
  router: routes,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");

