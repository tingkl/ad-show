/*
var lastTabId = 0;
chrome.tabs.onSelectionChanged.addListener(function(tabId) {
    lastTabId = tabId;
    chrome.pageAction.show(lastTabId);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
    chrome.pageAction.show(lastTabId);
});
*/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.cmd === 'show') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
    sendResponse("ok");
});