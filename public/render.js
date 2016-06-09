/**
 * Created by jorten on 16/6/8.
 */
var page = 1, lock = false, cols, arr = [], temp, left = [], height, index, init, display = $("#display")[0];
$.get('/request?page=' + page, function(res) {
    var div = document.createElement("div");
    res.map(function(data) {
        div.innerHTML += data;
    })
    display.appendChild(div)
    calc();
});
$("body").on('mousewheel', function(event) {
    //  jQuery窗口宽度用$(window).height()
    //  jQuery中文档高度为$(document).height()
    if(document.body.scrollTop + $(window).height() + 1000 >= $(document).height()) {
        if(!lock) {
            lock = true;
            page++;
            $.get('/request?page=' + page, function(res) {
                var div = document.createElement("div");
                res.map(function(data) {
                    div.innerHTML += data;
                })
                display.appendChild(div)
                lock = false;
                calc();
            });
        }
    }
})

$(window).on('resize', function(event) {
    calc();
})

function calc() {
    cols = Math.floor($(window).width() / $("a")[0].offsetWidth);
    resize($("#display"), cols);
    arr = [];
    init = display.offsetLeft;
    left = [init];
    temp = $("a");
    //     获取前n张图片的Left值 并确定arr数组的初始值
    for(var i = 0; i < cols; i++) {
        arr.push(temp[i].offsetHeight);
        if(i > 0) {
            init = init + temp[i - 1].offsetWidth;
            left.push(init);
        }
    }
    for(var i = 0; i < cols; i++) {
        $(temp[i]).css({
            left: left[i] + "px",
            position: 'absolute',
            top: "10px"
        })
    }
    for(var i = cols, j = temp.length; i < j; i++) {
        height = Math.min.apply(null, arr);
        index = findIndex(height);
        $(temp[i]).css({
            position: 'absolute',
            left: left[index] + "px",
            top: arr[index] + "px"
        })
        arr[index] += temp[i].offsetHeight;
    }
}

function findIndex(height) {
    for(var i = 0, j = arr.length; i < j; i++) {
        if(arr[i] === height) {
            return i;
        }
    }
}

function resize(ele, n) {
    ele.css("width", (n * $("a")[0].offsetWidth) + "px");
}