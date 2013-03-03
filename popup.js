
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
		link.appendChild(document.createTextNode(title));

		item.appendChild(link);
		item.appendChild(document.createTextNode(' ('));

		var qrLink = document.createElement('a');
		qrLink.setAttribute('href', 'http://chart.googleapis.com/chart?chs=200x200&cht=qr&chld=H|0&chl='+encodeURIComponent(a.url));
		qrLink.setAttribute('target', '_blank');
		qrLink.appendChild(document.createTextNode('QR'));

		item.appendChild(qrLink);
		item.appendChild(document.createTextNode(')'));

		list.appendChild(item);
	}

	var list = document.getElementById('other-list');

	for (var i = 0; i < addresses.other.length; i++) {
		var url = addresses.other[i];
		var item = document.createElement('li');

		var link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('target', '_blank');

		link.appendChild(document.createTextNode(url));
		item.appendChild(link);
		list.appendChild(item);
	}
}

window.onload = showAddresses;
