
var addresses;

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	addresses = request;
	if (addresses.count > 0) {
		var title = 'Bitcoin address found';
		if (addresses.count > 1) {
			title = addresses.count + ' Bitcoin addresses found';
		}

		chrome.pageAction.setTitle({ tabId: sender.tab.id, title: title });
		chrome.pageAction.setPopup({ tabId: sender.tab.id, popup: 'popup.html'});
		chrome.pageAction.show(sender.tab.id);
	} else {
		chrome.pageAction.hide(sender.tab.id);
	}
});
