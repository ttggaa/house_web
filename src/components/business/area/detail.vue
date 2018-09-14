<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">查看</el-button>
    <el-dialog title="查看" :visible.sync="visible" width="60%" @close="close" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">ID：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.id || '-'}}</el-col>
        <el-col :span="3" class="my-head">名称：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.name || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">地址：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.address || '-'}}</el-col>
        <el-col :span="3" class="my-head">经度：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.longitude || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">纬度：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.latitude || '-'}}</el-col>
        <el-col :span="3" class="my-head">描述：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.description || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">删除标识：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.del==0?'未删除':'已删除'}}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    props: ['rowData', 'smdParam', 'options'],
    data () {
      return {
        visible: false
      }
    },
    methods: {
      open() {
        this.setSmd(this.rowData);
        this.visible = true;
      },
      close(){
        this.$emit('cleanSmd');
        this.visible = false;
      },
      setSmd(row){
        for(var p in this.smdParam){
          this.smdParam[p] = row[p];
        }
      }
    }
  }
</script>
