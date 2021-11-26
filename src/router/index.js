import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/Home')
const Test = () => import('views/test/Test')
const Login = () => import('views/login/Login')

const routes = [
  {
    path: '/',
    redirect: '/login',

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      title: '测试'
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 设置标题
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})


export default router
