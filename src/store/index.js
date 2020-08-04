import Vue from "vue";
import Vuex from "vuex";

import storeConfig from "@/store/store-config";

Vue.use(Vuex);

export default new Vuex.Store(storeConfig);
