<template>
  <div class="past-record">
    <app-header :titleName="titleName"></app-header>
    <div class="content-box">
      <div class="bg-w" v-if="nullDatas">
        <div class="bg-nodata"></div>
        <p class="no-text">{{nullDatas}}</p>
      </div>
      <v-loading v-show="loadingShow"></v-loading>
      <cube-scroll
        ref="scroll2"
        :options="options"
        :data="recordList"
        @pulling-up="onPullingDown2"  v-show="queryId > 0 && recordList.length > 0">
        <ul class="uls">
          <div class="li-title" v-if="recordList.length > 0">{{$t('record.text69')}}{{recordList[0].activityName}}{{$t('record.text1')}}</div>
          <li class="li-item guess-uls li-my" v-for="(item,index) in recordList" :key="index" @click="toDetail2(item)" :class="{'all-active': item.allin === true}" ref="recordList">
            <div>
              <!--              <div class="li-title">{{$t('record.text69')}}{{item.activityName}}{{$t('record.text1')}}</div>-->
              <div class="li-content" >
                <div class="content-title">
                  <span>{{$t('record.text2')}}：{{item.id}}</span>
                  <!--                <span class="win-t" v-if="item.status === 1 ||  noLottery === 4">未开奖</span>-->
                  <span class="win-t">{{winResult(item.winStatus, item.winnerNumber)}}</span>
                </div>
                <ul class="img-box">
                  <li class="img-item" ref="recordRef" v-for="(num, index) in 6" :key="index">
                  </li>
                  <div data-v-105612da="" class="sign" v-if="item.betCount > 1"><span data-v-105612da="" >×{{item.betCount}}</span></div>
                  <div class="all-Win" :class="{'crown': item.allin === true}"></div>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import appHeader from '@/components/mFixedTop'

  export default {
    data () {
      return {
        single: false, // 单个中奖高亮
        allin: false,
        loadingShow: true,
        emptyDatas: false,
        titleName: this.$t('record.text4'),
        recordList: [],
        pageIndex: 1, // 页码
        pageSize: 20, // 页面数量
        winCount: 0, // 中奖数
        newList: [],
        nullDatas: '',
        queryId: Number(this.$route.query.id),
        newactivityArr: []
      }
    },
    created () {
      // this.myRecord()
      if (this.$route.query.id) {
        setTimeout(() => {
          this.myRecord()
        },500)
      }
    },
    methods: {
      // 我参与的投注
      myRecord () {
        let id = this.$route.query.id
        this.$fetch.post('/guess/userQueryRobotGuessJoinRecordList', {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          activityId: id
        }).then(res => {
          if(res.success) {
            this.loadingShow = false
            let dataList = res.data
            if (dataList.length > 0) {
              // this.emptyDatas = true
              this.nullDatas = ''
              if(this.pageIndex === 1) {
                this.recordList = dataList
              } else {
                this.recordList.push(...dataList)
              }
              this.recordList.forEach((item, index) => {
                item.allin = false
                if(item.betNumber) {
                  item.betArr = (""+item.betNumber).split("")
                  if(item.winnerNumber) {
                    item.winArr = (""+item.winnerNumber).split("")
                  }
                  // item.winArr = (""+'643113').split("")
                  // item.betArr = (""+'643113').split("")
                  let winArr = (""+'643112').split("")
                  let numArr = (""+item.betNumber).split("")
                  // item.betArr.forEach(val => {
                  //   val.flag = false
                  // })
                  setTimeout(() => {
                    for (let i = 0; i < 6; i++) {
                      if (this.$refs.recordRef) {
                        this.$refs.recordList[index].getElementsByClassName('img-item')[i].innerHTML = `
         <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../assets/img/robot_small/' + item.betArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
                <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${item.betArr[i]}</div>
        `
                        if(i === 0) {
                          if(item.winArr) {
                            setTimeout(() => {
                              if (item.betArr.toString() == item.winArr.toString()) {
                                this.$refs.recordList[index].getElementsByClassName('img-box')[0].classList.add('all-active')
                                this.$refs.recordList[index].getElementsByClassName('all-Win')[0].classList.add('crown')
                              } else {
                                for(let k = 0; k < 6; k++) {
                                  if(item.betArr[k] === item.winArr[k]) {
                                    this.$refs.recordList[index].getElementsByClassName('img-item')[k].classList.add('single-active')
                                  }
                                }
                              }
                            },200)
                          }
                        }
                      }
                    }
                  }, 200)
                }
              })
              this.pageIndex++
            } else {
              if(this.pageIndex === 1) {
                this.emptyDatas = false
                this.nullDatas = this.$t('record.text5')
              }
            }
          } else {
            this.loadingShow = false
            this.emptyDatas = false
            this.pageIndex = 1
            this.nullDatas = this.$t('record.text5')
          }
        })
      },
      onPullingDown () {
        this.getRecordList()
      },
      onPullingDown2 () {
        this.myRecord()
        setTimeout(() => {
          if (this.$refs.scroll2) {
            this.$refs.scroll2.forceUpdate()
          }
        }, 200)
      },
      sortArr(arr, str) {
        var _arr = [],
          _t = [],
          // 临时的变量
          _tmp;
        if ( arr.length ){
          _tmp = arr[0][str];
        }
        // console.log( arr );
        // 将相同类别的对象添加到统一个数组
        for (var i in arr) {
          if ( arr[i][str] === _tmp ){
            _t.push( arr[i] );
          } else {
            _tmp = arr[i][str];
            _arr.push( _t );
            _t = [arr[i]];
          }
        }
        // 将最后的内容推出新数组
        _arr.push( _t );
        return _arr;
      },
      getRecordList() {
        this.$fetch.post(`/guess/userQueryRobotGuessJoinRecordList`,{
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
              this.newactivityArr = this.sortArr(this.recordList, 'activityId')
              this.recordList.forEach((item, index) => {
                item.allin = false
                if(item.betNumber) {
                  item.betArr = (""+item.betNumber).split("")
                  if(item.winnerNumber) {
                    item.winArr = (""+item.winnerNumber).split("")
                  }
                  // item.winArr = (""+'643113').split("")
                  // item.betArr = (""+'643113').split("")
                  let winArr = (""+'643112').split("")
                  let numArr = (""+item.betNumber).split("")
                  // item.betArr.forEach(val => {
                  //   val.flag = false
                  // })
                  setTimeout(() => {
                    for (let i = 0; i < 6; i++) {
                      if (this.$refs.recordRef) {
                        this.$refs.recordList[index].getElementsByClassName('img-item')[i].innerHTML = `
         <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../assets/img/robot_small/' + item.betArr[i] + '@2x.png')}) no-repeat center / cover;"></div>
                <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${item.betArr[i]}</div>
        `
                        if(i === 0) {
                          if(item.winArr) {
                            setTimeout(() => {
                              if (item.betArr.toString() == item.winArr.toString()) {
                                this.$refs.recordList[index].getElementsByClassName('img-box')[0].classList.add('all-active')
                                this.$refs.recordList[index].getElementsByClassName('all-Win')[0].classList.add('crown')
                              } else {
                                for(let k = 0; k < 6; k++) {
                                  if(item.betArr[k] === item.winArr[k]) {
                                    this.$refs.recordList[index].getElementsByClassName('img-item')[k].classList.add('single-active')
                                  }
                                }
                              }
                            },200)
                          }
                        }
                      }
                    }
                  }, 500)
                }
              })
              this.pageIndex++
            } else {
              if(this.pageIndex === 1) {
                this.emptyDatas = false
                this.nullDatas = this.$t('record.text5')
              }
              setTimeout(() => {
                if (this.$refs.scroll) {
                  this.$refs.scroll.forceUpdate()
                }
              }, 200)
            }
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
        this.$router.push({
          path: '/lotteryResult',
          query: {
            activityArr: JSON.stringify(item),
            activityId: item.activityId,
            betNumber: item.betNumber,
            betCount: item.betCount,
            betAmount: item.betAmount,
            winStatus: item.winStatus,
            winAmount: item.winAmount
          }
        })
      },
      toDetail2(item) {
        this.$router.push({
          path: '/lotteryResult',
          query: {
            activityArr: JSON.stringify(this.recordList)
          }
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
  @import '../assets/css/mixin.styl';
  .nullDatas {
    margin-top .5rem
    text-align: center;
    font-size: .28rem;
    color: #19191a
  }
  .content-box
    position: fixed
    top: 1.12rem
    left: 0
    bottom: 0
    width: 100%
    padding-top: 0
    padding-bottom: 0
  .content-title
    display: flex
    align-items center
    justify-content space-between
    padding-right: .3rem
    .win-t
      color #ffc933
  .img-box
    position relative
    &.all-active
      background #fff5db
    .sign
      width 1rem
      height 1rem
      position absolute
      bottom 0
      right 0
      bg-image2('sanjiao');
      span
        bottom .12rem
        position absolute
        right .06rem
        z-index 99
        font-size .24rem
        color #fff
    .crown
      width .42rem
      height .4rem
      position absolute
      top .2rem
      right 0
      bg-image2('crown')
  .bg-nodata
    width: .79rem
    height: .76rem
    bg-image('nobet')
    margin: .6rem auto .3rem
  .no-text
    text-align: center
    font-size: .28rem
    color #999
  .li-my{
    margin-top 0!important
  }
  .li-title{
    font-weight: bold;
    font-size: .28rem;
    color: #19191a
    margin .3rem 0
  }
</style>
