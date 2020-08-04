import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import ItemList from "@/views/ItemList.vue";
import Item from "@/components/Item.vue";
import { fetchListData } from "@/api/api";
import flushPromises from "flush-promises";

jest.mock("@/api/api.js");
const localVue = createLocalVue();
localVue.use(Vuex);

describe("ItemList.vue", () => {
  let storeOptions, store;

  // 在每个测试之前重新分配 storeOptions, store
  beforeEach(() => {
    storeOptions = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    };
    store = new Vuex.Store(storeOptions);
  });

  test("renders an Item with data for each item", () => {
    expect.assertions(4);
    const $bar = {
      start: () => {},
      finish: () => {}
    };
    const items = [{}, {}, {}];
    storeOptions.getters.displayItems.mockReturnValue(items);
    const wrapper = shallowMount(ItemList, {
      mocks: { $bar },
      localVue,
      store
    });
    const Items = wrapper.findAllComponents(Item);
    expect(Items).toHaveLength(items.length);
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i]);
    });
  });

  test("calls $bar start on load", () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    };
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    expect($bar.start).toHaveBeenCalledTimes(1);
  });

  test("calls $bar.finish when load is successful", async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      finish: jest.fn()
    };
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();

    expect($bar.finish).toHaveBeenCalled();
  });

  test("calls $bar.fail when load unsuccessful", async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      fail: jest.fn()
    };
    fetchListData.mockImplementationOnce(() => Promise.reject());
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();

    expect($bar.fail).toHaveBeenCalled();
  });

  test("dispatches fetchListData with top", async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      fail: () => {}
    };
    store.dispatch = jest.fn(() => Promise.resolve());
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    expect(store.dispatch).toHaveBeenCalledWith("fetchListData", {
      type: "top"
    });
  });

  test("calls $bar.fail when fetchListData throws", async () => {
    expect.assertions(1);
    const $bar = {
      start: jest.fn(),
      fail: jest.fn()
    };
    storeOptions.actions.fetchListData.mockRejectedValue("network error");
    shallowMount(ItemList, { mocks: { $bar }, localVue, store });
    await flushPromises();
    expect($bar.fail).toHaveBeenCalled();
  });
});
