
// import InfiniteGrid, { GridLayout } from "@egjs/infinitegrid";

var InfiniteGrid = eg.InfiniteGrid;
var GridLayout = InfiniteGrid.GridLayout;

var ig = new InfiniteGrid(document.getElementById("Grid"), {
    horizontal: false,
});

// initialize layout
// GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
ig.setLayout(GridLayout, {
    itemSize: 300,
    align: "center"
});

var galleryDoc;
var allGalleryPosts;
var currentGalleryPost;
$.get("https://draccarr.github.io/gallery-content.html", function (_content) {
    galleryDoc = new DOMParser().parseFromString(_content, "text/html");
    allGalleryPosts = galleryDoc.getElementsByTagName("li");




    // ig.append("<li><img id=\"0\" src=\"./images/jay-symbol-300x300.png\" width=\"300\" height=\"300\" alt=\"Jay symbol By James Desmarais\" title=\"Jay symbol By James Desmarais\"></li><li><img id=\"1\" src=\"./images/cave-background-300x300.png\" width=\"300\" height=\"300\" alt=\"Cave Background Image By James Desmarais\" title=\"Cave Background Image By James Desmarais\"></li><li><img id=\"2\" src=\"./images/main-menu-background-170x170.png\" width=\"170\" height=\"170\" alt=\"Pixel Art Sunset By James Desmarais\" title=\"Pixel Art Sunset By James Desmarais\"></li><li><img id=\"3\" src=\"./images/praedae-the-pirate-head-300x300.png\" width=\"300\" height=\"300\" alt=\"Praedae The Pirate By James Desmarais\" title=\"Praedae The Pirate By James Desmarais\"></li><li><img id=\"4\" src=\"./images/daiki-ibutsu-300x418.png\" width=\"300\" height=\"418\" alt=\"Daiki Ibutsu By James Desmarais\" title=\"Daiki Ibutsu By James Desmarais\"></li><li><img id=\"5\" src=\"./images/robot-game-300x188.png\" width=\"300\" height=\"300\" alt=\"Robot Game Image By James Desmarais\" title=\"Robot Game Image By James Desmarais\"></li><li><img id=\"6\" src=\"./images/red-blue-eye-300x300.png\" width=\"300\" height=\"300\" alt=\"Red Blue Eye By James Desmarais\" title=\"Red Blue Eye By James Desmarais\"></li><li><img id=\"7\" src=\"./images/building-1-full-with-closed-door-300x193.png\" width=\"300\" height=\"193\" alt=\"Pixel Art Building By James Desmarais\" title=\"Pixel Art Building By James Desmarais\"></li><li><img id=\"8\" src=\"./images/vatherdone-with-tree-ghosts.png\" width=\"300\" height=\"193\" alt=\"Pixel Art Building By James Desmarais\" title=\"Pixel Art Building By James Desmarais\"></li>");

    // var template = '<div class="item">' + //original
    //                                 '<div class="thumbnail">' + 
    //                                     '<img src="${link}../../assets/image/${no}.jpg">' + 
    //                                 '</div>' + 
    //                                 '<div class="info">' + 
    //                                     '${text}' + 
    //                                 '</div>' + 
    //                             '</div>';
    // var template = '<li>' 
    //                             + '<img src="${link}${no}.png">' 
    //                         + '<li>';


    var currentlyLoaded = 0;
    // var template = '<li><img src="${link}${no}.png"><li>';
    var template = '<li>${content}<li>';
    var link = "./gallery-images/";
    var content;
    var num = 9;
    // var num = 28;
    // var num = 21;
    function getItem(_template, _options) {
        // return template.replace(/\$\{([^\}]*)\}/g, function () { //original
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
                content: allGalleryPosts[i].innerHTML
            }));
        }
        return arr;
    }

    // ig.no(
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


});

