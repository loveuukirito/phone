<template>
  <transition name="purchase-apply">
    <div class="purchase-apply"> 
      <Overlay :show="showOverLay" z-index="11">
        <div class="wrapper">
          <Loading />
        </div>
      </Overlay>
      <Tabs v-model="activeName">
        <Tab :title="$t('PruRequest')" name="purchase">
          <div class="scanBtn" @click="onScan">
            <Icon name="scan" size="36" style="vertical-align: middle" /><span
              class="text"
              >{{$t('Scan')}}</span
            >
          </div>
          <div class="scroll-content">
            <scroll class="purchaseapply-content" ref="scroll" :data="list">
              <div>
                <CheckboxGroup
                  v-model="result"
                  ref="checkboxGroup"
                  @change="checkChange"
                >
                  <SwipeCell v-for="(item, index) in list" :key="index">
                    <Checkbox :name="index" shape="square"></Checkbox>
                    <Card :title="getMaterialName(item)" class="goods-card">
                      <template #desc>
                        <Field
                          type="textarea"
                          :label="$t('MaterialCode')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          :value="item.materialCode"
                          rows="1"
                          autosize
                          readonly
                        />
                        <Field
                          :label="$t('CurQuantity')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          :value="item.curQuantity"
                          readonly
                        />
                        <Field
                          type="textarea"
                          :label="$t('ColorInfo')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          :value="item.colorInfo"
                          rows="1"
                          autosize
                          readonly
                        />
                        <Field
                          :label="$t('MeasureUnit')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          :value="item.measureUnitName"
                          readonly
                        />
                        <Field
                          :label="$t('Quantity')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          type="number"
                          v-model="num[index]"
                          :placeholder="$t('PIQuantity')"
                          @input="changNum(index, num[index], item.curQuantity)"
                        />
                        <Field
                          :label="$t('DeliveryDate')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          v-model="DeliveryDate[index]"
                          @click="onSelectDate(index)"
                          clickable
                          readonly
                        />
                        <Field
                          :label="$t('Purpose')"
                          label-align="right"
                          label-width="8em"
                          label-class="labelText"
                          v-model="use[index]"
                          :placeholder="$t('PIPurpose')"
                        />
                      </template>
                    </Card>
                    <template #right>
                      <Button
                        square
                        :text="$t('Delete')"
                        type="danger"
                        class="delete-button"
                        @click="deleteIndex(index)"
                      />
                    </template>
                  </SwipeCell>
                </CheckboxGroup>
              </div>
            </scroll>
          </div>
          <div class="bottomBtn">
            <Button style="margin-left: 10px" @click="checkAll">{{$t('CheckAll')}}</Button>
            <Button type="info" style="margin-right: 10px" @click="saveInfo"
              >{{$t('Submit')}}</Button
            >
          </div>
          <Calendar
            v-model="showCalendar"
            :show-confirm="false"
            @confirm="onChangeDate"
          />
        </Tab>
        <Tab :title="$t('PurMgmt')" name="apply">
          <div>
            <div class="headSelect">
              <Row>
                <Col span="12">
                  <Field readonly clickable @click="showPicker = true">
                    <template #label>
                      <span style="color: #fff">{{$t('Date')}}</span>
                    </template>
                    <template #input>
                      <span style="color: #fff">{{ DateVal }}</span>
                    </template>
                  </Field>
                  <Popup v-model="showPicker" round position="bottom">
                    <Picker
                      show-toolbar
                      :columns="columns"
                      @cancel="showPicker = false"
                      @confirm="onConfirm"
                    />
                  </Popup>
                </Col>
                <Col span="12">
                  <Field readonly clickable @click="showPicker2 = true">
                    <template #label>
                      <span style="color: #fff">{{$t('Status')}}</span>
                    </template>
                    <template #input>
                      <span style="color: #fff">{{ StatusVal }}</span>
                    </template>
                  </Field>
                  <Popup v-model="showPicker2" round position="bottom">
                    <Picker
                      show-toolbar
                      :columns="columns2"
                      @cancel="showPicker2 = false"
                      @confirm="onConfirm2"
                    />
                  </Popup>
                </Col>
              </Row>
            </div>
            <div class="scroll-content" style="top: 90px; bottom: 0">
              <scroll
                class="purchaseapply-content"
                ref="scroll"
                :data="applylist"
              >
                <div>
                  <Panel
                    v-for="(item, index) in applylist"
                    :key="index"
                    :title="item.MaterialEngName"
                    :status="item.CreateTime"
                  >
                    <div style="padding: 0px 16px 10px 16px">
                      {{ item.TotalReqQuantity }}
                    </div>
                    <template #footer>
                      <div class="footerBtn">
                        <Button
                          icon="warning-o"
                          size="small"
                          @click="showDetails(item.BillGUID)"
                          >Details</Button
                        >
                        <Button
                          icon="close"
                          size="small"
                          @click="cancelBill(item.BillGUID, item.BillCode)"
                          :disabled="cancelBtn"
                          >Cancel</Button
                        >
                        <Button
                          icon="eye-o"
                          size="small"
                          @click="showQR(item.BillGUID)"
                          >QRCode</Button
                        >
                      </div>
                    </template>
                  </Panel>
                </div>
              </scroll>
            </div>
          </div>
        </Tab>
      </Tabs>
      <van-dialog
        v-model="showDialog"
        :close-on-click-overlay="true"
        :show-confirm-button="false"
      >
        <div class="ant-table-header" style="overflow: hidden">
          <table class="item-table" style="table-layout: fixed">
            <colgroup>
              <col style="width: 60%" />

              <col style="width: 40%" />
            </colgroup>
            <thead class="item-table-thead">
              <tr>
                <th>MaterialEngName</th>
                <th>ReqQuantity</th>
              </tr>
            </thead>
          </table>
        </div>
        <div
          class="ant-table-body"
          style="overflow-y: scroll; max-height: 300px"
        >
          <table class="item-table" style="table-layout: fixed">
            <colgroup>
              <col style="width: 60%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody class="item-table-tbody">
              <tr v-for="(item, index) in applyitemlist" :key="index">
                <td>{{ item.MaterialEngName }}</td>
                <td style="text-align:right">{{ item.ReqQuantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </van-dialog>
      <van-dialog
        v-model="showQrcode"
        :close-on-click-overlay="true"
        :show-confirm-button="false"
        style="width: auto"
      >
        <VueQrcode :value="code" :options="{ size: 200 }"></VueQrcode>
      </van-dialog>
    </div>
  </transition>
</template>

<script>
import Scroll from "@/components/Scroll.vue";
import * as dd from "dingtalk-jsapi";
import VueQrcode from "@xkeshi/vue-qrcode";
import {
  Tab,
  Tabs,
  Icon,
  Card,
  SwipeCell,
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Col,
  Row,
  Popup,
  Picker,
  Panel,
  Toast,
  Dialog,
  Overlay,
  Loading,
  Calendar,
} from "vant";
export default {
  components: {
    Tab,
    Tabs,
    Icon,
    Card,
    SwipeCell,
    Button,
    Scroll,
    Checkbox,
    CheckboxGroup,
    Field,
    Col,
    Row,
    Popup,
    Picker,
    Panel,
    Toast,
    [Dialog.Component.name]: Dialog.Component,
    VueQrcode,
    Overlay,
    Loading,
    Calendar,
  },
  data() {
    return {
      activeName: "purchase",
      list: [],
      result: [],
      num: [],
      use: [],
      DateVal: "OneDay",
      StatusVal: "NoCheck",
      showPicker: false,
      columns: ["OneDay", "ThreeDay", "OneWeek", "OneMonth"],
      showPicker2: false,
      columns2: ["NoCheck", "Checking", "Closed"],
      applylist: [],
      applyitemlist: [],
      barlist: [],
      DeliveryDate: [],
      showDialog: false,
      showQrcode: false,
      showOverLay: false,
      showCalendar: false,
      dateIndex: "",
      cancelBtn: false,
      code: "",
    };
  },
  created() {
    //this.showList();
  },
  methods: { 
    getMaterialName(item){
      if(this.$t('Language') == 'Language'){
        return item.materialNameEn;
      }
      else{
        return item.materialName;
      }
    },
    onScan() {
      let that = this;
      dd.biz.util.scan({
        type: "all", // type 为 all、qrCode、barCode，默认是all。
        onSuccess: function (data) {
          let bh = data.text;
          if (bh) {
            if (that.barlist.indexOf(bh) != -1) {
              Toast.fail("this material is exists！");
              return;
            } else {
              that.barlist.push(bh);
            }
            that.showOverLay = true;
            that.$http
              .get(
                "http://192.168.2.187:8080/wms/api_rawgoods/querygoodsdetail",
                {
                  params: { barcode: bh },
                }
              )
              .then(
                function (res) {
                  if (res.body.code == "200") {
                    that.DeliveryDate.push(this.$getNowDate());
                    that.list.push(res.body.data.goodsDetail);
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
        onFail: function (err) {
          Toast.fail(err);
        },
      });
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    checkChange(value) {
      this.list.forEach((el) => {
        el.checked = false;
      });
      for (let index = 0; index < value.length; index++) {
        this.list[value[index]].checked = true;
      }
    },
    deleteIndex(index) {
      this.list.splice(index, 1);
      this.barlist.splice(index, 1);
    },
    onSelectDate(index) {
      this.showCalendar = true;
      this.dateIndex = index;
    },
    onChangeDate(value) {
      let d = new Date(value);
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.DeliveryDate[this.dateIndex] = date;
      this.showCalendar = false;
    },
    changNum(index, newNum, oldNum) {
      if (newNum > oldNum) {
        this.num[index] = "";
        Toast("The input quantity is greater than the curQuantity!");
      }
    },
    saveInfo() {
      var userId = sessionStorage.getItem("userId");
      var phone = sessionStorage.getItem("phone");
      if (userId == null || userId == "") {
        Toast("user  error,  please reload system!");
        return;
      }
      var arr = [];
      for (let index = 0; index < this.list.length; index++) {
        var obj = {};
        if (this.list[index].checked) {
          obj.ReferBillID = this.list[index].barcode;
          obj.ReqQuantity = this.num[index];
          obj.DeliveryDate = this.DeliveryDate[index];
          obj.Purpose = this.use[index];
          obj.MaterialCode = this.list[index].materialCode;
          obj.MaterialName = this.list[index].materialName;
          obj.MaterialEngName = this.list[index].materialNameEn;
          if (!obj.ReqQuantity) {
            Toast(
              "barcode:" +
                obj.ReferBillID +
                " is error  maybe errors:the barcode CurQuality is null or zero"
            );
            return;
          }
          arr.push(obj);
        }
      }
      if (arr.length == 0) {
        Toast("Please select the material to collect!");
      } else { 
        let that = this;
        this.showOverLay = true;
        this.$http
          .post(
            "http://10.10.255.33:8080/api/BPR/SaveBPRBillInfo",
            JSON.stringify({ phone: phone, data: JSON.stringify(arr), userId: userId }),
            { emulateJSON: true }
          )
          .then(
            function (res) {
              if (res.body.type == 1) {
                that.showOverLay = false;
                that.barlist = []; 
                that.list = []; 
                Toast.success(res.body.message);
                that.activeName = 'apply';
                that.showList();
              }
              else{
                Toast.fail(res.body.message);
              }
              // 响应成功回调
            },
            function (res) {
              console.log(res);
              // 响应错误回调
            }
          );
      }
    },
    onConfirm(value) {
      this.DateVal = value;
      this.showPicker = false;
      this.showList();
    },
    onConfirm2(value) {
      this.StatusVal = value;
      this.showPicker2 = false;
      this.showList();
    },
    showList() {
      let that = this;
      var phone = sessionStorage.getItem("phone");
      var date = "";
      if (this.DateVal == "OneDay") {
        date = "1";
      }
      if (this.DateVal == "ThreeDay") {
        date = "3";
      }
      if (this.DateVal == "OneWeek") {
        date = "7";
      }
      if (this.DateVal == "OneMonth") {
        date = "30";
      }
      var state = "";
      if (this.StatusVal == "NoCheck") {
        state = "0";
        this.cancelBtn = false;
      }
      if (this.StatusVal == "Checking") {
        state = "1";
        this.cancelBtn = false;
      }
      if (this.StatusVal == "Closed") {
        state = "2";
        this.cancelBtn = true;
      }
      this.$http
        .get("http://10.10.255.33:8080/api/BPR/GetBPRList", {
          params: { phone: phone, state: state, date: date },
        })
        .then(
          function (res) {
            if (res.body.type == 1) {
              that.applylist = JSON.parse(res.body.value);
            }
            else{
              Toast(res.body.message);
            }
            // 响应成功回调
          },
          function (res) {
            console.log(res);
            // 响应错误回调
          }
        );
    },
    showDetails(billId) {
      let that = this;
      this.$http
        .post(
          "http://10.10.255.33:8080/api/BPR/GetBPRItemsList",
          JSON.stringify({ id: billId }),
          { emulateJSON: true }
        )
        .then(
          function (res) {
            if (res.body.type == 1) {
              that.showDialog = true;
              that.applyitemlist = JSON.parse(res.body.value);
            } 
            // 响应成功回调
          },
          function (res) {
            console.log(res);
            // 响应错误回调
          }
        );
    },
    cancelBill(billId, billCode) {
      let that = this;
      Dialog.confirm({
        message: "confirm cancel " + billCode + " applyBill?",
      })
        .then(() => {
          this.$http
            .get("http://10.10.255.33:8080/api/BPR/Cancel", {
              params: { id: billId },
            })
            .then(
              function (res) {
                if (res.body.type == 1) {
                  that.showList();
                }
                // 响应成功回调
              },
              function (res) {
                console.log(res);
                // 响应错误回调
              }
            );
        })
        .catch(() => {
          // on cancel
        });
    },
    showQR(code) {
      this.showQrcode = true;
      this.code = code;
    },
  },
  watch: {},
};
</script>
<style scoped lang="scss">
.purchase-apply-enter-active,
.purchase-apply-leave-active {
  transition: all 0.3s;
}
.purchase-apply-enter,
.purchase-apply-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}
.purchase-apply {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f7f8fa;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 46px;
    line-height: 46px;
    background-color: #ffffff;
    border-bottom: 1px solid #f3f3f3;
    .back {
      position: absolute;
      top: 4px;
      left: 4px;
      font-size: 24px;
    }
    .text {
      position: absolute;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .scanBtn {
    padding: 10px 0;
    text-align: center;
    background-color: #fff3eb;
    position: absolute;
    box-shadow: 0px 2px 8px #ebedf0;
    z-index: 2;
    width: 100%;
    .text {
      font-size: 14px;
      margin-left: 5px;
      color: #1989fa;
    }
  }
  .scroll-content {
    top: 100px;
    bottom: 55px;
    position: fixed;
    width: 100%;
    .purchaseapply-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .goods-card {
        padding-left: 50px;
        margin: 5px 0;
        background-color: white;
        .van-card__title {
          font-size: 14px;
          font-weight: bold;
        }
        .van-cell {
          padding: 0;
        }
      }
      .delete-button {
        height: 100%;
      }
      .van-checkbox {
        position: absolute;
        z-index: 2;
        top: 43%;
        left: 3%;
      }
      .van-panel {
        margin-bottom: 10px;
      }
      .van-cell::after {
        border: none;
      }
    }
  }
  .bottomBtn {
    padding: 10px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px -2px 8px #ebedf0;
  }
  .footerBtn {
    display: flex;
    justify-content: space-between;
  }
  .headSelect {
    .van-field {
      background-color: #323233;
    }
  }
  .item-table {
    width: 100%;
    text-align: left;
    border-radius: 2px 2px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    .item-table-thead {
      overflow: hidden;
    }
    .item-table-thead > tr > th {
      position: relative;
      padding: 12px;
      overflow-wrap: break-word;
      color: rgba(0, 0, 0, 0.85);
      font-weight: bold;
      text-align: left;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
    }
    .item-table-tbody {
      max-height: 350px;
      -webkit-overflow-scrolling: touch;
    }
    .item-table-tbody > tr > td {
      position: relative;
      padding: 10px;
      overflow-wrap: break-word;
      border-bottom: 1px solid #f0f0f0;
    }
  }
}
</style>