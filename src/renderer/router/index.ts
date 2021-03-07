import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'devices',
    component: () => import('renderer/views/Devices.vue'),
  },
  {
    path: '/',
    name: 'settings',
    component: () => import('renderer/views/Settings.vue'),
  },
  {
    path: '/color-changer/:id',
    name: 'color-changer',
    component: () => import('renderer/views/ColorChanger.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
