<template>
  <div id="app"> 
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- <vTabbars></vTabbars> -->
  </div>
</template>

<script> 
//import vTabbars from "@/components/Tabbars.vue";  
export default {
  components: {  
    
  }, 
};
</script>

<style lang="scss">
i {
  font-style: normal;
}
.van-grid-item__content {
  padding: 28px 8px !important;
}
.van-field__label {
  margin-right: 0 !important;
}
</style>
