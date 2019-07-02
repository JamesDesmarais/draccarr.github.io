



//This is for populating the 'mainNavigation' with the content of the navigation html file.
$(function () { 
    $("header").load("header.html"); 
    $("#fancyNav").load("main-nav.html");
});

// $(document).ready(function () {
//     if (window.location.hash) {
//     }
// });

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

// $(function () {
//         var pathName = document.location.pathname;
//         window.onbeforeunload = function () {
//             var scrollPosition = $(document).scrollTop();
//             sessionStorage.setItem("scrollPosition_" + pathName, scrollPosition.toString());
//         }
//         if (sessionStorage["scrollPosition_" + pathName]) {
//             $(document).scrollTop(sessionStorage.getItem("scrollPosition_" + pathName));
//         }
//         return false;
// });


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

    // ReplacePrevious();
    ReplaceAnchors();


});

var previousPostAnchor;
var nextPostAnchor;
var loadedHTML;
ReplaceAnchors=function(){
    if (document.location.hash.length > 0) {

        // loadedHTML = $("#BlogPost").load("blog-content.html " + window.location.hash);
        // console.log(loadedHTML);

        console.log(location.hash);

        console.log("Hello World!");
        previousPostAnchor = document.getElementById("PreviousPost");
        nextPostAnchor = document.getElementById("NextPost");
        if (previousPostAnchor){
            allPosts = postsDoc.getElementsByTagName("article");
            for (var i=0; i< allPosts.length; i++){
                // console.log("#" + allPosts[i].id + " --- " + location.hash);
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


// ReloadPage = function() {
//     location.reload(true)
// }

// var previousPost;
// ReplacePrevious = function () {
//     if (document.location.hash.length > 0) {

//         $.get("https://draccarr.github.io/blog-content.html", function (_content) {
//             postsDoc = new DOMParser().parseFromString(_content, "text/html");
//         });

//         previousPost = document.getElementById("PreviousPost");
//         if (previousPost) {   
//             allPosts = postsDoc.getElementsByTagName("article");
//             for (var i = 0; i < allPosts.length; i++) {
//                 if (allPosts[i].id == document.body.getElementsByTagName("article")[0].id && allPosts.length > i + 1) {
//                     currentPost = allPosts[i + 1];
//                 }
//             }
//             // console.log(currentPost.id);
//             // window.location.replace("https://draccarr.github.io/blog-post.html#" + currentPost.id);
//             // location.reload(true);
        
//             previousPost.replaceWith("<a id=\"PreviousPost\" title=\"Previous\" href=\"" + "./blog-post.html# " + currentPost.id + "\"><i class=\"fas fa - arrow - left\"></i></a>");
        
//         }
//     }

// }





// Open the next blog post
NextPost = function () {
    allPosts = postsDoc.getElementsByTagName("article");
    for (var i = 0; i < allPosts.length; i++) {
        if (allPosts[i].id == document.body.getElementsByTagName("article")[0].id && i -1 >= 0) {
            currentPost = allPosts[i -1];
        }
    }
    console.log(currentPost.id);
    window.location.replace("https://draccarr.github.io/blog-post.html#" + currentPost.id);
    location.reload(true);
}

// Open the previous blog post
PreviousPost = function() {
    allPosts = postsDoc.getElementsByTagName("article");
    for (var i = 0; i < allPosts.length; i++) {
        if (allPosts[i].id == document.body.getElementsByTagName("article")[0].id && allPosts.length > i + 1) {
            currentPost = allPosts[i + 1];
        }
    }
    console.log(currentPost.id);
    window.location.replace("https://draccarr.github.io/blog-post.html#" + currentPost.id);
    location.reload(true);
}