<template>
  <div class="news-w">
    <m-fixed-top :titleName="titleName"  :isGoNumber="true" @goPath="goPathA"></m-fixed-top>
    <cube-scroll
      ref="scroll3"
      :data="newsList"
      :options="options"
      @pulling-up="onPullingDown"
      class="content-m">
      <ul class="uls">
        <div v-if="notData">
          <div class="bg-nodata"></div>
          <p class="no-text">{{$t('record.text5')}}</p>
        </div>
        <li class="list" @click="gotoDetials(item.id)" v-for="(item, index) in newsList" :key="index">
          <div class="left">
            <p>{{item.title}}</p>
            <p class="time">{{$changeDate(item.createAt)}}</p>
          </div>
          <div class="more"></div>
        </li>
        <vloading v-show="loadingShow"></vloading>
        <p class="no-more" v-show="moreShow">没有更多了</p>
      </ul>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        moreShow: false,
        newsList: [],
        pageIndex: 1,
        loadingShow: true,
        notData: false,
        loadMore: true,
        pageSize: 20,
        lang: '',
        options: {
          pullUpLoad: true
        }
      }
    },
    mounted () {
      let href = this.showWindowHref()
      if (Number(href['language']) === 2) {
        this.lang = 'en'
        localStorage.setItem('ticketLang', 'EN')
        this.$i18n.locale = 'EN'
      } else {
        this.lang = 'cn'
        this.$i18n.locale = 'CN'
        localStorage.setItem('ticketLang', 'CN')
      }
      this.getNews()
    },
    methods: {
      goPathA () {
        var u = navigator.userAgent
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.scan()
        } else {
          window.webkit.messageHandlers.scan.postMessage(null)
        }
      },
      onPullingDown () {
        if (!this.loadMore) {
          this.$refs.scroll3.forceUpdate()
          return
        }
        this.pageIndex++
        this.$fetch.post('/announcement/getAnnouncementList', {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          lan: this.lang
        }).then(res => {
          if (res.success) {
            this.$refs.scroll3.forceUpdate()
            this.newsList = this.newsList.concat(res.data)
            if (res.data.length < this.pageSize || res.data.length === 0) {
              this.loadMore = false
              this.moreShow = true
            } else {
              this.moreShow = false
              this.loadMore = true
            }
          }
        })
      },
      gotoDetials (id) {
        this.$router.push({
          path: '/noticeDetails',
          query: {id}
        })
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
      getNews () {
        // lan	（选填）语言版本 cn：中文 en:英文
        this.$fetch.post('/announcement/getAnnouncementList', {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          lan: this.lang
        }).then(res => {
          this.$refs.scroll3.forceUpdate()
          this.loadingShow = false
          if (res.success) {
            this.newsList = res.data
            if (res.data.length === 0) {
              this.notData = true
              this.loadMore = false
              this.options.pullUpLoad = false
            }
            if (res.data.length < this.pageSize) {
              this.loadMore = false
              this.options.pullUpLoad = false
            }
          }
        })
      }
    },
    computed: {
      titleName () {
        return this.$t('betA.text9')
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop'),
      vloading: () => import('@/components/loading')
    }
  }
</script>

<style scoped lang="stylus">
@import '../../assets/css/mixin.styl';
.news-w
  .content-m
    position: fixed
    top: 1.12rem
    bottom:0
    left: 0
    right: 0
    width: 100%
    height: auto;
    .uls
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
      .no-more
        text-align: center
        margin: .3rem 0
        font-size: .28rem
      .list
        height: 1.5rem
        padding: 0 .3rem
        display: flex
        align-items center
        justify-content space-between
        border-bottom: 1px solid #e6e7eb
        font-size: .28rem
        .left
          color #000
          .time
            margin-top: .1rem
            color #999
        .more
          height: .36rem;
          width: .38rem;
          transform rotate(180deg)
          bg-image2('back')
</style>
