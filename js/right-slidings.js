//置顶按钮
$(function(){  
	var go_top = $('.go-top');  
	function site(){  
		var wh = $(window).height()*0.2;  
		var st = $(document).scrollTop();  
		if(st > wh)  
			go_top.fadeIn("slow");  
		else  
			go_top.fadeOut("slow");  
	}  
	$(window).scroll(function(){   
		site();  
	})  
	go_top.click(function(prem) {    
		prem.preventDefault();    
		//绑定返回顶部    
		var top = $(document).scrollTop();            
		var ini_h = 1;    
		timer = setInterval(function() {    
			if (top -  ini_h <= 0) {    
				$(window).scrollTop(0);    
				timer && clearInterval(timer);    
			} else {    
				top = top - ini_h;    
				$(window).scrollTop(top);  
			}    
			ini_h += 5;     //数字越大走越快    
		}, 15);    
	});  
})
//根据滑动距离显示右侧导航栏对应板块
$(document).ready(function(){
	$(document).scroll(function(){
		var live = $('#live');
		var special = $('#special');
		var movies = $('#movies');
		var tvPlay = $('#tvPlay');
		var st =$(this).scrollTop();
		if(st > 0 && st <450){
			live.removeClass("right-item-hover");  
			special.removeClass("right-item-hover");  
			movies.removeClass("right-item-hover"); 
			tvPlay.removeClass("right-item-hover");  
		}
		if(st > 450 && st <800){
			live.addClass("right-item-hover");
			special.removeClass("right-item-hover");  
			movies.removeClass("right-item-hover"); 
			tvPlay.removeClass("right-item-hover");  
		}
		if(st > 800 && st <1250){
			live.removeClass("right-item-hover");  
			movies.removeClass("right-item-hover"); 
			tvPlay.removeClass("right-item-hover");  
			special.addClass("right-item-hover");
		}
		if(st > 1250 && st <1700){
			live.removeClass("right-item-hover");  
			special.removeClass("right-item-hover"); 
			tvPlay.removeClass("right-item-hover");
			movies.addClass("right-item-hover");
		}
		if(st > 1700 && st <2150){
			live.removeClass("right-item-hover");  
			special.removeClass("right-item-hover"); 
			movies.removeClass("right-item-hover");
			tvPlay.addClass("right-item-hover");
		}
		if( st > 2150){
			tvPlay.removeClass("right-item-hover");
		}
	})
})
//通过点击右侧导航对应板块跳转到对应板块
$(function(){  
	var live = $('#live');
	var special = $('#special');
	var movies = $('#movies');
	var tvPlay = $('#tvPlay');
	live.click(function(prem) {
		 $(window).scrollTop(600);  
		 console.log(st);   
	})
	special.click(function(prem) {
		 $(window).scrollTop(950);  
		 console.log(st);   
	})
	movies.click(function(prem) {
		 $(window).scrollTop(1350);  
		 console.log(st);   
	})
	tvPlay.click(function(prem) {
		 $(window).scrollTop(1750);  
		 console.log(st);   
	})
})
//右侧导航跟随页面滚动
$(function(){
	var nav=$(".right-slidings-content"); //得到导航对象
	var win=$(window); //得到窗口对象
	var sc=$(document);//得到document文档对象。
	win.scroll(function(){
	if(sc.scrollTop()>=220){
		nav.addClass("right-fix");
	}else{
		nav.removeClass("right-fix");
	}
	});
});