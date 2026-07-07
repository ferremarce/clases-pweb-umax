let alumnos =
    [
        {
            nombre: "Juan",
            apellido: "Ferreira",
            nota: 50
        },
        {
            nombre: "María",
            apellido: "Lopez",
            nota: 80
        },
        {
            id: 1,
            estado: true,
        }


    ];
alumnos[0].nota = 100;
alumnos.push(
    {
        nombre: "Oscar",
        apellido: "Barrios",
        edad: 22
    }
);
alumnos.splice(2, 1);
console.log(alumnos[1])

/* if (alumnos[1].edad > 18) {
    alert(alumnos[1].nombre + " es mayor de edad");
} else {
    alert(alumnos[1].nombre + " es menor de edad");
} */

let resultado=`${alumnos[1].nombre} ${alumnos[1].nota>50?"Aprobado":"Reprobado"}`;
let resultado2=alumnos[1].nombre +(alumnos[1].nota>50?" Aprobado":" Reprobado");

console.log(resultado2)


for(let i=0;i<alumnos.length;i++){
    if(i%2==0){
        console.log("pares");
    }
    console.log(alumnos[i]);
}

let opcion = prompt("=== GESTOR DE TAREAS ===\n" +
                      "1. Agregar tarea\n" +
                      "2. Ver tareas\n" +
                      "3. Completar tarea\n" +
                      "4. Resumen\n" +
                      "5. Salir\n" +
                      "Elige una opción:");