import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import RedirectorLoaderPage from "./views/RedirectorLoaderPage.vue";
import StudentWithoutGroupPage from "./views/StudentWithoutGroupPage.vue";
import PaginaGrupoAluno from "./views/PaginaGrupoAluno.vue";
import PaginaGrupoProfessor from "./views/PaginaGrupoProfessor.vue";
import DetailsGroupPage from "./views/DetailsGroupPage.vue";
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
      name: "chooseGroup",
      component: StudentWithoutGroupPage,
      beforeEnter: authMiddleware
    },
    {
      path: "/grupo-aluno",
      name: "paginaGrupoAluno",
      component: PaginaGrupoAluno,
      beforeEnter: authMiddleware
    },
    {
      path: "/pagina-professor",
      name: "paginaGrupoProfessor",
      component: PaginaGrupoProfessor,
      beforeEnter: authMiddleware
    },
    {
      path: "/detalhes-grupo",
      name: "groupDetails",
      component: DetailsGroupPage
    },
    {
      path: "*",
      beforeEnter: otherwiseMiddlware
    }
  ]
});
