<template>
  <div class="past-record">
    <app-header :titleName="titleName"></app-header>
    <div class="content-box">
      <div class="record-list">
        <div class="bg-w" v-if="nullDatas">
          <div class="bg-nodata"></div>
          <p class="no-text">{{nullDatas}}</p>
        </div>
        <cube-scroll
          ref="scroll"
          :options="options"
          :data="recordList"
          @pulling-up="onPullingDown" v-if="emptyDatas">
          <ul class="uls">
            <li class="li-item" v-for="(item,index) in recordList" :key="index" @click="toDetail(item)" ref="listRef" >
              <div class="open-result"  v-show="item.winNumber">
                <div class="li-title">{{$t('record.text64')}}{{item.activityName}} {{$t('record.text28')}}</div>
                <div class="li-content">
                  <div class="content-title">{{$t('record.text29')}}</div>
                  <ul class="img-box">
                    <li class="img-item" ref="recordRef" v-for="(num, index) in 6" :key="index">
                      <!--                      <img :src="$imgLogo('传一个字段判断')">-->
                      <!--                      <div class="number">{{item.num}}</div>-->
                    </li>
                  </ul>
                  <div class="flex-item">
                    <span>{{$t('rule.text20')}}</span>
                    <span>{{$fourNumber(item.bonusPoolAmountSum)}} {{$t('record.text22')}}</span>
                  </div>
                  <div  class="flex-item">
                    <span>{{$t('rule.text21')}}</span>
                    <span>{{$fourNumber(totalAmount(item))}} {{$t('record.text22')}}</span>
                  </div>
                  <div class="flex-item">
                    <span>{{$t('rule.text22')}}</span>
                    <span>{{$fourNumber(totalWiner(item))}} {{$t('home.text30')}}</span>
                  </div>
<!--                  <div class="flex-item">-->
<!--                    <span>{{$t('rule.text23')}}</span>-->
<!--                    <span>{{$fourNumber(item.userWinAmountTotal)}} {{$t('record.text22')}}</span>-->
<!--                  </div>-->
                </div>
              </div>
<!--              <div class="open-result" v-if="!item.winNumber">-->
<!--                <div class="li-title">{{item.activityName}}期</div>-->
<!--                <div class="li-content" style="padding-bottom: .3rem">-->
<!--                  <div class="no-lottery">待开奖</div>-->
<!--                  <div class="img-content"><img src="../../assets/img/waitOpen@2x.png"></div>-->
<!--                  <div class="count-down" v-show="endTime > 0">距离开奖时间：<span>{{lastTime}}</span></div>-->
<!--                </div>-->
<!--              </div>-->
            </li>
          </ul>
        </cube-scroll>
        <v-loading v-show="loadingShow"></v-loading>
      </div>
    </div>
    <!--    底部菜单导航 -->
    <navbar></navbar>
  </div>
</template>

