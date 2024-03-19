import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';
Vue.use(VueRouter);

/**
 *  路由配置项
 *  hidden: true                 // 当设置为true的时候，不会出现在侧边导航栏， 比如登录、404这些件界面
 *  redirect: noRedirect         // 当设置为noRedirect的时候，出现的面包屑导航不被点击
 *  name: 'router-name'          // 设置路由的名字，必填并且需跟组件内部name保持一致 比如： views/system/user: user
 *  meta: {
 *    title: 'title'             // 设置该路由在侧边导航栏和面包屑导航中的名字
 *    icon:  'svg-name'          // 设置该路由的图标： path: src/assets/icons/svg下的文件名字
 *    noCache: true              // 当设置为true的时候，不会被keep-alive缓存「默认为false」
 *    affix: true                // 当设置为true的时候，固定在标签栏，不可被删除「默认为false」
 * }
*/
export const constantRoutes = [
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页', icon: 'dashboard', noCache: true, affix: true
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },
  {
    path: '/user/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '个人中心', icon: 'user', noCache: true, affix: false
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => { y: 0 }, // 滚动行为，切换路由、回滚到顶部
  routes: constantRoutes
})

export default router
