import { createRouter, createWebHashHistory } from 'vue-router';
import { authItemName } from '../global/ipConfig'
import { ElMessage } from 'element-plus'
import Home from '../views/home/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/board',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/board',
        name: 'board',
        meta: {
          title: '管理员看板',
        },
        component: () => import(/* webpackChunkName: "Gaikuang" */ '../views/board/index.vue')
      },
      {
        path: '/log',
        name: 'log',
        meta: {
          title: '日志',
        },
        component: () => import(/* webpackChunkName: "Gaikuang" */ '../views/log/index.vue')
      },


    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '没有权限',
    },
    component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '没有该接口',
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,

})

router.beforeEach((to, from, next) => {

  document.title = `${to.meta.title} | 高新技术学习平台`;
  const token = localStorage.getItem(authItemName);

  if (!token && to.path !== '/login') {

    next('/login');
  } else if (token && new Date() > new Date(JSON.parse(token!).expire) && to.path !== '/login') {

    localStorage.removeItem(authItemName)
    next('/login');
    ElMessage.warning("登录状态已过期，请重新登录！")
  }
  else {


    next();
  }

  next()
})

export default router
