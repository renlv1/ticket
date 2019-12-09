import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    // {
    //   path: '/notice', // 公告
    //   name: 'notice',
    //   component: () => import('./views/news/index')
    // },
    {
      path: '/notice', // 公告
      name: 'news',
      component: () => import('./views/news/news')
    },
    {
      path: '/newNotice', // 公告详情
      name: 'newNotice',
      component: () => import('./views/news/newNotice.vue')
    },
    {
      path: '/leileiDetails', // 详情 雷雷总风暴
      name: 'leileiDetails',
      component: () => import('./views/news/leileiDetails.vue')
    },
    {
      path: '/robotDetails', // 详情 机器人竞猜
      name: 'robotDetails',
      component: () => import('./views/news/robotDetails.vue')
    },
    {
      path: '/noticeDetails', // 公告详情
      name: 'noticeDetails',
      component: () => import('./views/news/newsDetails')
    },
    {
      path: '/', // 游戏规则 1
      name: 'ruleOne',
      component: () => import('./views/newRules/ruleOne.vue')
    },
    {
      path: '/ruleTwo', // 病毒游戏规则
      name: 'ruleTwo',
      component: () => import('./views/newRules/ruleTwo.vue')
    },
    {
      path: '/gameRecordDetail', // 病毒游戏详情
      name: 'gameRecordDetail',
      component: () => import('./views/newRules/gameRecordDetail.vue')
    },
    {
      path: '/bet',
      name: 'bet',
      component: () => import('./views/bet.vue')
    },
    {
      path: '/my', // 我的页面
      name: 'my',
      component: () => import('./views/my/index')
    },
    {
      path: '/voucher', // 抵扣券明细
      name: 'voucher',
      component: () => import('./views/my/voucher')
    },
    {
      path: '/myRecord', // 我的记录
      name: 'myRecord',
      component: () => import('./views/myRecord')
    },
    {
      path: '/pastRecord', // 全部往期记录
      name: 'pastRecord',
      component: () => import('./views/pastRecord/pastRecord')
    },
    {
      path: '/personalRecord', // 往期记录详情
      name: 'personalRecord',
      component: () => import('./views/pastRecord/personalRecord')
    },
    {
      path: '/lotteryResult', // 开奖结果
      name: 'lotteryResult',
      component: () => import('./views/recordDetail/lotteryResult')
    },
    {
      path: '/poolDetail', // 奖金池详情
      name: 'poolDetail',
      component: () => import('./views/bonusPools/poolDetail')
    },
    {
      path: '/singleRecord', // 奖金池详情
      name: 'singleRecord',
      component: () => import('./views/singleRecord')
    }
  ]
})
