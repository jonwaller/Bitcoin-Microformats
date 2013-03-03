
var _addresses = null;

chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
		_addresses = request.addresses;
		if (_addresses.count > 0) {
			var title = 'Bitcoin address found';
			if (_addresses.count > 1) {
				title = _addresses.count + ' Bitcoin addresses found';
			}

			chrome.pageAction.setTitle({ tabId: sender.tab.id, title: title });
			chrome.pageAction.show(sender.tab.id);
		}
		sendResponse();
	}
);

chrome.pageAction.onClicked.addListener(
	function (tab) {
		if (_addresses !== null && _addresses.count > 0) {
			for (var i = 0; i < _addresses.bitcoin.length; i++) {
				chrome.tabs.create({ url: _addresses.bitcoin[i] });
			}
			for (var i = 0; i < _addresses.other.length; i++) {
				chrome.tabs.create({ url: _addresses.other[i] });
			}
		}
	}
);
