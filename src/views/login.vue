<template>
  <div class="login">
    <input type="text" placeholder="用户名" v-model="username">
    <input type="password" placeholder="密码" v-model="password">
    <div style="text-align: center; font-size: 14px;color: red">{{errT}}</div>
<!--    <input type="text" placeholder="验证码" v-model="verifyCode" v-show="verifyShow">-->
    <div @click="loginTo" class="btn">登录</div>
    <transition name="safeDialog">
      <div class="dialog-w dialog-safe-w" v-show="safeShow">
        <div class="dialog-safe">
          <div class="close" @click="safeShow = false">
            <div class="close-icon"></div>
          </div>
          <div class="dialog-title">登录验证</div>
          <div class="form-item">
            <div class="label">验证码</div>
            <input type="text" placeholder="请输入验证码" class="input" v-model.trim="verifyCode">
          </div>
          <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
          <div class="comfirm" @click="twoLogin" :class="{'loading-btn': loadingBtn}">
            <img src="../assets/img/loading.gif" alt="" v-show="loadingBtn">
            <span>确定</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        errT: '',
        loadingBtn: false,
        safeShow: false,
        errInputMsg: '',
        username: '',
        password: '',
        verifyCode: '',
        verifyShow: false
      }
    },
    methods: {
      loginTo () {
        this.errT = ''
        this.verifyShow = false
        if (this.username !== '' && this.password !== '') {
          this.$fetch.post('/user/applogin', {
            username: this.username,
            password: this.password,
            clientType: 3
          }).then(res => {
            if (res.success) {
              this.safeShow = true
            } else {
              this.errT = res.msg
            }
          })
        }
      },
      twoLogin () {
        this.errInputMsg = ''
        if (this.verifyCode !== '') {
          this.$fetch.post('/user/appLoginTwoCheck', {
            username: this.username,
            verifyCode: this.verifyCode,
            deviceId: 1,
            clientType: 3
          }).then(res => {
            if (res.success) {
              this.$router.push('/')
            } else {
              this.errInputMsg = res.msg
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '../assets/css/mixin.styl';
.login
  display: flex
  align-items center
  justify-content center
  flex-direction column
  margin-top: 3rem
  input
    width: 80%
    height: .8rem
    font-size: .3rem
    color #000
    padding: 0 .2rem
    margin-bottom: .6rem
    border: 1px solid #000
  .btn
    width: 80%
    height: 0.8rem;
    border-radius: 0.4rem;
    font-size: 0.26rem;
    color: #fff000;
    text-align: center;
    line-height: 0.8rem;
    background-color: #24a0ff;
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
        .bet-list-d
          display: flex
          align-items center
          justify-content center
          flex-direction column
          background-color: #fff
          border: 1px solid #e6e7eb
          border-radius .08rem
          width: 1.8rem
          height: 2.2rem
          margin-right: .3rem
          font-size: .24rem
          &:nth-child(3n)
            margin-right: 0
          &:nth-child(n + 4)
            margin-top: .3rem
          &:nth-child(1)
            .img-icon
              bg-image('robot_big/1')
          &:nth-child(2)
            .img-icon
              bg-image('robot_big/2')
          &:nth-child(3)
            .img-icon
              bg-image('robot_big/3')
          &:nth-child(4)
            .img-icon
              bg-image('robot_big/4')
          &:nth-child(5)
            .img-icon
              bg-image('robot_big/5')
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
