import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ProgressBar from "@/components/ProgressBar";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

const bar = new Vue(ProgressBar).$mount();
Object.defineProperty(Vue.prototype, "$bar", {
  get() {
    return bar;
  }
});
document.body.appendChild(bar.$el);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
