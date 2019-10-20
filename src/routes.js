import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import RedirectorLoaderPage from "./views/RedirectorLoaderPage.vue";
import StudentWithoutGroupPage from "./views/StudentWithoutGroupPage.vue";
import StudentWithGroupPage from "./views/StudentWithGroupPage.vue";
import TeacherHomePage from "./views/TeacherHomePage.vue";
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
      name: "StudentWithoutGroupPage",
      component: StudentWithoutGroupPage,
      beforeEnter: authMiddleware
    },
    {
      path: "/grupo-aluno",
      name: "StudentWithGroupPage",
      component: StudentWithGroupPage,
      beforeEnter: authMiddleware
    },
    {
      path: "/pagina-professor",
      name: "TeacherHomePage",
      component: TeacherHomePage,
      beforeEnter: authMiddleware
    },
    {
      path: "*",
      beforeEnter: otherwiseMiddlware
    }
  ]
});
