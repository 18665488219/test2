<template>
  <div class="hello">
    <h4>网站首页查询</h4>
     <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>

        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>标题: {{ scope.row.title }}</p>
          <p>内容: {{ scope.row.context }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      prop="context"
      label="内容"
      :formatter="formatter">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" v-on:click="dialogTableVisible = true">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 点击编辑按钮，弹出一个框 -->
      <el-dialog title="网站首页修改页面" :visible.sync="dialogTableVisible">
          <el-form ref="form" :model="form" label-width="80px">
             <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="首页标题">
              <el-input v-model="form.title" placeholder="请填写标题"></el-input>
            </el-form-item>
            <el-form-item label="首页内容">
                <el-input type="textarea" v-model="form.context" placeholder="请填写内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="dialogTableVisible = false" v-on:click="onSubmit()">修改</el-button>
            </el-form-item>

            </el-form>
      </el-dialog>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'select',
  data () {
    return {
      infos:'',
      tableData: [],
      dialogTableVisible: false,
        form: {
          time:'',
          title:'',
          context:'',
          id:''
        },
        formLabelWidth: '120px'
      };
    },
    created(){//文章查询
      var _this=this;
      axios.get('http://127.0.0.1/article/select').then(function(resp){
        _this.tableData=resp.data;
        _this.form=resp.data;
      }).catch(function(error){
        console.log(error);
      })
    },
    methods: {
      onSubmit() {//修改文章,
            var _this=this;
            var qs=require('qs');
            axios.post('http://127.0.0.1/article/update_from',qs.stringify({id:this.form.id,title:this.form.title,context:this.form.context}))
            .then(function(ress){
            axios.get('http://127.0.0.1/article/select').then(function(resp){
            _this.tableData=resp.data;
            })  
            }).catch(function(error){
              console.log(error);
            })
      },
       handleEdit(index, row) {//点击编辑按钮
        this.form.time=row.time;
        this.form.title=row.title;
        this.form.context=row.context;
        this.form.id=row._id;
        console.log(index, row);
      },
      handleDelete(index, row) {//点击删除按钮，删除当前行，然后重新查询一次
        var _this=this;
        var id=row;
        var qs=require('qs');
        axios.post('http://127.0.0.1/article/dele',qs.stringify({id:id})).then(function(response){
          axios.get('http://127.0.0.1/article/select').then(function(resp){
            _this.tableData=resp.data;
          }).catch(function(error){
            console.log(error);
          })
        })
        // console.log(index, row);
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <link rel="stylesheet" type="text/css" href="../../public/css/management.css"> -->
<style scoped>
@import '../../public/css/login.css';
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
