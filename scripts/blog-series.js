window.addEventListener("load", initializeBlogSeries, true); 
var myCurrentContent;
function initializeBlogSeries() {
    if (window.location.search.indexOf('ascending') > -1) {
        LoadAscending();
    } else if (window.location.search.indexOf('descending') > -1) {
        LoadDescending();
    } else {
        console.error("ascending or descending must appear in the search query of the URL. ex. ?=descending#hunted");    
    }
}//end initializeBlogSeries

//Newest to oldest.
function LoadDescending() {
    fetch('https://draccarr.github.io/blog-content.html')
        .then(response => response.text())
        .then((data) => {
        myCurrentContent = new DOMParser().parseFromString(data, "text/html");
        for (var element of Array.from(myCurrentContent.getElementsByTagName('article'))) {
            if (element.classList.contains(window.location.hash.substr(1, window.location.hash.length - 1))) {
                document.getElementsByTagName('main')[0].innerHTML += element.outerHTML;
            }
        }
    });
}

//Oldest to newest
function LoadAscending() {
    console.log(window.location.search);
    var articles;
    fetch('https://draccarr.github.io/blog-content.html')
        .then(response => response.text())
        .then((data) => {
        myCurrentContent = new DOMParser().parseFromString(data, "text/html");
        articles = Array.from(myCurrentContent.getElementsByTagName('article'));
        for (var i = articles.length -1; i > -1; i--) {
            if (articles[i].classList.contains(window.location.hash.substr(1, window.location.hash.length - 1))) {
                document.getElementsByTagName('main')[0].innerHTML += articles[i].outerHTML;
            }
        }
    });
}