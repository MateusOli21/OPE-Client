import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import dotenv from "dotenv";
import VueCookies from "vue-cookies";

dotenv.config();
Vue.config.productionTip = false;

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674"
};

Vue.use(VueSweetalert2, options);
Vue.use(VueCookies);
VueCookies.config("7d");

router.beforeEach((to, from, next) => {
  document.title = "Sistema Gerenciador de OPE";
  next();
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
