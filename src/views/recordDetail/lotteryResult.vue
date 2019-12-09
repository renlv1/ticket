<template>
  <div class="lottery-result">
    <app-header :titleName="titleName" :isGoNumber="true" @goPath="goPathA"></app-header>
    <v-loading v-show="loadingShow" class="loading"></v-loading>
    <div v-show="!loadingShow">
      <!--    待开奖-->
      <div class="content-box" v-if="!winNumber">
        <div class="content-banner">
          <div class="banner-title">{{$t('record.text65')}}{{recordById.activityName}}{{$t('record.text15')}}</div>
          <div class="img-content"></div>
          <div class="count-down" v-if="endTime > 0">{{$t('record.text17')}}：<span>{{lastTime}}</span></div>
          <div class="count-down" v-else>{{$t('record.text16')}}</div>
        </div>
        <ul class="uls ul-data">
          <li class="li-item">
            <div class="li-content li-list">
              <div class="content-title result guess-box">
                <div class="my-guess">{{$t('record.text18')}}</div>
                <!--                <div class="guess-right">{{winResult(winStatus)}}</div>-->
              </div>
              <!--              <ul class="img-box" :class="{'all-active': allin}" ref="listRef">-->
              <!--                <li class="img-item" v-for="(item, index) in 6" :key="index" :class="{'single-active': item.flag === true}" ref="recordRef">-->
              <!--                </li>-->
              <!--                <div class="sign" v-if="betCount > 1"><span>×{{betCount}}</span></div>-->
              <!--                <div class="all-Win" :class="{'crown': allin}"></div>-->
              <!--              </ul>-->
              <ul class="uls">
                <li class="li-item" ref="listRef" >
                  <div class="open-result">
                    <div class="content-title">
                      <span>{{$t('record.text2')}}：{{detailData.id}}</span>
                      <!--                <span class="win-t" v-if="item.status === 1 ||  noLottery === 4">未开奖</span>-->
                      <span class="win-t">{{winResult(detailData.winStatus, detailData.winnerNumber)}}</span>
                    </div>
                    <ul class="img-box">
                      <li class="img-item" ref="recordRef" v-for="(num, index) in 6" :key="index">
                        <!--                      <img :src="$imgLogo('传一个字段判断')">-->
                        <!--                      <div class="number">{{item.num}}</div>-->
                      </li>
                    </ul>
                  </div>
                  <!--              <div class="open-result" v-if="!item.winNumber">-->
                  <!--                <div class="li-title">{{item.activityName}}期</div>-->
                  <!--                <div class="li-content" style="padding-bottom: .3rem">-->
                  <!--                  <div class="no-lottery">待开奖</div>-->
                  <!--                  <div class="img-content"><img src="../../assets/img/waitOpen@2x.png"></div>-->
                  <!--                  <div class="count-down" v-show="endTime > 0">距离开奖时间：<span>{{lastTime}}</span></div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                  <div data-v-105612da="" class="sign" v-if="detailData.betCount > 1"><span data-v-105612da="" >×{{detailData.betCount}}</span></div>
                  <div class="all-Win" :class="{'crown': detailData.allin === true}"></div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="integral-ul">
          <li class="integral-li">
            <div class="left-li">{{$t('record.text19')}}</div>
            <div class="right-li">{{$fourNumber(recordById.bonusPoolAmountSum)}} {{$t('record.text22')}}</div>
          </li>
          <li class="integral-li">
            <div class="left-li">{{$t('record.text20')}}</div>
            <div class="right-li" v-show="recordById.payType === 1">{{$fourNumber(recordById.betAmount)}} {{$t('record.text22')}}</div>
            <div class="right-li" v-show="recordById.payType === 2">{{recordById.betCount}} {{$t('newRecord.text16')}}</div>
          </li>
        </ul>
      </div>
      <!--    已开奖-->
      <div class="content-box" v-if="winNumber">
        <ul class="uls">
          <li class="li-item li-data">
            <div class="li-content li-list">
              <div class="content-title result guess">{{$t('record.text65')}} {{recordById.activityName}}{{$t('record.text15')}}</div>
              <ul class="img-box">
                <li class="img-item" v-for="(item, index) in 6" :key="index" ref="openResult">
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="uls">
          <li class="li-item">
            <div class="li-content">
              <div class="content-title result guess-box">
                <div class="my-guess">{{$t('record.text18')}}</div>
