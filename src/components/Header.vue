<template>
  <div class="m-header">
    <NavBar :title="title"></NavBar>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: "主页",
    };
  },
};
</script>

<style scoped>
</style>