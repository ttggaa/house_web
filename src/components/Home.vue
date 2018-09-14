<template>
  <el-container>
    <el-aside width="220px">
      <el-card class="box-card">
        <img src="../assets/sf.jpg" style="border-radius:50%;" height="75" width="75"/>
        <p class="titleP">
          <span style="color:#fff;">YG0005327</span><br>
          <span>刘学良</span><br>
          <span>超级管理员</span><br>
          <span>高级软件研发工程师</span><br>
        </p>
      </el-card>
      <el-menu default-active="1-4-1"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               background-color="#213546"
               text-color="#fff"
               active-text-color="#ffd04b"
               unique-opened>

        <el-menu-item index="0" @click="toPath('#/', '首页', '0')">
          <i class="el-icon-tickets"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <div v-if="permissionTree.children" v-for="item in permissionTree.children" :key="item.id">
          <el-submenu :index="item.id+''" v-if="item.type == 'branch'">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </template>
            <div v-if="item.children" v-for="item2 in item.children" :key="item2.id">
              <el-menu-item v-if="item2.type=='leaf'" :index="item2.id+''" @click="toPath('#/' + item2.url, item2.label, item2.id)">
                <i :class="item2.icon"></i>
                <span slot="title">{{item2.label}}</span>
              </el-menu-item>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="12" style="padding-top: 10px;padding-bottom: 10px;">
            <el-header style="height: 30px;">
              <i class="el-icon-menu"></i> &nbsp;&nbsp;欢迎使用「火龙果」运营管理系统
            </el-header>
          </el-col>
          <el-col :span="6" style="text-align: right;">
            <el-badge :value="200" :max="99" class="item">
              <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="100" :max="10" class="item">
              <el-button plain size="small">回复</el-button>
            </el-badge>
          </el-col>
          <el-col :span="6" style="text-align: right;padding-top: 10px;">
            <el-button plain size="small" icon="el-icon-delete" @click="closeAllTabs">关闭页签</el-button>
            <el-button plain size="small" icon="el-icon-circle-close" @click="logout">退出系统</el-button>
          </el-col>
        </el-row>
      <el-tabs v-model="editableTabsValue2" type="border-card" @tab-remove="removeTab" @tab-click="clickTab" style="width:100%;">
        <el-tab-pane key="0" label="首页" name="0" content="0" path="#/"></el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.name"
          :label="item.title"
          :name="item.name" closable>
        </el-tab-pane>
        <router-view/>
      </el-tabs>
      </el-main>
      <el-footer style="height: 30px;">© 2018 GitHub, Inc.</el-footer>
    </el-container>
  </el-container>
</template>

<script>

import ElTabPane from "../../node_modules/element-ui/packages/tabs/src/tab-pane.vue";
import ElHeader from "../../node_modules/element-ui/packages/header/src/main.vue";
import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";

export default {
  name: 'Home',
  components: {
    ElMain,
    ElHeader,
    ElTabPane

  },
  data () {
    return {
      editableTabsValue2: '0',
      editableTabs2: [],
      tabIndex: 1,
      input1: '',
      permissionTree: {}
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toPath(path, title, content){
      this.addTab(path, title, content)
      window.location.href = path;
    },
    addTab(path, title, content) {
      var that = this;
      if(content === '0'){
        that.editableTabsValue2 = content;
        return;
      }
      var isAllow = true;
      this.editableTabs2.forEach((tab, index) => {
        if (tab.content == content) {
          that.editableTabsValue2 = tab.name;
          isAllow = false;
        }
      });
      if(isAllow == false){
        return ;
      }
      let newTabName = ++this.tabIndex + '';
      this.editableTabs2.push({
        title: title,
        name: newTabName,
        content: content,
        path: path
      });
      this.editableTabsValue2 = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    },
    closeAllTabs(){
      this.editableTabs2 = [];
      window.location.href = "#/";
    },
    clickTab(target){
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      var path = null;
      if(target.name === '0'){
        path = "#/";
      }else if (activeName === target.name) {
        tabs.forEach((tab, index) => {
          if (tab.name === target.name) {
            path = tab.path;
          }
        });
      }
      if(path != null){
        window.location.href = path;
      }
    },
    logout(){
      var that = this;
      this.$AJAX.GET(that, 'logout', null, function(response){
        localStorage.removeItem('loginInfo');
        window.location.href = "#/login";
      });
    },
    initPermissionTree(){
      var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      if(loginInfo){
        var permissionTree = loginInfo.permissionTree;
        if(permissionTree){
         this.permissionTree = permissionTree;
        }
      }
    }
  },
  mounted: function () {
    this.initPermissionTree();
  },
  created: function () {
    var that = this;
    that.$AJAX.GET(that, 'test', null, function (response) {});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    color: #67C23A;
    text-align: center;
    background-color: #F8ffff;
    text-align: left;
    line-height: 30px;
    font-size: 20px;
  }
  .el-footer {
    color: #333;
    text-align: center;
    background-color: #F8ffff;
    font-size: 12px;
    line-height: 30px;
  }

  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: left;
  }

  .el-main {
    color: #333;
    text-align: center;
    margin-top: -20px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 218px;
    min-height: calc(100vh - 225px);
  }
  .box-card {
    width: 218px;
    height: 205px;
    background-color: #121A25;
    margin-left: -1px;
  }
  .titleP {
    font-size: 12px;
    color: #BCB7D9;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
