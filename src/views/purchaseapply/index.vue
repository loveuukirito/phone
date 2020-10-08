<template>
  <div class="apply">
    <Tabs v-model="activeName" @click="changeTab">
      <Tab title="采购申请" name="purchase"></Tab>
      <Tab title="申请管理" name="apply"></Tab>
    </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  components: {
    Tab,
    Tabs,
  },
  data: {
    return() {
      activeName = "purchase";
    },
  },
  methods: {
    changeTab(name, title) {
      this.$router.push(name);
    },
  },
  watch: {
    onRefurbish(to, from) {
      console.log(to);
      this.activeName = to.name;
    },
  },
};
</script>