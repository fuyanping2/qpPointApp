<template>
  <div class="history-com">
    <div class="item-content">
      <div class="item-content-top">
        <van-checkbox
          v-model="item.checked"
          checked-color="#ee0a24"
          shape="square"
        ></van-checkbox>
        <div class="bus-wrapper" @click.stop="goBackAllForm(item)">
          <div class="bus-name">
            <span>{{ item.stationName }}</span>
          </div>
          <div class="time">{{ item.stationCode }}</div>
          <div class="time1">{{ item.dircetion }}</div>
          <div class="icon">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "",
  components: {},
  props: ['item', 'query', 'index'],
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {
    goBackAllForm (item) {
      this.$router.push({
        path: '/allForm',
        query: {
          oldPath: '/history',
          addOrEdit: 2,
          id: item.id,
          page: this.query.pageNo
        }
      })
      sessionStorage.setItem('curStationInfo', JSON.stringify(item))
    },
  }
};
</script>
<style lang="scss">
.history-com {
}
</style>
<style lang="scss" scoped>
.history-com {
  .item-content {
    .item-content-top {
      display: flex;
      align-items: center;
      .bus-wrapper {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bus-name {
          margin-left: 10px;
          width: 50%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 18px;
            height: 17.5px;
            margin-right: 10px;
          }
          span {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }
        }
        .time {
          flex: 1;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          text-align: right;
        }
        .time1 {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-left: 20px;
        }
      }
      .icon {
        font-size: 18px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
