// Ejercicio 2: Gestor de Tareas v2
// Array para almacenar tareas como objetos
let tareas = [];

// Variable de control del bucle
let salir = false;

// Bucle principal del menú
while (!salir) {
    // Mostrar menú
    let opcion = prompt("=== GESTOR DE TAREAS ===\n" +
                      "1. Agregar tarea\n" +
                      "2. Ver tareas\n" +
                      "3. Completar tarea\n" +
                      "4. Resumen\n" +
                      "5. Salir\n" +
                      "Elige una opción:");

    // Procesar opción con switch
    switch (opcion) {
        case "1":
            // Agregar tarea
            let nombre = prompt("Nombre de la tarea:");
            tareas.push({ nombre: nombre, completada: false });
            alert("Tarea agregada correctamente");
            break;

        case "2":
            // Ver tareas
            if (tareas.length === 0) {
                alert("No hay tareas registradas");
            } else {
                let lista = "TAREAS:\n";
                for (let i = 0; i < tareas.length; i++) {
                    let estado = tareas[i].completada ? "✅ Completada" : "⏳ Pendiente";
                    lista += (i + 1) + ". " + tareas[i].nombre + " [" + estado + "]\n";
                }
                alert(lista);
            }
            break;

        case "3":
            // Completar tarea
            if (tareas.length === 0) {
                alert("No hay tareas para completar");
            } else {
                let indice = Number(prompt("Número de tarea a completar (1-" + tareas.length + "):"));
                if (indice >= 1 && indice <= tareas.length) {
                    tareas[indice - 1].completada = true;
                    alert("Tarea completada");
                } else {
                    alert("Número inválido");
                }
            }
            break;

        case "4":
            // Mostrar resumen
            let pendientes = 0;
            let completadas = 0;
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].completada) {
                    completadas++;
                } else {
                    pendientes++;
                }
            }
            alert("RESUMEN:\n" +
                  "Total: " + tareas.length + "\n" +
                  "Pendientes: " + pendientes + "\n" +
                  "Completadas: " + completadas);
            break;

        case "5":
            // Salir
            salir = true;
            alert("¡Hasta luego!");
            break;

        default:
            alert("Opción inválida. Intenta de nuevo.");
    }
}