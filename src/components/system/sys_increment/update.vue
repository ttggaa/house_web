<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="visible" @close="close"  width="30%" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">英文名称：</el-col>
        <el-col :span="17">
          <el-input placeholder="必填" v-model="smdParam.name" suffix-icon="el-icon-edit-outline" disabled></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">中文名称：</el-col>
        <el-col :span="17">
          <el-input placeholder="必填" v-model="smdParam.label" suffix-icon="el-icon-edit-outline" clearable></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">数字编码：</el-col>
        <el-col :span="17">
          <el-input placeholder="必填" v-model="smdParam.id" suffix-icon="el-icon-edit-outline" clearable></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">字符编码：</el-col>
        <el-col :span="17">
          <el-input placeholder="必填" v-model="smdParam.code" suffix-icon="el-icon-edit-outline" disabled></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">编码位数：</el-col>
        <el-col :span="17">
          <el-input placeholder="必填" v-model="smdParam.size" suffix-icon="el-icon-edit-outline" clearable></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">描述：</el-col>
        <el-col :span="17">
          <el-input type="textarea" :rows="3" placeholder="" v-model="smdParam.description"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" :loading="winBtnLoading">取 消</el-button>
        <el-button type="primary" @click="commit" :loading="winBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'update',
    props: ['rowData', 'smdParam', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false
      }
    },
    methods: {
      open(){
        this.setSmd(this.rowData);
        this.visible = true
      },
      close(){
        this.$emit('cleanSmd');
        this.visible =false;
      },
      setSmd(row){
        this.smdParam.name = row.name;
        this.smdParam.id = row.id;
        this.smdParam.code = row.code;
        this.smdParam.size = row.size;
        this.smdParam.label = row.label;
        this.smdParam.description = row.description;
      },
      commit(){
        var that = this;
        that.$AJAX.PUT(this, that.smdParam, this.fn + '/update', function(response){
          that.close();
          that.$emit('search');
        });
      }
    }
  }
</script>
