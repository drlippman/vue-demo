import Vue from 'vue'
import Router from 'vue-router'
import Launch from './views/Launch.vue'
import Closed from './views/Closed.vue'
import Skip from './views/Skip.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'launch',
      component: Launch
    },
    {
      path: '/closed',
      name: 'closed',
      component: Closed
    },
    {
      path: '/skip/:qn',
      name: 'skip',
      component: Skip
    }
  ]
})
