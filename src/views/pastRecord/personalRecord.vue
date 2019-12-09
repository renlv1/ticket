<template>
  <div class="personal-record">
    <app-header :titleName="titleName" :isGoNumber="true" @goPath="goPathA"></app-header>
    <v-loading v-show="dataInfo === ''" class="loading-m"></v-loading>
    <div class="content-box" v-show="dataInfo">
      <ul class="uls" >
        <li class="li-item" v-if="!dataInfo.winNumber">
          <div class="li-content" style="padding-bottom: .3rem;">
            <div class="no-lottery">{{$t('record.text16')}}</div>
            <div class="img-content"><img src="../../assets/img/waitOpen@2x.png"></div>
            <div class="count-down" v-show="endTime > 0">{{$t('record.text17')}}：<span>{{lastTime}}</span></div>
          </div>
        </li>
        <li class="li-item" v-if="dataInfo.winNumber">
          <div class="li-content">
            <div class="content-title result">{{$t('record.text66')}} {{dataInfo.activityName}} {{$t('record.text31')}}</div>
            <ul class="img-box">
              <li class="img-item" ref="recordRef" v-for="(item, index) in 6" :key="index">
              </li>
            </ul>
            <div class="flex-item">
              <span>{{$t('rule.text20')}}</span>
              <span>{{$fourNumber(dataInfo.bonusPoolAmountSum)}} {{$t('record.text22')}}</span>
            </div>
            <div  class="flex-item">
              <span>{{$t('rule.text21')}}</span>
              <span>{{$fourNumber(totalAmount)}} {{$t('record.text22')}}</span>
            </div>
            <div class="flex-item">
              <span>{{$t('newRecord.text12')}}</span>
              <span>{{totalWiner}} {{$t('home.text30')}}</span>
            </div>
