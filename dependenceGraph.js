var classMap = {};
getParam();

var g = new dagreD3.graphlib.Graph()
    .setGraph({})
    .setDefaultEdgeLabel(function() { return {}; });
//g.setNode("Object", { label: "Object", class: "type-S" });
/*
for(var key in classMap) {
    g.setNode(key, { label: key });

    if(!classMap[classMap[key]]) {
        //console.log("no!");
        g.setNode(classMap[key], { label: classMap[key] });
    }

}*/
for(var key in classMap) {
    g.setNode(key, { label: key});
    for(var c in classMap[key]) {
        console.log(key + " " + classMap[key][c]);
        g.setNode(classMap[key][c], { label: classMap[key][c]});
    }
}

g.nodes().forEach(function(v) {
    var node = g.node(v);
    // Round the corners of the nodes
    node.rx = node.ry = 5;
});

// Set up edges, no special attributes.
for(var key in classMap) {
    for(var c in classMap[key]) {
        g.setEdge(key, classMap[key][c]);
    }
}
/*
for(var key in classMap) {
    g.setEdge(key, classMap[key]);
    console.log(key + " " + classMap[key]);
}
*/

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
        if(classMap[kv[0]] == null) {
            classMap[kv[0]] = [];
        }
        classMap[kv[0]].push(kv[1]);
    }
}
