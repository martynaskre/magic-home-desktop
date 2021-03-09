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
    path: '/color-changer/:address',
    name: 'color-changer',
    component: () => import('renderer/views/ColorChanger.vue'),
  },
  {
    path: '/keybind-changer/:address',
    name: 'keybind-changer',
    component: () => import('renderer/views/KeybindChanger.vue'),
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
