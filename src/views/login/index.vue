<template>
<!--  登录页面-->
  <div id="login">
    <div class="loginConbox">
<!--      <div class="header">-->
<!--        <div class="logo">-->
<!--        <img src="../../assets/logo.png">-->
<!--        </div>-->
<!--      </div>-->
      <div class="loginBox">
        <div class="loginCon">
            <p class="title">铁路信号联锁设计知识库</p>
            <div class="login_announcement">
              <div class="bulletin"><span class="description">公告</span></div>
              <ol>
                <li><p class="description">系统将为初次登录的用户自动分配用户名和用户密码，请系统用户妥善保管用户密码。</p></li>
                <li><p class="description">本系统为测试版，仅供内部使用。</p></li>
              </ol>
            </div>
            <el-card shadow="always" class="login-module" v-if="smdl">
              <div slot="header" class="clearfix formTitlt">
                <span>密码登录</span>
<!--                <span class="titIconbox">-->
<!--                   <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>-->
<!--                   <i class="iconfont xu-saomadenglu01 el-icon&#45;&#45;right fa-lg pointer" @click="smdl = !smdl"></i>-->
<!--                </span>-->
              </div>
              <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item>
                  <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入登录账号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" v-model="loginForm.password" auto-complete="off"
                            placeholder="请输入登录密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
                <p class="smalltxt">
                  <router-link class="a" to="#">忘记密码</router-link>
<!--                  <router-link class="a" to="#">忘记账户</router-link>-->
<!--                  <router-link class="a" to="#">免费注册</router-link>-->
                </p>
              </el-form>
            </el-card>
