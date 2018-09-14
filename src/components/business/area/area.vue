<template>
  <div>
    <!-- 搜索条件 开始 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="名称" prefix-icon="el-icon-search" v-model="searchParam.name" clearable/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="地址" prefix-icon="el-icon-search" v-model="searchParam.address" clearable/>
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchParam.del" filterable placeholder="删除标识" style="width: 100%;" clearable>
          <el-option label="未删除" value="0"/>
          <el-option label="已删除" value="1"/>
        </el-select>
      </el-col>
    </el-row>
    <!-- 搜索条件 结束 -->

    <!-- 按钮 开始-->
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <my-search :vm="this"></my-search>
      <my-reset :vm="this"></my-reset>
      <save :vm="this"></save>
      <my-remove :btnLoading="btnLoading" :vm="this" lab1="昵称" lab2="姓名" :fn="fn" @search="search"></my-remove>
    </el-row>
    <!-- 按钮 结束-->

    <!-- 表格 开始 -->
    <el-table
      ref="multipleTable"
      :data="page.data"
      stripe
      size="mini"
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
          <my-delete text="名称" :value="scope.row.name" :id="scope.row.id" :fn="fn" @search="search"></my-delete>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="150" fixed :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="地址" width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="longitude" label="经度"  width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="latitude" label="纬度"  width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="description" label="描述"  width="200" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="del" label="删除标识" width="120" :formatter="delTimeFmt" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createUser" label="创建人" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="180" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateUser" label="修改人" width="120" :show-overflow-tooltip="true"></el-table-column>
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
  import Save from '@/components/business/area/save'
  import Update from '@/components/business/area/update'
  import Detail from '@/components/business/area/detail'

  export default {
    name: 'areaBusi',
    components: {
      MySearch,MyReset,MyModel,MyImport,MyExport,MyDelete,MyRemove,
      Save,Update,Detail
    },
    data () {
      return {
        fn: 'areaBusi',
        searchParam: {
          start: 0,
          length: 5,
          name: '',
          address: '',
          del: ''
        },
        smdParam: {
          id: '',
          name: '',
          address: '',
          longitude: '',
          latitude: '',
          description: '',
          del: ''
        },
        smdParamExtend: {

        },
        options: {

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
            dist.arg1 = obj.name;
            dist.arg2 = obj.address;
            this.page.selection.push(dist);
          }
        }
      },
      createTimeFmt(row, column){
        return new Date(row.createTime).format("yyyy-MM-dd hh:mm:ss");
      },
      delTimeFmt(row, column){
        return row.del==0?'未删除':'已删除';
      },
      cleanSmd(){
        for(var p in this.smdParam){
          this.smdParam[p] = '';
        }
        this.smdParamExtend.roles = [];
      },
    },
    mounted: function () {
      this.search();
    }
  }
</script>
