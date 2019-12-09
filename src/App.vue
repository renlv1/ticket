<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {
      setTimeout(() => {
        this.getguessurl()
        let href = this.showWindowHref()
        // document.cookie="socialwallet="+href['sessionId']
        // var exp = new Date();
        //  exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
         // document.cookie = 'socialwallet=' + 'b19d08e7c9623a3b783c929d77891ed80fd1c213d096a5a003564c6ca2a4701e' + 'path=/; domain=.socialwalletsg.com;expires=' + exp.toGMTString();

        // document.cookie="socialwallet="+ 'b19d08e7c9623a3b783c929d77891ed80fd1c213d096a5a003564c6ca2a4701e'
        let lang = href['language']
        if (Number(lang) === 1) {
          localStorage.setItem('ticketLang', 'CN')
          this.$i18n.locale = 'CN'
        } else if (Number(lang) === 2) {
          localStorage.setItem('ticketLang', 'EN')
          this.$i18n.locale = 'EN'
        }
      }, 200)
    },
    created () {
      // alert('机器人竞猜')
      // alert(window.location.hash)
      // this.getLogin()
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
      getguessurl () {
        let href = this.showWindowHref()
        this.$fetch.post('/guess/robotguesslogin', {
          sessionId: href['sessionId'],
          timestamp: href['timestamp'],
          sign: href['sign']
        }).then(res => {
          if (res.success) {
            this.getLogin()
          }
        })
      },
      getLogin () {
        this.$fetch.get('/user/balance').then(res => {
          if (res.success) {
          } else {
            // this.$router.push('/login')
          }
        })
      },
      setCookie (name,value) {
      }
    }
  }
</script>

<style lang="stylus">
  bg-image3($url)
    background: url("./assets/img/" + $url + "@2x.png") no-repeat center / cover
    @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
      background: url("./assets/img/" + $url + "@3x.png") no-repeat center / cover
  @import 'assets/css/reset.css';
  @import 'assets/css/record.styl';
  .news-w .news-cont img
      width: 100%
  body
    height: 100%
    overflow: hidden
  .bet-uls
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative
    border-bottom: 1px solid #e6e7eb
    &:last-child
      border-bottom: none
    .sanjiao
      width: 1rem
      height: 1rem
      position: absolute
      bottom: 0
      right: 0
      bg-image3('sanjiao')
      font-size: .24rem
      color #fff
      .icon
        display: block
        position: absolute
        bottom: .12rem
        right: .06rem
    .bet-list
      margin-left: 0.1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #e6e7eb;
      background: #fff;
      border-radius: 4px;
      color: #19191a;
      position: relative
      width: .96rem;
      height: 1.48rem;
      &:nth-child(1)
        margin-left: 0
      .img-icon
        width: .58rem
        height: .7rem
        &.wen-icon
          width: .32rem
          height: .52rem
          bg-image3('wen_two')
      .num
        margin-top: .1rem
        font-size: .2rem
        color #19191a
</style>