<script>
  /* eslint-disable */
  import appHeader from '../../components/mFixedTop'
  import {countDown} from '@/assets/js/countDown'
  export default {
    data() {
      return{
        recordList: [],
        loadingShow: true,
        emptyDatas: false,
        titleName: this.$t('record.text30'),
        pageIndex: 1, // 页码
        pageSize: 5, // 页面数量
        winArr: [], // 开奖号码
        digits: [],
        newArr: ['','','','','','',''],
        nullDatas: '',
        lastTime: '',
        endTime: 0,
        tiemr3: null,
      }
    },
    created() {
      this.getRecordList()
      let array = '555555'
      this.digits = (""+array).split("");
    },
    methods: {
      // 本期发放奖金
      totalAmount (dataInfo) {
        let specialAmount = 0
        let firstAmount = 0
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
        return Number(specialAmount) + Number(firstAmount) + 5* Number(dataInfo.secondCount) + 1.5* Number(dataInfo.thirdCount) +0.5* Number(dataInfo.fourthCount) + 0.25* Number(dataInfo.fifthCount)
      },
      // 本期中奖注数
      totalWiner (dataInfo) {
        return Number(dataInfo.specialCount) + Number(dataInfo.firstCount) + Number(dataInfo.secondCount) + Number(dataInfo.thirdCount) + Number(dataInfo.fourthCount) + Number(dataInfo.fifthCount)
      },
      onPullingDown () {
        this.getRecordList()
        // setTimeout(() => {
        //   this.$refs.scroll.forceUpdate()
        // }, 1000)
      },
      getRecordList() {
        this.$fetch.post(`/guess/queryRobotGuessInfoList`,{
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }).then(res => {
          if(res.success) {
            this.loadingShow = false
            let dataList = res.data
            if (dataList.length > 0) {
              this.emptyDatas = true
              this.nullDatas = ''
              if(this.pageIndex === 1) {
                this.recordList = dataList
              } else {
                this.recordList.push(...dataList)
              }
              this.recordList.forEach((item,index) => {
                if(item.winNumber) {
                  item.winArr = ("" + item.winNumber).split("")
                  setTimeout(() => {
                    for (let i = 0; i < 6; i++) {
                      if (this.$refs.listRef && this.$refs.listRef[index].getElementsByClassName('img-item')[i]) {
                          this.$refs.listRef[index].getElementsByClassName('img-item')[i].innerHTML = `
         <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../../assets/img/robot_small/' + item.winArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
                <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${item.winArr[i]}</div>
        `
                      }
                    }
                  },300)
                }
              })
              // this.recordList.forEach(item => {
              //   let endTime = item.endTimeInterval
              //   this.endTime = item.endTimeInterval
              //   if (!endTime) return
              //   if (endTime <= 0) {
              //     this.lastTime = this.$t('record.text24')
              //     clearInterval(this.tiemr3)
              //   } else {
              //     this.tiemr3 = setInterval(() => {
              //       if (endTime > 0) {
              //         endTime--
              //         this.lastTime = countDown(endTime)
              //       } else {
              //         this.lastTime = this.$t('record.text24')
              //       }
              //     }, 1000)
              //   }
              // })
              this.pageIndex++
            } else {
              if(this.pageIndex === 1) {
                this.emptyDatas = false
                this.nullDatas = this.$t('record.text5')
              }
            }
            setTimeout(() => {
              if (this.$refs.scroll) {
                this.$refs.scroll.forceUpdate()
              }
            }, 200)
          } else {
            this.loadingShow = false
            this.emptyDatas = false
            this.pageIndex = 1
            this.nullDatas = this.$t('record.text5')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toDetail(item) {
        let data = {
          bonusPoolAmountSum:item.bonusPoolAmountSum,
          endTimeInterval: item.endTimeInterval, //结束时间间隔  单位 秒
          status: item.status,// 状态 0 未开始 1 进行中 2 结束 3 已开奖 4 开奖中
          activityId: item.id,//活动id
          activityName: item.activityName, // 活动名称
          winNumber: item.winNumber, //开奖号码
          betTotalCount: item.betTotalCount, // 当期用户加入人数
          bonusPoolAmount: item.bonusPoolAmount,// 奖金池总金额
          specialCount: item.specialCount, // 特等奖中奖数量
          firstCount: item.firstCount,// 一等奖中奖数量
          secondCount: item.secondCount,// 二等奖中奖数量
          thirdCount: item.thirdCount,// 三等奖中奖数量
          fourthCount: item.fourthCount,// 四等奖中奖数量
          fifthCount: item.fifthCount,// 五等奖中奖数量
          specialAmountRate: item.specialAmountRate, // 特等奖中奖奖金比率 0.3 为奖金池总金额的30%
          firstAmountRate: item.firstAmountRate,// 一等奖中奖奖金比率 0.15 为奖金池总金额的15%
          secondAmount: item.secondAmount,// 二等奖中奖奖金
          thirdAmount: item.thirdAmount,// 三等奖中奖奖金
          fourthAmount: item.fourthAmount,// 四等奖中奖奖金
          fifthAmount: item.fifthAmount,// 五等奖中奖奖金
          preBonusPoolSurplusAmount: item.preBonusPoolSurplusAmount // 上期奖金池盈余金额
        }
        this.$router.push({
          path: '/personalRecord',
          query: {
            dataInfo: data.activityId
          }
        })
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
      navbar: () => import('@/components/navbar'),
      vLoading: resolve => require(['@/components/loading.vue'], resolve),
      appHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nullDatas{
    margin-top .5rem
    text-align: center;
    font-size: .28rem;
    color: #19191a
  }
  .uls{
    .li-item{
      margin-top .5rem
      .li-title{
        font-weight: bold;
        font-size: .28rem;
        color: #19191a
        margin-bottom .3rem
      }
      .li-content{
        width: 100%;
        background: #f5f6fa;
        border-radius: 4px;
        border: 1px solid #e6e7eb;
        .flex-item{
          display: flex
          align-items center
          justify-content space-between
          height: .8rem
          font-size: .28rem
          color #19191a
          padding: 0 .3rem
          border-top: 1px solid #e6e7eb
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
        .content-title{
          height:.8rem;
          font-size: .26rem;
          color: #19191a;
          padding-left: .3rem;
          line-height: .8rem
          border-bottom: 1px solid #e6e7eb;
        }
        .img-box{
          width 100%;
          height: 2.5rem;
          display flex;
          align-items center;
          justify-content center
          .img-item{
            margin-left .1rem
            display flex
            flex-direction column
            justify-content center
            align-items center
            border: 1px solid #e6e7eb;
            background #fff
            border-radius: 4px;
            width .96rem
            height 1.48rem
            img{
              width: .68rem;
            }
            .number{
              font-size: .24rem;
              color: #19191a;
              margin-top .2rem;
            }
            &:first-child{
              margin-left 0
            }
          }
        }
      }
    }
  }
  .record-list{
    width: 100%;
    overflow: hidden;
    position: fixed;
    padding 0 .3rem
    top: 1rem;
    left: 0;
    bottom: 1.2rem;
    .uls{
      padding-bottom: .3rem
    }
  }

</style>
