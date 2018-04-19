var express=require('express');
var router=express.Router();
var userschema=require('../Schema/user.js');
var checkislogin=require('./check.js').checkislogin;//检查跳转页面
var crypto=require('crypto');
router.get('/',checkislogin,function(req,res){
	res.render('login');
})
router.post("/check",function(req,res){
	userschema.find({$and:[{username:req.body.username},{pass:crypto.createHmac('sha256',req.body.pass).update('I Love You').digest('hex')}]},function(err,result){
		// //查找注册信息里的数据，然后登录
		if(err){
			return res.send('登录失败');
		}
		if(result.length > 0){
			var _user={
				_id:result[0]._id,
				username:result[0].username,
				sex:result[0].sex,
				instructions:result[0].instructions
			}
			req.session.user=_user; //user=result;(自定义：需要保存的东西)
			res.locals.user=req.session.user;
			// console.log(_user);
			res.redirect('/');//重定向回首页
		}
		else{
			res.send("账号不存在！！！");
		}
	})
});
module.exports=router;