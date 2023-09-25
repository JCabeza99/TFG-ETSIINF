
//element referencers
const button = document.getElementById("inputButton");
const selector = document.getElementById("fileSelector");
const graphContainer = document.getElementById("graph-container");

//height and width
const width = 800; //TO-DO make it resizeable
const height = 600;

//Create the frame
const svg = d3.select(graphContainer)
  .append('svg')
  .attr('width', width)
  .attr('height', height);

  const simulation = d3.forceSimulation()
  .force('link', d3.forceLink().id(d => d.id))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));

button.addEventListener("click", () => {
  selector.click();
});

selector.addEventListener("change", () => {
    const file = selector.files[0];
    
    if(file) {
        d3.json('data/graph-example.json').then(data => {
          
        })
        console.log('Nombre del archivo seleccionado:', file.name);
        console.log('Tamaño del archivo seleccionado:', file.size, 'bytes');
    }
});