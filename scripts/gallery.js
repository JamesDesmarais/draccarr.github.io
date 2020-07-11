/**********************************************
Author: James Desmarais
Date modified: Jul 03, 2020

InfiniteGrids documentation:
    https://naver.github.io/egjs-infinitegrid/#layouts
***********************************************/
// var InfiniteGrid = eg.InfiniteGrid;
// var GridLayout = InfiniteGrid.GridLayout;
// var ig = new InfiniteGrid(document.getElementById('Grid'), {
// 	horizontal: false
// });

// ig.setLayout(GridLayout, {
// 	horizontal: false,
// 	itemSize: 285,
// 	margin: 24,
// 	align: 'center'
// });

// const allImages = new DOMParser().parseFromString(loadPage('https://draccarr.github.io/gallery-content-v2.html'), 'text/html').querySelectorAll("[data-src]");
// const imageOptions = {
//     threshold: 1,
//     rootMargin: "0px 0px 50px 0px"
// };
// const imageObserver = new IntersectionObserver((_entries, _imageObserver) => {
//     _entries.forEach(_x => {
//         if (!_x.isIntersecting) {
//             return;
//         } else {
//             preloadImage(_x.target);
//             imageObserver.unobserve(_x.target);
//         }
//     });
// }, imageOptions);

// const myGrid = document.getElementById("Grid");
// const allGalleryPosts = new DOMParser().parseFromString(loadPage('https://draccarr.github.io/gallery-content-v2.html'), 'text/html').getElementsByTagName("li");
// let allCurrentPosts = []; //Can be removed later.
// window.onload = function() {

//     var template = '<li class="card" onmouseover="this.classList.add(\'show-buttons\')" onmouseout="this.classList.remove(\'show-buttons\')">${content}<li>';
// 	var link = './gallery-images/';
//     var num = allGalleryPosts.length;
    
//     function getItem(_template, _options) {
// 		return _template.replace(/\$\{([^\}]*)\}/g, function() {
// 			var replaceTarget = arguments[1];

// 			return _options[replaceTarget];
// 		});
//     } //end getItem
    
//     function getItems(_length) {
// 		var arr = [];

// 		for (var i = 0; i < _length; ++i) {
// 			arr.push(
// 				getItem(template, {
// 					no: i % 60 + 1,
// 					text: 'egjs post ' + (i + 1),
// 					link: link,
// 					content: allGalleryPosts[i].innerHTML
// 				})
// 			);
// 		}
// 		arr.forEach((_x) => allCurrentPosts.push(_x));

// 		return arr;
//     } //end getItems
    
//     ig.append(getItems(num), 0);

    
//     myGrid.querySelectorAll("[data-src]").forEach(_x => {
//         imageObserver.observe(_x);
//     });
// }; //end window.onLoad

// //Loads html pages
// function loadPage(_href) {
// 	var xmlhttp = new XMLHttpRequest();
// 	xmlhttp.open('GET', _href, false);
// 	xmlhttp.send();
// 	return xmlhttp.responseText;
// }//end loadPage

// //Preloads the image
// function preloadImage(_img) {
//     const src = _img.getAttribute("data-src");
//     if (!src) {
//         return;
//     } else {
//         _img.src = src;
//     }
// }//end preloadImage