var invite_code= getUrlParam('act_id')
var origin_request = document.location.origin
var activitiesUrl = 'https://devapi.kuban.io/api/v1/activities/'
var commentUrl = 'https://devapi.kuban.io/api/v1/activities/'+invite_code+'/comments'
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjUwMjYsInZlcnNpb24iOjEsImV4cCI6MTUwNDg2MDE2MSwiaWF0IjoxNTA0NjAwOTYxLCJlbnRlcnByaXNlX2lkIjpudWxsfQ.D_ndfn7tUDhmL5YrQOZ2weZ9eipxEmzijLDUFEMGIh0'
//var token = getUrlParam('token')
//var space_id = getUrlParam('space_id')
var infoData = null

$(function () {
    var info = $('.info'),
        activities_detail = $('.activities_detail'),
        activities_comments = $('.activities_comments')
    var tab_title_details = $('.tab_title_details')
    var tab_title_comment = $('.tab_title_comment')
    var tab_detail = $('.tab_detail');
    var tab_comment = $('.tab_comment'),
        description = $('.description');

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
        'signUp'
        , { act_id: infoData.id,  ticket_id: infoData.activity_tickets[0].id }
    );
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}