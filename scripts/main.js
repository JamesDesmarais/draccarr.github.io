//This is for populating the 'mainNavigation' with the content of the navigation html file.
$(function() {
	$('header').load('header.html');
	$('#fancyNav').load('main-nav.html');
	CheckDate();
	var shareButton;
	try {
		shareButton = document.getElementById("SharePost");
		if (shareButton != null) {
			shareButton.addEventListener('click', event => {
			if (navigator.share) {
				navigator.share({
				title: 'Hunted Blog',
				url: document.location
				}).then(() => {
					console.log('Thanks for sharing!');
				}).catch(console.error);
			} else {
				// fallback
			}
		});
	} else {
		// console.log("There is no share button");
	}
	} catch(_ex) {

	}
});

toggleShareViewer = function () {
	var URL =  document.getElementById("URL").value = document.location;
	if (ShareViewer != null) {
		ShareViewer.classList.toggle("hide");
	}
}//end toggleShareViewer

copyURLToClipboard = function() {
	try {
		copyToClipboard(document.getElementById("URL").value);
		document.getElementById("ClipboardPrompt").classList.remove("hide");
	} catch(_ex) {
		console.log(_ex);
	}
}//end copyURLToClipboard

copyToClipboard = function(_text) {
	try {
		navigator.clipboard.writeText(_text);
	} catch (_ex) {
		console.log("Text could not be added to clipboard.");
		console.log(_ex);
	}
}//end copyToClipboard


//This hides the expanded image.
var imageToggled = false;
var imageToShow;
var selectedImageID;
//[Note: _val must have an image element immediately before it in the html.]
toggleImage = function(_val) {
	var imageViewer = $('#ImageViewer');
	if (!imageToggled) {
		if (_val != null) {
			selectedImageID = _val.id;
			imageToShow = document.getElementById('ExpandedImage');
			imageToShow.setAttribute('src', _val.src);
			imageToShow.setAttribute('alt', _val.alt);
			imageToShow.setAttribute('title', _val.title);
		}
		imageToggled = true;
		imageViewer.removeClass('hide');
	} else {
		imageViewer.addClass('hide');
		imageToggled = false;
		imageToShow.setAttribute('src', './images/transparent-pixel.png');
	}
}; //end toggleImage

nextImage = function() {
	imageToShow = document.getElementById('ExpandedImage');
	try {
		imageToShow.setAttribute(
			'src',
			document.getElementById(selectedImageID).parentElement.nextElementSibling.firstElementChild.src
		);
		imageToShow.setAttribute(
			'alt',
			document.getElementById(selectedImageID).parentElement.nextElementSibling.firstElementChild.alt
		);
		imageToShow.setAttribute(
			'title',
			document.getElementById(selectedImageID).parentElement.nextElementSibling.firstElementChild.title
		);
		selectedImageID = document.getElementById(selectedImageID).parentElement.nextElementSibling.firstElementChild
			.id;
	} catch (_ex) {
		console.log('No more next Images!\n' + _ex);
	}
}; //end nextImage
previousImage = function() {
	imageToShow = document.getElementById('ExpandedImage');
	try {
		imageToShow.setAttribute(
			'src',
			document.getElementById(selectedImageID).parentElement.previousElementSibling.firstElementChild.src
		);
		imageToShow.setAttribute(
			'alt',
			document.getElementById(selectedImageID).parentElement.previousElementSibling.firstElementChild.alt
		);
		imageToShow.setAttribute(
			'title',
			document.getElementById(selectedImageID).parentElement.previousElementSibling.firstElementChild.title
		);
		selectedImageID = document.getElementById(selectedImageID).parentElement.previousElementSibling
			.firstElementChild.id;
	} catch (_ex) {
		console.log('No more previous Images!\n' + _ex);
	}
}; //end previousImage

// Toggles the mobile navigation
ToggleMobileNav = function() {
	document.getElementById('MobileNav').classList.toggle('hide');
}; //end ToggleMobileNav

// This is for detaching the 'mainNavigation' when it reaches the footer.
// var fancyNav = $('#fancyNav');
// window.addEventListener('scroll', () => {
// 	const scrollable = document.documentElement.scrollHeight - window.innerHeight;
// 	const scrolled = window.scrollY;
// 	const navScrollHeight = document.getElementById('fancyNav').scrollHeight - window.innerHeight + 170;
// 	const footScrollHeight = document.getElementsByTagName('footer')[0].scrollHeight;
// 	if (Math.ceil(scrolled) >= scrollable - footScrollHeight - navScrollHeight) {
// 		fancyNav.addClass('unstick-nav');
// 	} else {
// 		fancyNav.removeClass('unstick-nav');
// 	}
// });


// function LoadByBlogType(_blogType) {
// 	//Get the type of blog post to load from the location hash in the url.
// 	if (_blogType != null) {
// 		allPosts = postsDoc.getElementsByTagName('article').classList.contains(_blogType);
// 		document.getElementsByName('main')[0].innerHTML = allPosts;
// 	}
// }//end LoadByBlogType

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
mm = today.toLocaleString('default', { month: 'long' });
var lastPost = new Date();
var dateArray;
var postToCheck;
//month, day year format
var date1 = new Date();
var date2 = new Date();
var diffTime;
var diffDays;
var newElement;
CheckDate = function() {
	allArticles = document.getElementsByClassName('date');
	//Get the date
	for (var i = 0; i < allArticles.length; i++) {
		lastPost = allArticles[i].innerHTML;
		dateArray = lastPost.split(' ');
		dateArray[0] = dateArray[0].substring(0, 3);

		if (dateArray[1].length < 3) {
			dateArray[1] = ('0' + dateArray[1]).substring(0, 2);
		} else {
			dateArray[1] = dateArray[1].substring(0, 2);
		}

		//format the string for the date
		postToCheck = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

		//month, day, year
		date1 = new Date(postToCheck);
		date2 = today;
		diffTime = Math.abs(date2 - date1);
		diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		if (diffDays <= 7) {
			console.log('post ' + i + ' is new!');
			document
				.getElementsByClassName('date')
				[i].parentElement.parentElement.appendChild((newElement = document.createElement('p')));
			newElement.innerHTML = 'New!';
			newElement.className += 'new-symbol';
		} //end if
	} //end for i loop
}; //end CheckDate