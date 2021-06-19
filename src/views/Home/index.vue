<template>
  <div class="home">
    <van-overlay :z-index="9999" :show="$store.state.homeLoadingImg">
      <div class="wrapperfast">
        <van-loading size="64px" color="#1989fa"></van-loading>
      </div>
    </van-overlay>
    <van-nav-bar title="青浦踩点记录" fixed placeholder>
      <template #left>
        <div class="nav-bar-wrapper">
          <img src="../../assets/image/homeAndForm/usericon.png" alt />
          <span class="username">{{ realName }}</span>
        </div>
      </template>
    </van-nav-bar>

    <div class="luru-wrapper">
      <img
        src="../../assets/image/homeAndForm/banner@3x.png"
        class="banner"
        alt
      />
      <div class="luru-content">
        <div class="luru-list">
          <div
            class="luru2"
            v-for="(item, index) in luruForm"
            :key="index + 'q'"
            @click="goBackAllForm(index, item)"
          >
            <div class="img-title-wrapper">
              <img class="luru-img" :src="item.imgUrl" alt />
              <div class="title-wrapper">
                <div class="title">{{ item.title }}</div>
                <div class="sub-title">点击填写表格</div>
              </div>
            </div>
            <div class="add-form" v-if="index !== 3">
              <img
                class="add"
                src="../../assets/image/homeAndForm/add@3x.png"
                alt
              />
              <span>添加</span>
            </div>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
  },
  data () {
    return {
      active: 0,
      icon: {
        active: require('../../assets/image/homeAndForm/icon_1_pre@3x.png'),
        inactive: require('../../assets/image/homeAndForm/icon_1_nor@3x.png')
      },
      icon1: {
        active: require('../../assets/image/homeAndForm/icon_2_pre@3x.png'),
        inactive: require('../../assets/image/homeAndForm/icon_2_nor@3x.png')
      },
      luruForm: [
        {
          title: '踩点记录表',
          imgUrl: require('../../assets/image/homeAndForm/icon_1_1@3x.png'),
          bgdColor: '#FFD666'
        }
      ],
      routerQuery: {},
      realName: '',
    }
  },
  created () {
    this.realName = localStorage.getItem("realName")
  },
  mounted () {
    if (this.$route.query) {
      this.routerQuery = this.$route.query
    }
  },
  methods: {
    goBackAllForm (index, item) {
      this.$store.state.homeLoadingImg = true
      let x = index + 1
      if (sessionStorage.getItem('rczxobj')) {
        let x = JSON.parse(sessionStorage.getItem('rczxobj'))
        if (x.routerQuery.curTypeName != item.title) {
          sessionStorage.removeItem("rczxobj")
        }
      }
      this.$router.push({
        path: '/allForm',
        query: {
          oldPath: '/home',
          addOrEdit: 1,
          curType: x,
          curTypeName: item.title,
        }
      })
    }
  }
};
</script>
<style lang="scss">
.home {
  .van-nav-bar__left {
    left: 0 !important;
  }
  .van-nav-bar__placeholder {
    height: 46px !important;
  }
  .van-nav-bar--fixed {
    z-index: 10;
  }
  .van-tabs__line {
    background: #333;
  }
  .nav-bar-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 15px;
      height: 15px;
    }
    .username {
      color: #aaa;
      font-size: 14px;
      padding-left: 5px;
    }
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
  .van-tabs__line {
    width: 48px !important;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0 0;
  }
  .van-tabbar--fixed {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #fff;
  .wrapperfast {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .luru-wrapper {
    // padding-top: 46px;
    padding-bottom: 50px;
    .banner {
      width: 100%;
      height: 160px;
    }
    .luru-content {
      margin-top: 20px;
      margin-bottom: 34px;
      padding: 0 12px;
      .luru-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
      }
      .luru {
        // width: 155px;
        // height: 225px;
        padding: 18.5px 11px;
        box-shadow: 0px 0px 20px 0px rgba(255, 214, 102, 0.3);
        border-radius: 20px;
        box-sizing: border-box;
        &:last-child {
          margin-top: 40.5px;
        }
        &.luru1 {
          margin-top: 40.5px;
        }
        .luru-img {
          width: 44.5px;
          height: 44.5px;
        }
        .title {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-top: 13.5px;
        }
        .sub-title {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-top: 10.5px;
        }
        .add-form {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 66px;
          height: 33px;
          background: rgba(255, 255, 255, 1);
          border-radius: 12px;
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-top: 25.5px;
          .add {
            width: 11px;
            height: 11px;
            margin-right: 5px;
          }
        }
      }
      .luru2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 18px 17.5px 18.5px 11px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 16px 0px rgba(129, 174, 254, 0.27);
        border-radius: 5px;
        margin-bottom: 15px;
        box-sizing: border-box;
        .img-title-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .luru-img {
            width: 44.5px;
            height: 44.5px;
            margin-right: 16.5px;
          }
          .title {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 18px;
          }
          .sub-title {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            margin-top: 10px;
            line-height: 12px;
          }
        }
        .add-form {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5.5px 10px;
          background: rgba(128, 173, 254, 1);
          border-radius: 5px;
          color: #fff;
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 15px;
          .add {
            width: 11px;
            height: 11px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
