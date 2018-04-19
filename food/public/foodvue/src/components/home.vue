<template>
  <div class="hello">
    <el-container>
    <el-header>
      <div class="header_left">
        <h3>Cat's Adult 后台管理系统</h3>
      </div>
      <div class="header_right">
        <!-- <img src="../../public/img/login/znql.png"> -->
        <span>欢迎您 <a href="/exit" v-on:click="exit()">退出</a></span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#B3C0D1"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1" >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>网站首页</span>
              </template>
              <el-menu-item-group>
                 <el-menu-item index="1-1" v-on:click="homepage()">首页查询</el-menu-item>
                <el-menu-item index="1-2" v-on:click="insertFrom()">首页添加</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>公司介绍</span>
              </template>
              <el-menu-item-group>
                 <el-menu-item index="2-1" v-on:click="">公司介绍查询</el-menu-item>
                <el-menu-item index="2-2">公司介绍添加</el-menu-item>
                <el-menu-item index="2-3">公司介绍编辑</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>甜品展示</span>
              </template>
              <el-menu-item-group>
               <el-menu-item index="3-1" v-on:click="">甜品展示查询</el-menu-item>
                <el-menu-item index="3-2">甜品展示添加</el-menu-item>
                <el-menu-item index="3-3">甜品展示编辑</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-more"></i>
                <span>新闻中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" v-on:click="">新闻中心查询</el-menu-item>
                <el-menu-item index="4-2">新闻中心添加</el-menu-item>
                <el-menu-item index="4-3">新闻中心编辑</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      </el-container>
    </el-container>



  <div class="bg">
    <ul>
      <li><img src="../../public/img/login/0.jpg"></li>
    </ul>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {

      }
    },
	methods: {
		handleOpen(key, keyPath) {
		console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
		console.log(key, keyPath);
		},
    homepage:function(){//点击侧边导航的“网站首页”的首页查询，跳转到查询页面
      // console.log('0000');
    this.$router.push({path:'/home/select'});
    },
    insertFrom:function(){//点击侧边导航的“网站首页”的首页添加，跳转到添加页面
    this.$router.push({path:'/home/homeupdate'});
    },
    exit:function(){//点击header的退出按钮，重定向回登录页面
      var _this=this;
      axios.get('http://127.0.0.1/exit').then(function(response){
        _this.info=response;
      }).catch(function(error){
        // console.log(error);
      })
    }
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <link rel="stylesheet" type="text/css" href="../../public/css/management.css"> -->
<style scoped>
@import '../../public/css/management.css';
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
.el-header, .el-footer, .el-aside {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;  
    text-align: left;
    /*line-height: 100px;*/
  }

</style>
  