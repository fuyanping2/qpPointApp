<template>
  <div class="reformplate" id="reformplate">
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
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
    <van-tabbar-item replace to="/reformplate">
        <span>改造前后</span>
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
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
  name: "reformplate",
  
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
       icon2: {
        active: require('../../assets/image/homeAndForm/icon_2_pre@3x.png'),
        inactive: require('../../assets/image/homeAndForm/icon_2_nor@3x.png')
      },
      query: {
      
        stationName: ''
      },
      myMap:null,
 
    }
  },
  created () {
   
  },
  mounted () {
   
  },
 
  methods: {
    initMap(){
      this.myMap=new AMap.Map('reformplate', {
            viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
            zoom:11, //初始化地图层级
            center: [121.124249,31.15098] //初始化地图中心点
      })


    },

    searchStationName () {
    },

  }
};
</script>
<style lang="scss">
.search-wrapper {
    position: fixed;
    top: 0px;
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

.van-tabbar--fixed {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }

</style>
<style lang="scss" scoped>
.reformplate{
  width: 100%;
  height: 100%;

  
}

</style>
