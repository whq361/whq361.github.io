// renderChoose(2)
function renderChoose(index){
	console.log(index);
	var wrap = document.getElementsByClassName('l-wrap')[0];
	wrap.innerHTML = '';
	wrap.style.display = 'block';
	//设置js中像素的比例
	var lx = parseFloat(html.style.fontSize)/40;
	//生成数据
	
	var back = document.createElement('a');
	back.className = 'l-home fa fa-long-arrow-left';
	back.href = 'javascript:;';back
	var banner = document.createElement('div');
	banner.className = 'l-con';
	var box = document.createElement('div');
	box.className = 'box';
	var str = '';
	for (var i=0;i<dataBase.length;i++) {
		str += `<span class="box1">
					<img src="${dataBase[i].pic}"/>
					<div class="l-year">${dataBase[i].time}</div>
					<div class="l-singer">${dataBase[i].singer}</div>
					<div class="l-singername">${dataBase[i].name}</div>
					<div class="l-data">
						<span class="number">${(dataBase[i].id)}</span>
						<span>/</span>
						<span class="zohe">${dataBase.length}</span>
					</div>
				</span>`
	}
	wrap.appendChild(back);
	box.innerHTML = str;
	banner.appendChild(box);
	wrap.appendChild(banner);
	var next = document.createElement('a');
	next.className = 'next';
	next.innerHTML = '>';
	next.href = 'javascript:;'
	var prev = document.createElement('a'); 
	prev.className = 'prev';
	prev.innerHTML = '<';
	prev.href = 'javascript:;'
	wrap.appendChild(next);
	wrap.appendChild(prev);
	var play = document.createElement('div');
	play.className = 'play';
	play.innerHTML = `<div class="playradio">
							<img src="img/l-logo.png"/>
						</div>
						<div class="xg"></div>
						<div class="gx"></div>
				`;
	wrap.appendChild(play);
	//共有的歌曲列表数量
	var zohe = document.getElementsByClassName('zohe')[0];
	zohe.innerHTML = dataBase.length;

	//点击切换图片
	var next = document.getElementsByClassName('next')[0];
	var prev = document.getElementsByClassName('prev')[0]; 
	var imgs = box.getElementsByTagName('img');
	var spans = document.querySelectorAll('.box>span');
	var number = document.getElementsByClassName('number')[0];
	var play = document.getElementsByClassName('play')[0];
	var playradio = document.getElementsByClassName('playradio')[0];
	var lyear = document.getElementsByClassName('l-year');
	var lsinger = document.getElementsByClassName('l-singer')[0];
	var lsingername = document.getElementsByClassName('l-singername')[0];
	var page = index;
	var num = index ;
	var len = spans.length;
	var onOff = true;


	play.index = index;
	//歌曲切换的轮播效果
	sw();
	function sw(){
		//初始化
		box.style.left = -(num)*643*lx + 'px';
		//滑动切换
		var sx,nex;
		console.log(222)
		wrap.addEventListener('touchstart',function fn5(ev){
            sx = ev.touches[0].clientX;
            console.log(sx)
            wrap.addEventListener('touchmove',function fn(ev){
                nex = ev.touches[0].clientX;
                console.log(nex)
                if(nex < sx){
                    wrap.addEventListener('touchend',function fn3(){
                        wrap.removeEventListener('touchend',fn3);
                        wrap.removeEventListener('touchmove',fn);
                        fn1();
                    })
                }else{
                     wrap.addEventListener('touchend',function fn4(){
                        wrap.removeEventListener('touchend',fn4);
                        wrap.removeEventListener('touchmove',fn);
                       fn2();
                    })
                }
                wrap.removeEventListener('touchmove',fn5)
            })
        })
		//点击切换
		function fn1(){
			next.removeEventListener('touchend',fn1);
			play.index ++;
			if(play.style.display == 'block'){
				play.style.display = 'none';
				play.style.opacity = 0;
			}
			if(!onOff){
				return;
			}
			onOff = false;
			//page是当前切换的位置
			page++;
			num++;
			//page等于长度说明是最后一张，这个时候把第一张拉到最后一张的后边。
			if(page==len){
				// alert('到最后一张了')
				play.index = 0;
				spans[0].style.left = len*643*lx+'px';
				num = 1;
			}
			//page等于len+1说要切换到第二张了，那么就把page的值等于第二张，把ul和第一个li都还原到原来的位置。
			if(page==0){
				num = 1;
			}
			if(page==len+1){
				play.index = 1;
				page = 1;
				box.style.left = '';
				spans[0].style.left = '';
			}
			number.innerHTML = num;
			mTween(box,'left',-page*643*lx,300,'linear',function(){
				//运动结束元素复位，并且开关也复位。
				spans[len-1].style.left = '';
				play.style.display = 'block';
				play.style.opacity = 1;
				onOff = true;
				console.log(play.index)
			});
		}
		next.addEventListener('touchstart',function fn(){
			
			next.addEventListener('touchend',fn1)
		})

		function fn2(){
			prev.removeEventListener('touchend',fn2);
			play.index --;
			if(play.style.display == 'block'){
				play.style.display = 'none';
				play.style.opacity = 0;
			}
			if(!onOff){
				return;
			}
			onOff = false;
			//page是当前切换的位置
			page--;
			num--;
			console.log('num',num,page)
			//如果page等于-1这个时候显示倒数第一张，所以把倒数第一张定位到第一张的前边。
			if(page == 0){
				num = 1;
			}
			if(page==len-1){
				num=len;
				
			}
			if(page==-1){
				
				// alert('到第一张');
				play.index = len-1;
				spans[len-1].style.left = -len*643*lx+'px';
				num=len;
			}
			//如果page等于-2，应该显示倒数第二张，这个时候把ul拉到倒数第一张的位置，page写为倒数第二张的位置，把最后的li放到原来的位置。
			if(page==-2){
				page = len-2;
				box.style.left = -(len-1)*643*lx+'px';
				spans[len-1].style.left = '';
			}
			number.innerHTML = num;
			mTween(box,'left',-page*643*lx,300,'linear',function(){
				spans[0].style.left = '';
				play.style.display = 'block';
				play.style.opacity = 1;
				onOff = true;
				console.log(play.index)
			});
		}
		prev.addEventListener('touchstart',function fn(){
			prev.addEventListener('touchend',fn2)
		})
		
		
	}

	

	//点击出现加载进度条，年份旋转
	rotate();
	function rotate(){
		var xg = document.getElementsByClassName('xg')[0];
		var gx = document.getElementsByClassName('gx')[0];
		function fn(){
			play.removeEventListener('touchend',fn)
			playradio.style.display = 'none';
		//	loadImg(100);
			for (var i=0;i<lyear.length;i++) {
				lyear[i].style.transform = 'rotate(400deg)';
			}
			mTween(xg,'left',0*lx,1500,'linear',function(){
				
			});
			mTween(gx,'left',66*lx,1500,'linear',function(){
				
				//运动结束进入歌曲主页面
				wrap.style.display = 'none';
				document.getElementsByClassName('t-music-page')[0].style.display = 'block';
				renderMusic(dataBase[play.index]);
			});
		}
		play.addEventListener('touchstart',function fns(){
			console.log(play.index)
			play.removeEventListener('touchstart',fns);
			play.addEventListener('touchend',fn)
		})
	}
	//点击返回上一页效果
	var back = document.getElementsByClassName('l-home')[0];
	back.addEventListener('touchstart',function fn(){
		this.removeEventListener('touchstart',fn);
		back.addEventListener('touchend',function fn1(){
			this.removeEventListener('touchend',fn1);
			wrap.style.display = '';
			homePage();
			
		})
	})
}
function zero(n){
	return n<10?'0'+n:''+n;
}