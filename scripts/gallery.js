/**********************************************
Author: James Desmarais
Date modified: Mar 16, 2020

InfiniteGrids documentation:
    https://naver.github.io/egjs-infinitegrid/#layouts
***********************************************/
var InfiniteGrid = eg.InfiniteGrid;
var GridLayout = InfiniteGrid.GridLayout;
var ig = new InfiniteGrid(document.getElementById("Grid"), {
    horizontal: false,
});
// var parallax = new eg.Parallax(window, {
//     container: ".art-container",
//     selector: "img.parallax",
//     strength: 0.8,
//     center: 0,
//     range: [-1, 1],
//     align: "center",
//     horizontal: true,
// });

ig.setLayout(GridLayout, {
    horizontal: false,
    itemSize: 285,
    margin: 24,
    align: "center"
});
// if (window.innerWidth <= 1200) {
//     ig.setLayout(GridLayout, {
//         horizontal: false,
//         itemSize: 300,
//         margin: 20,
//         align: "center"
//     });
// } else {
//     ig.setLayout(GridLayout, {
//         horizontal: false,
//         itemSize: 250,
//         margin: 20,
//         align: "center"
//     });
// }

var galleryDoc;
var allGalleryPosts;
var currentGalleryPost;
let allCurrentPosts = [];//Can be removed later.
$.get("./gallery-content.html", function (_content) {
    galleryDoc = new DOMParser().parseFromString(_content, "text/html");
    allGalleryPosts = galleryDoc.getElementsByTagName("li");


    var template = '<li class="card" onmouseover="this.classList.add(\'show-buttons\')" onmouseout="this.classList.remove(\'show-buttons\')">${content}<li>';
    var link = "./gallery-images/";
    var num = 9;
    var id = 0;
    function getItem(_template, _options) {
        return _template.replace(/\$\{([^\}]*)\}/g, function () {
            var replaceTarget = arguments[1];

            return _options[replaceTarget];
        }//end function
        );
    }//end getItem

    function getItems(_length) {
        var arr = [];

        for (var i = 0; i < _length; ++i) {
            arr.push(getItem(template, {
                no: i % 60 + 1,
                text: "egjs post " + (i + 1),
                link: link,
                content: allGalleryPosts[i].innerHTML, 

            }));
        }
        arr.forEach(_x => allCurrentPosts.push(_x));
        // arr.forEach(_x => console.log(typeof _x));
        // arr.forEach(_x => _x.addEventListener('mouseenter', e => {
        //     DisplayButtons();
        // }));

        // AddMyListeners(arr);

        // mouseTarget.addEventListener('mouseenter', e => {
        //     mouseTarget.style.border = '5px dotted orange';
        //     enterEventCount++;
        //     addListItem('This is mouseenter event ' + enterEventCount + '.');
        // });


        // console.log(allCurrentPosts);
        return arr;
    }

    // ig.on(
    //     {
    //         "append": function (_e) {

    //         }
    //     }
    // );
    // ig.on({
    //     "append": function (_e) {
    //         ig.append(getItems(num), _e.groupKey + 1);
    //     },
    //     "layoutComplete": function (_e) {
    //         _e.target.forEach(function (item) {
    //             if (!item.el) {
    //                 return;
    //             }
    //             // add animation
    //             item.el.setAttribute("class", "item animate");
    //         });
    //         if (!_e.isAppend && _e.fromCache && _e.target[0].groupKey === 0) {
    //             ig.layout(true);
    //         }
    //     }
    // });

    ig.append(getItems(num), 0);

    // function ChangeLayoutOnWinResize() {
    //     if (window.innerWidth <= 1200) {
    //         ig.setLayout(GridLayout, {
    //             horizontal: false,
    //             itemSize: 300,
    //             margin: 20,
    //             align: "center"
    //         })
    //         console.log("I'm smaller than or queal to 1200 " + window.innerWidth);
    //     } else {
    //         ig.setLayout(GridLayout, {
    //             horizontal: false,
    //             itemSize: 250,
    //             margin: 20,
    //             align: "center"
    //         })
    //         console.log("I'm larger than 1200 " + window.innerWidth);
    //     }
    //     parallax.resize(getItems(num));
    // }//end ChangeLayoutOnWinResize
    // window.addEventListener('resize', ChangeLayoutOnWinResize);
});
// function ChangeLayoutOnWinResize() {
//     if (window.innerWidth <= 1200) {
//         ig.setLayout(GridLayout, {
//             horizontal: false,
//             itemSize: 300,
//             margin: 20,
//             align: "center"
//         })
//         console.log("I'm smaller than or queal to 1200 " + window.innerWidth);
//     } else {
//         ig.setLayout(GridLayout, {
//             horizontal: false,
//             itemSize: 250,
//             margin: 20,
//             align: "center"
//         })
//         console.log("I'm larger than 1200 " + window.innerWidth);
//     }
//     parallax.resize(items);
// }//end ChangeLayoutOnWinResize
// window.addEventListener('resize', ChangeLayoutOnWinResize);


// function AddMyListeners(_htmlStringArray) {
//     let myElements = [];
//     let myElementsOnPage = [];
//     //Make new objects of each string as dom elements
//     _htmlStringArray.forEach(_x => myElements.push(new DOMParser().parseFromString(_x, "text/html")));
//     //find the images in each of the elements and grab their ids
//     console.log(myElements);
//     for (var i=0; i< myElements.length; i++) {
//         // myElementsOnPage.push(document.getElementById(myElements[i].images[0].id));
//         console.log(myElements[i].images[0].id);
//     }
//     // console.log(myElementsOnPage);

//     // _htmlStringArray.forEach(_x => new DOMParser().parseFromString(_x, "text/html")
//     //                                                                                         .addEventListener('mouseenter', e => {
//     //     console.log(this);
//     //     DisplayButtons(this);

//     // }));
// }

// function DisplayButtons(_domElement) {
//     console.log(_domElement);
// }//end DisplayButtons

// document.addEventListener('click', function (_e) {
//     if (_e.target && _e.target.tagName == "IMG" && _e.target.id != "PageImage") {
//         // _e.target.parent;
//         console.log(_e.target.parentNode);

//     }
// });