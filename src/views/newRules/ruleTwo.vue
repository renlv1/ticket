<template>
  <div class="rule-one">
    <m-fixed-top :titleName="titleName" :isGoNumber="true" @goPath="goPathA"></m-fixed-top>
    <div class="content-m">
      <div class="top-m">
        <div class="img-m"></div>
        <div class="right-cont">
          <p class="text1">{{$t('rule.text1')}}：{{$fourNumber(gameInfo.bonusPoolAmount)}} {{$t('record.text22')}}</p>
          <div class="score-m" v-show="gameInfo.endTime">
            {{$t('rule.text8')}}：{{$changeDate(gameInfo.endTime)}}
          </div>
        </div>
      </div>
      <div class="content-n">
        <ul class="table-uls">
          <li v-for="(item, index) in tableArr" :key="index" class="table-list"
              :class="{'active-list': activeIndex === index}"
              @click="tableOne(index)">{{item}}</li>
        </ul>
        <div class="table-content">
          <div class="text-rule" v-show="activeIndex === 0">
            <div class="title-w title-w-m">
              <div class="line"></div>
              <span>{{$t('ruleTwo.text1')}}：</span>
            </div>
            <p>{{$t('ruleTwo.text2')}}</p>
            <div class="title-w title-w-m">
              <div class="line"></div>
              <span>{{$t('rule.text2')}}：</span>
            </div>
            <p>{{$t('ruleTwo.text28')}}：{{rulesMap.betAmount}} {{$t('home.text10')}}</p>
            <p v-if="$i18n.locale === 'CN'">结算时间：每{{rulesMap.maxJoinCount}}条排行结算一次（不满{{rulesMap.maxJoinCount}}条排行，单局超过{{rulesMap.intervalHours}}小时即可进行开奖，奖金从第一名依次向下分发奖励，分完即止）</p>
            <p v-else>Settlement time: once every {{rulesMap.maxJoinCount}} ranks are settled (if the ranking is less than {{rulesMap.maxJoinCount}} ranks, the single round can be drawn in more than {{rulesMap.intervalHours}} hours, and the prize money will be distributed from the first to the bottom, while stock lasts)</p>
            <div class="title-w title-w-m">
              <div class="line"></div>
              <span>{{$t('rule.text3')}}：</span>
            </div>
            <p>{{$t('ruleTwo.text4')}}：{{$t('home.text14')}}<span v-if="rulesMap.firstAmt > 0"> {{Number(rulesMap.firstAmt) | twoNumber}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text5')}}：{{$t('home.text14')}}<span> {{rulesMap.secondAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text6')}}：{{$t('home.text14')}}<span v-if="rulesMap.thirdAmt > 0"> {{Number(rulesMap.thirdAmt) | twoNumber}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text7')}}：{{$t('home.text14')}}<span> {{rulesMap.fourthAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text8')}}：{{$t('home.text14')}}<span> {{rulesMap.fifthAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text9')}}：{{$t('home.text14')}}<span> {{rulesMap.sixthAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text10')}}：{{$t('home.text14')}}<span> {{rulesMap.seventhAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text11')}}：{{$t('home.text14')}}<span> {{rulesMap.eighthAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text12')}}：{{$t('home.text14')}}<span> {{rulesMap.ninthAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text13')}}：{{$t('home.text14')}}<span> {{rulesMap.tenthAmt}} </span>{{$t('home.text10')}}</p>
            <p>{{$t('ruleTwo.text14')}}</p>
            <div class="title-w title-w-m">
              <div class="line"></div>
              <span>{{$t('ruleTwo.text15')}}：</span>
            </div>
            <p>{{$t('ruleTwo.text16')}}</p>
<!--            <div class="title-w title-w-m">-->
<!--              <div class="line"></div>-->
<!--              <span>{{$t('ruleTwo.text17')}}：</span>-->
<!--            </div>-->
<!--            <p>{{$t('ruleTwo.text18')}}</p>-->
          </div>
          <cube-scroll
            ref="scroll3"
            class="scroll-m"
            v-if="activeIndex === 1"
            :data="roundData"
            :options="options"
            @pulling-up="onPullingDown">
            <ul class="content-uls-two">
              <div v-if="notData1">
                <div class="bg-nodata"></div>
                <p class="no-text">{{$t('record.text5')}}</p>
              </div>
              <li class="content-list-two" v-for="(item, index) in roundData" :key="index">
                <div class="left">
                  <div class="rank">
                    <span v-show="index > 2">{{index + 1}}</span>
                  </div>
                  <div class="img-b">
                    <img :src="item.imgUrl" alt="">
                  </div>
                  <div class="name">{{item.userName}}</div>
                </div>
                <div class="score">{{$t('ruleTwo.text19')}}{{item.levelsNum}}{{$t('ruleTwo.text20')}}</div>
              </li>
              <div class="bg-w" v-if="nullDatas">
                <div class="bg-nodata"></div>
                <p class="no-text">{{nullDatas}}</p>
              </div>
            </ul>
          </cube-scroll>
          <cube-scroll
            ref="scroll5"
            class="scroll-m"
            v-if="activeIndex === 2"
            :data="recordArr"
            :options="options2"
            @pulling-up="onPullingDown2">
            <ul class="content-uls-three" >
              <div v-if="notData2">
                <div class="bg-nodata"></div>
                <p class="no-text">{{$t('record.text5')}}</p>
              </div>
              <li class="content-list-three" v-for="(item, index) in recordArr" :key="index" @click="gotoDetails(item)" v-show="index > 0">
                <div class="left">
                  <span class="index">{{index}}</span>
                  <span>{{$t('ruleTwo.text19')}}{{item.activityName}}{{$t('ruleTwo.text21')}}</span>
                </div>
                <div class="score">{{joinFlag(item.userJoinFlag)}}</div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
      <div class="join-btn" @click="dialogFn"  :class="{'disable-btn': isSendBtn}">
        <img src="../../assets/img/loading.gif" alt="" v-show="isSendBtn">
        {{$t('rule.text7')}}</div>
    </div>
<!--   支付 -->
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="safeShow">
        <div class="dialog-safe">
          <div class="close" @click="safeShow = false">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title">{{$t('home.text34')}}</div>
          <div class="form-item">
            <div class="label">{{$t('home.text35')}}</div>
            <input type="password" :placeholder="$t('home.text36')" class="input" v-model.trim="safeCode">
          </div>
          <div class="form-item">
            <div class="label">{{$t('home.text37')}}</div>
            <input type="text" :placeholder="$t('home.text38')" class="input" v-model.trim="payCode">
          </div>
          <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
          <div class="comfirm" @click="oklock" :class="{'loading-btn': loadingBtn}">
            <img src="../../assets/img/loading.gif" alt="" v-show="loadingBtn">
            <span>{{$t('home.text40')}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
  export default {
    data () {
      return {
        notData1: false,
        notData2: false,
        nullDatas: false,
        isSendBtn: false,
        safeCode: '',
        payCode: '',
        errInputMsg: '',
        loadingBtn: false,
        safeShow: false,
        roundData: [],
        recordArr: [],
        rulesMap: {},
        activityId: '',
        activeIndex: 0,
        loadMore: true,
        loadMore2: true,
        pageIndex: 1,
        pageIndex2: 1,
        pageSize: 20,
        gameInfo: '',
        userOpen: '',
        proUrl: 'https://game.rraystudio.com/',
        devUrl: 'http://3243243242.com/game/main.html',
        options: {
          pullUpLoad: true
        },
        options2: {
          pullUpLoad: true
        },
        timer: null,
        titleName: this.$t('ruleTwo.text22'),
        tableArr: this.$t('ruleTwo.text23')
      }
    },
    created () {
      this.getBalance()
      this.getRound()
    },
    watch: {
      '$route': 'getRo'
    },
    mounted () {
      this.getRo()
      this.timer = setInterval(() => {
        this.getRound()
      }, 7000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    filters: {
      twoNumber(num) {
        if (!num) return '0'
        return Number(num).toFixed(2)
      }
    },
    methods: {
      showWindowHref () {
        // window.location.href
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
      getRo () {
        this.getRound()
      },
      gotoUrl (res) { // devUrl proUrl
        return this.proUrl + '?orderId=' + res.data.orderId + '&userAddress=' + res.data.userAddress
      },
      onPullingDown2 () {
        if (!this.loadMore2) {
          this.$refs.scroll5.forceUpdate()
          return
        }
        this.pageIndex2++
        this.$fetch.post('/stormgame/queryStormGamesInfoList', {
          pageIndex: this.pageIndex2,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success) {
            this.$refs.scroll5.forceUpdate()
            this.recordArr = this.recordArr.concat(res.data)
            if (res.data.length < this.pageSize || res.data.length === 0) {
              this.loadMore2 = false
            } else {
              this.loadMore2 = true
            }
          }
        })
      },
      onPullingDown () {
        if (!this.loadMore) {
          this.$refs.scroll3.forceUpdate()
          return
        }
        this.pageIndex++
        this.$fetch.post('/stormgame/queryStormGamesRankingList', {
          activityId: this.activityId,
          pageIndex:this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success) {
            this.$refs.scroll3.forceUpdate()
            this.roundData = this.roundData.concat(res.data)
            if (res.data.length < this.pageSize || res.data.length === 0) {
              this.loadMore = false
            } else {
              this.loadMore = true
            }
          }
        })
      },
      goPathA () {
        var u = navigator.userAgent
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (this.showWindowHref()['h5']) {
          window.location.href = 'https://webapp.social2018.com/#/home' // https://webapp.social2018.com/#/home   http://3243243242.com/xll/#/home
        } else {
          if (isAndroid) {
            if (window.android) {
              window.android.scan()
            } else {
              window.location.href = 'https://webapp.social2018.com/#/home' // https://webapp.social2018.com/#/home   http://3243243242.com/xll/#/home
            }
          } else {
            window.webkit.messageHandlers.scan.postMessage(null)
          }
        }
      },
      gotoDetails (item) {
        clearInterval(this.timer)
        this.$router.push({
          path: '/gameRecordDetail',
          query: {
            id: item.id,
            bonusPoolAmountSum: item.bonusPoolAmountSum || 0,
            joinTotalCount: item.joinTotalCount || 0,
            winnerCount: item.winnerCount || 0,
            winAmountTotal: item.winAmountTotal || 0
          }
        })
      },
      // 用户中奖标识  0：未参与 1：已中奖  2：未中奖
      joinFlag (flag) {
        if (flag === 0) return this.$t('ruleTwo.text24')
        if (flag === 1) return this.$t('ruleTwo.text25')
        if (flag === 2) return this.$t('ruleTwo.text26')
      },
      getBalance () {
        this.$fetch.get('/user/balance').then(res => {
          if (res.success) {
            this.userOpen = res.data.user
          } else {
          }
        })
      },
      // 立即投注
      dialogFn () {
        this.errInputMsg = ''
        this.safeCode = ''
        this.payCode = ''
        if (!this.activityId) return false
        this.isSendBtn = true
        this.$fetch.post('/stormgame/join',{
          activityId: this.activityId
        }).then(res => {
          if (res.resultCode === 'ACCOUNT_LOCK') {
            console.log(this.userOpen)
            this.isSendBtn = false
            // 安全密码没开通
            if (this.userOpen.openTradePassword > 0) {
              let userOpen = this.userOpen
              if (userOpen.openTradePassword !== 2) {
                Dialog({
                  title: this.$t('home.text46')
                })
                // 谷歌和短信都没开通
              } else if (userOpen.openGoogleCode !== 2) {
                Dialog({
                  title: this.$t('home.text47')
                })
              } else if (userOpen.openGoogleCode === 2) {
                this.safeShow = true
              }
            }
          } else if (res.success) {
            this.isSendBtn = false
            clearInterval(this.timer)
            window.location.href = this.gotoUrl(res)
          } else {
            this.isSendBtn = false
            Dialog({
              title: this.englishLang(res.resultCode, res.msg)
            })
          }
        }).catch(() => {
          this.isSendBtn = false
          Dialog({
            title: this.$t('ruleTwo.text30')
          })
        })
      },
      englishLang (resultCode, msg) {
        if (localStorage.getItem('ticketLang') === 'EN') {
          if (msg === '系统繁忙') return 'System is busy'
          if (msg === '余额不足') return 'Insufficient balance.'
          if (msg === '活动已结束') return 'The activity is over.'
          if (msg === '支付密码错误') return 'Payment password error'
          if (msg === '解锁失败') return 'Unlock the failure'
          if (msg.indexOf('谷歌')) return 'Google code error'
        } else {
          return msg
        }
      },
      // 支付验证
      oklock () {
        this.errInputMsg = ''
        if (this.safeCode === '') {
          this.errInputMsg = this.$t('home.text36')
          return
        }
        if (this.payCode === '') {
          this.errInputMsg = this.$t('home.text38')
          return
        }
        this.loadingBtn = true
        this.$fetch.post('/entrust/unlock', {
          tradePwd: this.safeCode,
          mobileCode: this.payCode
        }).then(res => {
          if (res.success) {
            this.$fetch.post('/stormgame/join',{
              activityId: this.activityId
            }).then(result => {
              this.safeShow = false
              this.loadingBtn = false
              if (result.success) {
                Dialog({
                  title: this.$t('ruleTwo.text27'),
                  okFn: () => {
                    clearInterval(this.timer)
                    window.location.href = this.gotoUrl(result)
                  }
                })
              } else {
                Dialog({
                  title: this.englishLang(result.resultCode, result.msg)
                })
              }
            })
          } else {
            this.loadingBtn = false
            this.errInputMsg = this.englishLang(res.resultCode, res.msg)
          }
        })
      },
      tableOne (index) {
        this.activeIndex = index
      },
      // 游戏排名
      getRound () {
        this.$fetch.post('/stormgame/queryStormGamesInfoList', {
          pageIndex: 1,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success) {
            if (res.data.length > 0) {
              this.nullDatas = false
              this.recordArr = res.data
              this.activityId = res.data[0].id
              this.gameInfo = res.data[0]
              this.rulesMap = res.data[0].rulesMap
              // console.log(this.rulesMap)
              if (res.data.length <= 1) {
                this.notData2 = true
              } else {
                this.notData2 = false
              }
              if (res.data.length < this.pageSize) {
                this.loadMore2 =  false
              } else {
                this.loadMore2 = true
              }
              this.$fetch.post('/stormgame/queryStormGamesRankingList', {
                activityId: this.activityId,
                pageIndex:1,
                pageSize: this.pageSize
              }).then(result => {
                if (result.success) {
                  this.roundData = result.data
                  if (result.data.length < this.pageSize) {
                    this.loadMore = false
                  } else {
                    this.loadMore = true
                  }
                  if (result.data.length === 0) {
                    this.notData1 = true
                  } else {
                    this.notData1 = false
                  }
                }
              })
            } else {
              this.nullDatas = true
            }
          }
        })
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop')
    }
  }
</script>

<style scoped lang="stylus">
@import "../../assets/css/mixin.styl"
.bg-w
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
.title-w
  display: flex
  align-items center
  font-size: .32rem
  color #19191a
  margin-bottom: .48rem
  .line
    width: .1rem
    height: .34rem
    margin-right: .1rem
    bg-image2('newImages/radius')
  span
    font-weight: bold
.title-w-m
  margin-top: .4rem
  margin-bottom: .2rem
.text-rule
  font-size: .32rem
  color #4e4e4e
  line-height: 1.6
  position: fixed
  top: 4.3rem
  height auto
  bottom: 1.84rem
  left: .3rem
  right .3rem
  overflow auto
  padding: 0 .3rem .3rem .3rem
  p
    span
      color #00aff0
.rule-one
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  bg-image2('newImages/bg')
  z-index: 1000
  >>> .fixed-top
    background-color: transparent
    color #fff
    border-bottom: none
    .goback .goback-icon
      bg-image2('newImages/back')
  .content-m
    padding: 1.12rem .3rem .4rem .3rem
    display: flex
    flex-direction column
    height: 100%
  .top-m
    display: flex
    align-items center
    margin: .6rem 0 .6rem
    .img-m
      width: 1rem
      height: 1rem
      margin-right: .2rem
      bg-image2('newImage2/fengbaoLogo')
    .right-cont
      color #fff
      .text1
        font-size: .3rem
        margin-bottom: .23rem
      .score-m
        display: flex
        align-items center
        font-size: .24rem
        color #fff
        .progress
          width: 3rem
          height: .12rem
          background-color: #0495d9
          border-radius 6px
          position: relative
          margin-right: .2rem
          .current-progress
            position: absolute
            left: 0
            top: 0
            background-color: #ffde00
            height: .12rem
            border-radius 6px
  .content-n
    width: 100%
    flex 1
    border-radius .3rem
    background-color: #fff
    margin-bottom: 1.2rem
    overflow: auto
    padding: 0 .3rem .2rem .3rem
    .table-uls
      display: flex
      align-items center
      position: fixed
      left: .3rem
      right .3rem
      background: #fff
      z-index: 100
      padding: .5rem .3rem 0 .3rem
      border-radius .3rem .3rem 0 0
      margin-bottom: .2rem
      .table-list
        font-size: .32rem
        color #a5a5a5
        flex 1
        display: flex
        align-items center
        justify-content center
        padding-bottom: .3rem
        position: relative
        &::before
          content ''
          display: block
          width: 100%
          position: absolute
          bottom: 0
          left: 0
          border-bottom: 6px solid transparent
          border-radius 3px
        &.active-list
          font-weight: bold
          color #00aff0
          &::before
            border-bottom: 6px solid #00aff0
    .title-w
      display: flex
      align-items center
      font-size: .32rem
      color #19191a
      .line
        width: .1rem
        height: .34rem
        margin-right: .1rem
        bg-image2('newImages/radius')
      span
        font-weight: bold
    .text-rule
      font-size: .32rem
      color #4e4e4e
      line-height: 1.6
    .table-content
      margin-top: 1.4rem
      .scroll-m
        position: fixed
        top: 4.5rem
        height auto
        bottom: 1.84rem
        left: .3rem
        right .3rem
      .content-uls-two
        padding: 0 .3rem
        .content-list-two
          display: flex
          align-items center
          justify-content space-between
          height: 1.08rem
          font-size: .28rem
          color #3b3939
          border-bottom: 1px solid #e6e7eb
          &:nth-child(1) .rank
            bg-image2('newImages/1')
          &:nth-child(2) .rank
            bg-image2('newImages/2')
          &:nth-child(3) .rank
            bg-image2('newImages/3')
          .left
            display: flex
            align-items center
            .rank
              width: .45rem
              height: .57rem
              display: flex
              align-items center
              justify-content center
              margin-right: .2rem
            .img-b
              width: .54rem
              height: .54rem
              background-color: #fff
              margin-right: .16rem
              img
                border: 1px solid #e6e7eb
                border-radius 50%
                width: 100%
                display: block
      .content-uls-three
        padding: 0 .3rem .3rem .3rem
        .content-list-three
          display: flex
          align-items center
          justify-content space-between
          height: 1.08rem
          font-size: .28rem
          color #3b3939
          border-bottom: 1px solid #e6e7eb
          .left
            display: flex
            align-items center
            .index
              margin-right: .3rem
              color #00aff0
  .join-btn
    height: 1rem
    display: flex
    align-items center
    justify-content center
    color #00aff0
    border-radius .5rem
    font-size: .28rem
    background-color: #fff
    position: fixed
    bottom: .3rem
    left: .3rem
    right: .3rem
    &.disable-btn
      pointer-events none
      cursor none
    img
      width: 30px
      display: block
      margin-right: 10px
  .dialog-safe-w
    display: flex
    align-items center
    justify-content center
    background-color: rgba(25,25,26,.7)
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom:0
    width: 100%
    height: 100%
    z-index: 200
    color #19191a
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
          bg-image2('close_one')
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
        &.loading-btn
          pointer-events none
        img
          width: .4rem
          height: .4rem
          margin-right: .2rem
</style>
