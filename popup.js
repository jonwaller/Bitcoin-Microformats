
function showAddresses() {
	var addresses = chrome.extension.getBackgroundPage().addresses;
	if (!addresses) return;

	var list = document.getElementById('bitcoin-list');

	for (var i = 0; i < addresses.bitcoin.length; i++) {
		var a = addresses.bitcoin[i];
		var title = a.label || a.address;
		var item = document.createElement('li');

		var link = document.createElement('a');
		link.setAttribute('href', a.url);
		link.setAttribute('target', '_blank');

		var content = document.createTextNode(title);
		link.appendChild(content);
		item.appendChild(link);
		list.appendChild(item);
	}

	var list = document.getElementById('other-list');

	for (var i = 0; i < addresses.other.length; i++) {
		var url = addresses.other[i];
		var item = document.createElement('li');

		var link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');

		var content = document.createTextNode(url);
		link.appendChild(content);
		item.appendChild(link);
		list.appendChild(item);
	}
}

window.onload = showAddresses;
