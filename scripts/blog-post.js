var postsDoc;
var allPosts;
var currentPost;
$.get('https://draccarr.github.io/blog-content.html', function(_content) {
	postsDoc = new DOMParser().parseFromString(_content, 'text/html');
	$('#BlogPost').load('blog-content.html ' + window.location.hash);
	ReplaceAnchors();
	// ReplaceImage();
});

var previousPostAnchorTop;
var previousPostAnchorBottom;
var nextPostAnchorTop;
var nextPostAnchorBottom;
var loadedHTML;
ReplaceAnchors = function() {
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
};