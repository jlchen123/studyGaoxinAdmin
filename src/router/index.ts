import { createRouter, createWebHashHistory } from 'vue-router';


import Home from '../views/home/index.vue'

const routes= [
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


    ]
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,

})

// router.beforeEach((to, from, next) => {

//   document.title = `${to.meta.title} | 高新技术学习平台`;
//   const token = localStorage.getItem('authorizeM');

//   if (!token && to.path !== '/login') {

//     next('/login');
//   } else if (token && new Date() > new Date(JSON.parse(token!).expire) && to.path !== '/login') {

//     localStorage.removeItem('authorizeM')
//     next('/login');
//      ElMessage.warning("登录状态已过期，请重新登录！")
//   }
//   else {


//     next();
//   }

//   next()
// })

export default router
