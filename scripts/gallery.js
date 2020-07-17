/**********************************************
Author: James Desmarais
Date modified: Jul 17, 2020

InfiniteGrids documentation:
    https://naver.github.io/egjs-infinitegrid/#layouts
***********************************************/
const allImages = document.querySelectorAll("[data-src]");
const grid = document.querySelectorAll("#Grid")[0];
const imageOptions = {
    threshold: 0,
    rootMargin: "0px 0px 500px 0px"
};
const imageObserver = new IntersectionObserver((_entries, _imageObserver) => {
    _entries.forEach(_x => {
        if (!_x.isIntersecting) {
            return;
        } else {
            preloadImage(_x.target);
            imageObserver.unobserve(_x.target);
        }
    });
}, imageOptions);

//====================
// Custom functions
//====================

//Loads html pages
function loadPage(_href) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', _href, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}//end loadPage

//Preloads the image
function preloadImage(_img) {
    const src = _img.getAttribute("data-src");
    if (!src) {
        return;
    } else {
        _img.src = src;
    }
}//end preloadImage


//====================
// Events
//====================
window.onload = function() {   
    allImages.forEach(_x => {
        imageObserver.observe(_x);
    });
}; //end window.onLoad