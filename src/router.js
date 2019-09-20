import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import HandleRouter from "./views/handleRouter.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData && userData.isStudent && !userData.groupId) return next('/escolhe-grupo')
        if(userData && userData.isStudent && userData.groupId) return next('/grupo-aluno')
        if(userData && !userData.isStudent) return next('/pagina-professor')
        next()
      }
    },
    {
      path: "/callback",
      name: "handleRouter",
      component: HandleRouter
    },
    {
      path: "/escolhe-grupo",
      name: "escolheGrupo",
      component: () => import("./views/PrimeiroAcesso.vue"),
      beforeEnter: (to, from, next) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData && userData.isStudent && !userData.groupId) return next()
        next('/')           
      }
    },
    {
      path: "/grupo-aluno",
      name: "paginaGrupoAluno",
      component: ()=> import("./views/PaginaGrupoAluno.vue"),
      beforeEnter: (to, from, next) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData && userData.isStudent && userData.groupId) return next()
        next('/')        
      }
    },
    {
      path: "/pagina-professor",
      name: "paginaGrupoProfessor",
      component: ()=> import("./views/PaginaGrupoProfessor.vue"),
      beforeEnter: (to, from, next) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData && !userData.isStudent) return next()
        next('/')        
      }
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