<!--            我的中奖金额-->
            <div class="flex-item">
              <span>{{$t('rule.text23')}}</span>
              <span>{{$fourNumber(myWin)}} {{$t('record.text22')}}</span>
            </div>
            <div class="look-info-m" @click="gotoMoney">{{$t('rule.text24')}}</div>
          </div>
        </li>
      </ul>
      <div class="result-detail" style="display: none">
        <div class="detail-title">
          {{$t('record.text32')}}
        </div>
        <ul class="detail-item">
          <li class="detail-li">
            <div class="people-amount">{{$t('record.text33')}}</div>
            <div class="count">{{dataInfo.betTotalCount}}</div>
          </li>
          <li class="detail-li">
            <div class="people-amount">{{$t('record.text34')}}</div>
            <div class="count">{{$fourNumber(dataInfo.bonusPoolAmountSum)}} {{$t('record.text22')}}</div>
          </li>
        </ul>
      </div>
      <div class="win-number" style="display: none;">{{$t('record.text67')}}{{dataInfo.activityName}}{{$t('record.text35')}}：{{totalWiner}}</div>
      <div class="total-amount" style="display: none;">{{$t('record.text74')}}：<span>{{$fourNumber(totalAmount)}} {{$t('record.text37')}}</span></div>

      <div class="title-two">
        <div class="slide"></div>
        <span>{{$t('newRecord.text13')}}</span>
      </div>
      <table class="commonTableList">
        <thead>
        <tr>
          <td class="grade">{{$t('record.text38')}}</td>
          <td>{{$t('record.text57')}}</td>
          <td>{{$t('record.text75')}}</td>
        </tr>
        </thead>
        <tbody>
        <!--       全中 -->
        <tr>
          <td class="duilie">{{$t('record.text49')}}</td>
          <td class="status">{{dataInfo.specialCount}}</td>
          <td class="bonus">{{$fourNumber(specialAmount)}}</td>
        </tr>
        <!--       中5个 -->
        <tr>
          <td class="duilie">{{$t('record.text50')}}</td>
          <td class="status">{{dataInfo.firstCount}}</td>
          <td class="bonus">{{$fourNumber(firstAmount)}}</td>
        </tr>
        <!--       中4个 -->
        <tr>
          <td class="duilie">{{$t('record.text51')}}</td>
          <td class="status">{{dataInfo.secondCount}}</td>
          <td class="bonus">{{5* Number(dataInfo.secondCount)}}</td>
        </tr>
        <!--       中3个 -->
        <tr>
          <td class="duilie">{{$t('record.text52')}}</td>
          <td class="status">{{dataInfo.thirdCount}}</td>
          <td class="bonus">{{1.5* Number(dataInfo.thirdCount)}}</td>
        </tr>
        <!--       中2个 -->
        <tr>
          <td class="duilie">{{$t('record.text53')}}</td>
          <td class="status">{{dataInfo.fourthCount}}</td>
          <td class="bonus">{{0.5* Number(dataInfo.fourthCount)}}</td>
        </tr>
        <!--       中一个 -->
        <tr>
          <td class="duilie">{{$t('record.text54')}}</td>
          <td class="status">{{dataInfo.fifthCount}}</td>
          <td class="bonus">{{0.25* Number(dataInfo.fifthCount)}}</td>
        </tr>
        </tbody>
      </table>
      <div class="tips">{{$t('record.text46')}}{{$fourNumber(dataInfo.bonusPoolAmount)}}{{$t('record.text47')}}</div>
      <div class="to-check" style="display: none" @click="$router.push({path: '/poolDetail', query: {activityName:dataInfo.activityName, activityId: activityId}})">
        <div class="check-left">{{$t('record.text58')}}</div>
        <div class="check-right"><img src="../../assets/img/arrow@2x.png"></div>
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
        endTime: 0,
        dataInfo: '',
        activityId: '',
        pageIndex: 1, // 页码
        pageSize: 20, // 页面数量
        totalWiner: '', // 累计中奖人数
        totalAmount: '', // 累计奖金金额
        winArr: [],
        digits: [],
        lastTime: '',
        myWin: 0,
        specialAmount: '',
        firstAmount: '',
        newArr: ['','','','','','','']
      }
    },
    computed: {
      titleName () {
        return this.$t('record.text48')
      }
    },
    created() {
      if(this.$route.query.dataInfo) {
        // this.dataInfo = JSON.parse(this.$route.query.dataInfo)
        this.activityId = this.$route.query.dataInfo
        this.getmyGame(this.activityId)
      }
      let href2 = this.showWindowHref()
      if (href2['orderId']) {
        this.activityId = href2['orderId']
        this.getguessurl()
        if (Number(href2['language']) === 2) {
          this.lang = 'en'
          localStorage.setItem('ticketLang', 'EN')
          this.$i18n.locale = 'EN'
        } else {
          this.lang = 'cn'
          this.$i18n.locale = 'CN'
          localStorage.setItem('ticketLang', 'CN')
        }
      }
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
            this.getmyGame(href['orderId'])
          }
        })
      },
      // 查看奖池明细
      gotoMoney () {
        this.$router.push({
          path: '/poolDetail',
          query: {
            activityName:this.dataInfo.activityName,
            activityId: this.activityId
          }
        })
      },
      // 获取我的奖金
      getmyGame (id) {
        this.$fetch.post('/guess/queryRobotGuessInfoById', {
          activityId: id
        }).then(res => {
          if (res.success) {
            this.myWin = res.data.userWinAmountTotal
            this.dataInfo = res.data.robotGuessRecord
            this.totalWiner = Number(this.dataInfo.specialCount) + Number(this.dataInfo.firstCount) + Number(this.dataInfo.secondCount) + Number(this.dataInfo.thirdCount) + Number(this.dataInfo.fourthCount) + Number(this.dataInfo.fifthCount)
            // 特等奖中奖奖金 = 奖金池*15%
            if(Number(this.dataInfo.specialCount) !== 0) {
              this.specialAmount = Number(this.dataInfo.specialAmountRate) * Number(this.dataInfo.bonusPoolAmountSum) // 特等奖中奖奖金
            } else {
              this.specialAmount = 0
            }
            // 一等奖中奖奖金 = 奖金池*5% *
            if(Number(this.dataInfo.firstCount) !== 0) {
              this.firstAmount = Number(this.dataInfo.firstAmountRate) * Number(this.dataInfo.bonusPoolAmountSum) // 一等奖中奖奖金
            } else {
              this.firstAmount = 0
            }
            this.totalAmount = Number(this.specialAmount) + Number(this.firstAmount) + 5* Number(this.dataInfo.secondCount) + 1.5* Number(this.dataInfo.thirdCount) +0.5* Number(this.dataInfo.fourthCount) + 0.25* Number(this.dataInfo.fifthCount)
            if (this.dataInfo.winNumber) {
              this.winArr = (""+this.dataInfo.winNumber).split("")
              setTimeout(()=>{
                for (let i = 0; i < 6; i++) {
                  if (this.$refs.recordRef) {
                    this.$refs.recordRef[i].innerHTML = `
         <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + this.winArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
                <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${this.winArr[i]}</div>
        `
                  }
                }
              },500)
            }
          }
        })
      }
      // getDetail() {
      //   this.$fetch.post('/guess/queryRobotGuessJoinRecordList',{
      //     activityId: this.activityId
      //   }).then(res => {
      //     console.log(res)
      //   })
      // }
    },
    components: {
      vLoading: resolve => require(['@/components/loading.vue'], resolve),
      appHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/css/mixin.styl"
  .content-box{
    position: fixed
    top: 1.12rem
    bottom: 0
    width: 100%
    overflow: auto
    padding-top: 0
  }
  .loading-m{
    margin-top: 1rem
  }
  .flex-item{
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    font-size: 0.28rem;
    color: #19191a;
    border-top: 1px solid #e6e7eb;
  }
  .look-info-m{
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #e6e7eb;
    padding: 0 0.3rem;
    font-size: 0.28rem;
    color: #00aff0;
  }
  .content-title{
    text-align center;
  }
  .result-detail{
    margin-top .4rem;
    .detail-title{
      background: #f5f6fa;
      border: 1px solid #e6e7eb;
      font-size .26rem;
      color: #414554;
      height .8rem
      line-height .8rem
      padding-left .3rem
    }
    .detail-item{
      .detail-li{
        height .8rem
        line-height .8rem
        display flex
        font-size .26rem;
        color: #999;
        .people-amount{
          flex 1
          border: 1px solid #e6e7eb;
          padding-left .3rem
          border-top none
          border-right none
        }
        .count{
          border: 1px solid #e6e7eb;
          flex 1
          padding-left .3rem
          border-top none
        }
      }
    }
  }
  .win-number{
    margin-top .7rem
    font-size .28rem
    color #19191a
  }
  .total-amount{
    font-size .28rem
    color #19191a
    margin .3rem 0 .2rem
    span{
      color #00a6f1
    }
  }
  .title-two{
    display: flex
    align-items center
    font-size: .28rem
    color #19191a
    margin: .6rem 0 .2rem
    .slide{
      margin-right: .2rem
      width: .04rem
      height: .26rem
      bg-image2('slide')
    }
  }
  .commonTableList{
    display: block;
    thead {
      display: block;
      border-right: 1px solid #e6e7eb
      tr{
        height: .8rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f5f6fa;
        font-size .26rem;
        color: #414554;
        line-height .8rem
        td{
          flex 1
          display: block;
          text-align: center;
          border-left: 1px solid #e6e7eb
          border-top: 1px solid #e6e7eb
        }
      }
    }
    tbody{
      width: 100%;
      display: block;
      border-right: 1px solid #e6e7eb
      border-bottom: 1px solid #e6e7eb
      tr{
        height: .8rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f5f6fa;
        font-size .26rem;
        color: #999;
        line-height .8rem
        td{
          text-align: center;
          flex 1
          display: block;
          border-left: 1px solid #e6e7eb
          border-top: 1px solid #e6e7eb
        }
      }
    }
  }
  .tips{
    margin-top .2rem
    font-size .24rem;
    color: #414554;
    margin-bottom .5rem
  }
.to-check{
  width 100%
  background #f5f6fa
  border-radius 4px
  padding 0 .2rem
  height 1rem
  display flex
  justify-content space-between
  align-items center
  .check-left{
    font-size .24rem;
    color: #19191a;
  }
  .check-right{
    display flex
    align-items center
    width .12rem
    img{
      width 100%
    }
  }
}
.no-lottery{
  font-size: .26rem;
  color: #19191a;
  text-align center
  margin .5rem 0
}
.img-content{
  margin 0 auto
  width .48rem
  height .56rem
  img{
    width 100%
  }
}
.count-down{
  margin .3rem 0 0
  text-align center
  font-size .28rem
  color #19191a
  span{
    color #00aff0
  }
}
</style>
