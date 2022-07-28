<template>
  <div class="home">
    <BaseView msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseView from "@/components/BaseView.vue";

export default Vue.extend({
  name: "Home",
  components: {
    BaseView,
  },
});
</script>
