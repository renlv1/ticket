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
      <cube-scroll
        ref="scroll3"
        :data="voucherData"
        :options="options"
        @pulling-up="onPullingDown"
        class="content-m">
        <ul class="uls">
          <div v-if="notData">
            <div class="bg-nodata"></div>
            <p class="no-text">{{$t('record.text5')}}</p>
          </div>
          <li class="list-m" v-for="(item, index) in voucherData" :key="index">
            <div class="flex-item">
              <span>{{$t('newRecord.text9')}}：{{item.activityName}}</span>
              <span>{{$changeDate(item.createAt)}}</span>
            </div>
            <div class="flex-item">
              <span>{{item.userName}}</span>
              <span >{{$t('betA.text7')}} <span class="zhu">{{item.betCount}}{{$t('home.text30')}}</span></span>
            </div>
          </li>
          <vloading v-show="loadingShow"></vloading>
          <p class="no-more" v-show="moreShow">{{$t('newRecord.text20')}}</p>
        </ul>
      </cube-scroll>
      <div class="" v-if="recordDataShow">
        <div class="bg-nodata"></div>
        <p class="no-text">{{$t('record.text5')}}</p>
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
        notData: false,
        options: {
          pullUpLoad: true
        },
        loadingShow: true,
        moreShow: false,
        recordDataShow: false,
        titleName: this.$t('home.text1'),
        dialogShow: false,
        voucherData: [],
        pageIndex: 1,
        pageSize: 20,
        guessJoinCount: ''
      }
    },
    created () {
      this.getVoucher()
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
      onPullingDown () {
        if (!this.loadMore) {
          this.$refs.scroll3.forceUpdate()
          return
        }
        this.pageIndex++
        this.$fetch.post('/guess/userQueryRefJoinRecordList', {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success) {
            this.$refs.scroll3.forceUpdate()
            this.voucherData = this.voucherData.concat(res.data)
            if (res.data.length < this.pageSize || res.data.length === 0) {
              this.loadMore = false
              this.moreShow = true
            } else {
              this.moreShow = false
              this.loadMore = true
            }
          }
        })
      },
      // 抵扣券明细
      getVoucher () {
        this.$fetch.post('/guess/userQueryRefJoinRecordList', {
          pageIndex: 1,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success) {
            this.loadingShow = false
            this.voucherData = res.data
            if (res.data.length === 0) {
              this.recordDataShow = true
            } else {
              this.recordDataShow = false
            }
            if (res.data.length < this.pageSize) {
              this.loadMore = false
              this.options.pullUpLoad = false
            } else {
              this.loadMore = true
            }
          } else {
            this.loadingShow = false
          }
        })
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop'),
      navbar: () => import('@/components/navbar'),
      vloading: () => import('@/components/loading')
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../assets/css/mixin.styl';
  .content-m
    position: fixed
    top: 4.7rem
    left: 0
    width: 100%
    height auto
    bottom: 1.2rem
    padding: 0 .3rem
    .no-more
      text-align: center
      font-size: .28rem
      padding-top: .5rem
  .bg-nodata
    width: .79rem
    height: .76rem
    bg-image2('nobet')
    margin: .6rem auto 0
  .no-text
    text-align: center
    font-size: .28rem
    color #999
    margin-top: .3rem
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
        padding: .4rem 0 .5rem
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
      .uls
        .list-m
          border-bottom: 1px solid #e6e7eb
          height: 1.28rem
          display: flex
          justify-content center
          flex-direction column
      .flex-item
        display: flex
        align-items center
        justify-content space-between
        color #19191a
        font-size: .28rem
        &:nth-child(1)
          margin-bottom: .2rem
        .zhu
          color #00aff0
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
