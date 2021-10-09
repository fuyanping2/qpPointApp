<template>
  <div class="station-status-com">
    <div class="item-content">
      <div class="item-content-top">
        <div class="bus-wrapper" @click.stop="goBackAllForm(item)">
          <div class="bus-name">
            <span>{{ item.stationName }}</span>
          </div>
          <div :class="[item.checked ? 'time1' : ' time1 time1-red']">
            {{ item.checked ? '已踩点' : '未踩点' }}
          </div>
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
      console.log(item)
      switch (item.checked) {
        case 0:
          this.$router.push({
            path: '/allForm',
            query: {
              oldPath: '/stationStatusList',
              addOrEdit: 1,
              stationName: item.stationName,
              page: this.query.pageNo,
              stationCode: item.code,
            }
          })
          break;
        case 1:
          this.$router.push({
            path: '/history',
            query: {
              stationName: item.stationName,
              stationCode: item.code,
            }
          })
          break;

      }

    },
  }
};
</script>
<style lang="scss">
.station-status-com {
}
</style>
<style lang="scss" scoped>
.station-status-com {
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
          width: 50px;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          text-align: center;
          color: #fff;
          margin-left: 20px;
          background: #48d990;
          border-radius: 2px;
          &.time1-red {
            background: #e56969;
          }
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
