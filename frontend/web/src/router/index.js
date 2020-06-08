import Vue from "vue";
import VueRouter from "vue-router";
import Summary from "../views/Summary.vue";
import About from "../views/About.vue";
import Chat from "../views/Chat.vue";
import Login from "../views/Login.vue";
import Redirect from "../views/Redirect.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
    //component: () =>
    //  import(/* webpackChunkName: "about" */ "../views/About.vue")
    component: About
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      guest: true
    },
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      guest: true
    },
    component: Register
  },
  {
    path: "/chat",
    name: "Chat",
    meta: {
      requiresAuth: true
    },
    component: Chat
  },
  {
    path:'*',
    component: Redirect
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          next()
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'Summary'})
      }
  }else {
      next()//Should go to 404?
  }
})

export default router;
