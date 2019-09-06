import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/callback",
      name: "callbackGoogle",
      component: () => import("./views/CallbackGoogle.vue")
    },
    {
      path: "/escolhe-grupo",
      name: "escolheGrupo",
      component: () => import("./views/PrimeiroAcesso.vue")
    }
  ]
});
