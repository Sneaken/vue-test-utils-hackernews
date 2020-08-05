export default [
  {
    path: "/:type(top|new|show|ask|job)/:page?",
    component: () =>
      import(/* webpackChunkName: "item-list" */ "@/views/ItemList")
  },
  { path: "/", redirect: "/top" }
];
