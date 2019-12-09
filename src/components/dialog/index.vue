<template>
  <transition name="safeDialog">
    <div class="dialog-w dialog-safe-w" v-show="visible">
      <div class="dialog-safe">
        <div class="close" @click="visible = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-title" style="margin-top: .5rem;">{{title}}</div>
        <div class="comfirm" @click="okCallback">{{okText}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    type: String,
    title: String,
    msg: String,
    okFn: Function,
    okText: String,
    cancelFn: Function,
    cancelText: String,
    align: String
  },
  methods: {
    okCallback () {
      this.visible = false
      this.okFn && this.okFn()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dialog-safe-w
    display: flex
    align-items center
    justify-content center
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom:0
    width: 100%
    height: 100%
    z-index: 2000 !important
    color #19191a
    background-color: rgba(25,25,26,.7)
    &.safeDialog-enter, &.safeDialog-leave-to
      opacity: 0;
      .dialog-safe
        transform: translate(0, -5%)
    &.safeDialog-enter-active
      transition: .3s;
      .dialog-safe
        transition: .3s
    &.safeDialog-leave-active
      transition: .1s;
      .dialog-safe
        transition: .1s
    .dialog-safe
      width: 6.9rem
      background-color: #fff
      position: relative
      border-radius 4px
      color #17161f
      font-size: .28rem;
      transform: translate(0, 0)
      padding: 0 .5rem .5rem
      .close
        position: absolute
        right: 0
        top: 0
        padding: .4rem
        .close-icon
          width: .32rem
          height: .32rem
          bg-image('close_one')
      .dialog-title
        font-size: .32rem
        font-weight: bold
        color #17161f
        padding: .5rem 0 .6rem
        text-align: center
      .form-item
        margin-bottom: .4rem
        .label
          margin-bottom: .2rem
        .input
          width: 100%
          height: .8rem
          border-radius .4rem
          background-color: #f5f6fa
          padding: 0 .3rem
          color #17161f
      .err-ms
        color: #ff151d;
        text-align: center;
        margin-top: .3rem;
      .shortMsg
        position relative
        .payMsg-box
          .payMsg
            width 100%
            height .8rem
            background-color #f5f6fa
            border-radius .4rem
            font-size .28rem
            padding 0 .3rem
          .sendMsg
            position absolute
            top 0
            right 0
            height: 100%
            padding: 0 .2rem
            background-color transparent
            border none
            outline none
            font-size: .28rem
            color #00a6f1
      .comfirm
        width: 100%
        height: .8rem
        display: flex
        align-items center
        justify-content center
        background-color: #00a6f1
        color #fff
        margin-top: .6rem
        border-radius .4rem
</style>
