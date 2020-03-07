

var InfiniteGrid = eg.InfiniteGrid;
var GridLayout = InfiniteGrid.GridLayout;

var ig = new InfiniteGrid(document.getElementById("Grid"), {
    horizontal: false,
});

// initialize layout
// GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
ig.setLayout(GridLayout, {
    itemSize: 200,
});


ig.append("<div class=\"card\"></div><div class=\"card\"></div><div class=\"card\"></div>");