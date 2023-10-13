//container for visualization
const svg = d3.select("svg"),
  width = +svg.node().getBoundingClientRect().width,
  height = +svg.node().getBoundingClientRect().height;

//svg objests
var link, node;
// data - an object with nodes and links
var graph;

//load data
// TODO add input for file selector and
d3.json("../graph-example.json", function (error, _graph) {
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
  updateForces();
}

// DISPLAY GRAPH
function initializeDisplay() {
  //link display
  link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line");


}