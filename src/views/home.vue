<template>
  <div class="home">
    <m-fixed-top :titleName="titleName" :isGoNumber="true" @goPath="goPathB"></m-fixed-top>
    <div class="fixed-cont">
      <div class="content">
        <!--      <div style="width: 100%;height: 1rem;display: flex;align-items: center; justify-content: center; margin: .2rem 0;border: 1px solid #000;" @click="$router.push('/login')">退出登录</div>-->
        <div class="banner-w">
          <div class="banner-t">
            <div class="title-w">
              <div class="title-c">
                <span class="title-t">{{$t('betA.text1')}}{{gameData.activityName}}{{$t('betA.text2')}}</span>
                <!--              <div class="icon"></div>-->
              </div>
            </div>
            <h3 class="money">{{$fourNumber(totalMoney)}}</h3>
            <div class="button" v-if="endTime > 0">{{$t('home.text3')}}：{{abTime}}</div>
            <div class="button" v-else-if="endTime < 0 && gameData.winNumber">{{$t('betA.text3')}}</div>
            <div class="button" v-else>{{$t('betA.text4')}}</div>
          </div>
        </div>
        <div class="m-content" style="display: none">
          <div class="bet-w">
            <div class="bet-top">
              <span>{{$t('home.text4')}}</span>
              <div class="right" @click="gotoMy">
                <span>{{$t('home.text5')}}</span>
                <div class="more-icon"></div>
              </div>
            </div>
            <ul class="bet-uls" v-for="(game, index) in recordList" :key="index" ref="betUls">
              <li class="bet-list" v-for="(item, index) in 6" :key="index" ref="betList">
                <div class="img-icon"></div>
                <div class="num">{{item}}</div>
              </li>
              <div class="sanjiao" v-show="game.betCount > 1">
                <span class="icon">×{{game.betCount}}</span>
              </div>
            </ul>
          </div>
          <div class="" v-if="recordDataShow">
            <div class="bg-nodata"></div>
            <p class="no-text">{{$t('betA.text5')}}</p>
          </div>
        </div>

        <div class="bet-w" @click="gotoDetails">
          <div class="bet-top">
            <span>{{$t('betA.text1')}} {{resultData.activityName}} {{$t('rule.text12')}}</span>
          </div>
          <ul class="bet-uls" ref="betUls2">
            <li class="bet-list" v-for="(item, index) in 6" :key="index">
              <div class="img-icon"></div>
              <div class="num"></div>
            </li>
          </ul>
          <!--        奖池积分-->
          <div class="flex-item">
            <span>{{$t('rule.text13')}}</span>
            <span>{{$fourNumber(resultData.bonusPoolAmountSum)}} {{$t('record.text22')}}</span>
          </div>
          <!--        发放奖金-->
          <div  class="flex-item">
            <span>{{$t('rule.text14')}}</span>
            <span>{{$fourNumber(totalAmount)}} {{$t('record.text22')}}</span>
          </div>
          <!--        中奖注数-->
          <div class="flex-item">
            <span>{{$t('rule.text15')}}</span>
            <span>{{totalWiner}} {{$t('home.text30')}}</span>
          </div>
          <!--        我的中奖金额-->
          <div class="flex-item">
            <span>{{$t('rule.text16')}}</span>
            <span>{{$fourNumber(myWin)}} {{$t('record.text22')}}</span>
          </div>
          <div class="look-info">{{$t('rule.text17')}}</div>
        </div>

        <div class="fixed-bottom">
          <div class="goto-button" @click="gotoBet">{{$t('home.text6')}}</div>
          <!--        <div class="past-record-w" @click="$router.push('/pastRecord')">-->
          <!--          <div class="clock-icon"></div>-->
          <!--          <span>{{$t('home.text7')}}</span>-->
          <!--        </div>-->
        </div>
      </div>
    </div>
