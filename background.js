
var addresses = {};
var current_tab = null;

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	addresses[sender.tab.id] = request;
	if (request.count > 0) {
		var title = 'Bitcoin address found';
		if (request.count > 1) {
			title = request.count + ' Bitcoin addresses found';
		}

		chrome.pageAction.setTitle({ tabId: sender.tab.id, title: title });
		chrome.pageAction.setPopup({ tabId: sender.tab.id, popup: 'popup.html'});
		chrome.pageAction.show(sender.tab.id);
	} else {
		chrome.pageAction.hide(sender.tab.id);
	}
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
	current_tab = activeInfo.tabId;
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	delete addresses[tabId];
});
