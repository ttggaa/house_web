import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import allot from '@/components/business/allot'
import customer from '@/components/business/customer'
import hr from '@/components/company/hr'
import org from '@/components/company/org'
import post from '@/components/company/post'
import log from '@/components/system/log'
import user from '@/components/system/sys_user/user'
import area from '@/components/system/sys_area/area'
import increment from '@/components/system/sys_increment/increment'
import dictionary from '@/components/system/sys_dictionary/dictionary'
import permission from '@/components/system/sys_permission/permission'
import permission2 from '@/components/system/sys_permission/permission2'
import role from '@/components/system/sys_role/role'
import areaBusi from '@/components/business/area/area'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/allot',
      name: 'allot',
      component: allot
    },{
      path: '/customer',
      name: 'customer',
      component: customer
    },{
      path: '/hr',
      name: 'hr',
      component: hr
    },{
      path: '/org',
      name: 'org',
      component: org
    },{
      path: '/post',
      name: 'post',
      component: post
    },{
      path: '/dictionary',
      name: 'dictionary',
      component: dictionary
    },{
      path: '/log',
      name: 'log',
      component: log
    },{
      path: '/permission',
      name: 'permission',
      component: permission
    },{
      path: '/permission2',
      name: 'permission2',
      component: permission2
    },{
      path: '/role',
      name: 'role',
      component: role
    },{
      path: '/user',
      name: 'user',
      component: user
    },{
      path: '/area',
      name: 'area',
      component: area
    },{
      path: '/increment',
      name: 'increment',
      component: increment
    },{
      path: '/areaBusi',
      name: 'areaBusi',
      component: areaBusi
    }
  ]
})