<!--                <div class="guess-right">{{winResult(winStatus)}}</div>-->
              </div>
<!--              <ul class="img-box" :class="{'all-active': allin}" ref="listRef">-->
<!--                <li class="img-item" v-for="(item, index) in 6" :key="index" :class="{'single-active': item.flag === true}" ref="recordRef">-->
<!--                </li>-->
<!--                <div class="sign" v-if="betCount > 1"><span>×{{betCount}}</span></div>-->
<!--                <div class="all-Win" :class="{'crown': allin}"></div>-->
<!--              </ul>-->
              <ul class="uls">
                <li class="li-item" ref="listRef">
                  <div class="open-result">
                    <div class="content-title">
                      <span>{{$t('record.text2')}}：{{detailData.id}}</span>
                      <!--                <span class="win-t" v-if="item.status === 1 ||  noLottery === 4">未开奖</span>-->
                      <span class="win-t">{{winResult(detailData.winStatus, detailData.winnerNumber)}}</span>
                    </div>
                    <ul class="img-box">
                      <li class="img-item" ref="recordRef" v-for="(num, index) in 6" :key="index">
                        <!--                      <img :src="$imgLogo('传一个字段判断')">-->
                        <!--                      <div class="number">{{item.num}}</div>-->
                      </li>
                    </ul>
                  </div>
                  <!--              <div class="open-result" v-if="!item.winNumber">-->
                  <!--                <div class="li-title">{{item.activityName}}期</div>-->
                  <!--                <div class="li-content" style="padding-bottom: .3rem">-->
                  <!--                  <div class="no-lottery">待开奖</div>-->
                  <!--                  <div class="img-content"><img src="../../assets/img/waitOpen@2x.png"></div>-->
                  <!--                  <div class="count-down" v-show="endTime > 0">距离开奖时间：<span>{{lastTime}}</span></div>-->
                  <!--                </div>-->
                  <!--              </div>-->
                  <div data-v-105612da="" class="sign" v-if="detailData.betCount > 1"><span data-v-105612da="" >×{{detailData.betCount}}</span></div>
                  <div class="all-Win" :class="{'crown': detailData.allin === true}"></div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="integral-ul">
          <li class="integral-li">
            <div class="left-li">{{$t('record.text19')}}</div>
            <div class="right-li">{{$fourNumber(recordById.bonusPoolAmountSum)}} {{$t('record.text22')}}</div>
          </li>
          <li class="integral-li">
            <div class="left-li">{{$t('record.text20')}}</div>
            <div class="right-li" v-show="recordById.payType === 1">{{$fourNumber(recordById.betAmount)}} {{$t('record.text22')}}</div>
            <div class="right-li" v-show="recordById.payType === 2">{{$fourNumber(recordById.betCount)}} {{$t('newRecord.text16')}}</div>
          </li>
          <li class="integral-li">
            <div class="left-li">{{$t('record.text21')}}</div>
            <div class="right-li">{{$fourNumber(recordById.winAmount)}} {{$t('record.text22')}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import appHeader from '../../components/mFixedTop'
  import {countDown} from '@/assets/js/countDown'
  export default {
    data() {
      return{
        NewbetAmount: 0,
        NewwinAmount: 0,
        bonusPoolAmountSum: '',
        loadingShow: true,
        winNumber: '',
        endTime: 0,
        lastTime: '', // 距离开奖时间
        tiemr3: null,
        winAmount: '', // 竞猜获奖
        poolAmount: '',
        bonusPoolAmount: '', // 积分奖池
        data: '',
        activityId: this.$route.query.activityId,
        betNumber: Number(this.$route.query.betNumber),
        betCount: Number(this.$route.query.betCount),
        winStatus: this.$route.query.winStatus,
        single: '2', // 单个中奖
        allin: false, // 全部中奖高亮
        noLottery: true, // 判断是待开奖还是已开奖
        pageIndex: 1, // 页码
        pageSize: 20, // 页面数量
        recordList: [], // 我的竞猜列表
        betArr: [], // 投注号码
        winArr: [], // 开奖号码
        winCount: 0, // 中奖数
        digits: [],
        newArr: ['','','','','','',''],
        specialCount: '', // 特等奖中奖数
        firstCount: '', // 一等奖中奖数
        secondCount: '', // 二等奖中奖数
        thirdCount: '', // 三等奖中奖数
        fourthCount: '', // 四等奖中奖数
        fifthCount: '', // 五等奖中奖数
        specialTotal: '', // 特等奖中奖总计
        firstTotal: '', // 一等奖中奖总计
        titleName: this.$t('record.text23'),
        mywinMoney: 0, // 我的竞猜获奖
        detailData: {},
        mywinnerNumber: [], // 开奖号码
        recordById: {}, // 我的数据
        myBetNum: [] // 我的竞猜号码
      }
    },
    created(){
      if (this.$route.query.activityId) {
        this.getActivity(this.$route.query.activityId)
      }
      let href2 = this.showWindowHref()
      if (href2['orderId']) {
        this.getguessurl()
      }
      if (Number(href2['language']) === 2) {
        this.lang = 'en'
        localStorage.setItem('ticketLang', 'EN')
      } else {
        this.lang = 'cn'
        localStorage.setItem('ticketLang', 'CN')
      }
    },
    mounted() {
      // this.getDetail()
    },
    methods: {
      goPathA () {
        let href2 = this.showWindowHref()
        if (href2['orderId']) {
          var u = navigator.userAgent
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            window.android.scan()
          } else {
            window.webkit.messageHandlers.scan.postMessage(null)
          }
        } else {
          this.$router.go(-1)
        }
      },
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
      getguessurl () {
        let href = this.showWindowHref()
        this.$fetch.post('/guess/robotguesslogin', {
          sessionId: href['sessionId'],
          timestamp: href['timestamp'],
          sign: href['sign']
        }).then(res => {
          if (res.success) {
            this.getActivity(href['orderId'])
          }
        })
      },
      getActivity (id) {
        this.$fetch.post('/guess/queryRobotGuessJoinRecordById', {
          joinId: id
        }).then(res => {
          if (res.success) {
            this.loadingShow = false
            this.winNumber = res.data.winnerNumber
            this.recordById = res.data
            this.myBetNum = res.data.betNumber
            this.mywinnerNumber = res.data.winnerNumber
            this.getData()
            let winArr = (""+this.winNumber).split("")
            setTimeout(()=>{
              for (let i = 0; i < 6; i++) {
                if (this.$refs.openResult) {
                  this.$refs.openResult[i].innerHTML = `
       <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + winArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
              <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${winArr[i]}</div>
      `
                }
              }
            },200)
            this.endTime = res.data.endTimeInterval
            let endTime = res.data.endTimeInterval
            if (!endTime) return
            if (endTime <= 0) {
              this.lastTime = this.$t('record.text24')
              clearInterval(this.tiemr3)
            } else {
              this.tiemr3 = setInterval(() => {
                if (endTime > 0) {
                  endTime--
                  this.lastTime = countDown(endTime)
                } else {
                  // this.getDetail()
                  this.lastTime = this.$t('record.text24')
                }
              }, 1000)
            }
          }
        })
      },
      getData() {
        let item = this.recordById
        if(item.betNumber) {
          item.betArr = this.myBetNum
          item.betArr = ("" + item.betNumber).split("")
          item.winnerNumber = this.mywinnerNumber
          if(item.winnerNumber) {
            item.winArr = (""+item.winnerNumber).split("")
          }
          setTimeout(() => {
            this.NewbetAmount += Number(item.betAmount)
            this.NewwinAmount += Number(item.winAmount)
            for (let i = 0; i < 6; i++) {
              if (this.$refs.listRef && this.$refs.listRef.getElementsByClassName('img-item')[i]) {
                this.$refs.listRef.getElementsByClassName('img-item')[i].innerHTML = `
       <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + item.betArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
              <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${item.betArr[i]}</div>
      `
                if(i === 0) {
                  if(item.winArr) {
                    setTimeout(() => {
                      if (item.betArr.toString() == item.winArr.toString()) {
                        this.$refs.listRef.getElementsByClassName('img-box')[0].classList.add('all-active')
                        this.$refs.listRef.getElementsByClassName('all-Win')[0].classList.add('crown')
                      } else {
                        for(let k = 0; k < 6; k++) {
                          if(item.betArr[k] === item.winArr[k]) {
                            this.$refs.listRef.getElementsByClassName('img-item')[k].classList.add('single-active')
                          }
                        }
                      }
                    },200)
                  }
                }
              }
            }
          },500)
        }
        this.detailData = this.recordById
      },
      getDetail() {
        this.$fetch.post('/guess/queryRobotGuessInfoById',{
          activityId: this.$route.query.activityId
        }).then(res => {
          if(res.success) {
            this.mywinMoney = res.data.userWinAmountTotal
            this.loadingShow = false
        //     if (this.betNumber) {
        //       this.betArr = (""+this.betNumber).split("")
        //       setTimeout(()=>{
        //         for (let i = 0; i < 6; i++) {
        //           // 待开奖我的竞猜
        //           if (this.$refs.waitOpen && !this.winNumber) {
        //             this.$refs.waitOpen[i].innerHTML = `
        //  <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + this.betArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
        //         <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${this.betArr[i]}</div>
        // `
        //           }
        //           已开奖我的竞猜
        //           if (this.$refs.recordRef) {
        //             this.$refs.recordRef[i].innerHTML = `
        //  <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + this.betArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
        //         <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${this.betArr[i]}</div>
        // `
        //           }
        //         }
        //       },200)
        //     }
            this.specialCount = res.data.robotGuessRecord.specialCount
            this.firstCount = res.data.robotGuessRecord.firstCount
            this.secondCount = res.data.robotGuessRecord.secondCount
            this.thirdCount = res.data.robotGuessRecord.thirdCount
            this.fourthCount = res.data.robotGuessRecord.fourthCount
            this.fifthCount = res.data.robotGuessRecord.fifthCount
            this.noLottery = res.data.robotGuessRecord.status
            this.winNumber = res.data.robotGuessRecord.winNumber
            this.bonusPoolAmount = res.data.robotGuessRecord.bonusPoolAmount
            this.bonusPoolAmountSum = res.data.robotGuessRecord.bonusPoolAmountSum
            this.data = res.data.robotGuessRecord
            // this.winTotal()
            let endTime = res.data.robotGuessRecord.endTimeInterval
            this.endTime = res.data.robotGuessRecord.endTimeInterval
            // 开奖结果的记录
            this.winArr = (""+res.data.robotGuessRecord.winNumber).split("")
            setTimeout(()=>{
              for (let i = 0; i < 6; i++) {
                if (this.$refs.openResult) {
                  this.$refs.openResult[i].innerHTML = `
       <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + this.winArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
              <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${this.winArr[i]}</div>
      `
                }
              }
            },200)
            if(this.winNumber){
              for(let k = 0; k < 6; k++) {
                setTimeout(() => {
                  if (this.betArr.toString() == this.winArr.toString()) {
                    this.allin = true
                  } else {
                    if(this.betArr[k] === this.winArr[k]) {
                      this.$refs.listRef.getElementsByClassName('img-item')[k].classList.add('single-active')
                    }
                  }
                },200)
              }
            }
            if (!endTime) return
            if (endTime <= 0) {
              this.lastTime = this.$t('record.text24')
              clearInterval(this.tiemr3)
            } else {
              this.tiemr3 = setInterval(() => {
                if (endTime > 0) {
                  endTime--
                  this.lastTime = countDown(endTime)
                } else {
                  // this.getDetail()
                  this.lastTime = this.$t('record.text24')
                }
              }, 1000)
            }
          } else {
            this.loadingShow = false
          }
        }).catch(err => {
          console.log(err)
        })
      },
      winResult(status, type) {
        if(Number(status) === 0) return this.$t('record.text6') // 已中特等奖
        if(Number(status) === 1) return this.$t('record.text7') // 已中一等奖
        if(Number(status) === 2) return this.$t('record.text8') // 已中二等奖
        if(Number(status) === 3) return this.$t('record.text9') // 已中三等奖
        if(Number(status) === 4) return this.$t('record.text10') // 已中四等奖
        if(Number(status) === 5) return this.$t('record.text11') // 已中五等奖
        if(Number(status) === 6) {
          // 0 未开始 1 进行中 2 结束 3 已开奖 4 开奖中
          if (type) return this.$t('record.text12')
          if (!type) return this.$t('record.text3')
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
  @import "../../assets/css/mixin.styl"
  .content-banner{
    margin-top .4rem
    height 3rem
    width: 100%;
    background: #f5f6fa;
    border-radius: 4px;
    border: 1px solid #e6e7eb;
    .banner-title{
      text-align center
      font-size .28rem
      color #19191a
      margin-top .46rem
    }
    .img-content{
      margin .3rem auto
      bg-image2('waitOpen');
      width .48rem
      height .56rem
    }
    .no-lottery{
      text-align center
      font-size .28rem
      color #c5c5d1
      margin-bottom  .2rem
    }
    .count-down{
      text-align center
      font-size .28rem
      color #19191a
      span{
        color #00aff0
      }
    }
  }
  .img-box{
    position relative
    .sign{
      width 1rem
      height 1rem
      position absolute
      bottom 0
      right 0
      bg-image2('sanjiao');
      span{
        bottom .12rem
        position absolute
        right .06rem
        z-index 99
        font-size .24rem
        color #fff
      }
    }
  }
  .crown{
    width .42rem
    height .4rem
    position absolute
    top 1rem
    right 0
    bg-image2('crown');
  }
  .integral-ul{
    margin-top .3rem
    padding 0 .3rem
    font-size .28rem
    color #19191a
    background: #f5f6fa;
    border-radius: 4px;
    border: 1px solid #e6e7eb;
    .integral-li{
      height .8rem
      display flex
      align-items center
      justify-content space-between
      border-bottom 1px solid #e6e7eb;
      &:last-child{
        border-bottom none;
      }
    }
  }
  .guess{
    text-align center
  }
  .guess-box{
    padding-right .3rem
    display flex
    justify-content space-between
    .guess-right{
      font-size .28rem
      color #ffc933
    }
  }
  .guess-uls{
    border-bottom 1px solid #e6e7eb;
  }
.img-box{
  position relative
  &.all-active{
    background #fff5db
  }
}
.loading{
  margin-top 1rem
}
.img-box{
  border-bottom 1px solid #e6e7eb
}
.sign {
  width 1rem
  height 1rem
  position absolute
  bottom 0
  right 0
  bg-image2('sanjiao')
  span{
    bottom .12rem
    position absolute
    right .06rem
    z-index 99
    font-size .24rem
    color #fff
  }
}
.content-title
  display: flex
  align-items center
  justify-content space-between
  padding-right: .3rem
  .win-t
    color #ffc933
.li-item{
  margin-top 0 !important
}
.li-data{
 margin 1rem 0 .5rem
 padding-top .5rem
}
.ul-data{
  margin-top .5rem
}
</style>
