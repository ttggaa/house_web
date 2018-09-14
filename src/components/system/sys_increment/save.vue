<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，填写用户信息" placement="bottom">
      <el-button type="primary" size="small" icon="el-icon-news" @click="open" :loading="btnLoading">新增</el-button>
    </el-tooltip>
    <el-dialog title="新增" :visible.sync="visible" @close="close" width="30%">
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="col-left">英文名称：</el-col>
        <el-col :span="17">
          <el-input placeholder="必填" v-model="smdParam.name" suffix-icon="el-icon-edit-outline" clearable></el-input>
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
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {ElCol},
    name: 'save',
    props: ['btnLoading', 'smdParam', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false
      }
    },
    methods: {
      open(){
        this.visible = true
      },
      close(){
        this.$emit('cleanSmd');
        this.visible =false;
      },
      commit(){
        var that = this;
        that.$AJAX.POST(that, that.smdParam, this.fn + '/save', true, function(response){
          that.close();
          that.$emit('search');
        });
      },
    }
  }
</script>
