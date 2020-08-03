<template>
  <div>{{ testProp }}</div>
</template>
<script>
export default {
  name: "Child",
  props: ["testProp"]
};
</script>

<style scoped></style>
