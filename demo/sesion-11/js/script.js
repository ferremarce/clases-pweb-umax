function saludar(nombre) {
    return "Hola " + nombre + ", bienvenido a la clase 11 de PWEB";
}


/* let nombre = prompt("Ingrese su nombre: ");
console.log(saludar(nombre));
 */


let saludar2 = function (nombre="Invitado") {
    return "Hola " + nombre + ", bienvenido a la clase 11 de PWEB";
};

console.log(saludar2(), typeof saludar2);

let saludar3 = (nombre, apellido) => "Hola " + nombre + " " + apellido + ", bienvenido a la clase 11 de PWEB";
;
console.log(saludar3("Juan", "Perez"), typeof saludar3);


let sumaa = function sumar(a, b) {
    let suma = a + b;
    //alert("La suma es: " + suma);
}

console.log(sumaa(5, 10), typeof sumaa);

let variableGlobal = "Soy una variable global";
let edad = 30;

function ver() {
    let variableLocal = "Soy una variable local";
    let edad = 40;
    let multiplicar = (a, b) => {
        return a * b;
    };
    console.log(saludar("Juan"));
    console.log(variableLocal);
    console.log(edad);
}

console.log(edad);
ver()


let mostrarMensaje = function (mensaje) {
    alert(mensaje);
}

function multiplicar(a, b, callback) {
    let resultado = a * b
    callback("El resultado de la multiplicación es: " + resultado);
}

console.log(multiplicar(5, 10, mostrarMensaje));