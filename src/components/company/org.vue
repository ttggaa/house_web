<template>
  <el-row>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-menu"></i>&nbsp;组织</span>
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
            <span style="font-size: 16px;"><i class="el-icon-location"></i>&nbsp;当前节点信息</span>
          </div>
          <div class="grid-content bg-purple-light" :style="currentDivStyle">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.id" disabled></el-input>
              </el-col>
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">级别：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.level"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">是否可用：</el-col>
              <el-col :span="8">
                <el-select v-model="currentNodeData.available" filterable placeholder="是否可用" style="width: 100%;">
                  <el-option
                    v-for="item in options.available"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全路径：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.fullPath" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-tooltip class="item" effect="dark" content="点击“子节点”按钮，展开或关闭新增子节点的页面" placement="bottom">
                  <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showChildRow" @click="showChildRowClick" :loading="winBtnLoading">子节点</el-button>
                  <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showChildRow"  @click="showChildRowClick" :loading="winBtnLoading">子节点</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="点击“兄弟节点”按钮，展开或关闭新增兄弟节点的页面" placement="bottom" v-if="currentNodeData.id != 0">
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
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 240px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.id"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">级别：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.level"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">是否可用：</el-col>
              <el-col :span="8">
                <el-select v-model="childNodeData.available" filterable placeholder="是否可用" style="width: 100%;">
                  <el-option
                    v-for="item in options.available"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全路径：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.fullPath" disabled></el-input>
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
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 240px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.id"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">级别：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.level"></el-input>
              </el-col>
              <el-col :span="4" class="col-left">是否可用：</el-col>
              <el-col :span="8">
                <el-select v-model="botherNodeData.available" filterable placeholder="是否可用" style="width: 100%;">
                  <el-option
                    v-for="item in options.available"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="8">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">全路径：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.fullPath" disabled></el-input>
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
        fn: 'tOrg',
        rootId: 0,
        filterText: '',
        treeData: [],
        options: {
          available: [
            {value: true,label: '可用'},
            {value: false,label: '不可用'}
          ]
        },
        currentNodeData: {
          id: '',
          label: '',
          parentId: '',
          fullName: '',
          fullPath: '',
          available: '',
          level: -2,
          children: []
        },
        childNodeData: {
          id: '',
          label: '',
          parentId: '',
          fullName: '',
          fullPath: '',
          available: '',
          level: -2,
          children: []
        },
        botherNodeData: {
          id: '',
          label: '',
          parentId: '',
          fullName: '',
          fullPath: '',
          available: '',
          level: -2,
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
      },
      'childNodeData.id': function(val){
        if(this.currentNodeData.id == 0){
          this.childNodeData.fullPath = "/" + val;
        }else{
          if(this.currentNodeData.fullPath){
            this.childNodeData.fullPath = this.currentNodeData.fullPath + "/" + val;
          }else{
            this.$message.error("当前节点全路径为空！");
          }
        }
        if(!val){
          this.childNodeData.fullPath = '';
        }
      },
      'childNodeData.label': function(val){
        if(this.currentNodeData.id == 0){
          this.childNodeData.fullName = "/" + val;
        }else{
          if(this.currentNodeData.fullName){
            this.childNodeData.fullName = this.currentNodeData.fullName + "/" + val;
          }else{
            this.$message.error("当前节点全名称为空！");
          }
        }
        if(!val){
          this.childNodeData.fullName = '';
        }
      },
      'botherNodeData.id': function(val){
        if(this.currentNodeData.fullPath){
          var arr = this.currentNodeData.fullPath.split("/");
          var path = "";
          for(var i=0;i<arr.length-1;i++){
            path += arr[i];
            if(i < arr.length-2){
              path += "/"
            }
          }
          this.botherNodeData.fullPath = path + "/" + val;
        }else{
          this.$message.error("当前节点全路径为空！");
        }
        if(!val){
          this.botherNodeData.fullPath = '';
        }
      },
      'botherNodeData.label': function(val){
        if(this.currentNodeData.fullName){
          var arr = this.currentNodeData.fullName.split("/");
          var path = "";
          for(var i=0;i<arr.length-1;i++){
            path += arr[i];
            if(i < arr.length-2){
              path += "/"
            }
          }
          this.botherNodeData.fullName = path + "/" + val;
        }else{
          this.$message.error("当前节点全名称为空！");
        }
        if(!val){
          this.botherNodeData.fullName = '';
        }
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
          console.log(response);
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
        this.childNodeData.available = true;
        this.childNodeData.id = this.getId('child');
        this.showChildRow = !this.showChildRow;
        this.showBotherRow = false;
      },
      showBotherRowClick(){
        this.resetBotherNodeData();
        this.botherNodeData.parentId = this.currentNodeData.parentId;
        this.botherNodeData.level = this.currentNodeData.level;
        this.botherNodeData.available = true;
        this.getId('bother');
        this.showBotherRow = !this.showBotherRow;
        this.showChildRow = false;
      },
      resetCurrentNodeData(){
        this.currentNodeData.id = '';
        this.currentNodeData.label = '';
        this.currentNodeData.parentId = '';
        this.currentNodeData.fullName = '';
        this.currentNodeData.fullPath = '';
        this.currentNodeData.level = -2;
        this.currentNodeData.available = '';
        this.currentNodeData.available = '';
        this.currentNodeData.children = [];
      },
      resetChildNodeData(){
        this.childNodeData.id = '';
        this.childNodeData.label = '';
        this.childNodeData.parentId = '';
        this.childNodeData.fullName = '';
        this.childNodeData.fullPath = '';
        this.childNodeData.level = -2;
        this.childNodeData.available = '';
        this.childNodeData.available = '';
        this.childNodeData.children = [];
      },
      resetBotherNodeData(){
        this.botherNodeData.id = '';
        this.botherNodeData.label = '';
        this.botherNodeData.parentId = '';
        this.botherNodeData.fullName = '';
        this.botherNodeData.fullPath = '';
        this.botherNodeData.level = -2;
        this.botherNodeData.available = '';
        this.botherNodeData.available = '';
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
        that.$AJAX.PUT(that, that.currentNodeData, that.fn + '/update', function(response){
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

      },
      getId(type){
        var that = this;
        that.$AJAX.GET(that, that.fn + '/getId', null, function(response){
          if(type == 'child'){
            that.childNodeData.id = response.body.data;
          }
          if(type == 'bother'){
            that.botherNodeData.id = response.body.data;
          }
        });
      },
    },
    mounted: function () {
      this.initTree();
    }
  }
</script>
