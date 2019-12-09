<template>
    <div class="pool-detail">
      <app-header :titleName="titleName"></app-header>
      <div class="content-box">
        <ul class="ul-tab">
          <li class="li-status" v-for="(item, index) in status" :key="index" @click="changeTab(index)"><div class="choose-status" :class="{activeLi: orderTab === index}" >{{item}}</div></li>
        </ul>
        <div class="order-list">
          <div class="bg-w" v-if="emptyDatas">
            <div class="bg-nodata"></div>
            <p class="no-text">{{$t('record.text5')}}</p>
          </div>
          <div class="pool-list"  v-show="orderTab === 0">
            <cube-scroll
              ref="scroll"
              :options="options"
              :data="dataArr"
              @pulling-up="onPullingDown">
              <ul class="ul-data">
                <li class="li-data" v-for="(item,index) in dataArr" :key="index">
                  <div class="li-up">
                    <div class="left">{{$t('record.text59')}}：{{item.id}}</div>
<!--                    <div class="right" v-show="orderTab === 1">{{winResult(item.winStatus)}}</div>-->
                    <div class="right" v-if="item.changeType === 1">{{$t('record.text60')}} * {{item.betCount}}</div>
                    <div class="left" v-if="item.changeType === 4">{{$t('record.text72')}}</div>
                  </div>
                  <div class="li-down">
                    <div class="left" v-if="item.changeType === 1">{{item.userName}}</div>
                    <div class="left" v-if="item.changeType === 4">{{$t('record.text70')}}</div>
                    <div class="right">{{item.changeAmount.toFixed(4)}} {{$t('record.text22')}}</div>
                  </div>
                </li>
