<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，填写用户信息" placement="bottom">
      <el-button type="primary" size="small" icon="el-icon-news" @click="open" :loading="vm.btnLoading">新增</el-button>
    </el-tooltip>
    <el-dialog title="新增" :visible.sync="visible" @close="close">
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">名称（必填）：</el-col>
        <el-col :span="18">
          <el-input placeholder="名称（必填）" v-model="vm.smdParam.name">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">地址：</el-col>
        <el-col :span="18">
          <el-input placeholder="地址" v-model="vm.smdParam.address">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">经度：</el-col>
        <el-col :span="18">
          <el-input placeholder="经度" v-model="vm.smdParam.longitude">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">纬度：</el-col>
        <el-col :span="18">
          <el-input placeholder="纬度" v-model="vm.smdParam.latitude">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">描述：</el-col>
        <el-col :span="18">
          <el-input placeholder="描述" v-model="vm.smdParam.description">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">删除标识：</el-col>
        <el-col :span="18">
          <el-select v-model="vm.smdParam.del" filterable placeholder="删除标识" style="width: 100%;">
            <el-option label="未删除" value="0"/>
            <el-option label="已删除" value="1"/>
          </el-select>
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
    name: 'save',
    props: ['vm'],
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
        this.vm.cleanSmd();
        this.visible =false;
      },
      commit(){
        var that = this;
        that.$AJAX.POST(that, that.vm.smdParam, that.vm.fn + '/save', true, function(response){
          that.close();
          that.vm.search();
        });
      }

    }
  }
</script>
