import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Addagent from '../views/Addagent.vue';
import AgentPreview from '../views/AgentPreview.vue';
import UserManager from '../views/UserManager.vue';
import Deposit from '../views/Deposit.vue';
import Record from '../views/Record.vue';
import AddProduct from '../views/AddProduct.vue';
import ProductManager from '../views/ProductManager.vue';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '登录' },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { title: '用户管理' },
    children: [
      { path: '/addagent', component: Addagent, meta: { title: '添加代理商' } },
      {
        path: '/agentPreview',
        component: AgentPreview,
        meta: { title: '代理商一览' },
      },
      {
        path: '/userManager',
        component: UserManager,
        meta: { title: '用户管理' },
      },
      {
        path: '/deposit',
        component: Deposit,
        meta: { title: '充值' },
      },
      {
        path: '/record',
        component: Record,
        meta: { title: '充值记录' },
      },
      {
        path: '/addProduct',
        component: AddProduct,
        meta: { title: '编辑产品' },
      },
      {
        path: '/productManager',
        component: ProductManager,
        meta: { title: '产品管理' },
      },
    ],
  },

];
const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // 过期时间
  const datatime = window.sessionStorage.getItem('datatime')+Date.now()
  // 当前时间
  const time =  Date.now()
  if (time == datatime) {
    window.sessionStorage.clear()
  }
  if (!tokenStr) return next('/login')
  next()
})
// 路由前置导航守卫
router.beforeEach((to, from, next) => {
  // 根据路由元信息设置文档标题
  window.document.title = to.meta.title;
  next();
});
