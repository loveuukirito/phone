<template>
  <CellGroup>
    <Cell
      center
      title="颜江晨"
      :value="nowDate"
      label="15757831731"
      size="large"
    >
      <template #icon>
        <Icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="40" />
      </template>
    </Cell>
  </CellGroup>
</template>

<script>
import { Icon, Cell, CellGroup } from "vant";
import * as dd from "dingtalk-jsapi";
export default {
  components: {
    Icon,
    Cell,
    CellGroup,
  },
  data() {
    return {
      nowDate: this.$getNowTime(),
    };
  },
  mounted() {
    this.$ajax
      .post(`/api/phone/dd_wms/jq`, {
        singedUrl: window.location.href,
      })
      .then((res) => {
        var agentId = res.data.agentId;
        var corpId = res.data.corpId;
        var timeStamp = res.data.timeStamp;
        var nonceStr = res.data.nonceStr;
        var signature = res.data.signature;
        //钉钉
        if (dd.env.platform !== "notInDingTalk") {
          //钉钉签名验证
          // dd.config({
          //   agentId: "893008160",
          //   corpId: corpId,
          //   timeStamp: timeStamp,
          //   nonceStr: nonceStr,
          //   signature: signature,
          //   jsApiList: [
          //     "runtime.info",
          //     "biz.contact.choose",
          //     "device.notification.confirm",
          //     "device.notification.alert",
          //     "device.notification.prompt",
          //     "biz.user.get",
          //     "biz.customContact.multipleChoose",
          //   ],
          // });
          //手机端
          // dd.ready(function () {
          //   //获取免登码
          //   dd.runtime.permission.requestAuthCode({
          //     corpId: corpId,
          //     onSuccess: function (result) {
          //       var mdc = result.code;
          //       if (mdc) {
          //         this.$ajax.post(
          //           "/api/phone/dd_wms/getLogin?tm=" + new Date().getTime(),
          //           { mdCode: mdc }).then(res => {
          //             alert(res.data.phone)
          //           });
          //       }
          //     }
          //   });
          // });
          // dd.error(function (err) {
          //   alert("dd error: " + JSON.stringify(err));
          // });
        }
      });
  },
  methods: {
    getUserByPhone(phone) {
      var obj = new Object();
      obj.phone = phone;
      var sendData = JSON.stringify(obj);
    },
  },
};
</script>