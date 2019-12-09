<template>
  <div class="bet-w">
    <m-fixed-top :titleName="titleName"></m-fixed-top>
    <div class="content">
      <div class="bet-w">
        <div class="bet-top">
          <span>{{$t('betA.text8')}}</span>
          <div class="right" @click="radomTick">
            <span>{{$t('home.text26')}}</span>
          </div>
        </div>
        <ul class="bet-uls">
          <li class="bet-list" v-for="(item, index) in 6" :key="index" @click="switchNum(index)" ref="betList">
            <div class="img-icon wen-icon"></div>
          </li>
        </ul>
      </div>
      <div class="list-item">
        <span>{{$t('home.text29')}}</span>
        <div class="right">
          <span>{{unitPrice}} {{$t('home.text10')}} / {{$t('home.text30')}}</span>
        </div>
      </div>
      <div class="list-item input-item">
        <span>{{$t('home.text27')}}</span>
        <div class="right ctrl-w">
          <div class="btn-c" @click="minusNum">
            <div class="minus"></div>
          </div>
          <input type="text" v-model="betsNum" class="nums" @input="changeInput" pattern="\d*">
          <div class="btn-c" @click="addNum">
            <div class="add"></div>
          </div>
        </div>
      </div>
      <div class="list-item">
        <span>{{$t('home.text28')}}</span>
        <div class="right">
          <span v-show="mIndex === 0">{{totalNum}} {{$t('home.text10')}}</span>
          <span v-show="mIndex === 1">{{betsNum}} {{$t('newRecord.text16')}}</span>
        </div>
      </div>
      <div class="list-item" @click="showMDialog">
        <span>{{$t('newRecord.text17')}}</span>
        <div class="right m-right">
          <div>{{payText}}</div>
          <img src="../assets/img/arrow@2x.png" alt="" class="img-arrow">
        </div>
      </div>
      <p class="desc" v-show="mIndex === 0">{{$t('home.text31')}}：<span style="color: #00a6f1">{{$fourNumber(money)}}</span></p>
      <p class="desc" v-show="mIndex === 1">{{$t('newRecord.text1')}}：<span style="color: #00a6f1">{{guessJoinCount}}</span></p>
      <div class="send-btn" @click="betSend" :class="{'disable-btn': isSendBtn}">{{$t('home.text32')}}</div>
    </div>
    <!--  选择机器人 弹窗  -->
    <transition name="dialog">
      <div class="dialog-w" v-show="dialogShow">
        <div class="dialog-content" @click="dialogShow = false">
          <div class="dialog-box" @click.stop>
            <div class="close" @click="dialogShow = false">
              <div class="close-icon"></div>
            </div>
            <h2 class="dialog-title">{{$t('home.text33')}}</h2>
            <ul class="bet-uls-d">
              <li class="bet-list-d" v-for="(item, index) in 6" :key="index" @click="selectOne(item)">
                <div class="img-icon"></div>
                <div class="num">{{item}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="dialog-bg" v-show="dialogShow" @click="dialogShow = false"></div>
    </transition>
    <!--  安全验证 弹窗  -->
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
<!--          <div class="shortMsg" v-if="!isgogoleDuanxin">-->
<!--            <div class="payMsg-box">-->
<!--              <input class="payMsg tradingCenter-input" v-model.trim="payCode" :placeholder="$t('home.text39')" type="text" value="">-->
<!--              <button class="sendMsg"  :class="{'disable-btn': isDisabled}" @click="getCode()" ref="sendMsg">{{sendBtnValue}}</button>-->
<!--            </div>-->
<!--          </div>-->
          <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
          <div class="comfirm" @click="oklock" :class="{'loading-btn': loadingBtn}">
            <img src="../assets/img/loading.gif" alt="" v-show="loadingBtn">
            <span>{{$t('home.text40')}}</span>
          </div>
        </div>
      </div>
    </transition>
    <slide-dialog :merchantShow="isSlide" @selectOne="selectMon" @hideDialog="hideDialog" :merchantsType="merchantsType" :mIndex="mIndex"></slide-dialog>
  </div>
</template>

<script>
  import Dialog from '@/components/dialog'
  export default {
    data () {
      return {
        mIndex: 0,
        isSendBtn: false,
        loadingBtn: false,
        errInputMsg: '',
        userOpen: '',
        sendBtnValue: this.$t('home.text41'),
        sendBtnTimes: 60,
        isDisabled: false,
        isgogoleDuanxin: true,
        safeCode: '',
        payCode: '',
        betsNum: 1,
        safeShow: false,
        dialogShow: false,
        unitPrice: Number(this.$route.query.score),
        money: 0,
        guessJoinCount: 0, // 抵扣券
        titleName: this.$t('betA.text7'),
        newArr: ['','','','','',''],
        selectIndex: -1,
        merchantsType: this.$t('newRecord.text14'),
        isSlide: false,
        payText: this.$t('newRecord.text15'),
        payType: 1,
      }
    },
    computed: {
      totalNum () {
        return this.betsNum * this.unitPrice
      }
    },
    created () {
      this.getBalance()
    },
    methods: {
      selectMon (item, index) {
        this.payText = item
        this.mIndex = index
        this.isSlide = false
        if (this.mIndex === 1) {
          this.payType = 2
        } else {
          this.payType = 1
        }
      },
      hideDialog () {
        this.isSlide = false
      },
      showMDialog () {
        this.isSlide = true
      },
      // 输入框限制
      changeInput () {
        let val = this.betsNum
        if (!/^\d/.test(val)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过4位小数
          this.betsNum = val.substring(0, val.length - 1)
        }
        if (/^\./.test(val)) { // 如果是"."
          this.betsNum = ''
        }
        if (val < 1) {
          this.betsNum = ''
        }
        this.betsNum = this.betsNum.replace(/[^0-9]/g, '') // 只能是数字或者.
        if (this.betsNum > 9999) {
          this.betsNum = 9999
        }
      },
      getBalance () {
        this.$fetch.get('/user/balance').then(res => {
          if (res.success) {
            this.guessJoinCount = res.data.guessJoinCount
            this.money = res.data.pointAccount.balance
            this.userOpen = res.data.user
          } else {
          }
        })
      },
      // 显示投注号码
      switchNum (index) {
        this.selectIndex = index
        this.dialogShow = true
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
        if (this.payCode === '' && this.isgogoleDuanxin === true) {
          this.errInputMsg = this.$t('home.text38')
          return
        }
        if (this.payCode === '' && this.isgogoleDuanxin === false) {
          this.errInputMsg = this.$t('home.text39')
          return
        }
        this.loadingBtn = true
        this.$fetch.post('/entrust/unlock', {
          tradePwd: this.safeCode,
          mobileCode: this.payCode
        }).then(res => {
          if (res.success) {
            let betNumber = this.newArr.join().replace(/,/g, "")
            this.$fetch.post('/guess/join',{
              activityId: this.$route.query.id,
              joinCount: this.betsNum,
              betNumber: betNumber,
              payType: this.payType
            }).then(result => {
              this.safeShow = false
              this.loadingBtn = false
              if (result.success) {
                this.getBalance()
                Dialog({
                  title: this.$t('home.text43'),
                  okFn: () => {
                    this.$router.push('/home')
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
      // 发送短信验证码
      getCode () {
        if (this.sendBtnValue === this.$t('home.text41')) {
          let formData = new FormData()
          formData.append('type', 'code')
          this.$fetch.postFormdata(this.$api + '/user/sendSmsCode', formData).then((res) => {
            if (res.success) {
              this.errInputMsg = ''
              this.countDown()
            } else {
              // 验证码获取失败
              this.errInputMsg = res.msg
            }
          }).catch((err) => {
            this.errInputMsg = this.$t('home.text44')
            console.log(err)
          })
        }
      },
      // 短信倒计时
      countDown () {
        if (this.sendBtnTimes === 0) {
          this.sendBtnValue = this.$t('home.text41')
          this.sendBtnTimes = 60
          this.isDisabled = false
        } else {
          this.sendBtnTimes--
          this.sendBtnValue = this.sendBtnTimes
          this.isDisabled = true
          setTimeout(() => this.countDown(), 1000)
        }
      },
      // 立即投注
      betSend () {
        this.errInputMsg = ''
        this.safeCode = ''
        this.payCode = ''
        let len = this.newArr.length
        let a = 0
        for (let i = 0; i < len; i++) {
          if (this.newArr[i] !== '') {
            a++
          }
        }
        if (a !== len) {
          const toast = this.$createToast({
            txt: this.$t('home.text33'),
            time: 1000,
            type: 'txt'
          })
          toast.show()
        } else if (this.betsNum < 1) {
          const toast = this.$createToast({
            txt: this.$t('home.text45'),
            time: 1000,
            type: 'txt'
          })
          toast.show()
        } else if (this.mIndex === 0 && this.betsNum > this.money) {
          const toast = this.$createToast({
            txt: this.$t('newRecord.text18'),
            time: 1000,
            type: 'txt'
          })
          toast.show()
        } else if (this.mIndex === 1 && this.betsNum > this.guessJoinCount) {
          const toast = this.$createToast({
            txt: this.$t('newRecord.text19'),
            time: 1000,
            type: 'txt'
          })
          toast.show()
        } else {
          this.isSendBtn = true
          let betNumber = this.newArr.join().replace(/,/g, "")
          this.$fetch.post('/guess/join',{
            activityId: this.$route.query.id,
            joinCount: this.betsNum,
            betNumber: betNumber,
            payType: this.payType
          }).then(res => {
            if (res.resultCode === 'ACCOUNT_LOCK') {
              this.isSendBtn = false
              // 安全密码没开通
              let userOpen = this.userOpen
              if (userOpen.openTradePassword !== 2) {
                Dialog({
                  title: this.$t('home.text46')
                })
                // 谷歌和短信都没开通
              } else if (userOpen.openGoogleCode !== 2 && userOpen.openMobileCode !== 2) {
                Dialog({
                  title: this.$t('home.text47')
                })
              } else if (userOpen.openGoogleCode === 2) {
                this.safeShow = true
                this.isgogoleDuanxin = true
              } else if (userOpen.openMobileCode === 2) {
                this.safeShow = true
                this.isgogoleDuanxin = false
              }
            } else if (res.success) {
              this.getBalance()
              this.isSendBtn = false
              Dialog({
                title: this.$t('home.text43'),
                okFn: () => {
                  this.$router.push('/home')
                }
              })
            } else {
              this.isSendBtn = false
              Dialog({
                title: this.englishLang(res.resultCode, res.msg)
              })
            }
          })
        }
      },
      // 选择机器人
      selectOne (item) {
        this.newArr[this.selectIndex] = item
        this.newArr.splice(6)
        this.dialogShow = false
        this.$refs.betList[this.selectIndex].innerHTML = ''
        this.$refs.betList[this.selectIndex].innerHTML = `
         <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../assets/img/robot_small/' + item + '@2x.png')}) no-repeat center / cover;"></div>
                <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${item}</div>
        `
      },
      // 随机方法
      rnd(n,m){
        return parseInt(Math.random()*(m-n)+n);
      },
      // 随机
      radomTick () {
        var arr = [];
        while(arr.length<6){
          var a = this.rnd(1,7);
          arr.push(a);
        }
        this.newArr = arr
        for (var i = 0; i < 7; i++) {
          if (i === 6) {
            return
          }
          this.$refs.betList[i].innerHTML = `
           <div class="img-icon" style="width: 0.58rem; height: 0.7rem; background: url(${require('../assets/img/robot_small/' + arr[i] + '@2x.png')}) no-repeat center / cover;"></div>
           <div class="num" style="margin-top: 0.1rem;font-size: 0.2rem;color: #19191a;">${arr[i]}</div>
          `
        }
      },
      // 减
      minusNum () {
        if (this.betsNum === 1) {
          this.betsNum = 1
        } else {
          this.betsNum--
        }
      },
      // 加
      addNum () {
        if (this.betsNum === 9999) {
          this.betsNum = 9999
        } else {
          this.betsNum++
        }
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop'),
      slideDialog: () => import('@/components/slideDialog')
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/css/mixin.styl';
  .bet-w
    .content
      padding: 1.12rem .3rem 0
    .bet-w
      width: 100%
      background-color: #f5f6fa
      border: 1px solid #e6e7eb
      border-radius .08rem
      margin-top: .4rem
      .bet-top
        width: 100%
        height: .8rem
        padding: 0 .3rem
        font-size: .28rem
        color #19191a
        display: flex
        align-items center
        justify-content space-between
        border-bottom: 1px solid #e6e7eb
        .right
          width: 1.3rem
          height: .48rem
          border-radius .24rem
          text-align: center
          display: flex
          align-items center
          justify-content center
          color #fff
          background-color: #00a6f1
          font-size: .22rem
          span
            display: block
            line-height: 1
    .list-item
      display: flex
      align-items center
      justify-content space-between
      width: 100%
      height: 1rem
      padding: 0 .3rem
      background-color: #f5f6fa
      border-radius 4px
      margin-top: .3rem
      font-size: .28rem
      color #19191a
      .m-right
        display: flex
        align-items center
        .img-arrow
          width: .12rem
          display: block
          margin-left: .12rem
      .minus
        width: .28rem
        height: .04rem
        bg-image('minus')
      .add
        width: .28rem
        height: .28rem
        bg-image('add')
      .ctrl-w
        display: flex
        align-items center
        .nums
          width 1rem
          text-align: center
          color #00a6f1
          font-size: .28rem
        .btn-c
          display: flex
          align-items center
          justify-content center
          height: 1rem
          padding: 0 .1rem
    .desc
      padding-left: .3rem
      font-size: .24rem
      color #19191a
      margin-top: .2rem
    .send-btn
      margin: 1rem 0 .24rem
      width: 100%
      height: 1rem
      display: flex
      align-items center
      justify-content center
      font-size: .3rem
      color #fff
      border-radius .5rem
      background-color: #00aff0
      &.disable-btn
        pointer-events none
        cursor none
    .dialog-bg
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom:0
      width: 100%
      height: 100%
      z-index: 100
      background-color: rgba(25,25,26,.7)
      &.fade-enter-active, &.fade-leave-active
        opacity: 1
        transition: opacity .2s linear;
      &.fade-enter, &.fade-leave-to
        opacity: 0
    .dialog-w
      position: fixed
      left: 0
      top: 0
      right: 0
      bottom:0
      width: 100%
      height: 100%
      z-index: 200
      color #19191a
      &.dialog-enter-active, &.dialog-leave-active
        transform translateY(0)
        transition: transform .3s linear;
      &.dialog-enter, &.dialog-leave-to
        transform translateY(100%)
      .dialog-content
        width: 100%
        height: 100%
        // background-color: rgba(25,25,26,.7)
      .dialog-box
        background-color: #fff
        width: 100%
        position: absolute
        bottom: 0
        left: 0
        padding: 0 .3rem .6rem
        border-radius 4px 4px 0 0
        .close
          position: absolute
          right: 0
          top: 0
          padding: .4rem
          .close-icon
            width: .32rem
            height: .32rem
            bg-image('close_one')
        .dialog-title
          font-size: .32rem
          font-weight: bold
          padding: .9rem 0 .6rem
          text-align: center
        .bet-uls-d
          padding: .45rem
          border-radius 4px
          background-color: #f5f6fa
          display: flex
          align-items center
          flex-wrap wrap
          justify-content: center;
          .bet-list-d
            display: flex
            align-items center
            justify-content center
            flex-direction column
            background-color: #fff
            border: 1px solid #e6e7eb
            border-radius .08rem
            width: 29%
            height: 2.2rem
            margin-right: .3rem
            font-size: .24rem
            &:nth-child(3n)
              margin-right: 0
            &:nth-child(n + 4)
              margin-top: .3rem
            &:nth-child(1)
              .img-icon
                bg-image('robot_small/1')
            &:nth-child(2)
              .img-icon
                bg-image('robot_small/2')
            &:nth-child(3)
              .img-icon
                bg-image('robot_small/3')
            &:nth-child(4)
              .img-icon
                bg-image('robot_small/4')
            &:nth-child(5)
              .img-icon
                bg-image('robot_small/5')
            &:nth-child(6)
              .img-icon
                bg-image('robot_small/6')
            &.active-li
              color #00a6f1
              border-color #00a6f1
            .img-icon
              width: 1.08rem
              height: 1.28rem
              margin-bottom: .2rem
    .dialog-safe-w
      display: flex
      align-items center
      justify-content center
      background-color: rgba(25,25,26,.7)
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
            bg-image('close_one')
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
