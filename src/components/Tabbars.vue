<template>
  <div class="tabbar">
    <Tabbar v-model="active">
      <TabbarItem name="home" icon="home-o" to="/home">首页</TabbarItem>
      <TabbarItem name="user" icon="user-o" to="/user">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  data() {
    return {
      active: "home",
    };
  },
  watch: {
    $route(to, from) {
      this.active = to.name;
    },
  },
};
</script>

<style scoped>
</style>