<template>
  <div class="signin">
    <div class="contain">
      <div class="left">
        <div style="font-size:20px;">[ 火龙果 ]</div><br>
          <div style="margin-top:20px;">欢迎使用「火龙果」运营管理系统</div>
          <ul>
            <li><i></i> 优势一</li>
            <li><i></i> 优势二</li>
            <li><i></i> 优势三</li>
            <li><i></i> 优势四</li>
            <li><i></i> 优势五</li>
          </ul>
          <strong>还没有账号？ <a href="#/register">立即注册&raquo;</a></strong>
      </div>
      <div class="right">
        <form method="post" action="index.html">
          <h3>登录：</h3>
          <p>登录到「火龙果」运营管理系统</p>
          <el-input
            placeholder="用户名"
            suffix-icon="el-icon-mobile-phone"
            v-model="param.loginName">
          </el-input>
          <el-input
            placeholder="密码"
            suffix-icon="el-icon-view"
            v-model="param.password">
          </el-input>
          <a href="">忘记密码了？</a><br>
          <el-button type="primary" @click="login()">登录</el-button>
        </form>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      param: {
        loginName: '',
        password: ''
      }
    }
  },
  methods: {
    login(){
      var that = this;
      that.$AJAX.GET2(that, 'login', that.param, function(response){
        var loginInfo = response.body.data;
        localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
        console.log(loginInfo);
        window.location.href = "/";
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .signin{position:fixed;
    left:0;top:0;
    width:100%;
    height:calc(100vh);
    background:url(../../static/image/login-background.jpg) no-repeat center fixed;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-size:cover;color:#fffff5;}

  .left {
    width:50%;
    /*background-color: red;*/
    float:left;
    text-align:left;
    font-size: 14px;
  }

  .right {
    width:30%;
    background: rgba(255,255,255,.2);
    float:left;
    text-align:left;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:20px;
    padding-right:20px;
    font-size: 14px;
    *border:1px solid #E9EEF3;
  }
  .contain {
    width:50%;
    margin-top:10%;
    margin-left:30%;
    background-color:#ccffdd;
  }
  .el-input{
    margin-top:5px;
    margin-bottom:10px;
  }
  .el-button{
    width:100%;
    margin-top:10px;
    margin-bottom:10px;
  }

</style>
