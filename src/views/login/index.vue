<template>
  <div class="login">
    <div class="login-content">
      <div class="title">青浦踩点记录</div>
      <div class="form-wrapper">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            :left-icon="icon1"
            :right-icon="icon2"
            @click-right-icon="clickUserName"
            placeholder="用户名"
            name="username"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            :left-icon="icon3"
            :right-icon="icon4"
            @click-right-icon="clickPwd"
            type="password"
            name="password"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            v-if="!pwdShow"
          />
          <van-field
            v-model="password"
            :left-icon="icon3"
            :right-icon="icon5"
            @click-right-icon="clickPwd"
            type="text"
            name="password"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            v-else
          />
          <div class="re-pwd" @click="jiPwd">
            <img
              src="../../assets/image/login/pwd-ji@3x.png"
              alt
              v-if="jiPwdChecked"
            />
            <img src="../../assets/image/login/pwd-no.png" alt v-else />
            <span>记住密码</span>
          </div>
          <div style="margin-top: 49.5px">
            <van-button round block type="info" native-type="submit"
              >登录</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <van-overlay :z-index="30" :show="showimg">
      <div class="wrapperfast">
        <van-loading size="64px" color="#1989fa"></van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// import encrypt from '@/libs/encrypt'
import base64 from "@/libs/base.js";
import cryptoPwd from "@/libs/cryptoPwd.js"
export default {
  name: "login",
  data () {
    return {
      username: '',
      password: '',
      pwdShow: false, //是否显示密码
      icon1: require('../../assets/image/login/icon_0_zhanghao@3x.png'),
      icon2: require('../../assets/image/login/x@3x.png'),
      icon3: require('../../assets/image/login/icon_0_possword@3x.png'),
      icon4: require('../../assets/image/login/icon_no_look@3x.png'),
      icon5: require('../../assets/image/login/icon_look@3x.png'),
      showimg: false,
      jiPwdChecked: false, // 是否记住密码
    }
  },
  created () {
  },
  mounted () {
    window.watchBackWXS = this.onClickLeft;
    // console.log(localStorage.getItem("roleCode"))
    if (localStorage.getItem("roleCode")) {
      this.$router.push({ path: '/home' })
    }
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
      this.username = localStorage.getItem("username")
      this.password = localStorage.getItem("password")
    } else {
      this.username = ''
      this.password = ''
    }
    if (localStorage.getItem("jiPwdChecked") == 'true') {
      this.jiPwdChecked = true
    } else {
      this.jiPwdChecked = false
    }


  },
  methods: {
    onClickLeft () {
    },

    onSubmit (values) {
      let timeNumber = new Date().getTime();
      let b = new base64();
      let nowDate = Date.now();
      values.password = b.encode(
        timeNumber +
        "&" +
        b.encode(values.password) +
        "&" +
        timeNumber
      ); //加密
      this.showimg = true
      this.$fetchPost('login', values).then(res => {
        this.showimg = false
        if (res.status == 'success') {
          this.$toast('登录成功')
          localStorage.setItem("roleCode", res.info.roles[0].code);
          localStorage.setItem("jiPwdChecked", this.jiPwdChecked);
          // document.cookie = "userId=" + res.info.id;
          document.cookie = "flag=true";
          document.cookie = "user=" + res.info.id;
          // document.cookie = "userName=" + res.info.roles[0].name;
          this.$router.push({ path: '/home' })
          localStorage.setItem("userAccount", this.username);
          localStorage.setItem("realName", res.info.realName);
          if (this.jiPwdChecked) {
            localStorage.setItem("username", this.username);
            localStorage.setItem("password", this.password);
          } else {
            localStorage.setItem("username", '');
            localStorage.setItem("password", '');

          }
        } else if (res.status == 'fail') {
          this.$toast(res.info)

        }
      })
    },
    clickUserName () {
      this.username = ''
    },
    clickPwd () {
      this.pwdShow = !this.pwdShow

    },
    jiPwd () {
      this.jiPwdChecked = !this.jiPwdChecked


    }
  }
};
</script>
<style lang="scss">
.van-field__error-message {
  position: absolute !important;
  right: 30px !important;
  top: -1px !important;
}
.van-field--error .van-field__control,
.van-field--error .van-field__control::placeholder {
  color: #969799;
}
</style>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .wrapperfast {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .banner {
    width: 100%;
    height: 204px;
  }
  .login-content {
    .title {
      margin: 30% auto 43px;
      text-align: center;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .form-wrapper {
      padding: 0 30px;
      box-sizing: border-box;
      .van-cell {
        padding: 19px 0 !important;
      }
      .van-cell:not(:last-child)::after {
        left: 0 !important;
      }
      .van-button--info {
        border: none;
        background: rgba(60, 126, 252, 1);
        box-shadow: 0px 1px 12px 0px rgba(60, 126, 252, 1);
        border-radius: 22.5px;
      }
      .van-button--normal {
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .re-pwd {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 12px;
        img {
          width: 13px;
          height: 13px;
          margin-right: 6px;
        }
        span {
          font-size: 13px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(60, 126, 252, 1);
        }
      }
      .pre {
        width: 15px;
        height: 15.5px;
        position: absolute;
      }
      .pre1 {
        width: 15px;
        height: 17px;
        position: absolute;
      }
      .pre2 {
        width: 18px;
        height: 18px;
        position: absolute;
      }
      .pre3 {
        width: 20px;
        height: 17px;
        position: absolute;
      }
    }
  }
}
</style>
