import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import RedirectorLoaderPage from "./views/RedirectorLoaderPage.vue";
import { guestMiddleware } from "./middlewares/guestMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { otherwiseMiddlware } from "./middlewares/otherwiseMiddleware";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "LoginPage",
      component: LoginPage,
      beforeEnter: guestMiddleware
    },
    {
      path: "/callback",
      name: "RedirectorLoaderPage",
      component: RedirectorLoaderPage
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
      component: () => import("./views/PaginaGrupoAluno.vue"),
      beforeEnter: authMiddleware
    },
    {
      path: "/pagina-professor",
      name: "paginaGrupoProfessor",
      component: () => import("./views/PaginaGrupoProfessor.vue"),
      beforeEnter: authMiddleware
    },
    {
      path: "/detalhes-grupo",
      name: "groupDetails",
      component: () => import("./views/DetailsGroupPage.vue")
    },
    {
      path: "*",
      beforeEnter: otherwiseMiddlware
    }
  ]
});
