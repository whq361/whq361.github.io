var timer = setTimeout(function(){
	document.querySelector('.zbody').style.display = 'none';
	homePage()
},5000)
function homePage(){
	window.scrollTo(0,0)
	//获取最大的父级
	var x_box = document.getElementById('box');
	x_box.style.display = 'block';
	x_box.style.transform = 'translateX(0)';
	//li里面的需要运动的元素
	//位移
	var x_disc_x = document.getElementsByClassName('x_disc_x');
	//碟片
	var x_disc_xx = document.getElementsByClassName('x_disc_xx');
	//图片
	var imgs = document.getElementsByClassName('imgs');
	//时间年代
	var x_age = document.getElementsByClassName('x_age');
	//歌手
	var x_singer = document.getElementsByClassName('x_singer');
	//歌名
	var x_name = document.getElementsByClassName('x_name');
	//按下链接的元素
	var x_a = document.getElementsByClassName('x_a');
	//背景遮罩
	var mask = document.getElementById('mask');

	//箭头穿过的动画
	var x_left = document.getElementById('x_left');
	var x_span = document.getElementById('x_span');
	var x_right = document.getElementById('x_right');

	var iconBg = 'img/dp.png';
	//因为默认像素是40，由于在爱疯6,7里面的可视区不一样，所以得出一个像素比
	//适配所有的机型
	var xxyy = parseFloat(html.style.fontSize)/40;
	var timer = null;
	var timerr = null;
	//调用运动函数
	mTween(x_left,'left',0,300,'easeInStrong',function(){
	});
	revolve();
	function revolve(){
		timer = setTimeout(function(){
			x_span.style.transform = 'rotate(720deg)';
			//x_right.style.color = 'red';
		},300);
		timerr = setTimeout(function(){
			x_right.style.color = 'red';
		},250);
	};
	//添加到ul里面
	var x_ul = document.getElementById('x_ul');
	x_ul.innerHTML = '';
		//根据数据并渲染
		dataBase.forEach(function(ele){
			//创建内容
			var list = document.createElement('li');
			list.className = 'x_list';
			var x_a = document.createElement('a');
			x_a.className = 'x_a';
			var disc = document.createElement('div');
			disc.className = 'x_disc';
			var disc_x = document.createElement('div');
			disc_x.className = 'x_disc_x';
			var disc_xx = document.createElement('div');
			disc_xx.style.backgroundImage = 'url('+iconBg+')';
			disc_xx.className = 'x_disc_xx';
			var img = document.createElement('img');
			img.className = 'imgs';
			img.src = ele.pic;
			var span = document.createElement('span');
			span.innerHTML = ele.time;
			span.className = 'x_age';
			var h2 = document.createElement('h2');
			h2.className = 'x_singer';
			h2.innerHTML = ele.singer;
			var h3 = document.createElement('h3');
			h3.className = 'x_name';
			h3.innerHTML = ele.name;
			
			//插入进去
			disc_x.appendChild(disc_xx)
			disc.appendChild(disc_x);
			disc.appendChild(img);
			x_a.appendChild(disc);
			x_a.appendChild(span);
			x_a.appendChild(h2);
			x_a.appendChild(h3);
			list.appendChild(x_a);
			x_ul.appendChild(list);
		});

	//没有任何操作的时候，flag是false,
	var flag = false;
	//声明y默认为0，用记录向上移动的距离
	var y = 0;
	//滚动的距离，根据滚动的距离判断是什么时候运动
	x_box.onscroll = function() {
		y = x_box.scrollTop;
		
		//默认的时候
		first(x_singer[0],x_name[0],x_disc_x[0],x_age[0],x_disc_xx[0],imgs[0]);
		second(x_singer[1],x_name[1],x_disc_x[1],x_age[1],x_disc_xx[1],imgs[1]);
		if(y>=420*xxyy){
			first(x_singer[2],x_name[2],x_disc_x[2],x_age[2],x_disc_xx[2],imgs[2]);
		}
		if(y>=820*xxyy){
			second(x_singer[3],x_name[3],x_disc_x[3],x_age[3],x_disc_xx[3],imgs[3]);
		}
		if(y>=1220*xxyy){
			first(x_singer[4],x_name[4],x_disc_x[4],x_age[4],x_disc_xx[4],imgs[4]);
		}
		if(y>=1620*xxyy){
			second(x_singer[5],x_name[5],x_disc_x[5],x_age[5],x_disc_xx[5],imgs[5]);
		}
		if(y>=2020*xxyy){
			first(x_singer[6],x_name[6],x_disc_x[6],x_age[6],x_disc_xx[6],imgs[6]);
		}
		if(y>=2420*xxyy){
			second(x_singer[7],x_name[7],x_disc_x[7],x_age[7],x_disc_xx[7],imgs[7]);
		}
		if(y>=2820*xxyy){
			first(x_singer[8],x_name[8],x_disc_x[8],x_age[8],x_disc_xx[8],imgs[8]);
		}
		if(y>=3220*xxyy){
			second(x_singer[9],x_name[9],x_disc_x[9],x_age[9],x_disc_xx[9],imgs[9]);
		}
		if(y>=3620*xxyy){
			first(x_singer[10],x_name[10],x_disc_x[10],x_age[10],x_disc_xx[10],imgs[10]);
		}
		if(y>=4020*xxyy){
			second(x_singer[11],x_name[11],x_disc_x[11],x_age[11],x_disc_xx[11],imgs[11]);
		}
	};
	//hy:按下时距离
	//hhy：移动时候的距离
	//dis:距离差
	var hy,hhy,dis;
	for(var i=0;i<x_a.length;i++){
		x_a[i].index = i;
		x_a[i].addEventListener('touchstart',function(){
			//hy= ev.touches[0].clientY;
			this.addEventListener('touchmove',fn);	
			this.addEventListener('touchend',fn1);
			
		})
	}
			
	//函数封装，根据li出现的距离，显示动画
	///aaa:x_singer,bbb:x_name,ccc:x_disc_x,ddd:x_age,fff:imgs;
	////左边的
	function first(aaa,bbb,ccc,ddd,eee,fff){
		aaa.style.transform = 'rotate(360deg)'; 
		bbb.style.transform = 'rotate(0deg)'; 
		ccc.style.transform = 'translateX('+60*xxyy+'px)';
		ddd.style.transform = 'translate('+200*xxyy+'px,-'+20*xxyy+'px)';
		eee.style.transform = 'rotate(-3600deg)';
		fff.style.transform = 'rotate(360deg)';
	}
	///aaa:x_singer,bbb:x_name,ccc:x_disc_x,ddd:x_age,fff:imgs;
	/////右边的
	function second(aaa,bbb,ccc,ddd,eee,fff){
		aaa.style.transform = 'rotate(360deg)'; 
		bbb.style.transform = 'rotate(0deg)';
		ccc.style.transform = 'translateX('+60*xxyy+'px)';
		ddd.style.transform = 'translate('+200*xxyy+'px,-'+20*xxyy+'px)';
		eee.style.transform = 'rotate(3600deg)';
		fff.style.transform = 'rotate(-360deg)';
	}
	///////////因为移动时间是频繁触发的，每次抬起的时候就要清除removeEventListener删除事件
	function fn(){
		this.removeEventListener('touchend',fn1);
	}
	////判断移动事件是否执行
	function fn1(ev){
		console.log('索引'+this.index+1);
		var id = this.index;
		this.removeEventListener('touchend',fn1);
		this.removeEventListener('touchmove',fn);
		x_box.style.transform = 'translateX('+ -800*xxyy +'px)';
		setTimeout(function() {
			x_box.style.display = '';
			renderChoose(id)
		}, 1000);
		
	}

}