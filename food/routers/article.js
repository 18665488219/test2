var express=require("express");
var router=express.Router();

var checknotlogin=require('./check.js').checknotlogin;
var userschema=require('../Schema/user.js');
var articleSchema=require("../Schema/UpdatEarticle.js");

function addZero(num){
	if(num >=0 && num <10){
		return "0" +num;
	}else{
		return "" + num;
	}
}
function Time(oDate){
	var year=(oDate.getFullYear()).toString(),
		month=addZero((oDate.getMonth()+1).toString()),
		day=addZero((oDate.getDate()).toString()),
		hour=addZero((oDate.getHours().toString())),
		minute=addZero((oDate.getMinutes().toString())),
		second=addZero((oDate.getSeconds().toString()));
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

}

router.get('/',checknotlogin,function(req,res){//登录检验
	res.locals.user=req.session.user;
	res.render("UpdateEarticle");
})
//首页文章添加数据
router.post('/insert_ar',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
		var asch=new articleSchema({
			time:Time(new Date()),
			title:req.body.title,
			context:req.body.context
		})
		asch.save(function(err,result){
			res.send('文章添加成功');
		})
	})
//首页文章查询
router.get('/select',function(req,res){
	res.header('Access-Control-Allow-Origin','*');//跨域问题
	articleSchema.find({},function(req,ress){
		// console.log(ress)
		res.send(ress);
	})
})
//首页文章删除
router.post('/dele',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	articleSchema.remove({_id:req.body.id},function(err){
		// console.log("1111111")
		res.send("ok");
	})
})
//首页文章修改
router.post('/update_from',function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	// console.log(req.body.id)
	var aid = req.body.id;
	articleSchema.findByIdAndUpdate({_id:aid},{$set:{title:req.body.title,context:req.body.context}},function(req,ress){
		res.send('11111111111111');
	})
})
module.exports=router;