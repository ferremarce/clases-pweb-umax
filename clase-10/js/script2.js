let nombre = "Juan";
//console.log("Hola " + nombre + "  " + typeof (nombre));

let fruta = ["manzana", "Pera", "frutilla", "Manzana", "Limon"];

let indice = 0;
while (fruta.length > indice) {
    console.log(fruta[indice]);
    indice++;
    if(indice==2){
        break;
    }  
}
console.log("Ciclo for");
for(let indice=0;indice<fruta.length;indice++){
    console.log(fruta[indice]);
}


// fruta[2] = "Naranja";
// fruta.push("Nueva fruta");
// fruta.pop()
// console.log(fruta);

let alumnos = [
    {
        nombre: "Juan",
        apellido: "Perez",
        edad: 40
    },
    {
        nombre: "Maria",
        apellido: "Gonzalez",
        edad: 20
    },
    {
        nombre: "José",
        apellido: "Gomez",
        edad: 15
    }
]
alumnos.push(
    {
        curso: "Pweb"
    }
)
console.log(alumnos)

let edad = 100;

if (edad <= 10) {
    console.log("Niño");
} else if (edad < 18) {
    console.log("Adolescente");
} else if (edad < 30) {
    console.log("Joven")
} else if (edad < 50) {
    console.log("Adulto")
} else {
    console.log("Adulto mayor")
}

// let dia = prompt("Ingresa un día (1-7):");

// switch (dia) {
//     case "1":
//         alert("Domingo");
//         break;
//     case "2":
//         alert("Lunes");
//         break;
//     case "3":
//         alert("Martes");
//         break;
//     case "4":
//         alert("Miércoles");
//         break;
//     case "5":
//         alert("Jueves");
//         break;
//     case "6":
//         alert("Viernes");
//         break;
//     case "7":
//         alert("Sábado");
//         break;
//     default:
//         alert("Día inválido");
// }



