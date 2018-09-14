<template>
  <div>
    <!-- 搜索条件 开始 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="ID" prefix-icon="el-icon-search" v-model="searchParam.code"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="用户名" prefix-icon="el-icon-search" v-model="searchParam.nickName"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="姓名" prefix-icon="el-icon-search" v-model="searchParam.realName"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="手机号" prefix-icon="el-icon-search" v-model="searchParam.phone"/>
      </el-col>
    </el-row>
    <!-- 搜索条件 结束 -->

    <!-- 按钮 开始-->
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <my-search :vm="this"></my-search>
      <my-reset :vm="this"></my-reset>
      <save :vm="this"></save>
      <my-model :btnLoading="btnLoading" name="批量导入用户信息模板"></my-model>
      <my-import :btnLoading="btnLoading" :fn="fn" @search="search"></my-import>
      <my-export :btnLoading="btnLoading" :exportParam="searchParam" :fn="fn"></my-export>
      <my-remove :btnLoading="btnLoading" :vm="this" lab1="昵称" lab2="姓名" :fn="fn" @search="search"></my-remove>
    </el-row>
    <!-- 按钮 结束-->

    <!-- 表格 开始 -->
    <el-table
      ref="multipleTable"
      :data="page.data"
      stripe
      v-loading="tabLoading"
      class="my-table"
      height="calc(100vh - 340px)"
      @selection-change="pageSelectionChange">
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column type="index" width="50" fixed></el-table-column>
      <el-table-column fixed="left" label="操作" width="150">
        <template slot-scope="scope">
          <detail :rowData="scope.row" :smdParam="smdParam" :options="options" @cleanSmd="cleanSmd"></detail>
          <update :rowData="scope.row" :smdParam="smdParam" :options="options" @cleanSmd="cleanSmd" @search="search" :fn="fn"></update>
          <my-delete text="用户名" :value="scope.row.nickName" :id="scope.row.id" :fn="fn" @search="search"></my-delete>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户名" width="150" fixed></el-table-column>
      <el-table-column prop="realName" label="姓名" width="100" fixed></el-table-column>
      <el-table-column prop="phone" label="手机号"  width="110"></el-table-column>
      <el-table-column prop="idNumber" label="身份证号"  width="180"></el-table-column>
      <el-table-column prop="provinceLabel" label="省份"  width="120"></el-table-column>
      <el-table-column prop="cityLabel" label="城市" width="120"></el-table-column>
      <el-table-column prop="wechat" label="微信号" width="120"></el-table-column>
      <el-table-column prop="qq" label="QQ号" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" :formatter="createTimeFmt"></el-table-column>
    </el-table>
    <!-- 表格 结束-->

    <!-- 分页 开始 -->
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
        :current-page.sync="page.currentPage"
        :page-sizes="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100, 500, 1000]"
        :page-size="searchParam.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <!-- 分页 结束 -->
  </div>
</template>

<script>
import MySearch from '@/components/common/my-search'
import MyReset from '@/components/common/my-reset'
import MyDelete from '@/components/common/my-delete'
import MyExport from '@/components/common/my-export'
import MyModel from '@/components/common/my-model'
import MyImport from '@/components/common/my-import'
import MyRemove from '@/components/common/my-remove'
import Save from '@/components/system/sys_user/save'
import Update from '@/components/system/sys_user/update'
import Detail from '@/components/system/sys_user/detail'

export default {
  name: 'sysUser',
  components: {
    MySearch,MyReset,MyModel,MyImport,MyExport,MyDelete,MyRemove,
    Save,Update,Detail
  },
  data () {
    return {
      fn: 'sysUser',
      searchParam: {
        start: 0,
        length: 5,
        code: '',
        nickName: '',
        realName: '',
        phone: ''
      },
      smdParam: {
        id: '',
        code: '',
        nickName: '',
        realName: '',
        password: '',
        phone: '',
        idNumber: '',
        province: -1,
        city: -1,
        wechat: '',
        qq: '',
        email: '',
        roles: '',
        createTime: ''
      },
      smdParamExtend: {
        roles: [],
      },
      options: {
        province: [],
        city: [],
        roles: []
      },
      page: {
        data: [],
        total: 0,
        currentPage: 1,
        selection: []
      },
      tabLoading: true,
      btnLoading: false
    }
  },
  methods: {
    search(){
      var that = this;
      this.$AJAX.GET(this, this.fn + '/page', that.searchParam, function(response){
        that.page.data = response.body.data.data;
        that.page.total = response.body.data.recordsTotal;
      });
    },
    pageSizeChange(val) {
      this.searchParam.length = val;
      this.pageNoChange(this.page.currentPage);
    },
    pageNoChange(val) {
      this.searchParam.start = (val-1)*this.searchParam.length;
      this.search();
    },
    pageSelectionChange(val) {
      this.page.selection = [];
      if(val && val.length > 0){
        for(var i=0;i<val.length;i++){
          var obj = val[i];
          var dist = {};
          dist.id = obj.id;
          dist.arg1 = obj.nickName;
          dist.arg2 = obj.realName
          this.page.selection.push(dist);
        }
      }
    },
    createTimeFmt(row, column){
      return new Date(row.createTime).format("yyyy-MM-dd hh:mm:ss");
    },
    cleanSmd(){
      for(var p in this.smdParam){
        this.smdParam[p] = '';
      }
      this.smdParamExtend.roles = [];
    },
    initProvince(){
      var that = this;
      that.$AJAX.GET(that, 'sysArea/getOptionsByParentId?parentId=0', null, function (response) {
        var data = response.body.data;
        if(data){
          that.options.province = [];
          for(var i=0;i<data.length;i++){
            var obj = data[i];
            obj.value = obj.value + "";
            that.options.province.push(obj);
          }
        }
      });
    },
    initRoleOptions(){
      var that = this;
      that.$AJAX.GET(that, 'sysRole/getOptionsAll', null, function (response) {
        var data = response.body.data;
          if(data){
          that.options.roles = [];
          for(var i=0;i<data.length;i++){
            var obj = data[i];
            obj.value = obj.value + "";
            that.options.roles.push(obj);
          }
        }
      });
    }
  },
  watch: {
    'smdParam.province': function(val){
      var that = this;
      if(val){
        that.$AJAX.GET(that, 'sysArea/getOptionsByParentId?parentId=' + val, null, function (response) {
          var data = response.body.data;
          if(data){
            that.options.city = [];
            for(var i=0;i<data.length;i++){
              var obj = data[i];
              obj.value = obj.value + "";
              that.options.city.push(obj);
            }
          }
        });
      }else{
        that.options.city = [];
      }
    }
  },
  mounted: function () {
    this.search();
    this.initProvince();
    this.initRoleOptions();
  }
}
</script>
