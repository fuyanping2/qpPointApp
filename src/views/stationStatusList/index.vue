<template>
  <div class="history">
    <van-nav-bar @click-left="onClickLeft" title="踩点记录表" fixed>
      <template #left>
        <img
          src="../../assets/image/homeAndForm/icon_back@3x.png"
          alt
          style="width: 16px; height: 17px"
        />
      </template>
    </van-nav-bar>
    <div class="search-wrapper">
      <van-field
        v-model="query.stationName"
        label="站名"
        placeholder="请输入站名"
      >
        <template #button>
          <van-button size="small" type="primary" @click="searchStationName"
            >查询</van-button
          >
        </template>
      </van-field>
    </div>
    <div class="history-list-wrapper" v-if="list && list.length > 0">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoadList"
          :immediate-check="false"
          offset="100"
        >
          <van-cell v-for="(item, index) in list" :key="index + 't'">
            <station-status-com
              :item="item"
              :query="query"
              :index="index"
            ></station-status-com>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="history-list-wrapper history-list-wrapper1" v-else>
      <img
        src="../../assets/image//nodata/no-data.png"
        alt
        class="no-data-wrapper"
      />
      <div class="desc">暂无数据哦，快去录入报表吧</div>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/history">
        <span>历史</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <van-overlay :z-index="30" :show="showimg">
      <div class="wrapperfast">
        <van-loading size="64px" color="#1989fa"></van-loading>
      </div>
    </van-overlay>
    <div class="totop" id="totop" @click="Top">
      <img src="../../assets/image/history/fanhuidingbu.png" alt="" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import stationStatusCom from '../../components/stationStatusCom/index'
export default {
  name: "stationStatusList",
  components: {
    stationStatusCom
  },
  data () {
    return {
      active: 1,
      icon: {
        active: require('../../assets/image/homeAndForm/icon_1_pre@3x.png'),
        inactive: require('../../assets/image/homeAndForm/icon_1_nor@3x.png')
      },
      icon1: {
        active: require('../../assets/image/homeAndForm/icon_2_pre@3x.png'),
        inactive: require('../../assets/image/homeAndForm/icon_2_nor@3x.png')
      },
      conponentsShow: false,
      showimg: false,
      routerQuery: {},
      list: [], // 历史列表
      query: {
        pageNo: 1,
        pageSize: 14,
        stationName: ''
      },
      isLoading: false,
      finished: false,
      loading: false,
      error: false,
    }
  },
  created () {
    if (!this.$route.query) {
      this.onRefresh()
    }
  },
  mounted () {
    this.routerQuery = this.$route.query
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop);
  },
  //一般数据在created中请求，但是如果页面缓存了就放在activated中
  activated () {
    let meta = this.$route.meta;
    if (meta.isFresh || !this.list.length) {//允许刷新操作 或者 主页->详情页->列表页 时，
      this.query.pageNo = 1;//将pageNo更新为初始值
      meta.isFresh = false;
      // this.getAllData();//请求数据
      this.onRefresh()
    } else {//详情页缓存，跳到之前的高度
      this.$nextTick(() => {
        window.scrollTo(0, meta.scrollTop)
      })
    }
  },
  //我们需要在当页的钩子函数中，加上操作
  beforeRouteEnter (to, from, next) {
    if (from.path === '/allForm') {
      to.meta.isFresh = true
    } else { //不是从detail页面过来的，需要刷新
      to.meta.isFresh = true
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/allForm') {
      from.meta.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    } else {//不去详情页面时，将缓存的listData数组清空
      this.list = []
    }
    next()
  },
  methods: {
    // 导航返回
    onClickLeft () {
      this.$router.push({
        path: this.routerQuery.oldPath,
        query: {
          curTypeName: this.routerQuery.curTypeName,
          curType: this.routerQuery.curType,
          active1: this.routerQuery.active1,
          page: this.routerQuery.page,
        }
      })
    },
    Top () {
      var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    onRefresh () {
      this.list = [];
      this.query.pageNo = 1
      this.isLoading = false;
      this.finished = false;
      this.loading = true;
      this.onLoadList();
    },
    onLoadList () {
      if (this.isLoading) {
        this.list = [];
        this.isLoading = false;
      }
      this.getAllData()
    },
    searchStationName () {
      this.onRefresh()
    },
    getAllData () {
      // this.showimg = true
      this.$fetchGet("station/status", this.query).then(res => {
        this.list = this.list.concat(res.result.list)
        this.loading = false;
        if (this.list.length >= res.result.total) {
          this.finished = true;
          return false
        }
        this.query.pageNo++;
      }).catch(error => {
        this.$toast('加载失败,请重新加载')
      }).finally(() => {
        this.isLoading = false
        this.loading = false
      })
    },
    confirmDialog (type) {
      this.showimg = true
      this.$fetchGet('login/logout').then(res => {
        this.showimg = false
        if (res = "login") {
          this.$toast("退出登录成功")
          localStorage.removeItem("roleCode");
          sessionStorage.removeItem('rczxobj')
          sessionStorage.removeItem('curStationInfo')
          this.$router.push("/");
        } else {
          this.$toast("退出登录失败")
        }
      })
    },
  }
};
</script>
<style lang="scss">
.history {
  .van-nav-bar__left {
    left: 0 !important;
    // width: 46px;
  }
  .van-nav-bar {
    background-color: #3c7efc;
    color: #fff;
  }
  .van-nav-bar--fixed {
    z-index: 10;
  }
  .van-nav-bar__title {
    font-size: 18px !important;
    font-family: PingFang SC;
    color: #fff !important;
    font-weight: 500 !important;
  }
  .van-nav-bar__right .van-nav-bar__text,
  .van-nav-bar__left .van-nav-bar__text {
    font-size: 16px;
    font-family: PingFang SC;
    color: #fff;
    font-weight: 500;
  }
  .van-tabs__line {
    background: #333;
  }

  .van-tab {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    &.van-tab--active {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0 0;
  }
  .van-tabbar--fixed {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
  .van-list {
    padding-top: 100px;
    padding-bottom: 50px;
    box-sizing: border-box;
  }

  .search-wrapper {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 1px 3px 7px -3px rgba(0, 0, 0, 0.62);
    z-index: 10;
    .van-cell {
      line-height: 0;
    }
    .van-button {
      height: 25px !important;
    }
    .van-field__label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
<style lang="scss" scoped>
.history {
  width: 100%;
  height: 100%;
  background: #fff;
  .wrapperfast {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .history-list-wrapper1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0;
    img {
      width: 295px;
      height: 223px;
      margin: 0 auto;
      margin-top: 115px;
    }
    .desc {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      text-align: center;
    }
  }

  .totop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 35px; /* 40/16 */
    height: 35px;
    border-radius: 50%;
    opacity: 0.8;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 6px 0 #999;
    right: 10px; /* 18/16 */
    bottom: 80px; /* 64/16 */
    z-index: 1100;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
