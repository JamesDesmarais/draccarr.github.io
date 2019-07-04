
//This is for populating the 'mainNavigation' with the content of the navigation html file.
$(function () { 
    $("header").load("header.html"); 
    $("#fancyNav").load("main-nav.html");
});


var toggle = false;
searchBarFocus = function() {
    var searchBarResultList = $("#searchBarResultList");
    if (!toggle){
        searchBarResultList.addClass("search-bar-result-list");
        toggle = true;
    } else {
        searchBarResultList.removeClass("search-bar-result-list");
        toggle = false;
    }
}


// This is for detaching the 'mainNavigation' when it reaches the footer.
var fancyNav = $("#fancyNav");
window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const navScrollHeight = document.getElementById('fancyNav').scrollHeight - window.innerHeight + 170;
    const footScrollHeight = document.getElementsByTagName('footer')[0].scrollHeight;
    if (Math.ceil(scrolled) >= scrollable - footScrollHeight - navScrollHeight){
        fancyNav.addClass("unstick-nav");
    } else {
        fancyNav.removeClass("unstick-nav");
    }
});


var postsDoc;
var allPosts;
var currentPost;
$.get("https://draccarr.github.io/blog-content.html", function (_content) {
    postsDoc = new DOMParser().parseFromString(_content, "text/html");
    $("#BlogPost").load("blog-content.html " + window.location.hash);
    ReplaceAnchors();
});

var previousPostAnchor;
var nextPostAnchor;
var loadedHTML;
ReplaceAnchors=function(){
    if (document.location.hash.length > 0) {
        previousPostAnchor = document.getElementById("PreviousPost");
        nextPostAnchor = document.getElementById("NextPost");
        if (previousPostAnchor){
            allPosts = postsDoc.getElementsByTagName("article");
            for (var i=0; i< allPosts.length; i++){
                if ("#" + allPosts[i].id == location.hash){
                    if (allPosts.length > i + 1) {
                        previousPostAnchor.outerHTML = "<a id=\"PreviousPost\" title=\"Previous\" href=\"" + "?" + i + "=./blog-post.html#" + allPosts[i + 1].id + "\"><i class=\"fas fa-arrow-left\"></i></a>";
                    } else {
                        previousPostAnchor.outerHTML = "<a id=\"PreviousPost\"></a>";
                    }
                    if (i-1 >= 0) {
                        nextPostAnchor.outerHTML = "<a id=\"NextPost\" title=\"Next\" href=\"" + "?" + i + "=./blog-post.html#" + allPosts[i - 1].id + "\"><i class=\"fas fa-arrow-right\"></i></a>";
                    } else {
                        nextPostAnchor.outerHTML = "<a id=\"NextPost\"></a>";
                    }
                }
            }
        }
    }
}

