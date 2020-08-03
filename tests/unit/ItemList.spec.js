import { shallowMount } from "@vue/test-utils";
import ItemList from "@/views/ItemList.vue";
import Item from "@/components/Item.vue";

describe("ItemList.vue", () => {
  test("renders an Item with data for each item in window.items", () => {
    window.items = [{}, {}, {}];
    const wrapper = shallowMount(ItemList);
    const items = wrapper.findAllComponents(Item);
    console.log(items);
    expect(items).toHaveLength(window.items.length);
    items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(window.items[i]);
    });
  });
});
