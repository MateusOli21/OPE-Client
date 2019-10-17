import "@babel/polyfill";
import dotenv from "dotenv";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import routes from "./routes";

dotenv.config();
Vue.config.productionTip = false;

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674"
};

Vue.use(VueSweetalert2, options);

routes.beforeEach((to, from, next) => {
  document.title = "Sistema Gerenciador de OPE";
  next();
});

new Vue({
  router: routes,
  vuetify,
  render: h => h(App)
}).$mount("#app");

