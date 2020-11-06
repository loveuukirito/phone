<template>
  <div id="user">
    <Overlay :show="showOverLay" z-index="11"> 
    </Overlay>
    <CellGroup>
      <Cell
        center
        :title="userName"
        :value="nowDate"
        :label="phone"
        size="large"
      >
        <template #icon>
          <Icon
            :name="avatar"
            size="48"
            style="margin-right: 10px"
          />
        </template>
      </Cell>
      <Cell @click="showPopup" :title="$t('Language')" v-model="value" />
    </CellGroup>

    <Popup v-model="show" position="bottom" round>
      <Picker
        show-toolbar
        :columns="columns"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </Popup>
    <Grid clickable :column-num="2" :icon-size="48" :border="false">
      <GridItem
        icon-prefix="my-icon"
        icon="finin"
        :text="$t('Fin-In')"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="finout"
        :text="$t('Fin-Out')"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="finout"
        :text="$t('Fin-Binding')"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="check"
        :text="$t('StockTaking')"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="receive"
        :text="$t('RawRequest')"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="retrieval"
        :text="$t('Raw-Out')"
        to="/"
      />
      <GridItem
        icon-prefix="my-icon"
        icon="purchase"
        :text="$t('PurchaseApply')"
        to="/purchaseapply"
      />
    </Grid>
  </div>
</template>

<script>
import {
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Popup,
  Picker,
  Locale,
  Overlay,
  Loading,
} from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";
import zhCN from "vant/es/locale/lang/zh-CN";
import * as dd from "dingtalk-jsapi";
export default {
  components: {
    Icon,
    Cell,
    CellGroup,
    Grid,
    GridItem,
    Popup,
    Picker,
    Overlay,
    Loading,
  },
  data() {
    return {
      userName: "",
      phone: "",
      avatar: "",
      value: this.$t("Simplified-Chinese"),
      nowDate: this.$getNowTime(),
      show: false,
      columns: [this.$t("Simplified-Chinese"), this.$t("English")],
      showOverLay: false
    };
  },
  created() {
    let that = this;
    if (
      !sessionStorage.getItem("username") ||
      !sessionStorage.getItem("userId")
    ) {
      that.showOverLay = true;
      //手机端
      dd.ready(function () {
        //获取免登码
        dd.runtime.permission.requestAuthCode({
          corpId: "ding5c848c3aca581fa635c2f4657eb6378f",
          onSuccess: function (result) {
            var mdc = result.code;
            if (mdc) {
              that.$http
                .get("http://10.10.255.33:8080/api/BGIReq/GetUserInfo", {
                  params: { code: mdc },
                })
                .then(
                  function (res) {
                    if (res.body.type == 1) {
                      that.userName = res.body.json.name;
                      that.phone = res.body.json.mobile;
                      that.avatar = res.body.json.avatar ? res.body.json.avatar : "https://b.yzcdn.cn/vant/icon-demo-1126.png";
                      sessionStorage.setItem("userId", res.body.json.userId);
                      sessionStorage.setItem("phone", res.body.json.mobile);
                      sessionStorage.setItem("username", res.body.json.name);
                      that.showOverLay = false;
                    }
                    // 响应成功回调
                  },
                  function (res) {
                    that.showOverLay = false;
                    Toast.fail("service error！");
                    // 响应错误回调
                  }
                );
            }
          },
        });
      });
    }
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onConfirm(value) {
      this.value = value;
      if (value == this.$t("English")) {
        Locale.use("en-US", enUS);
        this.$i18n.locale = "en";
        this.value = this.$t("English");
        this.columns = [this.$t("Simplified-Chinese"), this.$t("English")];
      } else {
        Locale.use("zh-CN", zhCN);
        this.$i18n.locale = "zh";
        this.value = this.$t("Simplified-Chinese");
        this.columns = [this.$t("Simplified-Chinese"), this.$t("English")];
      }
      this.show = false;
    },
  },
};
</script>

<style scoped lang="scss">
.van-overlay {
    background-color: #fff;
  }
</style>