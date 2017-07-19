
function mTween(obj,attr,target,duration,callBack){
    var begin = parseFloat(css(obj,attr));
    var count = target - begin;
    var startTime = +new Date();
    obj.timer = setInterval(function(){
        var t = +new Date() - startTime;
        if(t >= duration){
            t = duration
            clearInterval(obj.timer);

        }

        var value = t/duration*count+begin;
        obj.style[attr]=value+'px';
        if(t == duration){
            callBack&&callBack();
        }
    }, 30);
}

function css(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}