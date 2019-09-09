var now = new Date();
var year = now.getFullYear(); //得到年份
var month = now.getMonth()+1;//得到月份
var date = now.getDate();//得到日期
if(month<10){
	month="0"+month;
}
if(date<10){
	date="0"+date;
}
var time =year + "-" + month + "-" + date;
$('departureDay').min=time;

function check(smallint,price){
	if($('#departurePlace').val()==$('#destination').val()){
			alert('出发地和目的地不能相同');
			return false
	}
	else if($('#departureDay').val()<time){
			alert('出发日期不能为空或者以前时间');
			return false
	}
	return true
}
//提交按钮
$("#submit").click(function(){
	var ruralCommittee=$('#ruralCommittee').val();
	var departurePlace=$('#departurePlace').val();
	var destination=$('#destination').val();
	var departureDay=$('#departureDay').val();
	var departureTime=$('#departureTime').val();
	var smallint=$('#smallint').val();
	var price=$('#price').val();
	var type=$('#type').val();
	var middletype;
	if(type==1){
		middletype="否";
	}
	if(type==2){
		middletype="是";
	}
	if(check(smallint,price)==true){
		if(confirm("同乡会 : "+ruralCommittee+"\r出发地 : "+departurePlace+"\r"+"目的地 ："+destination+"\r"+"出发日期 : "+departureDay+"\r"+"出发时间 : "+departureTime+"\r"+"座位数 : "+smallint+"\r"+"售价 : "+price+"\r"+"预售 : "+middletype)){
			$.ajax({
			type: "post",  //数据提交方式（post/get）
			url: commentDataUrl,     //这里是请求的后台地址，自己定义
			data: {
			"ruralCommittee":ruralCommittee,
			"departurePlace":departurePlace,
			"destination":destination,
			"departureDay":departureDay,
			"epartureTime":departureTime,
			"smallint":smallint,
			"price":price,
			"type":type},//提交的数据
			dataType: "json",//返回的数据类型格式
			success: function(msg){
				if (msg.success){  //修改成功
				   alert("添加车辆成功") //修改成功处理代码...
				}else {  //修改失败
				   alert("添加车辆失败") //修改失败处理代码...
				}
			}
		});
		
		}else{
			console.log("你取消了提交");
		}
	}
})
$(function(){
	//同乡会二级联动
	var ruralCommittee='{"汕头同乡会":["广金广州本部","广金肇庆校区","汕头"],"普宁同乡会":["普宁1","普宁2","普宁3"],"丰顺同乡会":["丰顺1","丰顺2","丰顺3"]}';
	var departureAndDestination=eval('('+ruralCommittee+')');
	for(var key in departureAndDestination){
		$("#ruralCommittee").append("<option value ='"+key+"'>"+key+"</option>");
	}
	$("#ruralCommittee").change(function(){
		var nowRuralCommittee=$(this).val();
		$("#departurePlace").html('<option value ="">选择出发地</option>');
		$("#destination").html('<option value ="">选择出发地</option>')
		for(var i in departureAndDestination[nowRuralCommittee]){
			var nowAddress=departureAndDestination[nowRuralCommittee][i];
			$("#departurePlace").append("<option value ='"+nowAddress+"'>"+nowAddress+"</option>")
			$("#destination").append("<option value ='"+nowAddress+"'>"+nowAddress+"</option>")
		}
	})
	
	//添加地点按钮
	var i=4;
	$("#addLocation").click(function(){
		var html="<ul><label>上下车地点:</label><input id='location"+i+"'  type='text'/></ul>";
		$("#centent").append(html);
		i++;
	})
	
})

