<template>
  <div class="hello">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
    <el-form-item label="首页标题">
      <el-input v-model="form.title" placeholder="请填写标题" id="title"></el-input>
    </el-form-item>
    <el-form-item label="首页内容">
        <el-input type="textarea" v-model="form.context" id="editor" name="editor" placeholder="请填写内容"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import CKEDITOR from 'CKEDITOR'
export default {
  name: 'homeupdate',
  data () {
    return {
      form:{
        time:'',
        title:'',
        context:''
      },
      info:''
      }
    },
    created(){//文章查询
      var _this=this;
      axios.get('http://127.0.0.1/article/select').then(function(resp){
        _this.form=resp.data;
      }).catch(function(error){
        console.log(error);
      })
    },
    methods: {//点击侧边导航的“网站首页”的首页添加，跳转到添加页面
      onSubmit() {
        if($('#title') !=='' && $('#context') !==''){
          var _this=this;
          var qs=require('qs');
          axios.post('http://127.0.0.1/article/insert_ar',qs.stringify({time:this.form.time,title:this.form.title,context:this.form.context})).then(function(ress){
            _this.$router.push({path:'/home/select'});
        }).catch(function(error){
          console.log(error);
        })
        }

      }
    },
    mounted(){
       CKEDITOR.replace("editor", {height: "300px", width: "100%", toolbar: "Full"});
        var editor = CKEDITOR.instances.editor2;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
