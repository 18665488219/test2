var mongoose=require('../db.js'); //引入数据库链接操作
var userSchema=mongoose.Schema({//定义数据模型
	username:String,
	pass:String,
	checkPass:String,
	sex:String,
	// img:String,
	instructions:String
},{collection:'user'})//collection:user_table指定需要操作的集合
module.exports=mongoose.model('user',userSchema);//将该Schema发布为Model