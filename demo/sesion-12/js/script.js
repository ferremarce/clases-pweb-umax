let inputNombre = document.getElementById("nombre");
let botonSaludar = document.getElementById("saludar");
let parrafoMensaje = document.getElementById("mensaje");
let inputNombre2 = document.getElementById("nombre2");
let listaOrdenada = document.getElementById("listaNombres");

let etiquetaLista = document.createElement("li");

botonSaludar.addEventListener("click", saludar);

function saludar() {
    etiquetaLista.textContent = inputNombre.value;
    listaOrdenada.appendChild(etiquetaLista);
    inputNombre2.value = inputNombre.value;
    parrafoMensaje.textContent = "<strong>Hola, " + inputNombre.value + "! Bienvenido a la sesión 12.<strong>";
    console.log("Hola, " + inputNombre.value + "! Bienvenido a la sesión 12.");
}