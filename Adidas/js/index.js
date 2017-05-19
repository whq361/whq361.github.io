(function(){
	loadImg();
})();
/*-------图片的预加载-------*/
function loadImg(){
	var data = [];
	var num = 0;
	for(var attr in dataImg){
		data = data.concat(dataImg[attr]);
	}
	for(var i=0;i<data.length;i++){
		var img = new Image();
		img.src = data[i];
		img.onload = function(){
			num++;
			/* 判断是否全部加载完 */
			if( num == data.length ){
				anmt1();
			}
		}
	}
}
/*--------loading动画--------*/
function anmt1(){
	var main = document.getElementById('main');
	var threeD = document.getElementById('threeD');
	var load = document.getElementById('load');
	var loading = document.getElementById('loading');
	var circle = document.getElementById('circle');
	var shoes = document.getElementById('shoes');
	var mask = document.getElementById('mask');
	/* 生成进入按钮  */
	var play = document.createElement('div');
	play.id = 'play';
	play.style.opacity = 0;
	load.children[0].appendChild(play);
	/* load标题  */
	var h3 = document.createElement('h3');
	h3.innerHTML = '<strong>CRAZY</strong>LIGHT <strong>BOOST</strong>2.5';
	css(h3,'translateZ',-2000);
	load.appendChild(h3);
	/* 生成抖动的鞋  */
	var shoe1 = document.createElement('div');
	var shoe2 = document.createElement('div');
	shoe1.id = 'shoe1';
	shoe2.id = 'shoe2';
	css(shoe1,'translateZ',-2000);
	css(shoe2,'translateZ',-2000);
	shoes.appendChild(shoe1);
	shoes.appendChild(shoe2);
	
	MTween({
		el: loading,
		target: {opacity: 0},
		time: 1000,
		type: 'linear'
	});
	MTween({
		el: play,
		target: {opacity: 100},
		time: 1000,
		type: 'linear'
	});
	MTween({
		el: circle,
		target: {
				width: 160,
				height: 160,
				marginTop: -80,
				marginLeft: -80
		},
		time: 1000,
		type: 'linear'
	});
	MTween({
		el: h3,
		target: {translateZ: 0},
		time: 1000,
		type: 'linear'
	});
	MTween({
		el: shoe1,
		target: {translateZ: 0,rotateZ: 360},
		time: 1000,
		type: 'linear'
	});
	MTween({
		el: shoe2,
		target: {translateZ: 0,rotateZ: -360},
		time: 1000,
		type: 'linear',
		callBack: function(){
			mask.className = 'masklight';
		}
	});
	/* 按钮被点击  */
	circle.addEventListener('touchstart',function(){
		/* 插入背景音乐 */
		var bgm = document.getElementById('bgm');
		var audio = document.createElement('audio');
		audio.src = 'media/bgm.mp3';
		audio.autoplay = 'autoplay';
		bgm.appendChild(audio);
		/* load消失 */
		document.body.removeChild(mask);
		MTween({
			el: load.children[0],
			target: {translateZ: 1000},
			time: 500,
			type: 'linear'
		});
		MTween({
			el: h3,
			target: {translateZ: 1000},
			time: 500,
			type: 'linear',
			callBack: function(){
				threeD.removeChild(load);
			}
		});
		anmt2();
	});
}
/*--------球场动画--------*/
function anmt2(){
	var show = document.getElementById('show');
	var box = document.getElementById('box');
	var playing = document.getElementById('playing');
	var circles = document.getElementsByClassName('circle');
	
	show.style.display = 'block';
	box.style.display = 'block';
	
	MTween({
		el: circles[0],
		target: {translateZ: -2000,rotateZ: 360,opacity :0},
		time: 500,
		type: 'linear',
		callBack: function(){
			circles[0].style.display = 'none';
			MTween({
				el: circles[1],
				target: {translateZ: 1000,rotateZ: 360},
				time: 1000,
				type: 'linear'
			});
			MTween({
				el: circles[2],
				target: {translateZ: 500,rotateZ: 720},
				time: 2000,
				type: 'linear',
				callBack: function(){
					show.removeChild(circles[2]);
					show.removeChild(circles[1]);
					show.removeChild(circles[0]);
				}
			});
			css(box,'rotateZ',0);
			css(box,'translateY',100);
			css(box,'translateZ',-100);
			setTimeout(function(){
				box.style.transition = '3s ease-out';
				box.style.webkitTransition = '3s ease-out';
				box.style.transformOrigin = 'center';
				box.style.webkitTransformOrigin = 'center';
				css(box,'translateZ',1000);
				css(box,'translateY',-100);
				setTimeout(function(){
					box.removeChild(playing);
					anmt3();
				},2000)
			},1000)
		}
	});
}
/*--------鞋子动画--------*/
function anmt3(){
	var threeD = document.getElementById('threeD');
	var lotshoes_view = document.getElementById('lotshoes_view');
	var lotshoes = document.getElementById('lotshoes');
	var pair = lotshoes.getElementsByClassName('pair');
	
	lotshoes_view.style.display = 'block';
	var deg = -45;
	var z = 500;
	for(var i=0;i<15;i++){
		deg += 20;
		z -= 500;
		pair[i].style.transform = 'translateZ(' + z + 'px) rotateZ('+ deg +'deg)';
	}
	MTween({
		el: lotshoes_view,
		target: {translateZ: 20000,rotateZ:360},
		time: 2000,
		type: 'easeIn',
		callBack: function(){
			threeD.removeChild(lotshoes_view);
			anmt4();
		}
	});
}
/*--------决不跟随动画--------*/
function anmt4(){
	var threeD = document.getElementById('threeD');
	var never_view = document.getElementById('never_view');
	var never = document.getElementById('never');
	var top = never.getElementsByClassName('top')[0];
	var bottom = never.getElementsByClassName('bottom')[0];
	var text = never.getElementsByClassName('middle')[0];
	css(never_view,'translateZ',-1000);
	css(never_view,'translateY',300);
	never_view.style.display = 'block';
	var num = 1;
	
	var timer = setInterval(function(){
		num++;
		num = num>12?1:num;
		text.className += ' rotateY';
		top.style.backgroundImage = 'url(img/round/'+num+'.png)';
		bottom.style.backgroundImage = 'url(img/round/'+num+'.png)';
	},80);
	
	MTween({
		el: never_view,
		target: {translateZ: -500},
		time: 500,
		type: 'easeOut',
		callBack: function(){
			MTween({
				el: never_view,
				target: {translateZ: 0},
				time: 1000,
				type: 'linear',
				callBack: function(){
					MTween({
						el: never_view,
						target: {translateZ: 1000},
						time: 500,
						type: 'easeIn',
						callBack: function(){
							clearInterval(timer);
							threeD.removeChild(never_view);
							anmt5();
						}
					});
				}
			});
		}
	})
}
/*--------mid动画--------*/
function anmt5(){
	var threeD = document.getElementById('threeD');
	var mid_view = document.getElementById('mid_view');
	var mid = document.getElementById('mid');
	var top = mid.getElementsByClassName('top')[0];
	var bottom = mid.getElementsByClassName('bottom')[0];
	var text = mid.getElementsByClassName('middle')[0];
	css(mid_view,'translateZ',-1000);
	css(mid_view,'translateY',300);
	mid_view.style.display = 'block';
	var num = 1;
	
	var timer = setInterval(function(){
		num++;
		num = num>12?1:num;
		text.className += ' rotateY';
		top.style.backgroundImage = 'url(img/round2/'+num+'.png)';
		bottom.style.backgroundImage = 'url(img/round2/'+num+'.png)';
	},80);
	
	MTween({
		el: mid_view,
		target: {translateZ: -500},
		time: 500,
		type: 'easeOut',
		callBack: function(){
			MTween({
				el: mid_view,
				target: {translateZ: 0},
				time: 1000,
				type: 'linear',
				callBack: function(){
					MTween({
						el: mid_view,
						target: {translateZ: 1000},
						time: 500,
						type: 'easeIn',
						callBack: function(){
							clearInterval(timer);
							threeD.removeChild(mid_view);
							anmt6();
						}
					});
				}
			});
		}
	})
}
/*--------adidas动画--------*/
function anmt6(){
	var threeD = document.getElementById('threeD');
	var adidas_view = document.getElementById('adidas_view');
	var adidas = document.getElementById('adidas');
	var top = adidas.getElementsByClassName('top')[0];
	var bottom = adidas.getElementsByClassName('bottom')[0];
	var text = adidas.getElementsByClassName('middle')[0];
	css(adidas_view,'translateZ',-1000);
	css(adidas_view,'translateY',300);
	adidas_view.style.display = 'block';
	var num = 1;
	
	var timer = setInterval(function(){
		num++;
		num = num>12?1:num;
		text.className += ' rotateY';
		top.style.backgroundImage = 'url(img/round3/'+num+'.png)';
		bottom.style.backgroundImage = 'url(img/round3/'+num+'.png)';
	},80);
	
	MTween({
		el: adidas_view,
		target: {translateZ: -500},
		time: 500,
		type: 'easeOut',
		callBack: function(){
			MTween({
				el: adidas_view,
				target: {translateZ: 0},
				time: 1000,
				type: 'linear',
				callBack: function(){
					MTween({
						el: adidas_view,
						target: {translateZ: 1000},
						time: 500,
						type: 'easeIn',
						callBack: function(){
							clearInterval(timer);
							threeD.removeChild(adidas_view);
							anmt7();
						}
					});
				}
			});
		}
	})
}
/*--------end动画--------*/
function anmt7(){
	var end_view = document.getElementById('end_view');
	var end_shoe = document.getElementsByClassName('end_shoe')[0];
	var bg = document.getElementById('bg');
	css(end_view,'translateZ',-10000);
	end_view.style.display = 'block';
	bg.style.backgroundImage = 'none';
	var num = 3;
	var n = 0;
	var onOff = true;
	
	var timer = setInterval(function(){
		num++;
		num = num>12?1:num;
		end_shoe.style.backgroundImage = 'url(img/round3/'+num+'.png)';
		if( num == 3 ){
			if(n==2){
				clearInterval(timer);
			}
			n++;
		}
	},80);
	MTween({
		el: end_view,
		target: {translateZ: -100},
		time: 1000,
		type: 'easeIn'
	})
}
