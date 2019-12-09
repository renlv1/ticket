<template>
  <div class="fixed-top">
    <div class="goback" v-show="isGoBack" @click="goBack">
      <div class="goback-icon"></div>
    </div>
    <div class="name nowrap" :class="{'padding-left': !isGoBack}">{{titleName}}</div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  props: {
    titleName: String,
    isGoBack: {
      type: Boolean,
      default: true
    },
    isGoNumber: Boolean
  },
  methods: {
    goBack () {
      if (this.isGoBack === true && !this.isGoNumber) { // 返回上一页
        this.$router.go(-1)
      } else if (this.isGoBack === true && this.isGoNumber === true) { // 返回指定的页面
        this.$emit('goPath')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/css/mixin.styl';
.fixed-top
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  height: 1.12rem;
  line-height: 1.12rem;
  text-align: center;
  color: #19191a;
  border-bottom: 1px solid #ececec;
  background: #fff;
  font-size: .3rem;
  .goback
    box-sizing border-box
    padding: .3rem
    position: absolute;
    left: 0;
    top 0
    height: 100%
    .goback-icon
      margin-top: .05rem
      height: .36rem;
      width: .38rem;
      bg-image('back')
</style>
