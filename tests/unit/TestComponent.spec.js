import TestComponent from "@/components/TestComponent";
import { shallowMount } from "@vue/test-utils";
import Child from "@/components/Child";

describe("test TestComponent", () => {
  test("test child props", () => {
    const prop = {
      testProp: "some-value"
    };
    const child = shallowMount(TestComponent).findComponent(Child);
    expect(child.props().testProp).toBe(prop.testProp);
  });
  test("test a href", () => {
    const href = "https://www.google.com";
    const a = shallowMount(TestComponent).find("a");
    expect(a.attributes().href).toBe(href);
  });
  test("test style", () => {
    const color = "red";
    const p = shallowMount(TestComponent).find("p");
    expect(p.element.style.color).toBe(color);
  });
});
