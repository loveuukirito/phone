<template>
  <div class="tabbar">
    <Tabbar v-model="active">
      <TabbarItem name="home" icon="home-o" to="/home">主页</TabbarItem>
      <TabbarItem name="setting" icon="setting-o" to="/setting">设置</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant"; 
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      active: 'home',
    };
  }, 
};
</script>

<style scoped>

</style>