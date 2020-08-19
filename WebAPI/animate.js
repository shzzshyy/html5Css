function animate(obj, target, callback) {
    //给不同的元素指定不同的定时器 点击一次创建一个 预防多次点击
    //先清除 之前的定时器 在创建
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //先快后慢就算值
        //要把step取整 要不然会有小数
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil((target - obj.offsetLeft) / 10) : Math.floor((target - obj.offsetLeft) / 10);

        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        } else {
            // 均速就固定值 
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}