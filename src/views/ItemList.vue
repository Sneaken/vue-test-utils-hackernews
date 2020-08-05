<template>
  <div class="item-list-view">
    <div class="item-list-nav">
      <router-link
        v-if="currentPage > 1"
        :to="'/' + type + '/' + (currentPage - 1)"
      >
        &lt; prev
      </router-link>
      <a v-else>&lt; prev</a>
      <span>{{ currentPage || 1 }} / {{ maxPage }}</span>
      <router-link
        v-if="(currentPage || 1) < maxPage"
        :to="'/' + type + '/' + ((Number(currentPage) || 1) + 1)"
      >
        more &gt;
      </router-link>
      <a v-else>more &gt;</a>
    </div>
    <div class="item-list">
      <item v-for="item in displayItems" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";

export default {
  components: {
    Item
  },
  computed: {
    displayItems() {
      return this.$store.getters.displayItems;
    },
    currentPage() {
      return this.$route.params.page;
    },
    maxPage() {
      return this.$store.getters.maxPage;
    },
    type() {
      return this.$route.params.type;
    }
  },
  beforeMount() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.$bar.start();
      this.$store
        .dispatch("fetchListData", {
          type: this.type
        })
        .then(() => {
          if (
            !Number(this.currentPage) ||
            this.currentPage > this.maxPage ||
            this.currentPage <= 0
          ) {
            this.$router.replace(`/${this.type}/1`);
            return;
          }
          this.$bar.finish();
        })
        .catch(() => {
          this.$bar.fail();
        });
    }
  }
};
</script>

<style scoped>
.item-list-view {
  padding-top: 45px;
}
.item-list {
  background-color: #fff;
  border-radius: 2px;
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.item-list-nav {
  padding: 15px 30px;
  position: fixed;
  text-align: center;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 998;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.item-list-nav a {
  margin: 0 1em;
}
.item-list-nav .disabled {
  color: #ccc;
}

@media (max-width: 600px) {
  .item-list {
    margin: 10px 0;
  }
}
</style>
