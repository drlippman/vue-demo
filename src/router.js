import Vue from 'vue'
import Router from 'vue-router'
import Launch from './views/Launch.vue'
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
      path: '/skip/:qn',
      name: 'skip',
      component: Skip
    }
  ]
})
