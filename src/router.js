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
      component: Home,
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('userData')) return next('/escolhe-grupo')
        next()
      }
    },
    {
      path: "/callback",
      name: "callbackGoogle",
      component: () => import("./views/CallbackGoogle.vue"),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('userData')) return next('/escolhe-grupo')
        next()
      }
    },
    {
      path: "/escolhe-grupo",
      name: "escolheGrupo",
      component: () => import("./views/PrimeiroAcesso.vue"),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('userData')) return next()
        next('/')        
     },
    {
      path: "/pagina-grupo-aluno",
      name: "paginaGrupoAluno",
      component: ()=> import("./views/PaginaGrupoAluno.vue")
    },
    {
      path: "/pagina-grupo-professor",
      name: "paginaGrupoProfessor",
      component: ()=> import("./views/PaginaGrupoProfessor.vue")
    },
    {
      path: "*",
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('userData')) return next('/escolhe-grupo')
        next('/')        
      }
    }
  ]
});
