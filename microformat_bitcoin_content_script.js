if (window == top) {
	var bitcoins = findBitcoins();
	if (bitcoins!=null && bitcoins.length>0){
		chrome.extension.sendRequest(
			{bitcoins: bitcoins} //Hey, background.html, I'm sending you the bitcoins.
		);
	}
}

// Search the HEAD for <link rel="bitcoin" href="xxxx" />, returns array of urls.
// Return null if none is found.
function findBitcoins(){
	var result = document.evaluate(
		'//link[@rel="bitcoin"]',
		document, null, 0, null);
			
	var bitcoins = [];
	var item;
	while (item = result.iterateNext()){
		bitcoins.push(item.href);
	}
	return (bitcoins.length>0)?bitcoins:null;
}
