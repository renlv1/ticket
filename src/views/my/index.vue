<template>
  <div class="home">
    <m-fixed-top :titleName="titleName"></m-fixed-top>
    <div class="content">
      <div class="banner-w">
        <div class="banner-t">
          <div class="title-w" @click="dialogShow = true">
            <div class="title-c">
              <span class="title-t">{{$t('newRecord.text1')}}</span>
              <div class="icon"></div>
            </div>
          </div>
          <h3 class="money">{{guessJoinCount}}</h3>
        </div>
      </div>
      <div class="flex-item" @click="$router.push('/myRecord')">
        <span>{{$t('newRecord.text2')}}</span>
        <img src="../../assets/img/newImage2/more.png" alt="">
      </div>
      <div class="flex-item" @click="$router.push('/voucher')">
        <span>{{$t('newRecord.text3')}}</span>
        <img src="../../assets/img/newImage2/more.png" alt="">
      </div>
    </div>
    <!--    底部菜单导航 -->
    <navbar></navbar>
    <!--    弹窗  -->
    <transition name="dialog">
      <div class="dialog-w" v-show="dialogShow">
        <div class="dialog-content">
          <div class="dialog-box">
            <h3>{{$t('newRecord.text4')}}</h3>
            <p>{{$t('newRecord.text5')}}</p>
            <p class="m-p">{{$t('newRecord.text6')}}</p>
            <p>{{$t('newRecord.text7')}}</p>
            <div class="btn-m" @click="dialogShow = false">{{$t('newRecord.text8')}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        titleName: this.$t('home.text1'),
        dialogShow: false,
        guessJoinCount: '',
        activityData: {}
      }
    },
    created () {
      this.getNewBanlance()
      this.getBalance()
    },
    methods: {
      // 获取抵扣券
      getBalance () {
        this.$fetch.get('/user/balance').then(res => {
          if (res.success) {
            this.guessJoinCount = res.data.guessJoinCount
          }
        })
      },
      getNewBanlance () {
        this.$fetch.post('/guess/queryRobotGuessInfoList', {
          pageIndex: 1,
          pageSize: 1
        }).then(res => {
          if (res.success) {
            if (res.data.length) {
              this.activityData = res.data[0]
            }
          }
        })
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop'),
      navbar: () => import('@/components/navbar')
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/css/mixin.styl';
  .home
    .top-right
      position: absolute
      right: 0
      top: 0
      height: 100%
      font-size: .3rem
      padding: 0 .3rem
    .content
      padding: 1.12rem .3rem 0 .3rem
      .banner-w
        padding: .4rem 0 .3rem
        .banner-t
          width: 100%
          height: 2.78rem
          bg-image2('banner')
          color #fff
          position: relative
          .title-w
            padding: .69rem 0 .3rem
            margin: 0 auto
            .title-c
              width auto
              justify-content center
              display: flex
            .title-t
              font-size: .28rem
            .icon
              width: .26rem
              height: .26rem
              min-width .26rem
              margin-left: .1rem
              margin-top: -.12rem
              display: block
              bg-image2('wen_one')
          .money
            font-size: .52rem
            text-align: center
          .button
            width: 4.4rem
            height .8rem
            position: absolute
            bottom: -.4rem
            left: 50%
            transform translateX(-50%)
            border-radius .4rem
            font-size: .26rem
            color #fff000
            text-align: center
            line-height: .8rem
            background-color: #24a0ff
      .flex-item
        display: flex
        align-items center
        justify-content space-between
        background-color: #f5f6fa
        border-radius 6px
        padding: 0 .3rem
        color #19191a
        font-size: .28rem
        height: 1rem
        margin-top: .3rem
        img
          width: .15rem
    .dialog-w
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom:0
      width: 100%
      height: 100%
      display: flex
      align-items center
      justify-content center
      flex-direction column
      background-color: rgba(25,25,26,.7)
      z-index: 200
      &.dialog-enter-active, &.dialog-leave-active
        opacity: 1
        transition: opacity .3s linear;
      &.dialog-enter, &.dialog-leave-to
        opacity: 0
      .dialog-box
        background-color: #fff
        width: 6.2rem
        padding: .7rem .5rem .5rem .5rem
        color #19191a
        font-size: .24rem
        border-radius 8px
        h3
          text-align: center
          font-size: .3rem
          margin-bottom: .58rem
        p
          line-height: 2
        .btn-m
          margin-top: .85rem
          width: 100%
          height: .8rem
          color #fff
          font-size: .28rem
          display: flex
          align-items center
          justify-content center
          border-radius .4rem
          background-color: #00aff0
</style>
