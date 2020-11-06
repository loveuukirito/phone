<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    //  点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true,
    },
    //  是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false,
    },
    //  是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false,
    },
    //  列表的数据
    data: {
      type: Array,
      default: null,
    },
    /** * 是否派发滚动到底部的事件，用于上拉加载 */
    pullup: {
      type: Boolean,
      default: false,
    },
    /** * 是否派发顶部下拉的事件，用于下拉刷新 */
    pulldown: {
      type: Boolean,
      default: false,
    },
    /** * 是否派发列表滚动开始的事件 */
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    /** * 当数据更新后，刷新scroll的延时。 */
    refreshDelay: {
      type: Number,
      default: 20,
    },
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
      });
      // 是否派发滚动事件
      if (this.listenScroll) {
        let _this = this;
        this.scroll.on("scroll", (pos) => {
          _this.$emit("scroll", pos);
        });
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchend", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
};
</script>

<style>
</style>
