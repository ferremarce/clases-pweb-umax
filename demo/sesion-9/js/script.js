/*
let nombre = 'Juan';
let edad=48;
const PI=3.1415;
console.log(nombre, ' del tipo: ', typeof (nombre));
const usuario = { nombre: "Ana", edad: 25 };
usuario={ nombre: "José", edad: 40 };
console.log(usuario, ' del tipo: ', typeof (usuario));
*/
/* let apellido=null;
console.log(apellido, " del tipo ", typeof(apellido)); */
/* const a=3;
let suma=5**a;
console.log("suma: ",suma); */
/* let contador = 0;
let nombre = 5;
let resultado = (5 > 1 && nombre === '5');
console.log(resultado);
console.log(!resultado); */

/*
if(true){
    var nombre = 'José';
    console.log("Mi nombre es", nombre, ' del tipo: ', typeof (nombre));
}

console.log("Mi nombre es", nombre, ' del tipo: ', typeof (nombre));
*/

// Ejercicio 2: Gestor de Tareas
// Solicitar datos al usuario
let nombreTarea = prompt("Nombre de la tarea:");
let horasEstimadas = Number(prompt("Horas estimadas:"));
let prioridad = Number(prompt("Prioridad (1-10):"));
let numSubtareas = Number(prompt("Número de subtareas:"));

// Calcular horas con margen del 10%
let horasTotales = horasEstimadas + (horasEstimadas * 0.10);

// Calcular horas por subtarea (evitar división entre 0)
let horasPorSubtarea = numSubtareas > 0 ? horasTotales / numSubtareas : 0;

// Evaluar condiciones con operadores de comparación y lógicos
let altaPrioridad = prioridad > 7 && prioridad <= 10;
let esLarga = horasEstimadas > 4;
let esCritica = altaPrioridad && esLarga;

let resultado="=== GESTOR DE TAREAS ===\n" +
      "Tarea: " + nombreTarea + "\n" +
      "Horas estimadas: " + horasEstimadas.toFixed(1) + "\n" +
      "Horas totales (+10%): " + horasTotales.toFixed(1) + "\n" +
      "Horas por subtarea: " + horasPorSubtarea.toFixed(1) + "\n" +
      "Prioridad: " + prioridad + "/10\n" +
      "¿Alta prioridad? " + altaPrioridad + "\n" +
      "¿Tarea larga? " + esLarga + "\n" +
      "¿Tarea crítica? " + esCritica;
// Mostrar resumen con alert
alert(resultado);
let miTextArea=document.getElementById("txtResultado");
miTextArea.value=resultado;
      
      