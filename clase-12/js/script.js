let nombre = document.getElementById("txtNombre");
let nombre2 = document.getElementsByClassName("estiloInput");
let elementoParrafo = document.getElementById("textoSaludo");

function probar() {
    console.log("Hola "+nombre2[1].value); 
    //elementoParrafo.innerHTML = "<i>Hola "+nombre2[1].value+"</i>";  
    elementoParrafo.innerHTML = "<i>Hola</i";
    for (let i = 0; i < nombre2.length; i++) {
        console.log(nombre2[i].value);
        elementoParrafo.innerHTML += " " + nombre2[i].value;
    }   
}
