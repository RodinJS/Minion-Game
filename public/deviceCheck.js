const devices = {
	"ios": {
		"version": 5
	},
	"android": {
		"version": 6
	}
};
function checkIos() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		// return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
	return false;
}

function checkAndroid() {
	let ua = navigator.userAgent.toLowerCase();
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? match[1] : false;
}

var calibrated = function (e) {
	document.getElementById('calibrate').remove()
}
check = function () {
	if(checkIos() || checkAndroid()) {
		let element = document.createElement('div');
		element.innerHTML = "Your Device is not supported.";
		document.body.appendChild(element);
		return window.stop();
	} else {
		let element = document.createElement('div');
		element.setAttribute('id','calibrate');
		let text = document.createElement('span');
		text.innerText = 'Hold your phone towards the stage and tap to begin';
		let button = document.createElement('button');
		button.innerText = 'Submit';
		button.addEventListener('click', calibrated);
		element.appendChild(text);
		element.appendChild(button);
		element.style.height  = "768px";
		document.body.appendChild(element)
	}
};
// window.onload = check;