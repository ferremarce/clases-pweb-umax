let nombre;
console.log(nombre, "del tipo ", typeof nombre);

/*
if (true) {
    let nombre = "Pedro";
    
}
console.log(nombre); 
*/

const PI = 3.1415;
let numero1 = Number(prompt("Ingrese un numero1: "));
let numero2 = Number(prompt("Ingrese un numero2: "));
/*
Esto es la suma de dos numeros
*/
let resultado = numero1 + numero2;
console.log("El resultado es: "+ resultado);

let tareas = [
    { nombre: "Estudiar JS", completada: false },
    { nombre: "Hacer ejercicio", completada: true, pendiente:false }
];
tareas.push({ nombre: "dormir", completada: false, pendiente: true });
for(let i = 0; i < tareas.length; i+=1) {
    console.log(tareas[i].nombre);
}   