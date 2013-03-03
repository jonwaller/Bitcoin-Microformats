
if (window == top) {
	var addresses = findBitcoinAddresses();
	chrome.extension.sendMessage(addresses);
}

/* Search the page for any bitcoin related urls and returns them as array. */
function findBitcoinAddresses() {
	var result = document.evaluate(
		'//link[starts-with(@href, "bitcoin:") or @rel="bitcoin"] | //a[starts-with(@href, "bitcoin:") or @rel="bitcoin"]',
		document, null, 0, null);

	var bitcoin = {};
	var other = {};
	var item;
	while (item = result.iterateNext()) {
		var parsed = parseBitcoinURL(item.href);
		if (!parsed) {
			other[item.href] = true;
		} else {
			bitcoin[parsed.address] = parsed;
		}
	}

	var count = 0;
	var output = { bitcoin: [], other: [] }

	for (var key in bitcoin) {
		if (bitcoin.hasOwnProperty(key)) {
			output.bitcoin.push(bitcoin[key]);
			count += 1;
		}
	}

	for (var key in other) {
		if (other.hasOwnProperty(key)) {
			output.other.push(key);
			count += 1;
		}
	}

	output.count = count;
	return output;
}

/* Parse bitcoin URL query keys. */
function parseBitcoinURL(url) {
	var r = /^bitcoin:([a-zA-Z0-9]{27,34})(?:\?(.*))?$/;
	var match = r.exec(url);
	if (!match) return null;

	var parsed = { url: url }

	if (match[2]) {
		var queries = match[2].split('&');
		for (var i = 0; i < queries.length; i++) {
			var query = queries[i].split('=');
			if (query.length == 2) {
				parsed[query[0]] = decodeURIComponent(query[1].replace(/\+/g, '%20'));
			}
		}
	}

	parsed.address = match[1];
	return parsed;
}
