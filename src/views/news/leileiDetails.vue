<template>
  <div class="game-record-detail-w">
    <m-fixed-top :titleName="titleName" class="top-ma"></m-fixed-top>
    <cube-scroll
      ref="scroll5"
      :data="roundData"
      :options="options"
      @pulling-up="onPullingDown"
      class="content-m">
      <ul class="uls">
        <p class="title-a">
          <img :src="getSrc(newsDetail.orderType)" alt=""> <span class="title-t">{{newsDetail.title}}</span></p>
        <p class="time-a">
          <img src="../../assets/img/notice/lightTime.png" alt="">
          <span v-show="newsDetail.createAt">{{$changeDate(newsDetail.createAt)}}</span>
        </p>
        <div class="money-w">
          <div class="flex-item flex-item2">
            <div class="left-m">
              <p class="bord">{{$t('ruleTwo.text19')}}{{newsDetail.orderId}}{{$t('record.text31')}}</p>
            </div>
          </div>
          <div class="flex-item">
            <span>{{$t('rule.text20')}}</span>
            <span class="money-light">{{$fourNumber(gameMoneyData.bonusPoolAmountSum)}} {{$t('record.text22')}}</span>
          </div>
          <div class="flex-item">
            <span>{{$t('rule.text21')}}</span>
            <span class="money-light">{{$fourNumber(gameMoneyData.winAmountTotal)}} {{$t('record.text22')}}</span>
          </div>
          <div class="flex-item">
            <span>{{$t('ruleTwo.text34')}}</span>
            <span class="money-light" v-if="gameMoneyData.winnerCount && Number(gameMoneyData.winnerCount) > 0">{{gameMoneyData.winnerCount}} {{$t('ruleTwo.text37')}}</span>
            <span class="money-light" v-else>0 {{$t('ruleTwo.text37')}}</span>
          </div>
          <div class="flex-item">
            <span>{{$t('ruleTwo.text35')}}</span>
            <span class="money-light">{{gameMoneyData.joinTotalCount}} {{$t('ruleTwo.text37')}}</span>
          </div>
        </div>
        <div class="left-m title-m">
          <div class="slide"></div>
          <p class="bord">{{$t('ruleTwo.text36')}}</p>
        </div>

        <div v-if="notData">
          <div class="bg-nodata"></div>
          <p class="no-text">{{$t('record.text5')}}</p>
        </div>
        <div>
          <li class="list" v-for="(item, index) in roundData" :key="index">
            <div class="left">
              <div class="margin" :class="{'three-rank': index < 3, 'other-rank': index > 2}">{{index + 1}}</div>
              <div class="name-u"> <div class="margin">{{item.userName}}</div></div>
            </div>
            <div class="rihgt">
              <div class="rank-money  money-light">{{item.levelsNum}}{{$t('ruleTwo.text20')}}</div>
              <div>{{$t('ruleTwo.text38')}}: {{$fourNumber(item.winAmount)}} {{$t('record.text22')}}</div>
            </div>
          </li>
        </div>
        <vloading v-show="loadingShow"></vloading>
        <p class="no-more" v-show="moreShow">{{$t('newRecord.text20')}}</p>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        titleName: this.$t('betA.text10'),
        loadingShow: true,
        moreShow: false,
        loadMore: true,
        options: {
          pullUpLoad: true
        },
        notData: false,
        pageIndex: 1,
        pageSize: 30,
        roundData: [],
        newsDetail: '',
        gameMoneyData: ''
      }
    },
    created () {
      if (this.$route.query.id) {
        this.getNews()
      }
    },
    methods: {
      getSrc (type) { // 0：普通公告 1：机器人竞猜公告 2：雷雷风暴游戏公告
        if (type === 0) return require('../../assets/img/notice/message.png')
        if (type === 1 || type === 2) return require('../../assets/img/notice/game.png')
      },
      // 本期奖池数据
      getMoney (orderId) {
        this.$fetch.post('/stormgame/queryStormGamesInfoById', {
          activityId: orderId
        }).then(res => {
          if (res.success) {
            this.gameMoneyData = res.data.stormGamesRecord
          }
        })
      },
      // 公告详情
      getNews () {
        this.$fetch.post('/announcement/getAnnouncementDetail', {
          id: this.$route.query.id
        }).then(res => {
          if (res.success) {
            this.newsDetail = res.data
            this.getRecord()
            this.getMoney(res.data.orderId)
          }
        })
      },
      onPullingDown () {
        if (!this.loadMore) {
          this.$refs.scroll5.forceUpdate()
          return
        }
        this.pageIndex++
        this.$fetch.post('/stormgame/queryStormGamesRankingList', {
          activityId: this.$route.query.id,
          pageIndex:this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success) {
            this.$refs.scroll5.forceUpdate()
            this.roundData = this.roundData.concat(res.data)
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
      // 排名
      getRecord () {
        this.$fetch.post('/stormgame/queryStormGamesRankingList', {
          activityId: this.newsDetail.orderId,
          pageIndex:1,
          pageSize: this.pageSize
        }).then(res => {
          this.loadingShow = false
          if (res.success) {
            if (res.data.length === 0) {
              this.notData = true
              this.loadMore = false
            }
            if (res.data.length < this.pageSize) {
              this.loadMore = false
            }
            this.roundData = res.data
          }
        })
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop'),
      vloading: () => import('@/components/loading')
    }
  }
</script>

<style scoped lang="stylus">
@import "../../assets/css/mixin.styl"
.game-record-detail-w
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  width: 100%
  background: url("../../assets/img/notice/gameBG.png") no-repeat center / cover
  .top-ma
    background: transparent
    border-bottom none
.content-m
  padding: 0 .3rem
  overflow: hidden
  position: fixed
  height auto
  top: 1.12rem
  bottom: 0
  left: 0
  width: 100%
  .no-more
    font-size: .3rem
    color #19191a
    text-align: center
    padding: .3rem 0
  .uls
    padding-top: .4rem
    margin-bottom: .5rem
    .money-light
      color #00aff0
    .title-a
      display: flex
      align-items center
      img
        width: .36rem
        display: block
        margin-right: .16rem
      .title-t
        font-weight: bold
        font-size: .34rem
    .time-a
      color #19191a
      margin: .3rem 0
      display: flex
      font-size: .28rem
      align-items center
      img
        display: block
        width: .3rem
        margin-right: .12rem
    .slide
      width: .04rem
      height: .26rem
      bg-image2('slide')
      margin-right: .2rem
    .money-w
      background-color: #fff
      border: 1px solid #e6e7eb
      border-radius 4px
      margin-bottom: .3rem
      .flex-item
        height: .8rem
        border-bottom: 1px solid #e6e7eb
        padding: 0 .3rem
        display: flex
        align-items center
        justify-content space-between
        font-size: .28rem
        color #19191a
        &:last-child
          border-bottom: none
      .flex-item2
        height 1rem
    .left-m
      display: flex
      align-items center
      height: 1rem
      .bord
        font-size: .3rem
        color #19191a
        font-weight: bold
    .list
      height: 1.2rem
      border-bottom: 1px solid #e6e7eb
      background-color: #fff
      display: flex
      align-items center
      justify-content space-between
      color #3b3939
      font-size: .28rem
      padding: 0 .3rem
      &:last-child
        border-bottom: none
      &:nth-child(1)
        .three-rank
          bg-image2('newImages/1')
      &:nth-child(2)
        .three-rank
          bg-image2('newImages/2')
      &:nth-child(3)
        .three-rank
          bg-image2('newImages/3')
      .margin
        &.three-rank
          width: .45rem
          height: .57rem
          font-size: 0
          display: flex
          align-items center
          justify-content center
        &.other-rank
          width: .45rem
          height: .45rem
          border-radius 50%
          color #00aff0
          font-size: .24rem
          font-weight: bold
          display: flex
          align-items center
          justify-content center
          background-color: #c4e8f8
      .left
        display: flex
        align-items center
        .img-b
          img
            width: .6rem
            height: .6rem
            border-radius 50%
            display: block
            margin: 0 .16rem 0 .25rem
        .name-u
          margin-left: .2rem
      .rihgt
        text-align: right
      .rank-money
        margin-bottom: .2rem
</style>
