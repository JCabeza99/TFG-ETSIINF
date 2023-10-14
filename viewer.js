//container for visualization
var svg = d3.select("svg"),
  width = +svg.node().getBoundingClientRect().width,
  height = +svg.node().getBoundingClientRect().height;

//svg objests
var link, node;
// data - an object with nodes and links
var graph;

const color = d3.scaleOrdinal(d3.schemeCategory10);

//load data
// TODO add input for file selector and
d3.json("graph-example.json", function (error, _graph) {
  if (error) throw error;
  graph = _graph;
  initializeDisplay();
  initializeSimulation();
});

// FORCE SIMULATION
var simulation = d3.forceSimulation();

function initializeSimulation() {
  simulation.nodes(graph.nodes);
  initializeForces();
  simulation.on("tick", ticked);
}

// add forces to the simulation
function initializeForces() {
  // add forces and associate each with a name
  simulation
    .force("link", d3.forceLink(graph.links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("collide", d3.forceCollide())
    .force("center", d3.forceCenter(width / 2, height / 2));
  // apply properties to each of the forces
}

// DISPLAY GRAPH
function initializeDisplay() {
  //link display
  link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line");

  // node display
  node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // node tooltip
  node.append("title")
    .text(function (d) { return d.id; });

  node
    .attr("r", 5)
    .attr("stroke-width", 2)
    .attr("fill", d => color(d.group));

  link
    .attr("stroke-width", 1)
    .attr("opacity", 1);
}

function ticked() {
  link
    .attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) { return d.target.x; })
    .attr("y2", function (d) { return d.target.y; });

  node
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
  d3.select('#alpha_value').style('flex-basis', (simulation.alpha() * 100) + '%');
}

//////////// UI EVENTS ////////////

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.0001);
  d.fx = null;
  d.fy = null;
}

// update size-related forces
d3.select(window).on("resize", function () {
  width = +svg.node().getBoundingClientRect().width;
  height = +svg.node().getBoundingClientRect().height;
});