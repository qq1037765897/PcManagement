var curPage;        //当前页数
var totalItem;      //总记录数
var pageSize;       //每一页记录数
var totalPage=7;      //总页数
 
//获取分页数据
function $(id){
	return document.getElementById(id);
}     
function turnPage(page)
{
  $.ajax({
	type: 'POST',
	url: commentDataUrl,     //这里是请求的后台地址，自己定义
	data: {'pageNum':page},
	dataType: 'json',
	beforeSend: function() {
	  $("#data-area").append("加载中...");
	},
	success: function(json) {
	  $("#data-area").empty();       //移除原来的分页数据
	  totalItem = json.totalItem;
	  pageSize = json.pageSize;
	  curPage = page;
	  totalPage = json.totalPage;
	  var data_content = json.data_content;
	  var data_html = "";
	  $.each(data_content,function(index,array) {     //添加新的分页数据（数据的显示样式根据自己页面来设置，这里只是一个简单的列表）
		data_html += "<div class='containerRentalOrder'><table><tr><td>"+array['setout']+"</td><td>"+array['arrive']+"</td><td>"+array['traveldata']+"</td>td>"+array['name']+"</td><td>"+array['cartype']+"</td><td><a href='javascript:CarRentalStatement("+array['RentalCarId']+")'>结单</a></td></tr></table></div>";
	  });
 
	  $("#data-area").innerHTML=data_html;
	},
	complete: function() {    //添加分页按钮栏
	  getPageBar();
	},
	error: function() {
	  alert("数据加载失败");
	}
  });
}
//获取分页条（分页按钮栏的规则和样式根据自己的需要来设置）
function getPageBar()
{	
  if(curPage > totalPage) {
	curPage = totalPage;
  }
  if(curPage < 1) {
	curPage = 1;
  }
  var pageBar = "<ul class=\'pages\'>";
  //显示的页码按钮(5个)
  var start,end;
  if(totalPage <= 5) {
	start = 1;
	end = totalPage;
  } else {
	if(curPage-2 <= 0) {
		start = 1;
		end = 5;
	} else {
		if(totalPage-curPage < 2) {
			start = totalPage - 4;
			end = totalPage;
		} else {
			start = curPage - 2;
			end = curPage + 2;
		}
	}
  }
  for(var i=start;i<=end;i++) {
	if(i == curPage) {
		pageBar += "<li class='page-item'><a href='javascript:turnPage("+i+")'>"+"<button class='select'>"+i+"</button></a></li>";
	} else {
		pageBar += "<li class='page-item'><a href='javascript:turnPage("+i+")'>"+"<button>"+i+"</button></a></li>";
	}
  }
  pageBar += "</ul>";
  $('pageBar').innerHTML=pageBar;
}
//页面加载时初始化分页
turnPage(1);
function CarRentalStatement(RentalCarId){
	if(confirm("确定是否结单")){
		alert("租车ID:"+RentalCarId+"结单（接上数据库后删除）");  
		$.ajax({
				type: "post",  //数据提交方式（post/get）
				url: commentDataUrl,     //这里是请求的后台地址，自己定义
				data: {
				"RentalCarId":RentalCarId},//提交的数据
				dataType: "json",//返回的数据类型格式
				success: function(msg){
					if (msg.success){  //修改成功
					   alert("结单成功") //修改成功处理代码...
					}else {  //修改失败
					   alert("结单失败") //修改失败处理代码...
					}
				}
			});
	}else{
		alert("你取消了结单")
	}
}
//接上服务器后删掉
getPageBar()
function turnPage(page){
	curPage=page;
	getPageBar();
};