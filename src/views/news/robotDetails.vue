<template>
  <div class="personal-record">
    <app-header :titleName="titleName" class="top-ma"></app-header>
    <v-loading v-show="dataInfo === ''" class="loading-m"></v-loading>
    <div class="content-box" v-show="dataInfo">
      <ul class="uls" >
        <p class="title-a">
          <img src="../../assets/img/notice/game.png" alt=""> <span class="title-t">{{newsDetail.title}}</span></p>
        <p class="time-a">
          <img src="../../assets/img/notice/lightTime.png" alt="">
          <span v-show="newsDetail.createAt">{{$changeDate(newsDetail.createAt)}}</span>
        </p>
        <li class="li-item" v-if="!dataInfo.winNumber">
          <div class="li-content" style="padding-bottom: .3rem;">
            <div class="no-lottery">{{$t('record.text16')}}</div>
            <div class="img-content"><img src="../../assets/img/waitOpen@2x.png"></div>
            <div class="count-down" v-show="endTime > 0">{{$t('record.text17')}}：<span>{{lastTime}}</span></div>
          </div>
        </li>
        <li class="li-item" v-if="dataInfo.winNumber">
          <div class="li-content">
            <div class="box1">
              <div class="content-title result">{{$t('record.text66')}} {{dataInfo.activityName}} {{$t('record.text31')}}</div>
              <ul class="img-box">
                <li class="img-item" ref="recordRef" v-for="(item, index) in 6" :key="index">
                </li>
              </ul>
            </div>
            <div class="title-two">
              <div class="slide"></div>
              <span>{{$t('betA.text11')}}</span>
            </div>
            <div class="box1">
              <div class="flex-item">
                <span>{{$t('rule.text20')}}</span>
                <span class="light-money">{{$fourNumber(dataInfo.bonusPoolAmountSum)}} {{$t('record.text22')}}</span>
              </div>
              <div  class="flex-item">
                <span>{{$t('rule.text21')}}</span>
                <span class="light-money">{{$fourNumber(totalAmount)}} {{$t('record.text22')}}</span>
              </div>
              <div class="flex-item">
                <span>{{$t('newRecord.text12')}}</span>
                <span class="light-money">{{totalWiner}} {{$t('home.text30')}}</span>
              </div>
              <!--            我的中奖金额-->
              <div class="flex-item">
                <span>{{$t('rule.text23')}}</span>
                <span class="light-money">{{$fourNumber(myWin)}} {{$t('record.text22')}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
          <td class="bonus">{{$fourNumber(5* Number(dataInfo.secondCount))}}</td>
        </tr>
        <!--       中3个 -->
        <tr>
          <td class="duilie">{{$t('record.text52')}}</td>
          <td class="status">{{dataInfo.thirdCount}}</td>
          <td class="bonus">{{$fourNumber(1.5* Number(dataInfo.thirdCount))}}</td>
        </tr>
        <!--       中2个 -->
        <tr>
          <td class="duilie">{{$t('record.text53')}}</td>
          <td class="status">{{dataInfo.fourthCount}}</td>
          <td class="bonus">{{$fourNumber(0.5* Number(dataInfo.fourthCount))}}</td>
        </tr>
        <!--       中一个 -->
        <tr>
          <td class="duilie">{{$t('record.text54')}}</td>
          <td class="status">{{dataInfo.fifthCount}}</td>
          <td class="bonus">{{$fourNumber(0.25* Number(dataInfo.fifthCount))}}</td>
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
        newsDetail: '',
        titleName: this.$t('betA.text10'),
        newArr: ['','','','','','','']
      }
    },
    created() {
      this.getNews()
    },
    methods: {
      getNews () {
        this.$fetch.post('/announcement/getAnnouncementDetail', {
          id: this.$route.query.id
        }).then(res => {
          if (res.success) {
            this.newsDetail = res.data
            this.getmyGame(this.newsDetail.orderId)
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
    },
    components: {
      vLoading: resolve => require(['@/components/loading.vue'], resolve),
      appHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../assets/css/mixin.styl"
  .personal-record
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
    .box1
      background-color: #f5f6fa
    .li-content
      border none !important
      background-color: transparent !important
  .content-box{
    position: fixed
    top: 1.12rem
    bottom: 0
    width: 100%
    overflow: auto
    padding-top: .4rem
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
    .light-money{
      color #00aff0
    }
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
    font-size: .32rem
    color #19191a
    font-weight: bold
    height: 1rem
    line-height: 1rem
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
    span{
      font-size: .28rem
      font-weight: bold
    }
    .slide{
      margin-right: .16rem
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
