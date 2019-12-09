<template>
  <div class="rule-one">
    <m-fixed-top :titleName="titleName" :isGoNumber="true" @goPath="goPathA"></m-fixed-top>
    <div class="fixed-cont">
      <div class="content-m">
        <div class="top-m">
          <div class="img-m"></div>
          <div class="right-cont">
            <p class="text1">{{$t('rule.text1')}}：{{$fourNumber(totalMoney)}} {{$t('record.text22')}}</p>
            <p class="text2">{{$t('rule.text8')}}：{{$changeDate(endTime, '-')}}</p>
          </div>
        </div>
        <div class="content-n">
          <div class="title-w">
            <div class="line"></div>
            <span>{{$t('rule.text2')}}</span>
          </div>
          <div class="text-rule">
            <p>{{$t('newRecord.text10')}}：{{dialogData.betAmount}}{{$t('record.text22')}} {{$t('newRecord.text11')}}/ {{$t('home.text30')}} </p>
            <p>{{$t('home.text11')}}：{{dialogData.intervalHours}}{{$t('home.text22')}} / {{$t('rule.text19')}}</p>
            <p v-if="$i18n.locale === 'EN'">Bonus Pool: all scores that users bet will be put into bonus pool. <span v-show="Number(dialogData.sysRate) > 0">The system will charge {{dialogData.sysRate * 100}}% of the bonus pool as the maintenance cost.</span></p>
            <p v-else>奖金池：用户参与竞猜活动所投注的积分，将全部投入奖金池。
              <span v-show="Number(dialogData.sysRate) > 0">开奖时，获奖用户的积分奖励将从奖金池中发放；系统抽取奖金池{{dialogData.sysRate * 100}}%的积分作为系统维护费用。</span>
            </p>
            <p>{{$t('rule.text18')}}</p>
            <div>
              <div class="title-w title-w-m">
                <div class="line"></div>
                <span>{{$t('rule.text3')}}：</span>
              </div>
              <div>
                <div v-if="$i18n.locale === 'EN' && dialogData.specialAmountRate" class="mma">
                  <p>Special award:  <span>{{dialogData.specialAmountRate * 100}}%</span> scores of the bonus pool as bonus</p>
                  <p>First prize：<span>{{dialogData.firstAmountRate * 100}}%</span> scores of the bonus pool as bonus</p>
                  <p>Second prize: <span>{{dialogData.secondAmount}}</span> scores for single share</p>
                  <p>Third prize: <span>{{dialogData.thirdAmount}}</span> scores for single share</p>
                  <p>Fourth prize： <span>{{dialogData.fourthAmount}}</span>  scores for single share</p>
                  <p>Five prize：<span>{{dialogData.fifthAmount}}</span> scores for single share</p>
                </div>
                <div v-else-if="$i18n.locale === 'CN' && dialogData.specialAmountRate" class="mma">
                  <p>特等奖：赢取奖金池 <span>{{dialogData.specialAmountRate * 100}}%</span> 的积分</p>
                  <p>一等奖：赢取奖金池 <span>{{dialogData.firstAmountRate * 100}}%</span> 的积分</p>
                  <p>二等奖：单注奖励 <span>{{dialogData.secondAmount}}</span> 积分</p>
                  <p>三等奖：单注奖励 <span>{{dialogData.thirdAmount}}</span> 积分</p>
                  <p>四等奖：单注奖励 <span>{{dialogData.fourthAmount}}</span> 积分</p>
                  <p>五等奖：单注奖励 <span>{{dialogData.fifthAmount}}</span> 积分</p>
                </div>
              </div>
            </div>
            <div>
              <div class="title-w title-w-m">
                <div class="line"></div>
                <span>{{$t('rule.text4')}}：</span>
              </div>
              <p>{{$t('rule.text5')}}</p>
            </div>
            <div class="title-w title-w-m">
              <div class="line"></div>
              <span>{{$t('rule.text6')}}：</span>
            </div>
            <div class="wrap-text">0x223699A856CFE924FDCB6641755772C46014E727
              <span class="copy-w" id="copy2" ref="addressCopy2" data-clipboard-action="copy" @click="copy()" data-clipboard-text="0x223699A856CFE924FDCB6641755772C46014E727">
              <span class="copy" >{{$t('rule.text9')}}</span>
            </span>
            </div>
            <div class="title-w title-w-m">
              <div class="line"></div>
              <span>{{$t('newRecord.text22')}}：</span>
            </div>
            <div class="wrap-text2">
              https://info.rraystudio.com/#/home
              <span class="copy-w" id="copy3" ref="addressCopy3" data-clipboard-action="copy" @click="copy2()" data-clipboard-text="https://info.rraystudio.com/#/home">
                <span class="copy" >{{$t('rule.text9')}}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="join-btn" @click="gotoHome">{{$t('rule.text7')}}</div>
      </div>
    </div>
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="dialogM">
        <div class="dialog-safe">
          <div class="close" @click="dialogM = false">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title" style="margin-top: .5rem;">{{mtitle}}</div>
          <div class="comfirm" @click="dialogM = false">{{$t('home.text40')}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import ClipboardJS from 'clipboard'
  export default {
    data () {
      return {
        mtitle: '',
        dialogM: false,
        isCN: false,
        totalMoney: 0,
        endTime: 0,
        dialogData: {},
        copyBtn: null,
        copyBtn2: null
      }
    },
    computed: {
      titleName () {
        return this.$t('home.text21')
      }
    },
    created () {
      this.getNewBanlance()
      if (localStorage.getItem('ticketLang') === 'EN') {
        this.isCN = true
      } else {
        this.isCN = false
      }
    },
    mounted () {
      this.copyBtn = new ClipboardJS(this.$refs.addressCopy2)
      this.copyBtn2 = new ClipboardJS(this.$refs.addressCopy3)
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
      gotoHome () {
        if (this.showWindowHref()['sessionId']) {
          this.$router.push({
            path: '/home',
            query: {
              sessionId: this.showWindowHref()['sessionId']
            }
          })
        } else {
          this.$router.push('/home')
        }
      },
      // 复制按钮
      copy () {
        var Url = '0x223699A856CFE924FDCB6641755772C46014E727';
        var clipboard1 = new ClipboardJS('.wrap-text', {
          text: function() {
            return Url;
          }
        });
        clipboard1.on('success', (e) => {
          this.mtitle = this.$t('rule.text10')
          this.dialogM = true
          clipboard1.destroy()
        })
        clipboard1.on('error', function(e) {
          this.mtitle = this.$t('rule.text11')
          this.dialogM = true
          clipboard1.destroy()
        })
      },
      copy2 () {
        var Url = 'https://info.rraystudio.com/#/home';
        var clipboard2 = new ClipboardJS('.wrap-text2', {
          text: function() {
            return Url;
          }
        });
        clipboard2.on('success', (e) => {
          this.mtitle = this.$t('rule.text10')
          this.dialogM = true
          clipboard2.destroy()
        })
        clipboard2.on('error', function(e) {
          this.mtitle = this.$t('rule.text11')
          this.dialogM = true
          clipboard2.destroy()
        })
      },
      goPathA () {
        //console.log(window.android, window.webkit.messageHandlers)
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
      getNewBanlance () {
        this.$fetch.post('/guess/queryRobotGuessInfoList', {
          pageIndex: 1,
          pageSize: 1
        }).then(res => {
          if (res.success) {
            if (res.data.length > 0) {
              this.endTime = res.data[0].endTime
              this.totalMoney = res.data[0].bonusPoolAmountSum
              this.dialogData = res.data[0]
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
.rule-one
  width: 100%
  bg-image2('newImages/bg')
  position: fixed
  top: 0
  bottom: 0
  z-index: 50
  >>> .fixed-top
    background-color: transparent
    color #fff
    border-bottom: none
    .goback .goback-icon
      bg-image2('newImages/back')
  .fixed-cont
    position: fixed
    top: 1.12rem
    bottom: 0
    width: 100%
    left: 0
  .content-m
    padding: 0 .3rem .4rem .3rem
    display: flex
    flex-direction column
    height: 100%
  .top-m
    display: flex
    align-items center
    margin: .3rem 0 .6rem
    .img-m
      width: 1rem
      height: 1rem
      margin-right: .2rem
      background: url("../../assets/img/newImage2/iconLogo.png") no-repeat center / cover
    .right-cont
      color #fff
      .text1
        font-size: .3rem
        margin-bottom: .23rem
      .text2
        font-size: .26rem
  .content-n
    width: 100%
    flex 1
    overflow auto
    border-radius .3rem
    background-color: #fff
    margin-bottom: 1.3rem
    padding: .5rem .3rem .5rem .3rem
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
      /*p,span
        word-break: break-word;
        text-indent: 0;
        word-wrap: break-word; // 只对英文起作用，以单词作为换行依据。
        white-space: pre-wrap; //只对中文起作用，强制换行。
        text-align:justify;  //css英文语句的两端对齐：*/
      .mma
        span
          color #00aff0
      .title-m
        font-size: .32rem
        font-weight: bold
        margin-top: .4rem
      .wrap-text, .wrap-text2
        word-break break-all
        .copy-w
          padding: 0 .3rem
          float right
        .copy
          color #00aff0
          border-bottom: 1px solid #00aff0
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
  .dialog-safe-w
    display: flex
    align-items center
    justify-content center
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom:0
    width: 100%
    height: 100%
    z-index: 200
    color #19191a
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
</style>