<!--            <el-card shadow="always" class="login-module" v-else>-->
<!--              <div slot="header" class="clearfix formTitlt">-->
<!--&lt;!&ndash;                <span>扫码登录</span>&ndash;&gt;-->
<!--                <span class="titIconbox">-->
<!--                 <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>-->
<!--                 <i class="iconfont xu-imagevector el-icon&#45;&#45;right fa-lg pointer" @click="smdl = !smdl"></i>-->
<!--                </span>-->
<!--              </div>-->
<!--              <div class="ewmbox">-->
<!--                <div class="ewm">-->
<!--                  <img src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png">-->
<!--                </div>-->
<!--                <div class="ewmicon">-->
<!--                  <i class="iconfont xu-saomadenglu fa-2x iconcolor"></i>-->
<!--                  <p>打开 微信 扫一扫登录</p>-->
<!--                </div>-->
<!--                <p class="smalltxt">-->
<!--                  <router-link class="a" to="#">新用户注册</router-link>-->
<!--                </p>-->
<!--              </div>-->
<!--            </el-card>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      smdl: true,
      loginForm: {
        username: "admin",
        password: "admin"
      }
    }
  },
  methods: {
    submitForm () {
      let that = this
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "error"
        })
        return false
      } else {
        // 真实请求参考
        // this.$request.fetchLogin({
        //   username: that.loginForm.username,
        //   password: that.loginForm.password
        // }).then(res => {
        //   that.$restBack(res.data, () => {
        //     that.$store.dispatch("setToken", res.data.data.access_token).then(res => {
        //       that.$router.push({path: "/"})
        //     })
        //   }, "登录成功")
        // }).catch((err) => {
        //   console.log(err)
        // })

        // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
        that.$store.dispatch("setToken", that.loginForm.username).then(() => {
          that.$router.push({path: "/"})
        }).catch(res => {
          that.$message({
            showClose: true,
            message: res,
            type: "error"
          })
        })
      }
    },
    message () {
      const h = this.$createElement
      this.$notify({
        title: "账号密码",
        message: h("i", {style: "color: teal"}, "账号密码可以随意填写，为了测试效果填写的账号将会被存储为临时假 token"),
        duration: 6000
      })
    }
  },
  mounted () {
    this.message()
  }
}
</script>
<style lang="scss">
  #login {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
    .loginConbox{
      background: #2d3a4b;
    }
    .header {
      height: 60px;
      position: relative;
      background: #2d3a4b;
      /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
      .logo{
        margin-left: 30px;
        width: 500px;
        float: left;
        height: 40px;
        padding-top: 10px;
        img{
          height: 100%;
        }
      }
    }

    .loginBox {
      .iconcolor {
        color: #409EFF;
      }

      padding: 74px 0 118px;

      .loginCon {
        width: 990px;
        margin: auto;
        position: relative;
        height: 388px;

        .el-card__header {
          border-bottom: 0px;
        }
        .title{
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          width: 600px;
          float: left;
          margin-top: 10px;
          &:first-child{
            font-size: 40px;
            margin-top: 10px;
            margin-bottom: 20px;
          }
        }
        .description{
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          width: 600px;
          float: left;
          margin-top: 10px;
          &:first-child{
            font-size: 20px;
            margin-top: 50px;
            margin-bottom: 20px;
          }
        }
        .login-module {
          width: 380px;
          height: 325px;
          margin-top: 60px;
          border: none;
          position: absolute;
          right: 0;

          .formTitlt {
            font-size: 18px;
            font-weight: 400;

            .titIconbox {
              float: right;

              .pointer {
                cursor: pointer;
              }
            }
          }

          .smalltxt {
            text-align: right;

            .a {
              text-decoration: none;
              color: #999999;
              font-size: 12px;
              margin-left: 8px;
            }
          }
        }

        .el-form-item__content {
          margin-left: 0px !important;

          .subBtn {
            width: 100%;
          }
        }
      }

      .el-input__inner, .el-button, .el-card, .el-message {
        border-radius: 0px !important;
      }

      .el-form-item__content .ico {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 999;
        width: 40px;
        height: 39px;
        text-align: center;
        border-right: 1px solid #ccc;
      }

      .ewmbox {
        width: 100%;
        height: 240px;
        margin-top: -25px;

        .ewm {
          width: 140px;
          height: 140px;
          margin: 20px auto;

          p {
            font-size: 12px;
            padding-left: 40px;
            margin: 0;
          }
        }

        .ewmicon {
          width: 140px;
          margin: 20px auto 0;

          .iconfont {
            float: left;
          }

          p {
            font-size: 12px;
            padding-left: 40px;
            margin: 0;
          }
        }
      }
    }
  }
  .login_title{
    height: 20%;
    text-align: center;
    vertical-align: middle;
  }
  .login_title img{
    margin-top: 70px;
    width: 60%;
    min-width: 700px;
    -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent) , to(rgba(250, 250, 250, 0.1)));
  }
  .login_bottom{
    height: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login_bottom .login_bottom-inner{
    width: 50%;
    min-width: 600px;
    margin: auto;
  }
  .login_bottom .login_bottom-inner .login_announcement{
    width: 50%;
    height: 70%;
    float: left;
    color: white;
    font-family: "Microsoft YaHei",serif;
    line-height: 40px;
  }
  .login_bottom .login_bottom-inner .login_announcement .bulletin{
    font-size: 1.2vw;
  }
  .login_bottom .login_bottom-inner .login_inner{
    background: -webkit-linear-gradient(top, #163254, #234368, #3F5F84);
    background-size: cover;
    height: auto;
    width:40%;
    float: right;
    border-radius: 4px;
  }
  .login_inner .login_tip{
    width:100%;
    text-align: center;
    vertical-align: middle;
    display: table;
    line-height: 50px;
    border-bottom: 2px solid white;
  }
  .login_inner .login_tip span{
    color: white;
    font-size: 1.5vw;
    font-weight: 400;
    font-family: Arial;
  }
  @media only screen and (max-width: 1500px){
    .login_inner .login_tip span{
      font-size: 23px !important;
    }
    .login_bottom .login_bottom-inner .login_announcement .bulletin{
      font-size: 20px !important;
    }
    li{
      font-size: 16px !important;
    }
  }
  .login_right_info{
    float: left;
    width: 100%;
    color: white;
    font-family: "Microsoft YaHei",serif;
    font-weight: lighter;
    /*margin-top: 40px;*/
  }
  .login_right_info .message{
    width: 85%;
    margin: auto;
    position: relative;
    margin-top: 30px;
  }
  .login_right_info .message .icon-user{
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    margin: 4px;
    border-radius: 3px;
  }
  .eye{
    position: absolute;
    top: 3px;
    right: 0;
    width: 25px;
    height: 25px;
    margin: 4px;
    border-radius: 3px;
  }
  .login_right_info .user_name{
    padding-left: 40px;
    margin-top: 0px;
  }
  .login_right_info .user_password{
    left:12px;
    padding-left: 40px;
  }
  .login_right_info span{
    width: 70px;
    height: 57px;
    display: inline-block;
    text-align-last: justify;
    margin-right: 10px;
  }
  .login_right_info input{
    width: calc(100% - 50px);
    background-color: white;
    border: solid 1px #053a66;
    border-radius: 5px;
    height: 30px;
    color: black;
    padding: 3px 10px;
    font-size: 15px;
    font-family: Arial;
    font-weight: 400;
  }
  .login_btn_group{
    width: 85%;
    height: 30px;
    margin: 30px auto 40px auto;
    font-weight: 600;
    font-family: "Microsoft YaHei", serif;
  }
  .login_btn_login{
    float: left;
  }
  .login_btn_reset{
    float: right;
  }
  .btn-gradient{
    background: white;
    color:#233246;
    letter-spacing: 2px;
    font-family: "Arial";
    font-weight: bolder;
    font-size: 16px;
    border: 0;
    border-radius: 3px;
    padding: 5px 30px;
    cursor: pointer;
  }
  .btn-gradient:hover{
    background-color: #5594d6;
    color: white;
  }
  li{
    font-size: 1vw;
    letter-spacing: 1px;
  }
</style>
