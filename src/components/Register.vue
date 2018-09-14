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
        <strong>还没有账号？ <a href="#">立即注册&raquo;</a></strong>
      </div>
      <div class="right">
        <form method="post" action="index.html">
          <h3>注册：</h3>
          <p>创建一个新账号</p>
          <el-input
            placeholder="请输入用户名"
            suffix-icon="el-icon-mobile-phone"
            v-model="input2">
          </el-input>
          <el-input
            placeholder="请输入密码"
            suffix-icon="el-icon-view"
            v-model="input2">
          </el-input>
          <el-input
            placeholder="请再次输入密码"
            suffix-icon="el-icon-view"
            v-model="input2">
          </el-input>
          <el-button type="primary">注册</el-button>
          <p style="font-size:12px;">
          已经有账户了？<a href="#/login">点此登录</a>
          </p>
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
        msg: 'Welcome to Your Vue.js App'
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
    margin-top:5px;
  }

</style>
