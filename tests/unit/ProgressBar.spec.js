import { shallowMount } from "@vue/test-utils";
import ProgressBar from "@/components/ProgressBar.vue";

describe("ProgressBar.vue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("is hidden on initial render", () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain("hidden"); // #A
  });

  test("initializes with 0% width", () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.element.style.width).toBe("0%"); // #A
  });

  test("displays the bar when start is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain("hidden");
    // 默认情况下 Vue 会异步地批量执行更新 (在下一轮 tick)，以避免不必要的 DOM 重绘或者是观察者计算。
    // 这意味着你在更新会引发 DOM 变化的属性后必须等待一下。你可以使用 Vue.nextTick()：
    await wrapper.vm.start();
    expect(wrapper.classes()).not.toContain("hidden");
  });

  test("sets the bar to 100% width when finish is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.start();
    await wrapper.vm.finish();
    expect(wrapper.element.style.width).toBe("100%");
  });

  test("hides the bar when finish is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.start();
    await wrapper.vm.finish();
    expect(wrapper.classes()).toContain("hidden");
  });

  test("resets to 0% width when start is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.finish();
    await wrapper.vm.start();
    expect(wrapper.element.style.width).toBe("0%");
  });

  test("removes error class when start is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.fail();
    await wrapper.vm.start();
    expect(wrapper.classes()).not.toContain("error");
  });

  test("sets the bar to 100% width when fail is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.fail();
    expect(wrapper.classes()).toContain("error");
  });

  test("styles the bar correctly when fail is called", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.fail();
    expect(wrapper.element.style.width).toBe("100%");
  });

  test("increases width by 1% every 100ms after start call", async () => {
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.start();
    await jest.runTimersToTime(100);
    expect(wrapper.element.style.width).toBe("1%");
    await jest.runTimersToTime(900);
    expect(wrapper.element.style.width).toBe("10%");
    await jest.runTimersToTime(4000);
    expect(wrapper.element.style.width).toBe("50%");
  });

  test("clears timer when finish is called", async () => {
    jest.spyOn(window, "clearInterval");
    await setInterval.mockReturnValue(123);
    const wrapper = shallowMount(ProgressBar);
    await wrapper.vm.start();
    await wrapper.vm.finish();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });
});
