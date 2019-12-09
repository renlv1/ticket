<template>
  <div>
    <transition name="dialog">
      <div class="dialog"  @click="hide" v-show="merchantShow">
      </div>
    </transition>
    <transition name="fade-up">
      <div class="dialog-w" v-show="merchantShow" @click="hide">
        <div @click.stop>
          <ul class="uls">
            <li v-for="(item, index) in merchantsType" :key="index" class="list" @click="switchOne(item, index)" :class="{'active-list': mIndex === index}">{{item}}</li>
          </ul>
          <div class="cancel" @click="hide">取消</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {
      merchantShow: Boolean,
      merchantsType: Array,
      mIndex: Number
    },
    methods: {
      hide () {
        this.$emit('hideDialog')
      },
      switchOne (item, index) {
        this.$emit('selectOne', item, index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dialog
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 100
    background-color: rgba(0,0,0, .4)
    &.dialog-enter-active, &.dialog-leave-active
      transition: all .2s linear;
    &.dialog-enter, &.dialog-leave-to
      opacity: 0
    &.dialog-enter-to, &.dialog-leave
      opacity: 1
  .dialog-w
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    padding: 0 .5rem .5rem
    z-index: 200
    transform translate3d(0,0,0)
    &.fade-up-enter-active, &.fade-up-leave-active
      transition: all .3s linear;
    &.fade-up-enter, &.fade-up-leave-to
      transform translate3d(0,100%,0)
    &.fade-up-enter-to, &.fade-up-leave
      transform translate3d(0,0,0)
    .uls
      padding 0 .3rem
      border-radius 8px
      background-color: #fff
      border 1px solid #999
      .list
        cursor pointer
        width: 100%
        height: 1rem
        display: flex
        align-items center
        justify-content center
        color #19191a
        font-size: .28rem
        border-bottom: 1px dashed #e6e7eb
        &:last-child
          border-bottom: none
        &.active-list
          color #00a6f1
    .cancel
      cursor pointer
      border-radius 6px
      margin-top: .2rem
      width: 100%
      height: 1rem
      background-color: #fff
      color #999
      font-size: .3rem
      display: flex
      align-items center
      justify-content center
</style>
