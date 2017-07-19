//var musicIndex = 8//传入index
var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();


//renderMusic(dataBase[musicIndex]);
function renderMusic(obj){
    console.log(obj)
    var musicIndex = obj.id - 1;
    var musicPage = document.querySelector('.t-music-page');
    musicPage.style.display='block';
    // DOM结构生成
    musicPage.innerHTML = `
    <audio src="${obj.src}"></audio>
    <a href="javascript:;" class="t-back fa fa-long-arrow-left"></a>
        <div class="t-info">
            <h2 class="t-title">${obj.name}</h2>
            <h4 class="t-singer">${obj.singer}</h4>
            <span class="t-time">${obj.time}</span>
        </div>
        <div class="t-audio">
            <div class="t-cd">
                <div class="t-cd-mid"></div>
                <div class="t-dot"></div>
            </div>
            <div class="t-line">
                <div class="t-line-head"></div>
            </div>
        </div>


        <div class="t-btn-box">
            <a href="javascript:;" class="t-lrc">词</a>
            <a href="javascript:;" class="t-start fa fa-pause"></a>
        </div>
        <div class="t-lrc-mask">
            <ul>
                
            </ul>
        </div>
        `;
        var cdMid = document.querySelector('.t-cd-mid');
        cdMid.style['background-image'] = 'url('+obj.pic+')';
        //元素获取
        var audio = document.getElementsByTagName('audio')[0];
        var start = document.querySelector('.t-btn-box .t-start');
        var back = document.querySelector('.t-back');
        var lrcBtn = document.querySelector('.t-btn-box .t-lrc');
        var lrcMask = document.querySelector('.t-lrc-mask')

        var line = document.querySelector('.t-line')
        var lrcList = document.querySelector('.t-lrc-mask ul');
        var cd = document.querySelector('.t-cd');
        
        
        //获取MASK的高度，歌词界面
        lrcMask.style.display = 'block';
        var mainHeight = css(document.querySelector('.t-lrc-mask'),'height')
        lrcMask.style.display = '';

        var before;
        //初始化歌词
        var lrcArr = _lrchandle(obj.lrc);
        //歌词滚动距离,实际像素/rem比例，既每行高度
	    var listStep = 40/(750/16)*rem;
        var cdDeg = 0;
        




		_lrcInput(obj);


			
        // //初始化
        var drawVisual = null;
        var index = 0;
        var stat = 1;
    
        audio.play();
        _draw();
        //开始暂停
        start.addEventListener('touchstart',function(){
            start.addEventListener('touchend',function fn(){
                start.removeEventListener('touchend',fn)
                if(stat == 1){
                    console.log('s')
                    _pause();
                }else{
                    console.log('p')
                    _play();
                }
            })   
        })
        //回退
        back.addEventListener('touchstart',function fn(){
            back.addEventListener('touchend',function fn2(){
                _pause();
                musicPage.style.display = '';
                renderChoose(musicIndex);
            })
        })
         //切换
        var sx,nex;
        cd.addEventListener('touchstart',function(ev){
            sx = ev.touches[0].clientX;
            cd.addEventListener('touchmove',function fn(ev){
                nex = ev.touches[0].clientX;
                if(nex < sx){
                    cd.addEventListener('touchend',function fn2(){
                        cd.removeEventListener('touchend',fn2);
                        cd.removeEventListener('touchmove',fn);
                        _pause();
                        var sTimer1 = setTimeout(function(){
                            clearTimeout(sTimer1);
                            musicIndex = ((musicIndex+1)%dataBase.length);
                            renderMusic(dataBase[musicIndex])
                        },100)
                    })
                }else{
                     cd.addEventListener('touchend',function fn3(){
                         cd.removeEventListener('touchend',fn3);
                        cd.removeEventListener('touchmove',fn);
                        _pause();
                        var sTimer2 = setTimeout(function(){
                            clearTimeout(sTimer2);
                            musicIndex = ((musicIndex-1)%dataBase.length);
                            renderMusic(dataBase[musicIndex])
                        },100)
                    })
                }
                cd.removeEventListener('touchmove',fn)
            })
        })
        //歌词按钮
        function lMaskEnd(){
            lrcMask.removeEventListener('touchend',lMaskEnd);
            lrcList.removeEventListener('touchend',lrcEnd);
            lrcMask.style.display = '';
        }
        //点击BTN显示歌词界面
        lrcBtn.addEventListener('touchstart',function(){
            lrcBtn.addEventListener('touchend',function lMask(){
                lrcBtn.removeEventListener('touchend',lMask);
                lrcMask.style.display = 'block';
            })
        })
        //点击mask退出歌词界面
        lrcMask.addEventListener('touchstart',function(){
            lrcMask.addEventListener('touchend',lMaskEnd)
        })
        //歌词划动
        var y,disy,mark,n;
        function lrcMove(ev){
        	//快进audio必须先暂停，否者无法快进
            _pause();
            //手指滑动时位置
            disy = ev.changedTouches[0].clientY;
            //disy - y手指滑动距离
            mark = before + (disy - y);
            lrcList.style.transform = 'translateY('+(mark)+'px)';
            if(mark<=((mainHeight*0.5)-css(lrcList,'height')+ listStep))mark = ((mainHeight*0.5)-css(lrcList,'height') + listStep)
            n = Math.floor(((mainHeight*0.5 - mark)/listStep)>=0?((mainHeight*0.5 - mark)/listStep):0);
            for(var i = 0;i<lrcList.children.length;i++){
                lrcList.children[i].className = '';
            }
            lrcList.children[n].className = 'pre';
            lrcMask.removeEventListener('touchend',lMaskEnd)
            lrcList.addEventListener('touchend',lrcEnd)
        }
        function lrcEnd(ev){
            lrcList.removeEventListener('touchend',lrcEnd);
            lrcList.removeEventListener('touchmove',lrcMove)
            audio.currentTime = lrcArr[n].time;
            before = mark
            _play();
        }
        lrcList.addEventListener('touchstart',function(ev){
        	//手指触摸时屏幕位置
            y = ev.touches[0].clientY;
            lrcList.removeEventListener('touchend',lrcEnd);
            lrcList.addEventListener('touchmove',lrcMove)
            
        })
        //歌词生成
        function _lrcInput(obj){
            
            this.lrc = obj.lrc;
            var lrcArr = _lrchandle(this.lrc);
            console.log(lrcArr)
            //歌词输入
            for(var i = 0;i<lrcArr.length;i++){
                let li = document.createElement('li');
                li.innerHTML = lrcArr[i].lrc;
                lrcList.appendChild(li);
            }
        }
        //数据处理，剪切歌词，歌曲时间('s')
        function _lrchandle(_str){
			// 截取时间
            function timeS(str){
                var i = str.slice(0,9);
                return parseFloat(i.substring(0,2))*60 + parseFloat(i.substring(3,5)) + parseFloat(i.substring(6))/100;
            }
             // 截取歌词
            function wordS(str){
                var i = str.substring(10);
                return i;
            }
			//歌词分段
			var arr=_str.split("[")
			//删除分组后第一个，既0位的‘[’数组
			arr.splice(0,1)
			var lrcArr =[];
			for(var i = 0 ;i<arr.length;i++){
                lrcArr[i] = {}
                lrcArr[i].time = timeS(arr[i]);
                lrcArr[i].lrc = wordS(arr[i]);
           }
            return lrcArr;
        }
        
        //暂停
        function _pause(){
            stat = 0;
            audio.pause();
            //停止旋转动画
            cancelAnimationFrame(drawVisual);
            start.className = 't-start fa fa-play';
            //指针
            line.style.transform = 'rotate(0deg)';
        }
        //开始
        function _play(){
            if(stat == 0){
                audio.play();
                _draw();
                start.className = 't-start fa fa-pause';
            }
             stat = 1;
        }
        function _draw(){
        	//判断歌曲播放完毕，关闭动画。。
        	 if(audio.ended){
                lrcList.style.transform ='translateY('+ mainHeight*0.5 +'px)';
                before = mainHeight*0.5;
                _pause();
                var nTimer1 = setTimeout(function(){
                    clearTimeout(nTimer1);
                    musicIndex = ((musicIndex+1)%dataBase.length);
                    console.log(11)
//                  renderMusic(dataBase[musicIndex])
                },100)
                return;
            }
        	//歌词滚动
			for(var i = 0;i<lrcArr.length;i++){
                if(audio.currentTime > lrcArr[i].time){
                	//从中间部位显示mainHeight*0.5，逐渐向上移动i*listStep
                    lrcList.style.transform ='translateY('+ (mainHeight*0.5 - (i*listStep)) +'px)';
                    //焦点位置
                    before = mainHeight*0.5 - (i*listStep);
                    for(var j = 0;j<lrcList.children.length;j++){
                         lrcList.children[j].className = '';
                    }
                    lrcList.children[i].className = 'this';
                }
            }
             //操作杆旋
            line.style.transform = 'rotate('+ (((audio.currentTime/audio.duration)*40) + 20) +'deg)'
            //cd旋转
            cdDeg = (cdDeg+0.5)%360
            cd.style.transform = 'rotate('+ cdDeg +'deg)'
            
            //动画设置，cd,指针自动旋转
            drawVisual = requestAnimationFrame(_draw);


        }
}

function css(obj,attr){
    return parseFloat(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr])
}

