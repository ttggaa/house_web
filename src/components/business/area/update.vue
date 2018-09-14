<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="visible" @close="close" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6" class="my-head-right">ID：{{smdParam.id || '-'}}</el-col>
        <el-col :span="18" class="my-head-right">创建时间：{{rowData.createTime || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">名称（必填）：</el-col>
        <el-col :span="18">
          <el-input placeholder="名称（必填）" v-model="smdParam.name">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">地址：</el-col>
        <el-col :span="18">
          <el-input placeholder="地址" v-model="smdParam.address">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">经度：</el-col>
        <el-col :span="18">
          <el-input placeholder="经度" v-model="smdParam.longitude">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">纬度：</el-col>
        <el-col :span="18">
          <el-input placeholder="纬度" v-model="smdParam.latitude">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">描述：</el-col>
        <el-col :span="18">
          <el-input placeholder="描述" v-model="smdParam.description">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="6">删除标识：</el-col>
        <el-col :span="18">
          <el-select v-model="smdParam.del" filterable placeholder="删除标识" style="width: 100%;">
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
    name: 'update',
    props: ['rowData', 'smdParam', 'options', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false,
        smdParamExtend: {
          roles: [],
        },
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
        for(var p in this.smdParam){
          this.smdParam[p] = row[p];
        }
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
