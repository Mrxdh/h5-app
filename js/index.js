var invite_code= getUrlParam('invite_code')
var origin_request = document.location.origin
var activitiesUrl = 'https://devapi.kuban.io/api/v1/activities'
var myActivityUrl = 'https://devapi.kuban.io/api/v1/activities/my_activities'
var token = getUrlParam('token')
var space_id = getUrlParam('space_id')
//var space_id = 3
// var tokens =    ['eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjUwMjYsInZlcnNpb24iOjEsImV4cCI6MTUwNDg2MDE2MSwiaWF0IjoxNTA0NjAwOTYxLCJlbnRlcnByaXNlX2lkIjpudWxsfQ.D_ndfn7tUDhmL5YrQOZ2weZ9eipxEmzijLDUFEMGIh0',
//         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc5NjYsInZlcnNpb24iOjEsImV4cCI6MTUwNzY5NDcxNywiaWF0IjoxNTA1MTAyNzE3LCJlbnRlcnByaXNlX2lkIjpudWxsfQ.p5TAd9lv6j2xCT-CTUkUpGatk3IIK1nr5-eY82gjOw4']
var jsBridge

$(function () {
    var activities_list = $('.activities_list')
    var activities_my = $('.activities_my')
    var allActive = $(".all_active");
    var myActive = $(".my_active");

    submitAjax(activitiesUrl, {
        per_page : 100
    }, 'list')

    submitAjax(myActivityUrl, {
        per_page : 100
    }, 'my')

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

    function submitAjax(url, params, type){
        //var token = type=='list'? tokens[0]:tokens[1];
        $.ajax({
            type: 'get',
            url: url,
            data : params || {},
            ContentType: 'application/json',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    'Accept' , 'application/json'
                )
                xhr.setRequestHeader(
                    'X-space-id' , space_id
                )
                xhr.setRequestHeader(
                    'Authorization' , 'Bearer ' + token
                )
            },
            success: function(data){
                getData(data, type)
            },
            error: function(xhr){
            }
        })
    }
    function getData(data, type) {
        var activitiesListTemplate = Handlebars.compile($("#activities_list").html())
        if(type == 'list'){
            activities_list.html(activitiesListTemplate(data))
        }else{
            for(var i in data){
                data[i].title = data[i].activity.title;
                data[i].cover = data[i].activity.cover;
                data[i].min_price = data[i].total_amount;
                data[i].start_at = data[i].activity.start_at;
                data[i].end_at = data[i].activity.end_at;
                data[i].location = {};
                data[i].location.name = data[i].activity.location_name;
            }
            activities_my.html(activitiesListTemplate(data))
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
        'jumpDetail'
        , '/activity_info.html?act_id=' + id
    );
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}