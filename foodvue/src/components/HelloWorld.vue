<template>
  <div class="hello">
  <el-container>
        <el-main>
          <div class="login_box">
            <h2>猫大人甜点屋后台登录</h2>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>
                <el-button type="primary" v-on:click="loginFrom()" @click="submitForm('ruleForm2')">登录</el-button>
                <el-button v-on:click="loginFrom()" @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

        <div class="bg">
          <ul>
            <li><img src="../../public/img/login/0.jpg"></li>
          </ul>
        </div>
            <div> {{info}}</div>
        </el-main>
       
      </el-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm2.username !== '') {
          this.$refs.ruleForm2.validateField('username');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        ruleForm2: {
          username:'',
          pass: '',
          checkPass:''
        },
        rules2: {
          username: [
            { validator: validatePass, trigger: 'blur' }
            ],
            pass: [
            { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
            { validator: validatePass, trigger: 'blur' }
            ]
        },
        info:''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $("form").submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loginFrom:function(){//请求node项目中已注册的用户名和密码
        var _this=this;
            axios.get('http://127.0.0.1/reg/checkName').then(function(response){
              _this.info=response;
              console.log(response.username,response.pass);
            }).catch(function(error){
              console.log(error);
            })
      }
  },
  watch:{
    info(){
      if(this.info.data=="ok"){
        this.$router.push({path:'/home/'});
      }else{
        console.log("这是非法请求");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*@import '../../public/css/management.css';*/
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
