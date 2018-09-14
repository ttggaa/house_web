<template>
  <div>
    <!-- 搜索条件 开始 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="英文名称" prefix-icon="el-icon-search" v-model="searchParam.name"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="中文名称" prefix-icon="el-icon-search" v-model="searchParam.label"/>
      </el-col>
    </el-row>
    <!-- 搜索条件 结束 -->

    <!-- 按钮 开始-->
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <my-search :vm="this"></my-search>
      <my-reset :vm="this"></my-reset>
      <save :btnLoading="btnLoading" :smdParam="smdParam" @search="search" @cleanSmd="cleanSmd" :fn="fn"></save>
      <my-remove :btnLoading="btnLoading" :vm="this" lab1="英文名称" lab2="中文名称" :fn="fn" removeBy="name" @search="search"></my-remove>
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
          <update :rowData="scope.row" :smdParam="smdParam" @search="search" @cleanSmd="cleanSmd" :fn="fn"></update>
          <my-delete text="英文名称" :value="scope.row.name" :id="scope.row.name" :fn="fn" @search="search"></my-delete>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="英文名称" width="120" fixed></el-table-column>
      <el-table-column prop="label" label="中文名称" width="120" fixed></el-table-column>
      <el-table-column prop="id" label="整数编码"  width="120"></el-table-column>
      <el-table-column prop="code" label="字符编码" width="150"></el-table-column>
      <el-table-column prop="size" label="编码位数" width="120"></el-table-column>
      <el-table-column prop="description" label="描述" width="500"></el-table-column>
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
import Save from '@/components/system/sys_increment/save'
import Update from '@/components/system/sys_increment/update'
import ElCol from "element-ui/packages/col/src/col";

export default {
  name: 'Index',
  components: {
    ElCol,
    MySearch,MyReset,MyModel,MyImport,MyExport,MyDelete,MyRemove,
    Save,Update
  },
  data () {
    return {
      fn: 'sysIncrement',
      searchParam: {
        start: 0,
        length: 5,
        name: '',
        label: ''
      },
      smdParam: {
        name: '',
        id: '',
        code: '',
        size: '',
        label: '',
        description: ''
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
      this.$AJAX.GET(that, that.fn + '/page', that.searchParam, function(response){
        that.page.data = response.body.data.data;
        that.page.total = response.body.data.recordsTotal;
      });
    },
    reset(){
      this.searchParam.name = '';
      this.searchParam.label = '';
      this.search();
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
          dist.arg2 = obj.label
          this.page.selection.push(dist);
        }
      }
    },
    cleanSmd(){
      this.smdParam.name = '';
      this.smdParam.id = '';
      this.smdParam.code = '';
      this.smdParam.size = '';
      this.smdParam.label = '';
      this.smdParam.description = '';
    }
  },
  mounted: function () {
    this.search();
  }
}
</script>