<!--    弹窗  -->
    <transition name="dialog">
      <div class="dialog-w" v-show="dialogShow">
        <div class="dialog-content">
          <div class="dialog-box">
            <h3>{{$t('home.text8')}}</h3>
            <p>{{$t('home.text9')}}：{{dialogData.betAmount}} {{$t('home.text10')}}</p>
            <p>{{$t('home.text11')}}：{{dialogData.intervalHours}} {{$t('home.text22')}}</p>
            <div class="desc-w">
              <span class="line"></span>
              <span class="text" v-if="isCN === true">Bonus Pool: all scores that users bet will be put into bonus pool. <span v-show="Number(dialogData.sysRate) > 0">The system will charge {{dialogData.sysRate * 100}}% of the bonus pool as the maintenance cost.</span></span>
              <span class="text" v-else>奖金池：参与用户所投注的积分，全部将投入奖金池中。<span v-show="Number(dialogData.sysRate) > 0">开奖时，系统将抽取奖金池 {{dialogData.sysRate * 100}}% 的积分作为系统维护费用。</span></span>
            </div>
            <div class="desc-w"><span class="line"></span>{{$t('home.text14')}}：</div>
<!--            <p v-html="$t('home.text15')"></p>-->
<!--            <p v-html="$t('home.text16')"></p>-->
<!--            <p v-html="$t('home.text17')"></p>-->
<!--            <p v-html="$t('home.text18')"></p>-->
<!--            <p v-html="$t('home.text19')"></p>-->
<!--            <p v-html="$t('home.text20')"></p>-->

            <div v-if="isCN === true && dialogData.specialAmountRate">
              <p>All matched:  <span>{{dialogData.specialAmountRate * 100}}%</span> scores of the bonus pool as bonus</p>
              <p>Five matched：<span>{{dialogData.firstAmountRate * 100}}%</span> scores of the bonus pool as bonus</p>
              <p>Four matched: <span>{{dialogData.secondAmount}}</span> scores for single share</p>
              <p>Three matched: <span>{{dialogData.thirdAmount}}</span> scores for single share</p>
              <p>Two matched： <span>{{dialogData.fourthAmount}}</span>  scores for single share</p>
              <p>Only one matched：<span>{{dialogData.fifthAmount}}</span> scores for single share</p>
            </div>
            <div v-else-if="isCN === false && dialogData.specialAmountRate">
              <p>全中：奖金池 <span>{{dialogData.specialAmountRate * 100}}%</span> 的积分作为奖金</p>
              <p>中5个：奖金池 <span>{{dialogData.firstAmountRate * 100}}%</span> 的积分作为奖金</p>
              <p>中四个：单注奖励 <span>{{dialogData.secondAmount}}</span> 积分</p>
              <p>中三个：单注奖励 <span>{{dialogData.thirdAmount}}</span> 积分</p>
              <p>中两个：单注奖励 <span>{{dialogData.fourthAmount}}</span> 积分</p>
              <p>中一个：单注奖励 <span>{{dialogData.fifthAmount}}</span> 积分</p>
            </div>
          </div>
          <div class="close"  @click="dialogShow = false"></div>
        </div>
      </div>
    </transition>
<!--    底部菜单导航 -->
    <navbar></navbar>
  </div>
</template>

