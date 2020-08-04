import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import ItemList from "@/views/ItemList.vue";
import Item from "@/components/Item.vue";
import flushPromises from "flush-promises";
import merge from "lodash.merge";

jest.mock("@/api/api.js");
const localVue = createLocalVue();
localVue.use(Vuex);

describe("ItemList.vue", () => {
  // 使用工厂模式创建 store 来代替 beforeEach
  function createStore(overrides) {
    const defaultStoreConfig = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    };
    return new Vuex.Store(merge(defaultStoreConfig, overrides));
  }

  // 使用工厂模式创建 包装器
  function createWrapper(overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        }
      },
      localVue,
      store: createStore()
    };
    return shallowMount(ItemList, merge(defaultMountingOptions, overrides));
  }

  test("renders an Item with data for each item in displayItems", () => {
    const items = [{}, {}, {}];
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    });
    const wrapper = createWrapper({ store });
    const Items = wrapper.findAllComponents(Item);
    expect(Items).toHaveLength(items.length);
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i]);
    });
  });

  test("calls $bar start on load", () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    };
    createWrapper({ mocks });
    expect(mocks.$bar.start).toHaveBeenCalledTimes(1);
  });

  test("calls $bar.finish when load is successful", async () => {
    expect.assertions(1);
    const mocks = {
      $bar: {
        start: () => {},
        finish: jest.fn()
      }
    };
    createWrapper({ mocks });
    await flushPromises();
    expect(mocks.$bar.finish).toHaveBeenCalled();
  });

  test("calls $bar.fail when load unsuccessful", async () => {
    expect.assertions(1);
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    };
    const store = createStore({
      actions: {
        fetchListData: jest.fn(() => Promise.reject())
      }
    });
    createWrapper({ mocks, store });
    await flushPromises();
    expect(mocks.$bar.fail).toHaveBeenCalled();
  });

  test("dispatches fetchListData with top", async () => {
    expect.assertions(1);
    const store = createStore();
    store.dispatch = jest.fn(() => Promise.resolve());
    createWrapper({ store });
    await flushPromises();
    expect(store.dispatch).toHaveBeenCalledWith("fetchListData", {
      type: "top"
    });
  });

  test("calls $bar.fail when fetchListData throws", async () => {
    expect.assertions(1);
    const mocks = {
      $bar: {
        start: jest.fn(),
        fail: jest.fn()
      }
    };
    const store = createStore({
      actions: {
        fetchListData: jest.fn(() => Promise.reject("network error"))
      }
    });
    createWrapper({ mocks, store });
    await flushPromises();
    expect(mocks.$bar.fail).toHaveBeenCalled();
  });
});
