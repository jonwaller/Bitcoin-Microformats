var _bitcoin=null;

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		_bitcoins=request.bitcoins;
		var numBitcoins = request.bitcoins.length;
		if (numBitcoins>0){
			var title = "Bitcoin address found on this page.";
			if (numBitcoins>1){
				title = numBitcoins+ " Bitcoin addresses found on this page.";
			}
			var tabId=sender.tab.id;
			chrome.pageAction.setTitle({tabId:tabId, title:title});
			chrome.pageAction.show(tabId);
		}
		sendResponse();
	}
);

chrome.pageAction.onClicked.addListener(
	function(tab) {
		if (_bitcoins!=null && _bitcoins.length>0){
			for(var i=0;i<_bitcoins.length;i++){
				chrome.tabs.create({url:_bitcoins[i]});
			}
		}
	}
);
