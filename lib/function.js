function generateUA() {
	const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
	const versions = ['91.0', '90.0', '89.0', '88.0'];
	const os = ['Windows NT 10.0', 'Macintosh; Intel Mac OS X 10_15_7', 'Linux; Ubuntu 20.04'];

	const browser = browsers[Math.floor(Math.random() * browsers.length)];
	const version = versions[Math.floor(Math.random() * versions.length)];
	const platform = os[Math.floor(Math.random() * os.length)];

	return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) ${browser}/${version} Safari/537.36`;
}

function isURL(url) {
	const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
	return urlRegex.test(url);
}

function log(msg) {
	console.log(`[ironman-api] ${msg}`);
}

function err(err) {
	console.error(`[ironman-api] error: ${err}`);
}

module.exports = { generateUA, isURL, log, err, };