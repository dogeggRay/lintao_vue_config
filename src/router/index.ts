import { createRouter, createWebHistory } from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/mainpage',
    name: 'mainpage',
    component: () => import(/* webpackChunkName: "login" */ '../components/main_page.vue'),
    children: [
      {
        path: '/category',
        name: 'category',
        component: () =>
          import(
            '@/components/category/category.vue'
          ),
      },{
        path: '/homepage',
        name: 'homepage',
        component: () =>
          import(
            '@/components/homepage/homepage.vue'
          ),
      },{
        path: '/device',
        name: 'device',
        component: () =>
          import(
            '@/components/device/device.vue'
          ),
      }]
  },
  // {
  //   path: '/helloworld',
  //   name: 'helloworld',
  //   component: () => import(/* webpackChunkName: "login" */ '../components/HelloWorld.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
