import Vue from "vue";
import VueRouter from "vue-router";
import routerConfig from "@/router/router.config";
Vue.use(VueRouter);

const router = new VueRouter(routerConfig);

export default router;
