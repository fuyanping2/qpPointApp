<template>
  <div class="all-form">
    <div
      :class="[entyNameShow ? 'service-form service-form1' : 'service-form']"
    >
      <!-- :title="routerQuery.curTypeName" -->
      <van-nav-bar @click-left="onClickLeft" title="踩点记录表" fixed>
        <template #left>
          <img
            src="../../assets/image/homeAndForm/icon_back@3x.png"
            alt
            style="width: 16px; height: 17px"
          />
        </template>
      </van-nav-bar>
      <!-- 表单 -->
      <div class="service-content">
        <van-form @submit="onSubmit" @failed="onFailed">
          <div class="label-input">
            <span class="bt" style="color: #f56c6c">*</span>
            <van-field
              v-model="form.stationName"
              label="站名"
              placeholder="请输入站名"
              :readonly="readonly"
              :rules="[{ required: rulesTrueOrFalse, message: '请输入' }]"
            >
              <template #button>
                <div class="qrcode-icon">
                  <img
                    src="../../assets/image/homeAndForm/search.png"
                    @click="changeStationNameList"
                    alt
                  />
                </div>
              </template>
            </van-field>
            <div class="list-wrapper" v-if="stationNameShow">
              <div
                class="list"
                v-if="stationNameList && stationNameList.length > 0"
              >
                <div
                  class="list-item"
                  v-for="(item, index) in stationNameList"
                  :key="index + 'q'"
                  @click="selectStationName(item)"
                >
                  {{ item.stationName }}
                </div>
              </div>
              <div class="no-data" v-else>
                {{ stationNameTip }}
              </div>
            </div>
          </div>
          <div class="label-input">
            <van-field
              v-model="form.stationCode"
              label="站点编号"
              placeholder="请输入站点编号"
              :readonly="readonly"
              :rules="[{ required: false, message: '请输入' }]"
            >
            </van-field>
          </div>
          <div class="label-input">
            <span class="bt" style="color: #f56c6c">*</span>
            <van-field label="现场设施情况" :readonly="readonly">
              <template #input>
                <div>
                  <div class="input-list">
                    <div
                      class="item"
                      v-for="(item, index) in facilityList"
                      :key="index"
                    >
                      <div class="item-isadd" v-if="item.isAdd">
                        <span
                          v-if="item.isAdd"
                          class="clear-icon"
                          @click="clearZdyfacility(item, index)"
                        >
                          <van-icon name="clear" color="#f56c63" />
                        </span>
                        <van-field
                          v-model="item.name"
                          :readonly="readonly"
                          placeholder="设施名称"
                          :rules="[
                            {
                              required: rulesTrueOrFalse,
                              message: '请输入',
                            },
                          ]"
                        ></van-field>
                        <van-field
                          v-model="item.value"
                          placeholder="设施个数"
                          :readonly="readonly"
                          :rules="[
                            {
                              pattern:
                                routerQuery.addOrEdit == 1
                                  ? pattern2
                                  : pattern1,
                              required: rulesTrueOrFalse,
                              message: '请输入',
                            },
                          ]"
                        ></van-field>
                      </div>
                      <div class="item-isadd" v-else>
                        <van-field
                          v-model="item.value"
                          :label="item.name"
                          :readonly="readonly"
                          :rules="[
                            {
                              pattern:
                                routerQuery.addOrEdit == 1
                                  ? pattern2
                                  : pattern1,
                              required: rulesTrueOrFalse,
                              message: '请输入',
                            },
                          ]"
                        ></van-field>
                      </div>
                      个
                    </div>
                  </div>
                  <div class="add-zdy">
                    自定义
                    <div class="add-line" @click="addzdyfacility">
                      <img
                        src="../../assets/image/homeAndForm/icon_add@3x.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </template>
            </van-field>
          </div>
          <div class="label-input">
            <span class="bt" style="color: #f56c6c">*</span>
            <van-field
              label="现场设施情况拍照"
              :readonly="readonly"
              :rules="[
                { required: rulesTrueOrFalse, message: '请选择现场设施情况' },
              ]"
            >
              <template #input>
                <div class="uploader-all-img-wrapper">
                  <div class="img-list-wrapper">
                    <div
                      class="img-item"
                      v-for="(item, index) in fileList"
                      :key="index + 'j'"
                      @click.stop="lookBigImg"
                    >
                      <div class="box">
                        <img :src="item" alt />
                      </div>
                      <div
                        class="icon-wrapper"
                        @click.stop="deleteImgItem(index)"
                      >
                        <img src="../../assets/image/login/x@3x.png" alt />
                      </div>
                    </div>
                  </div>
                  <van-uploader
                    :after-read="beforeRead"
                    :max-count="9"
                    v-model="fileList1"
                    :preview-image="false"
                    preview-size="49px"
                  >
                    <div class="upload-img-wrapper">
                      <div class="upload-img">
                        <img
                          src="../../assets/image/homeAndForm/icon_add@3x.png"
                          alt
                        />
                      </div>
                    </div>
                  </van-uploader>
                </div> </template
            ></van-field>
          </div>
          <div class="label-input">
            <span class="bt" style="color: #f56c6c">*</span>
            <van-field
              v-model="form.block"
              label="遮挡情况"
              placeholder="请输入遮挡情况"
              readonly
              :rules="[{ required: rulesTrueOrFalse, message: '请输入' }]"
              @click="allSelect(1)"
            ></van-field>
          </div>
          <div class="label-input">
            <span class="bt" style="color: #f56c6c">*</span>
            <van-field
              v-model="form.dircetion"
              label="车向"
              placeholder="请选择车向"
              readonly
              :rules="[{ required: rulesTrueOrFalse, message: '请输入' }]"
              @click="allSelect(2)"
            ></van-field>
          </div>
          <div class="label-input">
            <span class="bt" style="color: #f56c6c">*</span>
            <van-field
              v-model="form.existEleBoardName"
              label="是否已建电子站牌"
              placeholder="请选择是否已建电子站牌"
              readonly
              :rules="[{ required: rulesTrueOrFalse, message: '请输入' }]"
              @click="allSelect(3)"
            ></van-field>
          </div>
          <div class="label-input label-input1">
            <div style="display: flex">
              <span class="bt" style="color: #f56c6c">*</span>
              <van-field
                v-model="form.lineNames"
                label="途径线路"
                rows="1"
                autosize
                type="textarea"
                placeholder="请添加途径线路"
                readonly
                @click="
                  showAddLine = true
                  form.lineName = ''
                "
                :rules="[{ required: rulesTrueOrFalse, message: '请添加' }]"
              >
              </van-field>
            </div>
            <div class="input-line">
              <div class="input-line-list" v-if="linesName && linesName.length">
                <div
                  class="item"
                  v-for="(item, index) in linesName"
                  :key="index"
                >
                  {{ item }}
                  <span class="clear-icon" @click="clearCurEdit(item)">
                    <van-icon name="clear" color="#f56c63" />
                  </span>
                </div>
              </div>
              <div
                class="add-line"
                @click="
                  showAddLine = true
                  form.lineName = ''
                "
              >
                <img
                  src="../../assets/image/homeAndForm/icon_add@3x.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="label-input">
            <van-field
              v-model="form.electiric"
              label="接电情况"
              placeholder="请输入接电情况"
              :readonly="readonly"
              :rules="[{ required: false, message: '请输入' }]"
            ></van-field>
          </div>
          <div class="label-input">
            <van-field
              v-model="form.remark"
              label="备注"
              rows="2"
              type="textarea"
              placeholder="请输入备注"
              :readonly="readonly"
              :rules="[{ required: false, message: '请输入' }]"
            ></van-field>
          </div>
          <div class="label-input22">
            {{ form.lotaction }}
            <div class="map-box" id="container"></div>
          </div>
          <div class="submit-btn">
            <van-button block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
      <!-- 表单 -->
      <van-dialog
        v-model="layoutShow"
        :title="dialogDesc.title"
        show-cancel-button
        @confirm="confirmDialog"
      >
        <div style="text-align: center; margin-top: 20px; margin-bottom: 20px">
          {{ dialogDesc.desc }}
        </div>
      </van-dialog>
      <van-dialog
        v-model="layoutLoacationShow"
        :title="dialogDesc.title"
        show-cancel-button
        @confirm="confirmLocationDialog"
      >
        <div style="text-align: center; margin-top: 20px; margin-bottom: 20px">
          {{ dialogDesc.desc }}
        </div>
      </van-dialog>
      <van-dialog
        v-model="goBackHomeShow"
        title="退出"
        show-cancel-button
        @confirm="confirmHomeDialog"
      >
        <div class="go-back">确定退出{{ routerQuery.curTypeName }}页面吗?</div>
      </van-dialog>
      <van-overlay :z-index="9999" :show="showimg">
        <div class="wrapperfast">
          <van-loading size="64px" color="#1989fa" vertical
            >{{ loadingDesc }}...</van-loading
          >
        </div>
      </van-overlay>
      <!-- 遮挡情况,车向,是否已建电子站牌 -->
      <van-popup v-model="showAllSelect" position="bottom">
        <van-picker
          show-toolbar
          :columns="allSelectList"
          @cancel="showAllSelect = false"
          @confirm="onConfirmAllSelect"
        />
      </van-popup>
      <!-- 新增线路 -->
      <van-dialog
        v-model="showAddLine"
        title="新增"
        show-cancel-button
        @confirm="confirmAddLineDialog"
      >
        <div
          style="
            display: flex;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;
          "
        >
          <span
            class="bt"
            style="color: #f56c6c; margin-left: 10px; margin-top: 15px"
            >*</span
          >
          <van-field
            v-model="form.lineName"
            label="线路名称"
            placeholder="请输入线路名称"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <template #button>
              <div class="qrcode-icon">
                <img
                  src="../../assets/image/homeAndForm/search.png"
                  @click="changeLineNameList"
                  alt
                />
              </div>
            </template>
          </van-field>
        </div>
      </van-dialog>
      <div class="list-wrapper1" v-if="lineNameShow">
        <div class="list" v-if="lineNameList && lineNameList.length > 0">
          <div
            class="list-item"
            v-for="(item, index) in lineNameList"
            :key="index + 'q'"
            @click="selectLineName(item)"
          >
            {{ item.routeName }}
          </div>
        </div>
        <div class="no-data" v-else>
          {{ lineNameTip }}
        </div>
      </div>
      <!-- 删除线路 -->
      <van-dialog
        v-model="showDelLine"
        title="删除"
        show-cancel-button
        @confirm="confirmDelLineDialog"
      >
        <div style="text-align: center; margin-top: 20px; margin-bottom: 20px">
          确定删除当前线路吗?
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { utiltime, imageName } from '../../libs/util';
import { BrowserMultiFormatReader } from '@zxing/library'
export default {
  name: "allForm",
  components: {
  },
  data () {
    return {
      entyNameShow: '',
      pattern1: null,
      pattern2: /^[0-9]*$/,
      readonly: false,
      rulesTrueOrFalse: true,
      layoutShow: false,
      goBackHomeShow: false,
      showimg: false,
      dialogDesc: {},
      loadingDesc: '',
      routerQuery: {},
      directionList: ['东', '南', '西', '北'],
      existEleBoardList: ['是', '否'],
      blockList: ['不遮挡', '一般遮挡', '严重遮挡'],
      showDelLine: false,
      showAddLine: false,
      facilityList: [
        {
          name: '新式立杆',
          value: 0
        }, {
          name: '普通立杆',
          value: 0
        }, {
          name: '亭子',
          value: 0
        }, {
          name: '亭子(墨水屏)',
          value: 0
        }, {
          name: 'lcd亭',
          value: 0
        },
      ],
      linesName: [],
      form: {
        checkedBy: '',
        stationCode: '',
        stationName: '',
        block: '不遮挡',
        dircetion: '东',
        existEleBoardName: null,
        existEleBoard: null,
        lineNames: '',
        electiric: '',
        remark: '',
        fileListStr: [],
        lat: '',
        lng: '',
      },
      fileList: [],
      fileList1: [],
      realName: '',
      allSelectList: [],
      showAllSelect: false,
      curAllSelect: null,

      stationNameAllList: [],  // 站名模糊查询
      stationNameList: [],
      stationNameShow: false,
      stationNameTip: '',


      lineNameAllList: [],  // 线路名模糊查询
      lineNameList: [],
      lineNameShow: false,
      lineNameTip: '',

      curLocation: {}, // 当前地图经纬度
      myMap: null,
      marker: null,
      layoutLoacationShow: false
    }
  },
  created () {
    this.getStationNameList()
    this.getLineNameList()
  },
  mounted () {
    this.initMap()
    console.log(JSON.parse(sessionStorage.getItem("curStationInfo")), '444444')
    this.realName = localStorage.getItem("realName")
    this.routerQuery = this.$route.query
    switch (this.routerQuery.addOrEdit) {
      case '1':
        if (sessionStorage.getItem("rczxobj")) {
          let reserveData = JSON.parse(sessionStorage.getItem("rczxobj"))
          this.form = reserveData.form
          this.fileList = reserveData.fileList
          this.fileList1 = reserveData.fileList1
          this.facilityList = reserveData.facilityList
          this.linesName = reserveData.linesName
        }
        break;
      case '2':
        let curHistoryInfo = JSON.parse(sessionStorage.getItem("curStationInfo"))
        this.form = curHistoryInfo
        switch (this.form.existEleBoard) {
          case '1':
            this.form.existEleBoardName = '是'
            break;
          case '0':
            this.form.existEleBoardName = '否'
            break;
        }
        this.linesName = this.form.lineNames.split(',')
        this.facilityList = JSON.parse(this.form.facility)
        this.form.facility = this.facilityList

        this.fileList = this.form.fileList
        this.fileList1 = this.form.fileList
        if (this.form.fileListStr) {
          this.form.fileListStr = JSON.parse(this.form.fileListStr)
        }
        this.marker.setPosition([Number(this.form.lng), Number(this.form.lat)]); //更新点标记位置
        this.myMap.setCenter([Number(this.form.lng), Number(this.form.lat)]);
        break;
    }
  },
  methods: {
    initMap () {
      this.myMap = new AMap.Map('container', {
        zoom: 16,//级别
        center: [121.628707, 31.257035],//中心点坐标
      });
      this.curLocation = {
        lng: 121.628707,
        lat: 31.257035
      }
      this.myMap.on('mapmove', mapMove);
      function mapMove () {
        logMapinfo();
      }
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(121.628707, 31.257035),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      this.marker.setMap(this.myMap);
      let that = this
      function logMapinfo () {
        var zoom = that.myMap.getZoom(); //获取当前地图级别
        var center = that.myMap.getCenter(); //获取当前地图级别
        console.log(center, center.toString())
        that.curLocation = {
          lng: center.lng,
          lat: center.lat
        }

        that.marker.setPosition([center.lng, center.lat]); //更新点标记位置
        console.log(that.curLocation)
      };
    },
    // 获取站名列表
    getStationNameList () {
      this.$fetchGet('config-station/stationList').then(res => {
        this.stationNameAllList = res.result
      })
    },
    // 模糊查询站名
    changeStationNameList () {
      this.stationNameTip = "正在查询中..."
      this.stationNameList = []
      this.stationNameAllList.forEach(item => {
        if (item.stationName.indexOf(this.form.stationName) != -1) {
          this.stationNameList.push(item)
        }
      })
      if (this.stationNameList.length <= 0) {
        this.stationNameShow = false
        this.$toast("该关键字未查到相关站名，请输入站点名称")
      } else {
        this.stationNameShow = true
      }
    },
    // 选择站名
    selectStationName (item) {
      this.form.stationName = item.stationName
      this.stationNameShow = false
    },


    // 获取线路名列表
    getLineNameList () {
      this.$fetchGet('config-station/routeList').then(res => {
        this.lineNameAllList = res.result
      })
    },
    // 模糊查询线路名
    changeLineNameList () {
      this.lineNameTip = "正在查询中..."
      this.lineNameList = []
      this.lineNameAllList.forEach(item => {
        if (item.routeName.indexOf(this.form.lineName) != -1) {
          this.lineNameList.push(item)
        }
      })
      if (this.lineNameList.length <= 0) {
        this.lineNameShow = false
        this.$toast("该关键字未查到相关线路，请输入线路名称")
      } else {
        this.lineNameShow = true
      }
    },
    // 选择线路名
    selectLineName (item) {
      this.form.lineName = item.routeName
      this.lineNameShow = false
    },
    allSelect (type) {
      this.showAllSelect = true
      this.curAllSelect = type
      switch (type) {
        case 1: // 遮挡情况
          this.allSelectList = this.blockList
          break;
        case 2: // 车向
          this.allSelectList = this.directionList
          break;
        case 3: // 是否已建电子站牌
          this.allSelectList = this.existEleBoardList
          break;
      }
    },
    onConfirmAllSelect (val) {
      switch (this.curAllSelect) {
        case 1: // 遮挡情况
          this.form.block = val
          break;
        case 2: // 车向
          this.form.dircetion = val
          break;
        case 3: // 是否已建电子站牌
          this.form.existEleBoardName = val
          switch (val) {
            case '是':
              this.form.existEleBoard = 1
              break;
            case '否':
              this.form.existEleBoard = 0
              break;
          }
          break;
      }
      this.showAllSelect = false
    },
    addzdyfacility () {
      this.facilityList.push({ name: '', value: '', isAdd: true })
    },
    clearZdyfacility (item, index) {
      this.facilityList.splice(index, 1)
    },
    confirmAddLineDialog () {
      if (!this.form.lineName) {
        this.$toast('请输入线路名称')
        this.showAddLine = true
      } else {
        this.linesName.push(this.form.lineName)
        this.form.lineNames = this.linesName.join(',')
      }
    },
    // 确认删除当前线路
    confirmDelLineDialog () {
      this.linesName.forEach((item, index) => {
        if (item === this.setCurName) {
          this.linesName.splice(index, 1)
        }
      })
      this.form.lineNames = this.linesName.join(',')
    },
    // 删除线路
    clearCurEdit (curItem) {
      this.showDelLine = true
      this.setCurName = curItem
    },
    // 上传前
    beforeRead (val) {
      this.loadingDesc = "上传中"
      this.showimg = true
      lrz(val.file, {
        quality: 0.4    //自定义使用压缩方式
      })
        .then(rst => {
          //成功时执行
          let formData = new FormData();
          let curImgList = []
          if (val instanceof Array) {
            curImgList = curImgList.concat(rst)
          } else {
            curImgList.push(rst)
          }
          curImgList.map((item) => {
            //files是后台参数name字段对应值
            formData.append('files', rst.formData.get("file"));
          })
          this.$fetchPostFile('checkPics/import', formData).then(res => {
            this.beforeUploadImg(res.message)
            this.showimg = false
            this.$toast('上传成功')

          }).catch(err => {
            this.showimg = false
            this.$toast('上传失败')
          })
        }).catch(error => {
          //失败时执行
        }).always(() => {
          //不管成功或失败，都会执行
        })
    },
    // 整改前图片上传
    beforeUploadImg (val) {
      this.fileList.push(val)
      this.uploadAndDelQuzheng(this.fileList)
    },
    // 删除图片
    deleteImgItem (index) {
      this.fileList.splice(index, 1)
      this.uploadAndDelQuzheng(this.fileList)
    },
    // 现场情况拍照上传删除后数据操作
    uploadAndDelQuzheng (urlList) {
      let fileListUrlProcess = urlList, fileListUrlProcess1 = []
      fileListUrlProcess.forEach(item => { // 处理提交图片名称,截取图片名称操作
        var index = item.lastIndexOf("\/");
        item = item.substring(index + 1, item.length);
        fileListUrlProcess1.push(item)
      })
      let obj = {}
      let uploadImgList = []
      fileListUrlProcess1.forEach(item => {
        obj = {
          url: item,
          fileType: 1
        }
        uploadImgList.push(obj)
      })
      this.form.fileListStr = uploadImgList
      this.fileList1 = urlList
    },
    lookBigImg () {
      ImagePreview({
        images: this.fileList,
        closeable: true
      });
    },
    // 导航返回
    onClickLeft () {
      switch (this.routerQuery.addOrEdit) {
        case '1':
          this.goBackHomeShow = true
          break;
        case '2':
          this.$router.push({
            path: this.routerQuery.oldPath,
            query: {
              curTypeName: this.routerQuery.curTypeName,
              curType: this.routerQuery.curType,
              active1: this.routerQuery.active1,
              page: this.routerQuery.page,
            }
          })
          break;
      }
    },
    onFailed (errorInfo) {
      this.$toast("请输入完整信息")
    },
    // 提交
    onSubmit (values) {
      this.layoutLoacationShow = true
      this.dialogDesc = {
        title: '确认提交站点定位',
        desc: '确认当前提交站点定位正确吗?若不正确请移动地图，将点位放到正确位置'
      }
    },
    confirmLocationDialog () {
      this.layoutShow = true
      this.dialogDesc = {
        title: '提交表单',
        desc: '确认提交吗?'
      }
    },
    // 确认提交
    confirmDialog () {
      this.loadingDesc = "提交中"
      this.showimg = true
      this.form.lng = this.curLocation.lng
      this.form.lat = this.curLocation.lat
      this.form.checkedBy = this.realName
      this.form.lineNames = this.linesName.join(',')
      this.form.facility = this.facilityList
      this.form.fileListStr = JSON.stringify(this.form.fileListStr)
      this.form.facility = JSON.stringify(this.form.facility)
      switch (this.routerQuery.addOrEdit) {
        case '1':
          this.$fetchPost('config-station/import', this.form, 'json').then(res => {
            this.showimg = false
            this.$toast(res.message)
            sessionStorage.removeItem("rczxobj")

            this.$router.push({
              path: this.routerQuery.oldPath,
            })
          }).catch(err => {
            this.showimg = false
            this.$toast('提交失败')
          })
          break;
        case '2':
          this.$fetchPost('config-station/udpate', this.form, 'json').then(res => {
            this.showimg = false
            this.$toast(res.message)
            sessionStorage.removeItem("rczxobj")
            this.$router.push({
              path: this.routerQuery.oldPath,
            })
          }).catch(err => {
            this.showimg = false
            this.$toast('修改失败')
          })
          break;
      }
    },
    // 确认返回
    confirmHomeDialog () {
      switch (this.routerQuery.addOrEdit) {
        case '1':
          this.$router.push({
            path: this.routerQuery.oldPath,
          })
          sessionStorage.removeItem("rczxobj")
          let rczxobj = {
            routerQuery: this.routerQuery,
            form: this.form,
            fileList: this.fileList,
            fileList1: this.fileList1,
            facilityList: this.facilityList,
            linesName: this.linesName,
          }
          sessionStorage.setItem("rczxobj", JSON.stringify(rczxobj))
          break;
        case '2':
          this.$router.push({
            path: this.routerQuery.oldPath,
            query: {
              curTypeName: this.routerQuery.curTypeName,
              curType: this.routerQuery.curType,
              active1: this.routerQuery.active1,
              page: this.routerQuery.page,
            }
          })
          break;
      }

    },
  }
};
</script>
<style lang="scss">
.all-form {
  .van-nav-bar__left {
    left: 0 !important;
    width: 46px;
  }
  .service-form {
    .van-nav-bar__left {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .van-nav-bar--fixed {
      z-index: 10;
    }
    .van-field__error-message {
      position: absolute !important;
      right: 0px !important;
      top: -1px !important;
    }
    .van-field--error .van-field__control,
    .van-field--error .van-field__control::placeholder {
      color: #969799;
    }
    .van-checkbox__icon--checked {
      .van-checkbox__label {
        color: #5a6bff;
      }
    }

    .van-nav-bar__right {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      width: 55px;
      right: 0;
      .van-nav-bar__text {
        display: block;
        height: 100%;
        color: #fff;
        border-radius: 3px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        padding: 0 11.5px;
      }
    }
    .van-nav-bar {
      background-color: #3c7efc;
      color: #fff;
    }
    .van-nav-bar__title {
      font-size: 18px !important;
      font-family: PingFang SC;
      color: #fff !important;
      font-weight: 500 !important;
    }
    .van-nav-bar__left,
    .van-nav-bar__right {
      padding: 0;
    }
    .van-cell:not(:last-child)::after {
      border-bottom: 0;
    }
    .van-ellipsis-dot {
      width: 235px;
    }
  }
  .van-button {
    font-size: 16px !important;
  }
}
</style>
<style lang="scss">
.map-box {
  width: 100%;
  height: 200px;
}
.all-form {
  width: 100%;
  height: 100%;
  background: #ebecee;
  .service-form {
    width: 100%;
    height: 100%;
    background: #ebecee;
    .wrapperfast {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .list-wrapper {
    position: absolute;
    top: 50px;
    left: 40px;
    width: 240px;
    height: 200px;
    border: 1px solid #999;
    border-radius: 5px;
    z-index: 9999;
    background: #fff;
    overflow: scroll;
    .list {
      .list-item {
        font-size: 15px;
        color: #555;
        padding: 10px;
        border-bottom: 1px solid #ebedf0;
      }
    }
    .no-data {
      font-size: 16px;
      color: #666666;
      text-align: center;
      line-height: 200px;
    }
  }
  .list-wrapper1 {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -120px;
    width: 240px;
    height: 200px;
    border: 1px solid #999;
    border-radius: 5px;
    z-index: 9999;
    background: #fff;
    overflow: scroll;
    .list {
      .list-item {
        font-size: 15px;
        color: #555;
        padding: 10px;
        border-bottom: 1px solid #ebedf0;
      }
    }
    .no-data {
      font-size: 16px;
      color: #666666;
      text-align: center;
      line-height: 200px;
    }
  }
  .qrcode-icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // width: 20px;
    // height: 20px;
    img {
      width: 20px;
      height: 20px;
      padding: 0 10px 0 5px;
      :last-child {
        padding: 0 5px 0 10px;
      }
    }
  }
  .submit-btn {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #ebecee;
  }
  .go-back {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .service-content {
    padding-top: 46px;
    padding-bottom: 80px;
    // background: #ebecee;
    background: #fff;

    .van-cell {
      padding: 14px 13px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
    .van-cell__value {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .label-input {
      display: flex;
      background: #fff;
      border-bottom: 1px solid #ebedf0;
      &.label-input1 {
        flex-direction: column;
      }
      .bt {
        margin-left: 5px;
        margin-top: 15px;
      }
      .uploader-all-img-wrapper {
        display: flex;
        justify-content: flex-start;
        width: 262px;
        margin-right: 20px;
        overflow: hidden;
        overflow-x: scroll;
        box-sizing: border-box;
        padding-top: 10px;
        padding-bottom: 10px;
        .img-list-wrapper {
          display: flex;
          justify-content: flex-start;
          .img-item {
            position: relative;
            margin-right: 10px;
            .box {
              width: 49px;
              height: 49px;
              border: 1px solid #eee;
              img {
                width: 49px;
                height: 49px;
              }
            }

            .icon-wrapper {
              position: absolute;
              top: -10px;
              right: -5px;
              img {
                width: 15px;
                height: 15px;
              }
            }
          }
        }
        .upload-img-wrapper {
          display: flex;
          justify-content: flex-start;
          height: 49px;
          padding-right: 25px;
          .upload-img {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 49px;
            height: 49px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(170, 170, 170, 1);
            border-radius: 2px;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .remark {
            display: flex;
            align-items: flex-end;
            height: 49px;
            font-size: 12px;
            line-height: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            margin-left: 7px;
          }
        }
      }
    }
    .input-list {
      .item {
        display: flex;
        align-items: center;
        .van-field__body {
          border: 1px solid #ebedf0;
          border-radius: 5px;
        }
        .item-isadd {
          display: flex;
          align-items: center;
        }
      }
    }
    .input-line {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      padding: 0 20px;
      .input-line-list {
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          align-items: center;
          margin-right: 10px;
          margin-top: 10px;
          border: 1px solid #333;
          border-radius: 5px;
          font-size: 14px;
          padding-left: 5px;
          .clear-icon {
            display: flex;
            align-items: center;
            padding: 5px 5px;
            font-size: 14px;
            height: 18px;
          }
        }
      }
    }
    .add-line {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(170, 170, 170, 1);
      border-radius: 2px;
      margin-top: 10px;
      img {
        width: 15px;
        height: 15px;
      }
    }
    .add-zdy {
      display: flex;
      align-items: center;
      padding: 0 13px;
      .add-line {
        margin-left: 10px;
        margin-top: 0;
      }
    }
  }
}
</style>
