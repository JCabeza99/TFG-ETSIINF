
const button = document.getElementById("inputButton");
const selector = document.getElementById("fileSelector");

button.addEventListener("click", () => {
  selector.click();
});

selector.addEventListener("change", () => {
    const file = selector.files[0];
    
    if(file) {
        console.log('Nombre del archivo seleccionado:', file.name);
        console.log('Tamaño del archivo seleccionado:', file.size, 'bytes');
    }
});