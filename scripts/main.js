



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






// $.get("https://draccarr.github.io/blog.html", function (_page) {
//     // my_var contains whatever that request returned
//     allPosts = _page.body.getElementsByTagName("article");
// });

var postsDoc;
// ToDo: Get all the elements from the blog, find the current post i'm on, store the next and previous posts id's.
var allPosts; //= load("blog-content.html").body.getElementsByTagName("article");
var currentPost;



$.get("https://draccarr.github.io/blog-content.html", function (_content) {
    postsDoc = new DOMParser().parseFromString(_content, "text/html");
});

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

//ToDo: When next and previous buttons are pressed, go to the next or previous blog post.