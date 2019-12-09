<template>
  <div class="news-w">
    <m-fixed-top :titleName="titleName" class="top"></m-fixed-top>
    <div class="fixed-cont">
      <div class="content" >
        <vloading v-if="!newsDetail.createAt"></vloading>
        <div v-else>
          <p class="title">
            <img :src="getSrc(newsDetail.orderType)" alt=""> <span class="title-t">{{newsDetail.title}}</span></p>
          <p class="time">
            <img src="../../assets/img/notice/lightTime.png" alt="">
            <span>{{$changeDate(newsDetail.createAt)}}</span>
          </p>
          <p class="news-cont" v-html="newsDetail.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        titleName: this.$t('betA.text10'),
        newsDetail: '',
        pageIndex: 1
      }
    },
    created () {
      this.getNews()
    },
    methods: {
      getSrc (type) { // 0：普通公告 1：机器人竞猜公告 2：雷雷风暴游戏公告
        if (type === 0) return require('../../assets/img/notice/message.png')
        if (type === 1 || type === 2) return require('../../assets/img/notice/game.png')
      },
      getNews () {
        this.$fetch.post('/announcement/getAnnouncementDetail', {
          id: this.$route.query.id
        }).then(res => {
          if (res.success) {
            this.newsDetail = res.data
          }
        })
      }
    },
    components: {
      mFixedTop: () => import('@/components/mFixedTop'),
      vloading: () => import('@/components/loading')
    }
  }
</script>

<style scoped lang="stylus">
  .news-w
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    background: url("../../assets/img/notice/gameBG.png") no-repeat center / cover
    .top
      background: transparent
      border-bottom none
    .fixed-cont
      position: fixed
      top: 1.12rem
      bottom: 0
      width: 100%
      overflow: auto
      .content
        padding: .8rem .3rem .5rem
        font-size: .28rem
        color #000
        min-height 100%
        height auto
        .title
          display: flex
          align-items center
          img
            width: .36rem
            display: block
            margin-right: .16rem
          .title-t
            font-weight: bold
            font-size: .34rem
        .time
          color #19191a
          margin: .3rem 0
          display: flex
          align-items center
          img
            display: block
            width: .3rem
            margin-right: .12rem
        .news-cont
          margin: 0
          color #19191a
          line-height: 2
          font-size: .28rem
</style>
