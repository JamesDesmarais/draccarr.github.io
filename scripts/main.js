
//This is for populating the 'header' with the content of the header html file.
// $(function () {
//     $("header").load("header.html"); 
// });

//This is for populating the 'mainNavigation' with the content of the navigation html file.
$(function () { 
    $("header").load("header.html"); 
    $("#fancyNav").load("main-nav.html");
});

$(document).ready(function () {
    // $("header").load("header.html"); 
    // $("#fancyNav").load("main-nav.html");

    if (window.location.hash) {
        $('html, body').animate({
            scrollTop: $(window.location.hash).offset().top - 20
        }, 500);
    }
});


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