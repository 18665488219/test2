var express=require("express");
var router=express.Router();
var userschema=require('../Schema/user.js');
var crypto=require('crypto');
// var multer=require('multer');//引入multer
// var storage=multer.diskStorage({
// 	destination:function(req,file,cb){//destination 是用来确定上传的文件应该存储在哪个文件夹中。
// 		cb(null,'public/img/reg');//目录下的tmp文件夹
// 	},
// 	filename:function(req,file,cb){
// 		cb(null,file.originalname);
// 	}
// })
// var upload=multer({storage:storage})
router.get('/',function(req,res){
	res.render('reg');
})
router.get('/checkname',function(req,res){//检查用户名是否可以注册
	
	res.header('Access-Control-Allow-Origin','*');
	var username=req.query.username;////通过用户名查找数据库中用户名是否相同，如果相同则提示用户此用户名已被注册
	userschema.find({username:username},function(err,result){
		if(result.lenth > 0){
			res.send('no');
		}else{
			res.send('ok');
		}
	})
})
router.post('/reg',function(req,res){
	// res.header('Access-Control-Allow-Origin','*');
	console.log(req.body.username)
	userschema.find({username:req.body.username},function(err,result){
		if(result.lenth > 0){
			userschema.find(function(err,result){
				return res.send('已存在用户，请重新输入！');
			})
		}else{
			var username=req.body.username,
				pass=req.body.pass,
				checkPass=req.body.checkPass,
				sex=req.body.sex,
				instructions=req.body.instructions;
			var user=new userschema({//获取注册页面里注册的信息，然后返回到数据库里
				username:username,
				pass:crypto.createHmac('sha256',pass).update('I Love Cupcakes').digest('hex'),
				checkPass:crypto.createHmac('sha256',checkPass).update('I Love Cupcakes').digest('hex'),
				sex:sex,
				instructions:instructions
			})
			user.save(function(err,result){
				if(err){
					res.send('注册保存失败');
				}else{
					var _user={
						_id:result._id,
						username:result.username,
						sex:result.sex,
						instructions:result.instructions
					}
					req.session.user=_user;
					res.locals.user=req.session.user;
					res.redirect('/');
				}
			})
		}
	})
})
module.exports=router;