const devices = {
	"ios": {
		"version": 10
	},
	"android": {
		"version": 6
	}
};
function checkDeviceAndVersion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		let match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return match[1] >= devices.ios.version;
	} else if (/android\s([0-9\.]*)/.test(navigator.userAgent.toLowerCase())) {
		let ua = navigator.userAgent.toLowerCase();
		let match = ua.match(/android\s([0-9\.]*)/);
		return parseFloat(match[1]) >= devices.android.version;
	}
	return false;
}
check = function () {
	if (!checkDeviceAndVersion()) {
		let element = document.createElement('div');
		element.innerHTML = "Your Device is not supported.";
		document.body.appendChild(element);
		return window.stop();
	} else {
		let element = document.createElement('div');
		let text = document.createElement('span');
		let button = document.createElement('button');
		text.innerText = 'Hold your phone towards the stage and tap to begin';
		button.setAttribute('id', 'correction');
		button.innerText = 'Submit';
		element.setAttribute('id', 'calibrate');
		element.appendChild(text);
		element.appendChild(button);
		element.style.height = window.innerHeight;
		document.body.appendChild(element)
	}
};
// window.onload = check;