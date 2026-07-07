function saludar(miNombre) {
    let saluda = "Hola, " + miNombre + "!";
    return saluda;
}
/* let nombre = prompt("Por favor, ingresa tu nombre: ");
console.log("Hola, " + nombre + "!"); */

let retornoSaluda = saludar("Juan Perez");
console.log(retornoSaluda);

function calcularIVA(precio) {
    let iva = precio * 0.1;
    return iva;
}

function total(precio, cantidad) {
    return precio * cantidad;

}

console.log(total(200, 3))


let montoIVA = function (precio = 0) {
    let iva = precio * 0.1;
    return iva;
}
console.log(montoIVA(), typeof montoIVA)

let montoIVA2 = (precio) => precio * 0.1;

function mostrarMensaje(mensaje) {
    alert(mensaje);
}

//mostrarMensaje("Este es mi mensaje");



let global = "Mi variable global";

function mostrar(mensaje) {
    let miMensaje = "El calculo del IVA es " + mensaje;
    alert(miMensaje);
}

function calcularIVA(precio, callback) {
    let iva = precio * 0.1;
    callback(iva);
}
console.log(calcularIVA(120,mostrar))