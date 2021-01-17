//Replace JQuery with this later.
window.addEventListener("load", initializeBlogPost, true); 
var postsDoc;
var allPosts;
var currentPost;
function initializeBlogPost() {
    fetch('https://elderreign.com/blog-content.html')
        .then(response => response.text())
        .then((data) => {
        postsDoc = new DOMParser().parseFromString(data, "text/html");
		document.querySelector('#BlogPost').innerHTML = postsDoc.querySelector(window.location.hash).outerHTML;
	});
	ReplaceAnchors();
}//end initializeBlogPost

var previousPostAnchorTop;
var previousPostAnchorBottom;
var nextPostAnchorTop;
var nextPostAnchorBottom;
var loadedHTML;
ReplaceAnchors = function() {
	    fetch('https://elderreign.com/blog-content.html')
        .then(response => response.text())
        .then((data) => {
		postsDoc = new DOMParser().parseFromString(data, "text/html");
		if (document.location.hash.length > 0) {
			previousPostAnchorTop = document.getElementById('PreviousPostTop');
			previousPostAnchorBottom = document.getElementById('PreviousPostBottom');
			nextPostAnchorTop = document.getElementById('NextPostTop');
			nextPostAnchorBottom = document.getElementById('NextPostBottom');
			if (previousPostAnchorTop && previousPostAnchorBottom) {
				allPosts = postsDoc.getElementsByTagName('article');
				for (var i = 0; i < allPosts.length; i++) {
					if ('#' + allPosts[i].id == location.hash) {
						if (allPosts.length > i + 1) {
							previousPostAnchorTop.outerHTML =
								'<a id="PreviousPost" title="Previous" href="' +
								'?' +
								i +
								'=./blog-post.html#' +
								allPosts[i + 1].id +
								'"><i class="fas fa-arrow-left"></i></a>';
							previousPostAnchorBottom.outerHTML =
								'<a id="PreviousPost" title="Previous" onclick="changeSeriesPosition(-1)" href="' +
								'?' +
								i +
								'=./blog-post.html#' +
								allPosts[i + 1].id +
								'"><i class="fas fa-arrow-left"></i></a>';
						} else {
							previousPostAnchorTop.outerHTML = '<a id="PreviousPost"></a>';
							previousPostAnchorBottom.outerHTML = '<a id="PreviousPost"></a>';
						}
						if (i - 1 >= 0) {
							nextPostAnchorTop.outerHTML =
								'<a id="NextPost" title="Next" href="' +
								'?' +
								i +
								'=./blog-post.html#' +
								allPosts[i - 1].id +
								'"><i class="fas fa-arrow-right"></i></a>';
							nextPostAnchorBottom.outerHTML =
								'<a id="NextPost" title="Next" onclick="changeSeriesPosition(1)" href="' +
								'?' +
								i +
								'=./blog-post.html#' +
								allPosts[i - 1].id +
								'"><i class="fas fa-arrow-right"></i></a>';
						} else {
							nextPostAnchorTop.outerHTML = '<a id="NextPost"></a>';
							nextPostAnchorBottom.outerHTML = '<a id="NextPost"></a>';
						}
					}
				}
			}
		}	
	});
}//end ReplaceAnchors

