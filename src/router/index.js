import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const Login = () => import('views/login/Login')
const Selection = () => import('views/selection/Selection')
const Timetable = () => import('views/timetable/Timetable')

const Test = () => import('views/test/Test')


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
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/',
        redirect: 'selection'
      },
      {
        path: 'selection',
        component: Selection,
        meta: {
          title: '学生选课'
        }
      },
      {
        path: 'timetable',
        component: Timetable,
        meta: {
          title: '个人课表'
        }
      },
    ]
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
  //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {
    //判断是否有标题
    console.log(to.meta.title)
    document.title = to.meta.title
  } else {
    document.title = '学生选课系统'
  }
  next()

})

// token拦截
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   const tokenStr = sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   }
//   next()
// })


export default router
