var jsBridge

$(function () {
    var activities_list = $('.activities_list')
    var activities_my = $('.activities_my')
    var allActive = $(".all_active");
    var myActive = $(".my_active");


    allActive.on('click',function(){
        changeStyle('my')
    });
    myActive.on('click',function(){
        changeStyle('all')
    });

    function changeStyle(type){
        if(type == 'my'){
            activities_my.hide()
            activities_list.show()
            allActive.addClass('click_style')
            myActive.removeClass('click_style')
        }else{
            activities_list.hide()
            activities_my.show()
            myActive.addClass('click_style')
            allActive.removeClass('click_style')
        }
    }


});

function setupKBWebviewJSBridge(callback) {
    if (window.KBWebviewAndroidJSBridge) {
        callback(KBWebviewAndroidJSBridge)
    } else {
        document.addEventListener(
            'KBWebviewAndroidJSBridgeReady'
            , function() {
                callback(KBWebviewAndroidJSBridge)
            },
            false
        );
    }

    // for ios
    if (window.KBWebviewJSBridge) {
        return callback(KBWebviewJSBridge);
    }
    if (window.KBWVJSBCallBacks) {
        return window.KBWVJSBCallBacks.push(callback);
    }
    window.KBWVJSBCallBacks = [callback];
    var GCWVJSBIframe = document.createElement('iframe');
    GCWVJSBIframe.style.display = 'none';
    GCWVJSBIframe.src = 'gcwvjsbscheme://__GC_BRIDGE_LOADED__';
    document.documentElement.appendChild(GCWVJSBIframe);
    setTimeout(function() { document.documentElement.removeChild(GCWVJSBIframe)
    }, 0);
}

setupKBWebviewJSBridge(function(bridge) {
    bridge.init(function(message, responseCallback) {
        var data = {
            'Javascript Responds': '测试中文!'
        };
        responseCallback(data);
    });

    var uniqueId = 1
    function log(message, data) {
        var log = document.getElementById('log')
        var el = document.createElement('div')
        el.className = 'logLine'
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        if (log.children.length) { log.insertBefore(el, log.children[0]) }
        else { log.appendChild(el) }
    }

    bridge.registerHandler('getUserInfo', function(data, responseCallback) {
        var responseData = { 'Javascript Says':'Right back atcha!','name':'whe' }
        data_wangxuan = data
        document.getElementById('info').innerHTML = data
        responseCallback({"userID":"DX001", "userName":"旋之华", "age":"18", "otherName":"旋之华"})
    })

    document.body.appendChild(document.createElement('br'))
    jsBridge=bridge;
})

function toActivity(id) {
    jsBridge.callHandler(
        'activityDetail'
        , '/activity_info.html?act_id=' + id
    );
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}