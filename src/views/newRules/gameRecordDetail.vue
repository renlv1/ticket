<template>
  <div class="game-record-detail-w">
    <m-fixed-top :titleName="titleName"></m-fixed-top>
    <cube-scroll
      ref="scroll5"
      :data="roundData"
      :options="options"
      @pulling-up="onPullingDown"
      class="content-m">
      <ul class="uls">
        <div class="money-w">
          <div class="flex-item flex-item2">
            <div class="left-m">
              <div class="slide"></div>
              <p class="bord">{{$t('ruleTwo.text33')}}</p>
            </div>
            <div class="right">{{$t('ruleTwo.text19')}}{{activityId}}{{$t('record.text31')}}</div>
          </div>
          <div class="flex-item">
            <span>{{$t('rule.text20')}}</span>
            <span>{{$fourNumber(bonusPoolAmountSum)}} {{$t('record.text22')}}</span>
          </div>
          <div class="flex-item">
            <span>{{$t('rule.text21')}}</span>
            <span>{{$fourNumber(winAmountTotal)}} {{$t('record.text22')}}</span>
          </div>
          <div class="flex-item">
            <span>{{$t('ruleTwo.text34')}}</span>
            <span>{{winnerCount}} {{$t('ruleTwo.text37')}}</span>
          </div>
          <div class="flex-item">
            <span>{{$t('ruleTwo.text35')}}</span>
            <span>{{joinTotalCount}} {{$t('ruleTwo.text37')}}</span>
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
        <li class="list" v-for="(item, index) in roundData" :key="index">
          <div class="left">
            <div class="margin">{{$t('ruleTwo.text19')}}{{item.ranking}}{{$t('ruleTwo.text31')}}</div>
            <div class="">{{item.levelsNum}}{{$t('ruleTwo.text20')}}</div>
<!--            <div class="img-b">-->
<!--              <img :src="item.imgUrl" alt="">-->
<!--            </div>-->
<!--            <div class="name">{{item.userName}}</div>-->
          </div>
          <div class="rihgt">
            <div class="margin">{{item.userName}}</div>
            <div>{{$t('ruleTwo.text38')}}: {{$fourNumber(item.winAmount)}} {{$t('record.text22')}}</div>
          </div>
        </li>
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
        loadingShow: true,
        moreShow: false,
        loadMore: true,
        options: {
          pullUpLoad: true
        },
        notData: false,
        pageIndex: 1,
        pageSize: 20,
        roundData: [],
        bonusPoolAmountSum: '',
        joinTotalCount: '',
        winnerCount: '',
        winAmountTotal: ''
      }
    },
    created () {
      this.getRecord()
      if (this.$route.query.id) {
        this.activityId = this.$route.query.id
        this.bonusPoolAmountSum = this.$route.query.bonusPoolAmountSum // 奖金池总金额
        this.joinTotalCount = this.$route.query.joinTotalCount || 0 // 参与笔数
        this.winnerCount = this.$route.query.winnerCount || 0  // 获奖笔数
        this.winAmountTotal = this.$route.query.winAmountTotal // 发放奖金金额
      }
    },
    methods: {
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
      getRecord () {
        this.$fetch.post('/stormgame/queryStormGamesRankingList', {
          activityId: this.$route.query.id,
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
    computed: {
      titleName () {
        return this.$t('ruleTwo.text32')
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
.content-m
  padding: 0 .3rem
  height auto
  position: fixed
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
    .slide
      width: .04rem
      height: .26rem
      bg-image2('slide')
      margin-right: .2rem
    .money-w
      background-color: #f5f6fa
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
      &.title-m
        border-bottom: 1px solid #e6e7eb
      .bord
        font-size: .3rem
        color #19191a
        font-weight: bold
    .list
      height: 1.2rem
      border-bottom: 1px solid #e6e7eb
      display: flex
      align-items center
      justify-content space-between
      color #3b3939
      font-size: .28rem
      .margin
        margin-bottom: .2rem
      .left
        .img-b
          img
            width: .6rem
            height: .6rem
            border-radius 50%
            display: block
            margin: 0 .16rem 0 .25rem
      .rihgt
        text-align: right
</style>
