
var myCurrentContent;
window.onload = function() {
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