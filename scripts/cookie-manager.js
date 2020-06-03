//Set the cookie
function setCookie(_name, _value, _days) {
	var expires = '';
	var date = new Date();
	if (_days) {
		date.setTime(date.getTime() + _days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = _name + '=' + (_value || '') + expires + '; path=/';
}

//Get the cookie
function getCookie(_name) {
	var nameEQ = _name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
        if (c.indexOf(nameEQ) == 0) 
            return c.substring(nameEQ.length, c.length);
	}
	return null;
}

//Erase the cookie
function eraseCookie(_name) {
	document.cookie = _name + '=; Max-Age=-99999999;';
}

window.onload = function() {
    // setCookie('MyFirstCookie', 'JtestCookie3', 7);
    // console.log("Cookie: " + document.cookie);
    // var x = getCookie('MyFirstCookie');
    // if (x) {
    //     console.log(x);
    // }
}

//Starts and continues the series
function startSeries(_seriesName) {
	if (getCookie(_seriesName)) {
		//ToDo: Construct the link here to current place in series.
	} else {
		setCookie(_seriesName, 1, 7);
	}
}

//Increments or decrements your place in the series.
function changeSeriesPosition(_amount) {
	// var seriesName = window.location.hash.substr(1, window.location.hash.length - 1);
	var seriesName = document.getElementsByTagName('article')[0].classList[0];
	console.log(seriesName);
	var seriesLocation = getCookie(seriesName);
	setCookie(seriesName, Number(seriesLocation) + _amount, 7);
}

//ToDo: 
// Make a cookie when you press the Start Series button.
// Make the cookie store where you are in the series. (I will use the hash to get the series type.)
// Make an html page that checks if you have a cookie, then loads based on the cookie.