<script>
import {countDown} from '@/assets/js/countDown'
export default {
  data () {
    return {
      recordDataShow: false,
      gameData: '',
      recordList: [],
      dialogShow: false,
      titleName: this.$t('home.text21'),
      gameId: '',
      abTime: '',
      totalMoney: 0,
      endTime: 0,
      timer1: null,
      tiemr3: null,
      isCN: false,
      totalAmount: 0, // 上一期发放奖金
      resultData: {}, // 上一期结果
      totalWiner: 0, // 上一期中奖注数
      myWin: 0, // 我的中奖金额
      dialogData: ''
    }
  },
  created () {
    this.getNewAc()
    this.previousResult()
    if (localStorage.getItem('ticketLang') === 'EN') {
      this.isCN = true
    } else {
      this.isCN = false
    }
  },
  beforeDestroy () {
    clearInterval(this.timer1)
    this.timer1 = null;
    clearInterval(this.tiemr3)
    this.tiemr3 = null;
  },
  mounted () {
    this.timer1 = setInterval(() => {
      if (this.gameData.endTimeInterval > 0) {
        this.getNewBanlance()
      }
    }, 30000)
  },
  methods: {
    goPathB () {
      if (this.showWindowHref()['sessionId']) {
        this.$router.push({
          path: '/',
          query: {
            sessionId: this.showWindowHref()['sessionId']
          }
        })
      } else {
        this.$router.push('/')
      }
    },
    showWindowHref () {
      var url = window.location.hash
      var arglists= url.split('?');
      if (arglists[0] === url) {
        return '';
      }
      var arr = arglists[1].split('&');
      var obj = {};
      for (let i = 0; i < arr.length; i++) {
        var arg = arr[i].split('=');
        obj[arg[0]] = arg[1];
      }
      return obj;
    },
    // 上一期详情
    gotoDetails () {
      this.$router.push({
        path: '/personalRecord',
        query: {
          dataInfo: this.resultData.id
        }
      })
    },
    goPathA () {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.scan()
      } else {
        window.webkit.messageHandlers.scan.postMessage(null)
      }
    },
    gotoMy () {
      this.$router.push({path: '/singleRecord', query: {id: this.gameData.id}})
    },
    gotoBet () {
      if (Number(this.gameId) > 0) {
        this.$router.push({
          path: '/bet',
          query: {
            id: this.gameId,
            score: this.dialogData.betAmount
          }
        })
      }
    },
    getNewBanlance () {
      this.$fetch.post('/guess/queryRobotGuessInfoList', {
        pageIndex: 1,
        pageSize: 1
      }).then(res => {
        if (res.success) {
          if (res.data.length) {
            this.totalMoney = res.data[0].bonusPoolAmountSum
          }
        }
      })
    },
    getNewAc () {
      this.$fetch.post('/guess/queryRobotGuessInfoList', {
        pageIndex: 1,
        pageSize: 1
      }).then(res => {
        if (res.success) {
          if (res.data.length) {
            this.gameData = res.data[0]
            this.totalMoney = res.data[0].bonusPoolAmountSum
            this.dialogData = res.data[0]
            this.gameId = this.gameData.id
            let timeLast = this.gameData.endTimeInterval
            this.endTime = this.gameData.endTimeInterval
            if (!timeLast) return
            if (timeLast <= 0) {
              this.abTime = this.$t('home.text25')
              clearInterval(this.tiemr3)
            } else {
              this.tiemr3 = setInterval(() => {
                if (timeLast > 0) {
                  timeLast--
                  this.abTime = countDown(timeLast)
                } else {
                  this.abTime = this.$t('home.text25')
                }
              }, 1000)
            }
            this.getRecordList(this.gameData.id)
          }
        }
      })
    },
    // 上一期开奖结果
    previousResult () {
      this.$fetch.post('/guess/queryRobotGuessInfoList', {
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        if (res.success) {
          if (res.data.length > 1) {
            this.getmyGame(res.data[1].id)
            this.resultData = res.data[1]
            let dataInfo = res.data[1]
            let firstAmount = 0
            let specialAmount = 0
            // 特等奖中奖奖金 = 奖金池*15%
            if(Number(dataInfo.specialCount) !== 0) {
              specialAmount = Number(dataInfo.specialAmountRate) * Number(dataInfo.bonusPoolAmountSum) // 特等奖中奖奖金
            } else {
              specialAmount = 0
            }
            // 一等奖中奖奖金 = 奖金池*5% *
            if(Number(dataInfo.firstCount) !== 0) {
              firstAmount = Number(dataInfo.firstAmountRate) * Number(dataInfo.bonusPoolAmountSum) // 一等奖中奖奖金
            } else {
              firstAmount = 0
            }
            // 上一期发放奖金
            this.totalAmount = Number(specialAmount) + Number(firstAmount) + 5* Number(dataInfo.secondCount) + 1.5* Number(dataInfo.thirdCount) +0.5* Number(dataInfo.fourthCount) + 0.25 * Number(dataInfo.fifthCount)
            // 中奖注数
            this.totalWiner = Number(dataInfo.specialCount) + Number(dataInfo.firstCount) + Number(dataInfo.secondCount) + Number(dataInfo.thirdCount) + Number(dataInfo.fourthCount) + Number(dataInfo.fifthCount)

            if (this.$refs.betUls2) {
              let arr = (""+this.resultData.winNumber).split("")
              for (var i = 0; i < 6; i++) {
                this.$refs.betUls2.children[i].innerHTML = `
                    <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../assets/img/robot_small/' + arr[i] + '@2x.png')}) no-repeat center / cover;"></div>
                    <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${arr[i]}</div>
                  `
              }
            }
          }
        }
      })
    },
    getmyGame (id) {
      this.$fetch.post('/guess/queryRobotGuessInfoById', {
        activityId: id
      }).then(res => {
        if (res.success) {
          this.myWin = res.data.userWinAmountTotal
        }
      })
    },
    // 我参与的投注
    getRecordList (id) {
      this.$fetch.post('/guess/userQueryRobotGuessJoinRecordList', {
        pageIndex: 1,
        pageSize: 20,
        activityId: id
      }).then(res => {
        if (res.success) {
          this.recordList = res.data
          if (res.data.length === 0) {
            this.recordDataShow = true
          } else {
            this.recordDataShow = false
          }
          this.recordList.forEach((recod, index) => {
            // setTimeout(() => {
            //   if (this.$refs.betUls) {
            //     let arr = (""+recod.betNumber).split("")
            //     for (var i = 0; i < 6; i++) {
            //       this.$refs.betUls[index].children[i].innerHTML = `
            //         <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../assets/img/robot_small/' + arr[i] + '@2x.png')}) no-repeat center / cover;"></div>
            //         <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${arr[i]}</div>
            //       `
            //     }
            //   }
            // }, 500)
          })
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

<style lang="stylus" scoped>
  @import '../assets/css/mixin.styl';
  .fixed-cont
    position: fixed
    top: 1.12rem
    bottom: 0
    width: 100%
    left: 0
    overflow: auto
  .bg-nodata
    width: .79rem
    height: .76rem
    bg-image('nobet')
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
      padding: 0 .3rem 2.8rem .3rem
      .banner-w
        padding: .4rem 0 .82rem
        .banner-t
          width: 100%
          height: 2.78rem
          bg-image('banner')
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
              bg-image('wen_one')
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
      .m-content
        margin-bottom: 2.5rem
      .bet-w
        width: 100%
        background-color: #f5f6fa
        border: 1px solid #e6e7eb
        border-radius .08rem
        .flex-item
          width: 100%
          height: .8rem
          display: flex
          align-items center
          justify-content space-between
          padding: 0 .3rem
          font-size: .28rem
          color #19191a
          border-bottom: 1px solid #e6e7eb
        .look-info
          width: 100%
          height: .8rem
          display: flex
          align-items center
          justify-content center
          padding: 0 .3rem
          font-size: .28rem
          color #00aff0
        .bet-top
          width: 100%
          height: .8rem
          padding-left: .3rem
          font-size: .28rem
          color #19191a
          display: flex
          align-items center
          justify-content space-between
          border-bottom: 1px solid #e6e7eb
          .bet-uls
            height: 2rem
          .right
            display: flex
            align-items center
            justify-content center
            color #00aff0
            font-size: .24rem
            padding: 0 .3rem
            height: 100%
            .more-icon
              margin-left: .1rem
              width: .12rem
              height: .22rem
              bg-image('more')
      .fixed-bottom
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        padding: .2rem .3rem 1.3rem
        background-color: #fff
      .goto-button
        margin-bottom: .1rem
        width: 100%
        height: 1rem
        display: flex
        align-items center
        justify-content center
        font-size: .3rem
        color #fff
        border-radius .5rem
        background-color: #00aff0
      .past-record-w
        display: flex
        align-items center
        justify-content center
        padding: .2rem 0 .3rem
        font-size: .28rem
        color #999
        .clock-icon
          width: .28rem
          height: .28rem
          margin-right: .1rem
          bg-image('clock')
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
        padding: .5rem
        color #19191a
        font-size: .24rem
        h3
          margin-bottom: .47rem
          text-align: center
          font-size: .3rem
          font-weight: bold
        p
          line-height: 2
          span
            color #00aff0
        .desc-w
          margin-top: .51rem
          line-height: 2
          .text
            line-height: 2
          .line
            width: .04rem
            height: .28rem
            display: inline-block
            margin-right: .1rem
            bg-image('slide')
      .close
        width: .84rem
        height: .84rem
        margin: .6rem auto 0
        bg-image('close_two')
</style>
