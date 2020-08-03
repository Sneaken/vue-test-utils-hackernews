<template>
  <div>
    <Child test-prop="some-value" />
    <a href="https://www.google.com">Link</a>
    <p style="color: red;">Paragraph</p>
  </div>
</template>

<script>
import Child from "@/components/chapter-3/Child";
export default {
  name: "TestComponent",
  components: { Child }
};
</script>

<style scoped></style>
