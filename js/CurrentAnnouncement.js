function $(id){
	return document.getElementById(id);
}   
function GetData(){
	$.ajax({
		type: 'POST',
		url: commentDataUrl,     //这里是请求的后台地址，自己定义
		data: {'CurrentAnnouncement':1}, //这里是请求的后台数据类型，自己定义
		dataType: 'json',
		beforeSend: function() {
		  $("#data-area").append("加载中...");
		},
		success: function(json) {
		  $("#data-area").empty();       //移除原来的分页数据
		  var data_content = json.data_content;
		  var data_html = "";
		  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
			data_html += "<table><tr><td  colspan='7'>"+array['SmallProgram']+"</td><td><a href='javaScript:SmallProgram()'>"+array['phone']+"</a></td></tr></table><h1>商家公告</h1><table><tr><td colspan='7'>"+array['Merchant']+"</a></td><td><a href='javaScript:Merchant()'>下架</a></td></tr></table>";
		  });
		  $("#data-area").innerHTML=data_html;
		},
		error: function() {
		  alert("数据加载失败");
		}
	  });
}
function SmallProgram(){
	if(confirm("确定是否下架")){
		alert("已下架（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"SmallProgram":1},//提交的数据,自己定义
				dataType: "json",//返回的数据类型格式
				success: function(msg){
					if (msg.success){  //修改成功
					   alert("下架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("下架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		alert("你取消了下架")
	}
}
function Merchant(){
	if(confirm("确定是否下架")){
		alert("已下架（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"Merchant":1},//提交的数据,自己定义
				dataType: "json",//返回的数据类型格式
				success: function(msg){
					if (msg.success){  //修改成功
					   alert("下架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("下架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		alert("你取消了下架")
	}
}
function SubmitAnnouncement(){
	var selectType=$('selectType').value;
	var AnnounceText=$('AnnounceText').value;
	if(confirm("确定是否提交")){
		alert("已提交（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"selectType":selectType,
				"AnnounceText":AnnounceText},//提交的数据,自己定义
				dataType: "json",//返回的数据类型格式
				success: function(msg){
					if (msg.success){  //修改成功
					   alert("下架成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("下架失败") //修改失败处理代码...
					}
				}
			});
	}else{
		alert("你取消了提交")
	}
	
}
