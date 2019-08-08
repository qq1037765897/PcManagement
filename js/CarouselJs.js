function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

var index = 0,
	timer = null,
	pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
 	len = pics.length,
 	menu = byId("menu-contern"),
 	subMenu = byId("sub-menu");

function slideImg(){
	var main = byId("main");
	main.onmouseover = function(){
		//清除定时器
		if(timer) clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index >= len){
				index = 0;				
			}
			changeImg();
		},5000);
	}
	//自动触发
	main.onmouseout();
	//遍历  点击圆点切换图片
	for(var d=0;d<len;d++){
		dots[d].id = d;
		dots[d].onclick = function(){
			//改变index为span的ID值
			 index = this.id;
			 
			 //调用changeimg
			 changeImg();
		}
		
	}
}
//切换图片
function changeImg(){
	for(var i=0;i<len;i++){
		pics[i].style.display = 'none';
		dots[i].className = "";
	}
	pics[index].style.display = 'block';
	dots[index].className = "active";
}
slideImg();