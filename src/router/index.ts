import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { config } from './config'
import NProgress from 'nprogress';

let router: Router;

function handleRouteGuard() {
  // router前
  router.beforeEach(function (to, from, next) {
    NProgress.start();
    const routeName = to.name || 'root';
    if (!router.hasRoute(routeName) && to.path !== from.path) {
      console.error('---> router error: router not extsis', to);
      return next('/');
    }
    return next()
  })

  // router后
  router.afterEach((to, from) => {
    // 从 to 来，到 from 去
    console.debug(to, from)
    NProgress.done();
  });
}

const setupRouter = (app: App<Element>) => {
  router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: config
  })

  handleRouteGuard();

  app.use(router)
}

export { setupRouter, router }