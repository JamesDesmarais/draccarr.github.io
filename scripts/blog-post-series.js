var postsDoc;
var allPosts;
var currentPost;
window.onload = function() {
    //All the text from blog-content.html
	postsDoc = new DOMParser().parseFromString(loadPage('https://draccarr.github.io/blog-content.html'), 'text/html');
    var blogSeries = window.location.search.substr(2);

	//Grab the post you're on from the cookie. The cookie is chosen from the class of the current article.
	document.getElementById('BlogPost').innerHTML = Array.from(postsDoc.getElementsByClassName(blogSeries)).reverse()[
		getCookie(blogSeries) != ''
			? getCookie(blogSeries) > -1
				? getCookie(blogSeries) < postsDoc.getElementsByClassName(blogSeries).length
					? getCookie(blogSeries) - 1
					: postsDoc.getElementsByClassName(blogSeries).length - 1
				: 0
			: 0
	].outerHTML;

	if (getCookie(blogSeries) == '' || getCookie(blogSeries) <= 1) {
		setCookie(blogSeries, 1, 7);
		document.getElementById('PreviousPostBottom').classList.add('hide');
	} else {
		document.getElementById('PreviousPostBottom').classList.remove('hide');
	}
	if (getCookie(blogSeries) >= postsDoc.getElementsByClassName(blogSeries).length) {
		setCookie(blogSeries, postsDoc.getElementsByClassName(blogSeries).length, 7);
		document.getElementById('NextPostBottom').classList.add('hide');
	} else {
		document.getElementById('NextPostBottom').classList.remove('hide');
	}
}; //end window.onLoad

//Loads html pages
function loadPage(_href) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', _href, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}

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
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

//Erase the cookie
function eraseCookie(_name) {
	document.cookie = _name + '=; Max-Age=-99999999;';
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
	window.location.reload(false);
}

//ToDo:
// Make a cookie when you press the Start Series button.
// Make the cookie store where you are in the series. (I will use the hash to get the series type.)
// Make an html page that checks if you have a cookie, then loads based on the cookie.
