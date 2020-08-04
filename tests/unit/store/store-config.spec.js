import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import cloneDeep from "lodash.clonedeep";
import flushPromises from "flush-promises";
import storeConfig from "@/store/store-config";
import { fetchListData } from "@/api/api";

jest.mock("@/api/api");

const localVue = createLocalVue();
localVue.use(Vuex);

function createItems() {
  const arr = new Array(22);
  return arr.fill().map((item, i) => ({ id: `a${i}`, name: "item" }));
}

describe("store-config", () => {
  test("calling fetchListData with the type returns top 20 displayItems from displayItems getter", async () => {
    expect.assertions(1);
    const items = createItems();
    const clonedStoreConfig = cloneDeep(storeConfig); // 防止不同测试之间的mutation泄露
    const store = new Vuex.Store(clonedStoreConfig);
    const type = "top";
    fetchListData.mockImplementation(calledType => {
      return calledType === type ? Promise.resolve(items) : Promise.resolve();
    });
    await store.dispatch("fetchListData", { type });

    await flushPromises();

    expect(store.getters.displayItems).toEqual(items.slice(0, 20));
  });
});
