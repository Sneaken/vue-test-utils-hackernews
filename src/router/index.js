import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/item-list"
  },
  {
    path: "/item-list",
    name: "ItemList",
    component: () =>
      import(/* webpackChunkName: "item-list" */ "@/views/ItemList")
  }
];

const router = new VueRouter({
  routes
});

export default router;
