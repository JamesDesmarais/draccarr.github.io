/**********************************************
Author: James Desmarais
Date modified: Jul 03, 2020

InfiniteGrids documentation:
    https://naver.github.io/egjs-infinitegrid/#layouts
***********************************************/
const allImages = new DOMParser().parseFromString(loadPage('https://draccarr.github.io/gallery-content-v2.html'), 'text/html').querySelectorAll("[data-src]");
var currentImage;
window.onload = function() {
    //All the text from blog-content.html
    console.log("hello world!");
    allImages.forEach(_x => console.log(_x));
    
}; //end window.onLoad

//Loads html pages
function loadPage(_href) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', _href, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}//end loadPage