$(function () {
    var info = $('.info')
    var tab_title_details = $('.tab_title_details')
    var tab_title_comment = $('.tab_title_comment')
    var tab_detail = $('.tab_detail');
    var tab_comment = $('.tab_comment'),
        heart = $('.heart');

    tab_title_details.on('click',function(){
        tab_comment.hide();
        tab_detail.show();
        tab_title_details.addClass('tab_style')
        tab_title_comment.removeClass('tab_style')
    });
    tab_title_comment.on('click',function(){
        tab_detail.hide();
        tab_comment.show();
        tab_title_comment.addClass('tab_style')
        tab_title_details.removeClass('tab_style')
    })
    heart.on('click',function(){
        if(heart.attr('src') == 'https://media-ssl.kuban.io/static/h5/images/hd/like_pressed@2x.png'){
            heart.attr('src','https://media-ssl.kuban.io/static/h5/images/hd/like_normal@2x.png')
        }else{
            heart.attr('src','https://media-ssl.kuban.io/static/h5/images/hd/like_pressed@2x.png')
        }

    })

})

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
        responseCallback({"userID":"DX001", "userName":"旋之华", "age":"18", "otherName":"旋之华"})
    })
    jsBridge=bridge;
})

function toOC() {
    jsBridge.callHandler(
        'activitySignUp'
        , {  url: act_id: $('.activities_detail').attr('data-ticket_id'),  ticket_id: $('.activities_detail').attr('data-act_id') }
    );
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}