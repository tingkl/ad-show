/**
 * Created by dingguoliang01 on 2014/10/9.
 */
$(function () {
    var logDom = $('#log');
    var ids = [];
    var domain = 'http://lego-dev.baidu.com:8999';//'http://localhost:8999';
    function fetchLog() {
        $.ajax({url: domain + '/adshow/logs?' + Math.random(), success: function (logs) {
            if (logs instanceof Array) {
                var log;
                while (log = logs.shift()) {
                    if (log.indexOf('http://bs.baidu.com/ad-show/tpl.html') > -1) {
                        logDom.append('<a href="' + log + '" target="_blank">' + log + '</a>');
                        var id;
                        while (id = ids.shift()) {
                            clearInterval(id);
                        }
                    }
                    else {
                        logDom.append('<samp>' + log + '</samp><br/>');
                    }
                    if (log.indexOf('stop') > -1) {
                        var id;
                        while (id = ids.shift()) {
                            clearInterval(id);
                        }
                    }
                }
            }
        }, error: function () {
            console.dir(arguments);
        }});
    }
    $('#compose').click(function () {
        logDom.show().html('');
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {cmd: "grab"}, function(response) {
                if (response.cmd == "grab") {
                    if (!response.left && !response.right) {
                        alert('该页面不可抓取!');
                        return;
                    }
                    var plugin = $('#plugin').val();
                    // FormData 对象
                    var form = new FormData();
                    if (response.left) {
                        form.append('hasLeft', true);
                        form.append('lFragment1', response.left.fragment1);
                        form.append('lFragment2', response.left.fragment2);
                        form.append('lFragment3', response.left.fragment3);
                    }
                    else {
                        form.append('hasLeft', false);
                    }
                    if (response.right) {
                        form.append('hasRight', true);
                        form.append('rFragment1', response.right.fragment1);
                        form.append('rFragment2', response.right.fragment2);
                        form.append('rFragment3', response.right.fragment3);
                    }
                    else {
                        form.append('hasRight', false);
                    }

                    form.append('plugin', plugin);
                    // XMLHttpRequest 对象
                    var xhr = new XMLHttpRequest();
                    xhr.open("post", domain + '/adshow/chrome', true);
                    xhr.onload = function (evt) {
                        ids.push(setInterval(fetchLog, 1000));
                    };
                    xhr.send(form);
                }
            });
        });
    });
});
