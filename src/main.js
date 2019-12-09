import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill' // 兼容旧浏览器
import router from './router'
import Cube from 'cube-ui'
import fetch from './api/api'
import {i18n} from './i18n/config'
import enUSMessages from '@/assets/js/en-US' // cube-ui 内置

Vue.prototype.$changeDate = function (time, str = '/', type = 1) { //   时间戳转换
  function ifTime (value) { //  判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min)
  }
}

Vue.prototype.$fetch = fetch
const Locale = Cube.Locale
Vue.use(Cube)
if (localStorage.getItem('ticketLang') === 'EN') {
  Locale.use('en-US', enUSMessages)
}

// if (i18n.locale === 'EN') {
//   axios.defaults.headers = {'social-language': 'en'}
// }

const imgArr = [
  require('./assets/img/robot_small/1@2x.png'),
  require('./assets/img/robot_small/2@2x.png'),
  require('./assets/img/robot_small/3@2x.png'),
  require('./assets/img/robot_small/4@2x.png'),
  require('./assets/img/robot_small/5@2x.png'),
  require('./assets/img/robot_small/6@2x.png')
]

Vue.prototype.$imgLogo = function (array) {
  // var digits = (""+array).split("");
  // console.log(array)
  if(Number(array) === 1) {
    return imgArr[0]
  } else if(Number(array) === 2) {
    return imgArr[1]
  } else if(Number(array) === 3) {
    return imgArr[2]
  } else if(Number(array) === 4) {
    return imgArr[3]
  } else if(Number(array) === 5) {
    return imgArr[4]
  } else if(Number(array) === 6) {
    return imgArr[5]
  }
}

Vue.prototype.$fourNumber = function(num) {
  if (!num) {
    return '0.0000'
  }
  let splitNum = String(num).split(".")
  if (splitNum.length > 1) {
    let decimals = String(num).split(".")[1].length
    if (decimals > 4) {
      return String(num).replace(/^(.*\..{4}).*$/,"$1")
    } else {
      return Number(num).toFixed(4)
    }
  } else {
    return Number(num).toFixed(4)
  }
}

Vue.prototype.$changeDate = function (time, str = '/', type = 1) { //   时间戳转换
  function ifTime (value) { //  判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
    case 2:
      return year + str + ifTime(month) + str + ifTime(day) + ' 00:00:00'
    case 3:
      return year + str + ifTime(month) + str + ifTime(day) + ' 23:59:59'
    case 4:
      return year + str + ifTime(month) + str + ifTime(day)
  }
}

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

router.afterEach(() => {
  document.body.scrollTop = 0
})
