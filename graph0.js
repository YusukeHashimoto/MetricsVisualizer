var classMap = {};
getParam();

var g = new dagreD3.graphlib.Graph()
    .setGraph({})
    .setDefaultEdgeLabel(function() { return {}; });
/*
g.setNode(0,  { label: "Tiger",       class: "type-TOP" });
g.setNode(1,  { label: "Cat",         class: "type-S" });
g.setNode(2,  { label: "ToyPoodle",        class: "type-NP" });
g.setNode(3,  { label: "Dog",        class: "type-DT" });
g.setNode("Animal", { label: "Animal", class: "type-S"});
*/
g.setNode("Object", { label: "Object", class: "type-S" });

//g.setNode("dog", { label: classMap["dog"], class: "hoge" });
for(var key in classMap) {
    g.setNode(key, { label: key });
}

g.nodes().forEach(function(v) {
    var node = g.node(v);
    // Round the corners of the nodes
    node.rx = node.ry = 5;
});

// Set up edges, no special attributes.
/*
g.setEdge(3, "Animal");
g.setEdge(2, 3);
g.setEdge(1, "Animal");
g.setEdge(0, 1);
*/
for(var key in classMap) {
    g.setEdge(key, classMap[key]);
    console.log(key + " " + classMap[key]);
}

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

// Center the graph
var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);

function getParam() {
    var arg = new Object
    var pair = location.search.substring(1).split('&');
    for(var i = 0; pair[i]; i++) {
        var kv = pair[i].split('=');
        //console.log(kv[0] + " " + kv[1]);
        classMap[kv[0]] = kv[1];
    }
}
