function fetchLeft() {
    var left = $('#content_left div').first();
    var scripts = left.find('script');
    if (scripts.length < 4) {
        return null;
    }
    return {fragment1: scripts[1].innerHTML, fragment2: scripts[2].innerHTML, fragment3: scripts[3].innerHTML};
}
function fetchRight() {
    var right = $('#content_right table table td').first();
    var scripts = right.find('script');
    if (scripts.length < 4) {
        return null;
    }
    return {fragment1: scripts[1].innerHTML, fragment2: scripts[2].innerHTML, fragment3: scripts[3].innerHTML};
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.cmd === "grab") {
        sendResponse({cmd: 'grab', left: fetchLeft(), right: fetchRight()});
    }
});