import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import HandleRouter from "./views/HandleRouter.vue";
import { guestMiddleware } from "./middlewares/guestMiddleware"
import { authMiddleware } from "./middlewares/authMiddleware"
import { otherwiseMiddlware } from "./middlewares/otherwiseMiddleware"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: guestMiddleware
    },
    {
      path: "/callback",
      name: "HandleRouter",
      component: HandleRouter
    },
    {
      path: "/escolhe-grupo",
      name: "escolheGrupo",
      component: () => import("./views/PrimeiroAcesso.vue"),
      beforeEnter: authMiddleware
    },
    {
      path: "/grupo-aluno",
      name: "paginaGrupoAluno",
      component: ()=> import("./views/PaginaGrupoAluno.vue"),
      beforeEnter: authMiddleware
    },
    {
      path: "/pagina-professor",
      name: "paginaGrupoProfessor",
      component: ()=> import("./views/PaginaGrupoProfessor.vue"),
      beforeEnter: authMiddleware
    },
    {
      path: "*",
      beforeEnter: otherwiseMiddlware
    }
  ]
});
