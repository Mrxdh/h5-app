var invite_code= getUrlParam('act_id')
var origin_request = document.location.origin
var activitiesUrl = 'https://devapi.kuban.io/api/v1/activities'
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjUwMjYsInZlcnNpb24iOjEsImV4cCI6MTUwNDg2MDE2MSwiaWF0IjoxNTA0NjAwOTYxLCJlbnRlcnByaXNlX2lkIjpudWxsfQ.D_ndfn7tUDhmL5YrQOZ2weZ9eipxEmzijLDUFEMGIh0'
var data_wangxuan

$(function () {
    var info = $('.info')
    submitAjax(activitiesUrl)
    function submitAjax(url, params){
    $.ajax({
        type: 'get',
        url: url + '/' +invite_code,
        data : params || {},
        ContentType: 'application/json',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                'Accept' , 'application/json'
            )
            xhr.setRequestHeader(
                'X-space-id' , '3'
            )
            xhr.setRequestHeader(
                'Authorization' , 'Bearer ' + token
            )
        },
        success: function(data){
            var str = '<div>' + '<h1>' + data.title + '</h1>' + '<div>' + data.details + '</div></div>'
            info.append(str)
        },
        error: function(xhr){

        }
    })
    }
    
})

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

connectWebViewJavascriptBridge(function(bridge) {
bridge.init(function(message, responseCallback) {
               
                var data = {
                    'json': 'JS返回任意数据!'
                };
                responseCallback(data);
            });
    bridge.registerHandler('getUserInfo', function(data, responseCallback) {
        data_wangxuan = data
        document.getElementById('info').innerHTML = data
        // 把处理好的结果返回给OC
        responseCallback({"userID":"DX001", "userName":"旋之华", "age":"18", "otherName":"旋之华"})
    });
})

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}