/**********************************************
Author: James Desmarais
Date modified: Mar 16, 2020

InfiniteGrids documentation:
    https://naver.github.io/egjs-infinitegrid/#layouts
***********************************************/
var InfiniteGrid = eg.InfiniteGrid;
var GridLayout = InfiniteGrid.GridLayout;
var ig = new InfiniteGrid(document.getElementById('Grid'), {
	horizontal: false
});

ig.setLayout(GridLayout, {
	horizontal: false,
	itemSize: 285,
	margin: 24,
	align: 'center'
});

var galleryDoc;
var allGalleryPosts;
var currentGalleryPost;
let allCurrentPosts = []; //Can be removed later.
$.get('./gallery-content.html', function(_content) {
	galleryDoc = new DOMParser().parseFromString(_content, 'text/html');
	allGalleryPosts = galleryDoc.getElementsByTagName('li');

	var template =
		'<li class="card" onmouseover="this.classList.add(\'show-buttons\')" onmouseout="this.classList.remove(\'show-buttons\')">${content}<li>';
	var link = './gallery-images/';
	var num = allGalleryPosts.length;
	function getItem(_template, _options) {
		return _template.replace(/\$\{([^\}]*)\}/g, function() {
			var replaceTarget = arguments[1];

			return _options[replaceTarget];
		});
	} //end getItem

	function getItems(_length) {
		var arr = [];

		for (var i = 0; i < _length; ++i) {
			arr.push(
				getItem(template, {
					no: i % 60 + 1,
					text: 'egjs post ' + (i + 1),
					link: link,
					content: allGalleryPosts[i].innerHTML
				})
			);
		}
		arr.forEach((_x) => allCurrentPosts.push(_x));

		return arr;
	} //end getItems

	ig.append(getItems(num), 0);
});
