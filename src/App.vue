<template>
  <div id="app">
    <vHeader></vHeader>
    <keep-alive>
      <router-view />
    </keep-alive>
    <vTabbars></vTabbars>
  </div>
</template>

<script>
import vHeader from '@/components/Header.vue'
import vTabbars from '@/components/Tabbars.vue'
export default {
  components:{ 
    vHeader,
    vTabbars
  },
}
</script>

<style lang="scss">
i {
  font-style: normal;
}
.van-cell-group__title{
  background: #f7f8fa;
}
</style>
