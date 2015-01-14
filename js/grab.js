function fetchLeft() {
    var left;
    if (window.location.hostname === 'ecma.bdimg.com') {
        left = $('#content_left').first();
    }
    else {
        left = $('#content_left div').first();
    }
    var scripts = left.find('script');
    if (scripts.length < 4) {
        return null;
    }
    return {fragment1: scripts[1].innerHTML, fragment2: scripts[2].innerHTML, fragment3: scripts[3].innerHTML};
}
function fetchRight() {
    var right;
    if (window.location.hostname === 'ecma.bdimg.com') {
        right = $('#content_right table td').first();
    }
    else {
        right = $('#content_right table table td').first();
    }
    var scripts = right.find('script');
    if (scripts.length < 4) {
        return null;
    }
    return {fragment1: scripts[1].innerHTML, fragment2: scripts[2].innerHTML, fragment3: scripts[3].innerHTML};
}
chrome.runtime.sendMessage({cmd: "show"}, function(response) {  console.log(response); });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.cmd === "grab") {
        sendResponse({cmd: 'grab', left: fetchLeft(), right: fetchRight()});
    }
});
/*
(function() {
    //Chrome插件不使用和页面相同的全局对象，所以无法直接访问页面本身的全局变量。
    //创建script元素，将要javascript代码嵌进用户页面,被嵌入页面的js代码可以访问页面本身的全局变量
    var hackJs = $('<script>');
    hackJs.attr('src', chrome.extension.getURL('js/hack.js'));
    $('head').append(hackJs);
    // 和页面的交互
    window.addEventListener('message', function (e) {
        if (e.data && e.data.type) {
            if (e.data.type === 'toContent') {
                console.dir(e.data.config);
                chrome.runtime.sendMessage({cmd: "hack", config: e.data.config}, function(response) {  console.log(response); });
            }
        }
    });
    setTimeout(function() {
        window.postMessage({type: 'toHack'}, '*');
    }, 2000);
})();*/
