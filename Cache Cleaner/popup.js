/*
* author:aggerChen
*/

let data1 = {
	appcache: false,
	cache: false,
	cookies: false,
	downloads: false,
	fileSystems: false,
	formData: false,
	history: false,
	indexedDB: false,
	localStorage: false,
	passwords: false,
	pluginData: false,
	serverBoundCertificates: false,
	webSQL: false
}

layui.use(['form'], function(){
  var form = layui.form,layer = layui.layer,laytpl = layui.laytpl;
  
	 
	
	form.on('submit(cleanFilter)', function(e){
		let data2 = e.field;
		let time = e.time;
		delete data2.time;
		if(Object.keys(data2).length<=0){
			layer.msg('请选择 (please choose)');
			return false;
		}
		let data = Object.assign({},data1,data2);
		let json = formatterData(data);
		console.log(json);
		toClean(time,json);
	}); 
});

//去清理
function toClean(time,json){
		
	$("#cleanBtn").attr('disabled',true);
	$("#showMsg").text('缓存清理中...');
	
	//向扩展程序发送消息，并传递数据
   chrome.runtime.sendMessage({
		msg: 'cleanCache',
		data: json,			//获取清除选项			
		days: time			//获取清除多长时间
	},function(response){
	   //响应函数
		$("#cleanBtn").attr('disabled',false);
		$("#showMsg").text('清理缓存成功! successfully!');
		setTimeout(()=>{
			$("#showMsg").text('快捷键(hot key)：Alt+C');
		},1000);
   });
       
}

//获取选中的清理选项
function formatterData(obj){
	
	Object.keys(obj).forEach(function(key){
		obj[key] = Boolean(obj[key]);
	});
	
	return obj;
}