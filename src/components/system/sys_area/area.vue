<template>
  <el-row>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-picture-outline"></i>&nbsp;行政区域</span>
          </div>
          <div class="grid-content bg-purple" style="height: calc(100vh - 300px);overflow:auto;">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
            <el-tree ref="tree"
                     :data="treeData"
                     :default-expanded-keys="defaultExpandedKeys"
                     :filter-node-method="filterNode"
                     show-checkbox
                     check-strictly
                     node-key="id"
                     highlight-current
                     accordion
                     draggable
                     @node-click="handleNodeClick"></el-tree>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-location-outline"></i>&nbsp;当前节点信息</span>
          </div>
          <div class="grid-content bg-purple-light" :style="currentDivStyle">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.id" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全路径：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.fullPath" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">级别：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.level" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-tooltip class="item" effect="dark" content="点击“子节点”按钮，展开或关闭新增子节点的页面" placement="bottom">
                  <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showChildRow" @click="showChildRowClick" :loading="winBtnLoading">子节点</el-button>
                  <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showChildRow"  @click="showChildRowClick" :loading="winBtnLoading">子节点</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“兄弟节点”按钮，展开或关闭新增兄弟节点的页面" placement="bottom" v-if="currentNodeData.level != 0">
                  <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showBotherRow && currentNodeData.level != 0" @click="showBotherRowClick" :loading="winBtnLoading">兄弟节点</el-button>
                  <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showBotherRow && currentNodeData.level != 0"  @click="showBotherRowClick" :loading="winBtnLoading">兄弟节点</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“修改”按钮，修改当前节点" placement="bottom">
                  <el-button type="primary" size="small" plain @click="updateNode" :loading="winBtnLoading">修改</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“删除”按钮，删除选中的节点及其子节点" placement="bottom">
                  <el-button type="danger" size="small" plain @click="deleteCheckedKeys" :loading="winBtnLoading">删除</el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;" v-show="showChildRow">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-edit"></i>&nbsp;新增子节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 280px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">级别：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.level" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button type="primary" size="small" plain @click="saveChildNodeData" :loading="winBtnLoading">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;" v-show="showBotherRow">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-edit"></i>&nbsp;新增兄弟节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 280px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">级别：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.level" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button type="primary" size="small" plain @click="saveBotherNodeData" :loading="winBtnLoading">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'sysArea',
  data () {
    return {
      fn: 'sysArea',
      rootId: 0,
      filterText: '',
      treeData: [],
      currentNodeData: {
        id: '',
        label: '',
        parentId: '',
        fullPath: '',
        fullName: '',
        level: '',
        children: []
      },
      childNodeData: {
        id: '',
        label: '',
        parentId: '',
        fullPath: '',
        fullName: '',
        level: '',
        children: []
      },
      botherNodeData: {
        id: '',
        label: '',
        parentId: '',
        fullPath: '',
        fullName: '',
        level: '',
        children: []
      },
      showChildRow: false,
      showBotherRow: false,
      defaultExpandedKeys: [0],
      winBtnLoading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    currentDivStyle: function () {
      if(this.showChildRow == false && this.showBotherRow == false){
        return 'height: calc(100vh - 310px);font-size:14px;';
      }else{
        return 'height: calc(50vh - 190px);font-size:14px;';
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    initTree(){
      var that = this;
      that.treeData = [];
      that.showChildRow = false;
      that.showBotherRow = false;
      that.$AJAX.GET(this, that.fn + '/getTree', null, function(response){
        that.currentNodeData = response.body.data;
        that.treeData.push(that.currentNodeData);
      });
    },
    expandNode(key){
      this.defaultExpandedKeys = [];
      this.defaultExpandedKeys.push(0);
      if(key){
        this.defaultExpandedKeys.push(key);
      }
    },
    handleNodeClick(data){
      this.currentNodeData = data;
      this.childNodeData.parentId = this.currentNodeData.id;
      this.botherNodeData.parentId = this.currentNodeData.parentId;
    },
    showChildRowClick(){
      this.resetChildNodeData();
      this.childNodeData.parentId = this.currentNodeData.id;
      this.childNodeData.level = this.currentNodeData.level + 1;
      this.showChildRow = !this.showChildRow;
      this.showBotherRow = false;
    },
    showBotherRowClick(){
      this.resetBotherNodeData();
      this.botherNodeData.parentId = this.currentNodeData.parentId;
      this.botherNodeData.level = this.currentNodeData.level;
      this.showBotherRow = !this.showBotherRow;
      this.showChildRow = false;
    },
    resetCurrentNodeData(){
      this.currentNodeData.id = '';
      this.currentNodeData.label = '';
      this.currentNodeData.parentId = '';
      this.currentNodeData.fullPath = '';
      this.currentNodeData.fullName = '';
      this.currentNodeData.level = '';
      this.currentNodeData.children = [];
    },
    resetChildNodeData(){
      this.childNodeData.id = '';
      this.childNodeData.label = '';
      this.childNodeData.parentId = '';
      this.childNodeData.fullPath = '';
      this.childNodeData.fullName = '';
      this.childNodeData.level = '';
      this.childNodeData.children = [];
    },
    resetBotherNodeData(){
      this.botherNodeData.id = '';
      this.botherNodeData.label = '';
      this.botherNodeData.parentId = '';
      this.botherNodeData.fullPath = '';
      this.botherNodeData.fullName = '';
      this.botherNodeData.level = '';
      this.botherNodeData.children = [];
    },
    setCurrentNodeData(id){
      var that = this;
      that.$AJAX.GET(that, that.fn + '/getById', null, function(response){
        that.currentNodeData = response.body.data;
      });
    },
    saveChildNodeData(){
      var that = this;
      that.$AJAX.POST(that, that.childNodeData, that.fn + '/save', true, function(response){
        that.initTree();
        that.expandNode(that.childNodeData.parentId);
      });
    },
    saveBotherNodeData(){
      var that = this;
      that.$AJAX.POST(that, that.botherNodeData, that.fn + '/save', true, function(response){
        that.initTree();
        that.expandNode(that.botherNodeData.parentId);
      });
    },
    updateNode(){
      var that = this;
      var params = [];
      params.push(that.currentNodeData);
      that.$AJAX.PUT(that, params, that.fn + '/update', function(response){
        that.initTree();
        that.expandNode(that.currentNodeData.parentId);
      });
    },
    deleteCheckedKeys(){
      var checkedKeysArr = this.$refs.tree.getCheckedKeys();
      if(!checkedKeysArr || checkedKeysArr.length == 0){
        this.$message({
          type: 'info',
          message: '请勾选要删除的节点'
        });
        return;
      }
      var checkedKeys = "";
      for(var i=0;i<checkedKeysArr.length;i++){
        var checkedKey = checkedKeysArr[i];
        if(checkedKey != 0){
          checkedKeys += checkedKey;
        }
        if(i<checkedKeysArr.length-1){
          checkedKeys += ",";
        }
      }
      var that = this;
      this.$confirm('此操作将永久删除勾选的节点及其子节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$AJAX.DELETE(that, that.fn + '/delete?ids=' + checkedKeys, function(response){
          that.initTree();
          that.expandNode();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
  mounted: function () {
    this.initTree();
  }
}
</script>
