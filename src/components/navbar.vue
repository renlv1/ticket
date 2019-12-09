<template>
  <div class="navbar-w">
    <ul class="nav-uls">
      <router-link to="/home" tag="li" class="list-nav">
        <div class="img-box"></div>
        <p>{{$t('newRecord.text21')}}</p>
      </router-link>
      <router-link to="/pastRecord" tag="li" class="list-nav">
        <div class="img-box"></div>
        <p>{{$t('record.text30')}}</p>
      </router-link>
      <router-link to="/my" tag="li" class="list-nav" :class="{'router-link-exact-active': $route.path === '/voucher'}">
        <div class="img-box"></div>
        <p>{{$t('home.text1')}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    }
  }
</script>

<style scoped lang="stylus">
.navbar-w
  position: fixed
  bottom: 0
  left: 0
  right: 0
  width: 100%
  height: 1.2rem
  border-top: 1px solid #e6e7eb
  background-color: #fff
  z-index: 100
  .nav-uls
    display: flex
    align-items center
    height: 100%
    .list-nav
      flex 1
      height: 100%
      display: flex
      align-items center
      justify-content center
      flex-direction column
      &:nth-child(1)
        .img-box
          width: .5rem
          height: .4rem
          background: url("../assets/img/newImage2/game_normal.png") no-repeat center / cover
      &:nth-child(2)
        .img-box
          width: .46rem
          height: .36rem
          background: url("../assets/img/newImage2/record_normal.png") no-repeat center / cover
      &:nth-child(3)
        .img-box
          width: .27rem
          height: .38rem
          background: url("../assets/img/newImage2/my_normal.png") no-repeat center / cover
      &.router-link-exact-active
        p
          color #00aff0
        &:nth-child(1)
          .img-box
            background: url("../assets/img/newImage2/game_active.png") no-repeat center / cover
        &:nth-child(2)
          .img-box
            background: url("../assets/img/newImage2/record_active.png") no-repeat center / cover
        &:nth-child(3)
          .img-box
            background: url("../assets/img/newImage2/my_active.png") no-repeat center / cover
      p
        margin-top: .18rem
        font-size: 14px
        color #b3b3b3

</style>
