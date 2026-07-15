const notificar = (mensaje) => alert(mensaje);

const agregarTarea = (tareas, nombre) => {
    if (!nombre || nombre.trim() === "") {
        notificar("Error: El nombre de la tarea no puede estar vacío.");
        return;
    }
    const nuevaTarea = {
        id: tareas.length + 1,
        nombre: nombre.trim(),
        completada: false
    };
    tareas.push(nuevaTarea);
    notificar("Tarea agregada correctamente");
};

const listarTareas = (tareas, callback) => {
    if (tareas.length === 0) {
        notificar("No hay tareas en la lista.");
        return;
    }
    for (let i = 0; i < tareas.length; i++) {
        callback(tareas[i]);
    }
};

const completarTarea = (tareas, indice, callback) => {
    if (indice >= 0 && indice < tareas.length) {
        tareas[indice].completada = true;
        callback("Tarea completada");
    } else {
        alert("Opción inválida o índice fuera de rango");
    }
};

const mostrarResumen = (tareas) => {
    let total = tareas.length;
    let completadas = tareas.filter(t => t.completada).length;
    let pendientes = total - completadas;
    alert("RESUMEN:\nTotal: " + total + "\nPendientes: " + pendientes + "\nCompletadas: " + completadas);
};

let tareas = [];

while (true) {
    let opciones = prompt("ingrese una opcion:\n" +
        "1. agregar tarea\n" +
        "2. ver tareas\n" +
        "3. completar tarea\n" +
        "4. mostrar resumen\n" +
        "5. salir");

    switch (opciones) {
        case "1":
            let nombre = prompt("ingrese el nombre de la tarea: ");
            agregarTarea(tareas, nombre);
            break;

        case "2":
            let lista = "TAREAS:\n";
            let contador = 1;
            listarTareas(tareas, t => {
                lista += contador + ". " + t.nombre + " [" + (t.completada ? "Hecho" : "Pendiente") + "]\n";
                contador++;
            });
            if (tareas.length > 0) {
                alert(lista);
            }
            break;

        case "3":
            if (tareas.length === 0) {
                alert("No hay tareas para completar.");
                break;
            }
            let numero = parseInt(prompt("Número de tarea a completar:")) - 1;
            completarTarea(tareas, numero, notificar);
            break;

        case "4":
            mostrarResumen(tareas);
            break;

        case "5":
            alert("saliendo...");
            break;

        default:
            alert("opcion invalida");
            break;
    }

    if (opciones === "5") {
        break;
    }
}