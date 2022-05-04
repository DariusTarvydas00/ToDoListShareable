import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import AddLego from "@/views/AddLego.vue"

const routes = [
  {
    path: "/login",
    name:"Login",
    component: Login,
  },
  {
    path: "/register",
    name:"Register",
    component: Register,
  },
  {
    path: "/",
    name:"Home",
    component: Home,
  },
  {
    path: '/add',
    name:"Add",
    component:AddLego,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { UserStore } from "@/stores/userStore";

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  let loggedIn = localStorage.getItem('token');

  const time=localStorage.getItem("token_duration");
  if(time!=null&&Number.isInteger(time)){
    if(Number.parseInt(time)<Date.now()){
      loggedIn=null;
      localStorage.removeItem("token");
    }
  }


  //@todo Confirm token here on backend?
  const userStore = UserStore();
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    if(loggedIn&&!userStore.loggedInUser.id){
      userStore.getProfile();
    }
    if(!authRequired&&loggedIn){
      next("/");
    }else{
      next();
    }
  }
});


export default router
