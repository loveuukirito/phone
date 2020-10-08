<template>
  <CellGroup title="物料管理">
    <Grid clickable :column-num="2" :icon-size="38" :border="false">
      <GridItem icon-prefix="my-icon" icon="finin" text="成品入库" to="/" />
      <GridItem icon-prefix="my-icon" icon="finout" text="成品出库" to="/" />
      <GridItem icon-prefix="my-icon" icon="check" text="库存盘点" to="/" />
      <GridItem
        icon-prefix="my-icon"
        icon="receive"
        text="原料领用申请"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="retrieval"
        text="原料领用出库"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="purchase"
        text="原料采购申请"
        to="/purchaseapply"
      />
    </Grid>
  </CellGroup>
</template>

<script>
import { Cell, CellGroup, Grid, GridItem } from "vant"; 
export default {
  components: {
    Cell,
    CellGroup,
    Grid,
    GridItem
  }
};
</script>

<style scoped lang="scss">

</style>