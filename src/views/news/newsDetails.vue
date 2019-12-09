<template>
  <div class="news-w">
    <m-fixed-top :titleName="titleName"></m-fixed-top>
    <div class="content" >
      <vloading v-if="!newsDetail.createAt"></vloading>
      <div v-else>
        <p class="title">{{newsDetail.title}}</p>
        <p class="time">{{$changeDate(newsDetail.createAt)}}</p>
        <p class="news-cont" v-html="newsDetail.content"></p>
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
      onPullingDown () {},
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
    .content
      padding: 1.5rem .3rem 0
      font-size: .28rem
      color #000
      .time
        color #999
        margin: .2rem 0
      .news-cont
        margin: 0
        line-height: 2
        >>> img
          display: block
          width: 100%
</style>