<!--                <div class="no-win" v-show="dataArr.length > 0">*以下用户无法获得奖励</div>-->
<!--                <li class="li-lose" >-->
<!--                  <div class="li-up">-->
<!--                    <div class="left">编号：555</div>-->
<!--                    <div class="right">特等奖</div>-->
<!--                  </div>-->
<!--                  <div class="li-down">-->
<!--                    <div class="left">权力的游戏</div>-->
<!--                    <div class="right">555</div>-->
<!--                  </div>-->
<!--                </li>-->
              </ul>
            </cube-scroll>
          </div>
          <div class="pool-list" v-show="orderTab === 1">
            <cube-scroll
              ref="scroll2"
              :options="options"
              :data="dataArr"
              @pulling-up="onPullingDown2">
              <ul class="ul-data">
                <li class="li-data" v-for="(item,index) in dataArr" :key="index">
                  <div class="li-up">
                    <div class="left">{{$t('record.text59')}}：{{item.id}}</div>
                    <div class="right" v-if="item.changeType === 2">{{winResult(item.winStatus)}}</div>
                    <div class="right" v-if="item.changeType === 3">{{$t('record.text71')}}</div>
    <!--                  <div class="right" v-show="orderTab === 0">投注 * {{item.betCount}}</div>-->
                  </div>
                  <div class="li-down">
                    <div class="left" v-if="item.changeType === 2">{{item.userName}}</div>
                    <div class="left" v-if="item.changeType === 3">{{$t('record.text70')}}</div>
                    <div class="right">{{item.changeAmount.toFixed(4)}} {{$t('record.text22')}}</div>
                  </div>
                </li>
                <!--                <div class="no-win" v-show="dataArr.length > 0">*以下用户无法获得奖励</div>-->
                <!--                <li class="li-lose" >-->
                <!--                  <div class="li-up">-->
                <!--                    <div class="left">编号：555</div>-->
                <!--                    <div class="right">特等奖</div>-->
                <!--                  </div>-->
                <!--                  <div class="li-down">-->
                <!--                    <div class="left">权力的游戏</div>-->
                <!--                    <div class="right">555</div>-->
                <!--                  </div>-->
                <!--                </li>-->
              </ul>
            </cube-scroll>
          </div>
          <v-loading v-show="loadingShow"></v-loading>
        </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import appHeader from '../../components/mFixedTop'
    export default {
        data() {
          return{
            dataArr: [],
            winArr: [], // 中奖
            loseArr: [], // 未中奖
            loadingShow: true,
            status: [this.$t('record.text61'), this.$t('record.text62')],
            orderTab: 0,
            pageIndex: 1, // 页码
            pageSize: 20, // 页面数量,
            emptyDatas: false,
            titleName:  this.$t('record.text68')+ this.$route.query.activityName + this.$t('record.text63')
          }
        },
      created() {
          this.getIncomeList()
      },
      methods:{
        onPullingDown () {
          this.getIncomeList()
          // 没有数据，结束此次刷新
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 1300)
        },
        onPullingDown2 () {
          this.getIncomeList()
          // 没有数据，结束此次刷新
          setTimeout(() => {
            this.$refs.scroll2.forceUpdate()
          }, 1300)
        },
        // 收入列表
        getIncomeList() {
          this.$fetch.post('/guess/queryRobotGuessBonusLog',{
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            changeType: this.orderTab + 1,
            activityId: this.$route.query.activityId
          }).then(res => {
              if(res.success) {
                this.loadingShow = false
                let dataList = res.data
                let winList = []
                let loseList = []
                for(let i in dataList) {
                  if(dataList[i]) {
                    winList.push(dataList[i])
                  } else if(dataList[i]) {
                    loseList.push(dataList[i])
                  }
                }
                if(dataList.length > 0) {
                  this.emptyDatas = false
                  if(this.pageIndex === 1) {
                    this.dataArr = dataList
                    this.winArr = winList
                    this.loseArr = loseList
                  } else {
                    this.dataArr.push(...dataList)
                    this.winArr.push(...winList)
                    this.loseArr.push(...loseList)
                  }
                  this.pageIndex++
                } else {
                  if(this.pageIndex === 1) {
                    this.pageIndex = 1
                    this.loadingShow = false
                    this.emptyDatas = true
                  }
                }
              } else {
                this.loadingShow = false
                this.emptyDatas = true
                this.pageIndex = 1
              }
          }).catch(err => {
            console.log(err)
          })
        },
        // 切换tab
        changeTab(index) {
          this.loadingShow = true
          this.dataArr = []
          this.winArr = []
          this.loseArr = []
          this.emptyDatas = false
          this.orderTab = index
          this.pageIndex = 1
          this.getIncomeList()
        },
        winResult(status) {
          if(Number(status) === 0) return this.$t('record.text49') // 特等奖
          if(Number(status) === 1) return this.$t('record.text50') // 一等奖
          if(Number(status) === 2) return this.$t('record.text51') // 二等奖
          if(Number(status) === 3) return this.$t('record.text52') // 三等奖
          if(Number(status) === 4) return this.$t('record.text53') // 四等奖
          if(Number(status) === 5) return this.$t('record.text54') // 五等奖
          if(Number(status) === 6) return this.$t('record.text55') // 未中奖
        }
      },
      computed: {
        options () {
          return {
            pullUpLoad: {
              txt: {
                more: this.$t('record.text13'),
                noMore: this.$t('record.text14')
              }
            }
          }
        }
      },
      components: {
        vLoading: resolve => require(['@/components/loading.vue'], resolve),
        appHeader
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ul-tab{
  margin-top .5rem
  height 1rem
  display flex
  justify-content space-between
  align-items center
  .li-status{
    flex 1
    display flex
    justify-content center
    padding 0 .8rem
    .choose-status{
      font-size .34rem
      color #999
      padding 0 .2rem .2rem
      &.activeLi{
        border-bottom 2px solid #00a6f1
        color #00a6f1
      }
    }
  }
}
.nullDatas{
  margin-top .5rem
  text-align: center;
  font-size: .28rem;
  color: #19191a
}
.order-list{
  .pool-list{
    width: 100%;
    overflow: hidden;
    position: fixed;
    top: 2.5rem;
    left: 0;
    bottom: .1rem;
    .ul-data{
      .li-data {
        font-size .24rem
        color #19191a
        padding 0 .4rem
        height 1.2rem
        border-bottom 1px solid #e6e7eb
      }
      .li-lose{
        font-size .24rem
        color #999
        padding 0 .4rem
        height 1.2rem
        border-bottom 1px solid #e6e7eb
      }
      .li-up{
        display flex
        justify-content space-between
        margin .3rem 0
      }
      .li-down{
        display flex
        justify-content space-between
      }
    }
  }
}
.no-win{
  text-align center
  font-size .24rem
  color #ff3535
  margin .4rem 0
}
.bg-nodata
  width: .79rem
  height: .76rem
  bg-image2('nobet')
  margin: .6rem auto .3rem
.no-text
  text-align: center
  font-size: .28rem
  color #999
</style>
