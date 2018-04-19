var express=require("express");
var router=require('./routers/index.js');
var path=require("path");
var bodyParser=require('body-parser');

var session=require('express-session');//session插件，用这个安装要在小黑窗安装：npm i express-session --save
// ejs
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//在app中配置session

// app.use(express.static(path.join(__dirname,'public')));//引入静态文件夹
// app.use(bodyParser.urlencoded({extended:true}));
// app.set('views',path.join(__dirname,'views'))//引入视图文件
// app.set('view engine','ejs')

app.use(session({secret:'Li'}));//secret:'Li':是session的密码（自己配置）
router(app);

app.listen(80,function(){
	console.log("服务已启动...");
});
