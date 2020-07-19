//====================
// Events
//====================
window.onload = function() {
	CheckDate();
	var shareButton;
	try {
		shareButton = document.getElementById('SharePost');
		if (shareButton != null) {
			shareButton.addEventListener('click', (event) => {
				if (navigator.share) {
					navigator
						.share({
							title: 'Hunted Blog',
							url: document.location
						})
						.then(() => {
							console.log('Thanks for sharing!');
						})
						.catch(console.error);
				} else {
					// fallback
				}
			});
		} else {
			// console.log("There is no share button");
		}
	} catch (_ex) {}
}; //end onload

// window.addEventListener('beforeinstallprompt', (event) => {
//   console.log('👍', 'beforeinstallprompt', event);
//   // Stash the event so it can be triggered later.
//   window.deferredPrompt = event;
//   // Remove the 'hidden' class from the install button container
//   divInstall.classList.toggle('hidden', false);
// });

// document.getElementById("BtnInstall").addEventListener('click', () => {
//   console.log('👍', 'butInstall-clicked');
//   const promptEvent = window.deferredPrompt;
//   if (!promptEvent) {
//     // The deferred prompt isn't available.
//     return;
//   }
//   // Show the install prompt.
//   promptEvent.prompt();
//   // Log the result
//   promptEvent.userChoice.then((result) => {
//     console.log('👍', 'userChoice', result);
//     // Reset the deferred prompt variable, since
//     // prompt() can only be called once.
//     window.deferredPrompt = null;
//     // Hide the install button.
//     divInstall.classList.toggle('hidden', true);
//   });
// });

// window.addEventListener('appinstalled', (event) => {
//   console.log('👍', 'appinstalled', event);
// });

//====================
// Custom functions
//====================
toggleShareViewer = function() {
	var URL = (document.getElementById('URL').value = document.location);
	if (ShareViewer != null) {
		ShareViewer.classList.toggle('hide');
	}
}; //end toggleShareViewer

copyURLToClipboard = function() {
	try {
		copyToClipboard(document.getElementById('URL').value);
		document.getElementById('ClipboardPrompt').classList.remove('hide');
	} catch (_ex) {
		console.log(_ex);
	}
}; //end copyURLToClipboard

copyToClipboard = function(_text) {
	try {
		navigator.clipboard.writeText(_text);
	} catch (_ex) {
		console.log('Text could not be added to clipboard.');
		console.log(_ex);
	}
}; //end copyToClipboard

var imageToggled = false;
var imageToShow;
var selectedImageID;
const imageViewer = document.getElementById('ImageViewer');
const imageDescription = document.querySelectorAll('#ImageDescription')[0];
const imageDetails = document.querySelectorAll('#ImageDetails')[0];
//This toggles the expanded image
toggleImage = function(_val) {
	if (!imageToggled) {
		if (_val != null) {
			selectedImageID = _val.id;
			imageToShow = document.getElementById('ExpandedImage');
			imageToShow.setAttribute(
				'src',
				_val.dataset.detailsrc ? _val.dataset.detailsrc : _val.dataset.src ? _val.dataset.src : _val.src
			);
			imageToShow.setAttribute('alt', _val.alt);
			imageToShow.setAttribute('title', _val.title);
			if (_val.dataset.style) {
				imageToShow.setAttribute('data-style', _val.dataset.style);
			}
			if (_val.dataset.description) {
				// imageToShow.setAttribute('data-style', _val.dataset.description);
				imageDescription.querySelectorAll('p')[0].innerHTML = _val.dataset.description;
			} else {
				imageDescription.querySelectorAll('p')[0].innerHTML = 'No description...';
			}
			if (_val.title) {
				// imageToShow.setAttribute('data-style', _val.dataset.description);
				imageDetails.querySelectorAll('h2')[0].innerHTML = _val.title;
			} else {
				imageDetails.querySelectorAll('h2')[0].innerHTML = 'Untitled image...';
			}
		}
		imageToggled = true;
		imageViewer.classList.remove('hide');
	} else {
		imageViewer.classList.add('hide');
		imageToggled = false;
		imageToShow.setAttribute('src', './images/transparent-pixel.png');
	}
	console.log(selectedImageID);
}; //end toggleImage
nextImage = function() {
	try {
		var nextImage = document
			.getElementById(selectedImageID)
			.parentElement.parentElement.nextElementSibling.querySelectorAll('img')[0];
		imageToShow = document.getElementById('ExpandedImage');
		imageToShow.setAttribute(
			'src',
			nextImage.dataset.detailsrc
				? nextImage.dataset.detailsrc
				: nextImage.dataset.src ? nextImage.dataset.src : nextImage.src
		);
		imageToShow.setAttribute('alt', nextImage.alt);
		imageToShow.setAttribute('title', nextImage.title);
		imageToShow.setAttribute('data-style', nextImage.dataset.style);
		if (nextImage.dataset.description) {
			imageDescription.querySelectorAll('p')[0].innerHTML = nextImage.dataset.description;
		} else {
			imageDescription.querySelectorAll('p')[0].innerHTML = 'No description...';
		}
		if (nextImage.title) {
			// imageToShow.setAttribute('data-style', _val.dataset.description);
			imageDetails.querySelectorAll('h2')[0].innerHTML = nextImage.title;
		} else {
			imageDetails.querySelectorAll('h2')[0].innerHTML = 'Titleless...';
		}
		selectedImageID = nextImage.id;
	} catch (_ex) {
		console.log('No more next Images!\n' + _ex);
	}
}; //end nextImage
previousImage = function() {
	try {
		var previousImage = document
			.getElementById(selectedImageID)
			.parentElement.parentElement.previousElementSibling.querySelectorAll('img')[0];
		imageToShow = document.getElementById('ExpandedImage');
		imageToShow.setAttribute(
			'src',
			previousImage.dataset.detailsrc
				? previousImage.dataset.detailsrc
				: previousImage.dataset.src ? previousImage.dataset.src : previousImage.src
		);
		imageToShow.setAttribute('alt', previousImage.alt);
		imageToShow.setAttribute('title', previousImage.title);
		imageToShow.setAttribute('data-style', previousImage.dataset.style);
		if (previousImage.dataset.description) {
			imageDescription.querySelectorAll('p')[0].innerHTML = previousImage.dataset.description;
		} else {
			imageDescription.querySelectorAll('p')[0].innerHTML = 'No description...';
		}
		if (previousImage.title) {
			imageDetails.querySelectorAll('h2')[0].innerHTML = previousImage.title;
		} else {
			imageDetails.querySelectorAll('h2')[0].innerHTML = 'Titleless...';
		}
		selectedImageID = previousImage.id;
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
