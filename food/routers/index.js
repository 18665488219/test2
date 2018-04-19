
var userschema=require('../Schema/user.js');
var articleSchema=require("../Schema/UpdatEarticle.js");

module.exports=function(app){

app.use('/login',require('./login.js'));
app.use('/reg',require('./reg.js'));
app.use('/article',require('./article.js'));
app.get('/',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	articleSchema.find({},function(req,ress){
		res.render("index",{aa:ress});	
	})
})
// app.get('/',function(req,res){
// 	res.header('Access-Control-Allow-Origin','*');
// 		articleSchema.find({},function(req,ress){
//        console.log(6666);
// 	})
	
// })
app.get('/exit',function(req,res){//点击退出按钮，重定向回登录页
	req.session.user=null;
	res.locals.user=req.session.user;
	res.redirect('/login');
})
}