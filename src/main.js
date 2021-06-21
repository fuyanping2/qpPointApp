import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  getCookie,
  delCookie
} from './libs/util'
import 'amfe-flexible'
// import Vconsole from 'vconsole'
import Vant from 'vant';
import common from './libs/common.js'
import 'vant/lib/index.css'
import lrz from 'lrz'
Vue.use(Vant);
Vue.use(common);
// Vue.use(lrz);
// let vConsole = new Vconsole()
Vue.config.productionTip = false
// Vue.use(vConsole)
router.beforeEach((to, from, next) => {
  if (to.path != "/orderFeedback" || to.path != "/submitSuccess" || to.path != "/filePage") {
    if (document.getElementById('loading')) {
      document.body.removeChild(document.getElementById('loading'))
    }
  }
  if (to.path == "/orderFeedback" || to.path == "/submitSuccess" || to.path == "/filePage") {
    next();
  } else if (to.path !== "/" && !getCookie('user')) {
    next('/');
  } else {
    next();
    store.state.homeLoadingImg = false

  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 1. 与app交互 经纬度，上传图片
// 2.经纬度展示到地图上
// 3.提交，修改接口报400
// 4.线路，站点查询改成模糊查询
// 5.对接批量删除接口
