import Vue from 'vue';
import Router from 'vue-router';
import Launch from './views/Launch.vue';
import Closed from './views/Closed.vue';
import Skip from './views/Skip.vue';
import Full from './views/Full.vue';
import Summary from './views/Summary.vue';

Vue.use(Router);

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
    },
    {
      path: '/full',
      name: 'full',
      component: Full
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary
    }
  ]
});
