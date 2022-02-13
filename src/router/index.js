import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/login.vue'

Vue.use(VueRouter)
import Layout from "@/Layout/index.vue";
export const routes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
        {
            path: "/redirect/:path*",
            component: () => import("@/views/redirect/index"),
        },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
        {
            path: "index",
            name: "index",
            component: () => import("@/views/Home/index.vue"),
            meta: {
                title: 'HOME',
                icon: "user",
            },
        },
    ],
  },
  {
    path: "/page1",
    component: Layout,
    meta:{
      title:'Nest Page',
      icon:'user'
    },
    children: [
        {
          path: "index",
          name: "index",
          component: () => import("@/views/Page1/index.vue"),
          meta: {
              title: 'Page1_0',
          },
        },
        {
          path: "page1_1",
          name: "page1_1",
          component: () => import("@/views/Page1/page1_1.vue"),
          meta: {
              title: 'Page1_1',
          },
      },
    ],
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
