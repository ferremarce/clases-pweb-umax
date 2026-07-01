# Guía Docente — Sesión 12: JavaScript IV — Manipulación del DOM

> **Duración estimada:** ~4 h (teoría + práctica)
> **Objetivo:** Que los estudiantes aprendan a seleccionar, modificar, crear y eliminar elementos del DOM, manejar eventos y aplicar estilos dinámicamente desde JavaScript.
> **Estilo:** Explicación como si estuvieras frente a la clase, con ejemplos, preguntas y transiciones.

---

## Slide 1 — Portada

**Título:** JavaScript IV — Manipulación del DOM

**Explicación al alumno:**
> "Bienvenidos a la sesión 12. Hoy vamos a dar un salto enorme: vamos a aprender a manipular la página web desde JavaScript. Hasta ahora hemos trabajado con prompt, alert y la consola. Hoy vamos a cambiar texto, estilos, crear elementos y responder a eventos como clics. Esto es lo que hace que una página web sea interactiva."

**Nota docente:** Mostrar la portada mientras los estudiantes se preparan. Preguntar si recuerdan cómo se seleccionaban elementos con getElementById (visto brevemente en sesiones anteriores).

**Transición:** "Veamos los objetivos de esta sesión."

---

## Slide 2 — Objetivos de la Sesión

**Título:** Objetivos de la Sesión

**Explicación al alumno:**
> "Al finalizar esta sesión, serán capaces de seleccionar elementos del DOM de distintas formas, manejar eventos como clics y teclados, modificar contenido y estilos, y crear o eliminar elementos dinámicamente. Todo esto sin recargar la página."

**Pregunta a la clase:** "¿Alguien ha visto una página que cambie sin recargar, como cuando le dan a 'Me gusta' en una red social?" (Esperar ejemplos: feeds que se actualizan, ventanas modales, validación en tiempo real, menús desplegables.)

**Analogía:** "El DOM es como el esqueleto de la página. JavaScript puede mover, añadir o quitar huesos de ese esqueleto en tiempo real."

**Transición:** "Empecemos por entender qué es el DOM."

---

## Slide 3 — El DOM (Document Object Model)

**Título:** El DOM (Document Object Model)

**Explicación al alumno:**
> "DOM son las siglas de Document Object Model. Es la representación que el navegador crea en memoria de nuestro HTML. Cada etiqueta se convierte en un objeto que podemos manipular con JavaScript. El objeto principal es `document`, que representa la página entera."

**Demo en vivo:** Abrir la consola del navegador y escribir `document.body`. Mostrar cómo se ve el body como objeto.

**Actividad rápida:** "Escribid en la consola `document.title` y luego cambiad el valor: `document.title = 'Mi título nuevo'`. Ved cómo cambia la pestaña."

**Pregunta a la clase:** "¿Qué creen que pasa si escribimos `document.body.innerHTML = ''`?" (Respuesta: se borra toda la página.)

**Transición:** "Para manipular elementos, primero tenemos que seleccionarlos."

---

## Slide 4 — Seleccionar Elementos

**Título:** Seleccionar Elementos

**Explicación al alumno:**
> "Para modificar un elemento, primero tenemos que encontrarlo. La forma más común es `getElementById`, que busca por el atributo `id`. También tenemos `querySelector`, que usa selectores CSS como en las hojas de estilo. Y `querySelectorAll` para seleccionar múltiples elementos."

**Demo en vivo:**
```javascript
let titulo = document.getElementById("slide-title");
console.log(titulo);
```

**Pregunta trampa:** "¿Qué pasa si usamos `getElementById` con un id que no existe?" (Respuesta: retorna `null`.)

**Analogía:** "`getElementById` es como buscar a una persona por su DNI. `querySelectorAll` es como buscar a todos los que llevan camiseta roja."

**Transición:** "Una vez que tenemos un elemento, podemos hacer que reaccione a eventos."

---

## Slide 5 — Eventos del DOM

**Título:** Eventos del DOM

**Explicación al alumno:**
> "Los eventos son acciones que ocurren en la página: un clic, mover el ratón, escribir en un input, enviar un formulario. JavaScript puede escuchar estos eventos y ejecutar código cuando ocurren. Cada evento tiene un nombre: `click`, `mouseover`, `keyup`, `submit`, etc."

**Pregunta a la clase:** "¿Qué eventos creen que podría tener un botón?" (Respuesta: `click`, `mouseenter`, `mouseleave`, `focus`, `blur`, `dblclick`.)

**Analogía:** "Un evento es como un timbre: cuando alguien lo pulsa, suena. Nosotros decidimos qué hacer cuando suena."

**Transición:** "Para escuchar eventos, usamos `addEventListener`."

---

## Slide 6 — addEventListener

**Título:** addEventListener

**Explicación al alumno:**
> "`addEventListener` es el método que usamos para decirle a un elemento: 'cuando ocurra este evento, ejecuta esta función'. Recibe dos parámetros: el nombre del evento y la función que se ejecuta. Podemos usar función anónima, arrow function o función nombrada."

**Demo en vivo:**
```javascript
let boton = document.getElementById("miBoton");
boton.addEventListener("click", () => {
    alert("Hiciste click");
});
```

**Nota docente:** Mostrar las tres formas (anónima, arrow, nombrada). Explicar que la función nombrada es reutilizable.

**Pregunta a la clase:** "¿Por qué creen que es mejor usar addEventListener que el atributo `onclick` en HTML?" (Respuesta: separa el comportamiento de la estructura, permite múltiples eventos del mismo tipo, y se puede remover con `removeEventListener`.)

**Transición:** "Ahora que sabemos escuchar eventos, veamos cómo modificar el contenido de los elementos."

---

## Slide 7 — Modificar Contenido

**Título:** Modificar Contenido

**Explicación al alumno:**
> "Podemos cambiar el contenido de cualquier elemento con `textContent` para texto plano, o `innerHTML` si necesitamos incluir etiquetas HTML. Para los inputs, usamos la propiedad `value` para leer o escribir."

**Demo en vivo:**
```javascript
let parrafo = document.getElementById("miParrafo");
parrafo.textContent = "Este texto cambió";

let input = document.getElementById("miInput");
console.log(input.value);
input.value = "Nuevo valor";
```

**Nota docente:** Insistir en que `textContent` es seguro y `innerHTML` puede ser peligroso con datos del usuario.

**Pregunta trampa:** "¿Qué diferencia hay entre `textContent` e `innerHTML`?" (Respuesta: `textContent` trata todo como texto, `innerHTML` interpreta etiquetas HTML.)

**Transición:** "Además del contenido, también podemos modificar los estilos."

---

## Slide 8 — Modificar Estilos

**Título:** Modificar Estilos

**Explicación al alumno:**
> "Podemos cambiar los estilos de un elemento de dos formas: modificando la propiedad `style` directamente, o mejor aún, usando `classList` para añadir o quitar clases CSS. La ventaja de `classList` es que mantenemos los estilos en CSS, no en JavaScript."

**Demo en vivo:**
```javascript
elemento.style.color = "red";
elemento.style.backgroundColor = "yellow";

// Mejor: usar clases
elemento.classList.add("activa");
elemento.classList.remove("oculta");
elemento.classList.toggle("visible");
```

**Analogía:** "Modificar `style` es como pintar una pared con un rodillo. Usar `classList` es como cambiar la funda de un cojín: tienes fundas predefinidas y solo las cambias."

**Actividad rápida:** "Tomen un elemento de la página y prueben `classList.toggle('activa')` en la consola."

**Transición:** "Ahora veamos cómo crear nuevos elementos desde JavaScript."

---

## Slide 9 — Crear Elementos: createElement

**Título:** Crear Elementos: createElement

**Explicación al alumno:**
> "Con `createElement` podemos crear cualquier etiqueta HTML desde JavaScript. El elemento se crea en memoria, pero todavía no se ve en la página. Podemos configurarlo: añadirle texto, clases, atributos, antes de insertarlo."

**Demo en vivo:**
```javascript
let nuevoDiv = document.createElement("div");
nuevoDiv.textContent = "Hola mundo";
nuevoDiv.className = "nuevo-elemento";
nuevoDiv.setAttribute("id", "miId");
```

**Analogía:** "`createElement` es como comprar un mueble en caja plana. Lo tienen, pero todavía no está montado ni colocado en la habitación."

**Pregunta a la clase:** "¿Qué creen que pasa si creamos un elemento pero no lo insertamos en el DOM?" (Respuesta: existe en memoria pero no se ve en la página.)

**Transición:** "Una vez creado, tenemos que insertarlo en el DOM."

---

## Slide 10 — Agregar Elementos al DOM

**Título:** Agregar Elementos al DOM

**Explicación al alumno:**
> "Para que un elemento creado aparezca en la página, debemos insertarlo en el DOM. El método más común es `appendChild`, que lo añade como último hijo del contenedor. También tenemos `prepend` para añadirlo al inicio, `insertBefore` para ponerlo antes de otro elemento, y `after` para ponerlo después."

**Demo en vivo:**
```javascript
let contenedor = document.getElementById("lista");
let nuevoItem = document.createElement("li");
nuevoItem.textContent = "Elemento nuevo";
contenedor.appendChild(nuevoItem);
```

**Analogía:** "`appendChild` es como añadir un libro al final de una estantería. `prepend` es ponerlo al principio."

**Transición:** "Y si podemos crear, también podemos eliminar."

---

## Slide 11 — Eliminar Elementos

**Título:** Eliminar Elementos

**Explicación al alumno:**
> "Para eliminar elementos tenemos varias opciones. La más sencilla es `remove()` directamente sobre el elemento. También podemos usar `removeChild` para eliminar un hijo del padre. Y si queremos vaciar un contenedor, podemos asignar `innerHTML = ''`."

**Demo en vivo:**
```javascript
elemento.remove(); // Elimina directamente

padre.removeChild(hijo); // Elimina un hijo

contenedor.innerHTML = ""; // Vacía el contenedor
```

**Nota docente:** Explicar que `remove()` es más limpio y moderno. `removeChild` requiere tener el padre.

**Pregunta trampa:** "Si eliminamos un elemento del DOM, ¿el objeto JavaScript sigue existiendo?" (Respuesta: Sí, la variable todavía existe en memoria aunque el elemento no esté en la página.)

**Transición:** "Por último, veamos cómo modificar atributos."

---

## Slide 12 — Modificar Atributos

**Título:** Modificar Atributos

**Explicación al alumno:**
> "Podemos leer, escribir y eliminar atributos HTML con `getAttribute`, `setAttribute` y `removeAttribute`. También podemos acceder directamente a propiedades como `checked`, `disabled`, o usar `dataset` para los atributos `data-*`."

**Demo en vivo:**
```javascript
// Leer y escribir atributos
elemento.setAttribute("class", "nueva-clase");
let valor = elemento.getAttribute("data-info");

// Atributos booleanos
input.checked = true;
boton.disabled = false;

// Atributos data-*
elemento.dataset.info = "valor";
```

**Actividad rápida:** "Busquen un elemento con `data-*` en la página de ejercicios y prueben a leerlo con `dataset`."

**Transición:** "Ahora vamos a practicar todo lo que hemos aprendido."

---

## Slide 13 — Ejercicios de Práctica

**Título:** Ejercicios de Práctica

**Explicación al alumno:**
> "Vamos a hacer dos ejercicios. El primero: una calculadora visual con inputs, botones y resultado en pantalla. Reutilizarán las funciones de la sesión anterior, pero ahora conectadas al DOM con eventos. El segundo: un gestor de tareas con interfaz visual donde podrán agregar, completar y eliminar tareas dinámicamente."

**Nota docente:** Explicar que el ejercicio 1 es el que harán en clase; el ejercicio 2 es para entregar. Recordar que no deben usar localStorage, solo arrays en memoria.

**Transición:** "Abran los enunciados y empiecen con el ejercicio 1."

---

## Slide 14 — Resumen de la Sesión

**Título:** Resumen de la Sesión

**Explicación al alumno:**
> "Recapitulando: hoy hemos aprendido que el DOM es la representación del HTML como objetos JavaScript. Vimos cómo seleccionar elementos con `getElementById` y `querySelector`. Aprendimos a manejar eventos con `addEventListener`. Modificamos contenido con `textContent` y estilos con `classList`. Y lo más importante: creamos elementos con `createElement`, los insertamos con `appendChild` y los eliminamos con `remove`."

**Pregunta a la clase:** "¿Cuál es la diferencia entre `textContent` e `innerHTML`?" (Respuesta: `textContent` es texto plano, `innerHTML` interpreta HTML.)

**Transición:** "Veamos qué viene en la próxima sesión."

---

## Slide 15 — Temas Próximos

**Título:** Temas Próximos

**Explicación al alumno:**
> "En la sesión 13 empezamos con Bootstrap, el framework de CSS más popular del mundo. Aprenderemos su sistema de rejilla de 12 columnas, los breakpoints responsivos y las utilidades de espaciado y texto. También veremos almacenamiento en el navegador en una sesión posterior."

**Preparación:** "Os recomiendo repasar los conceptos de DOM para la próxima sesión."

**Transición:** "Eso es todo por hoy. Vamos a cerrar la sesión."

---

## Slide 16 — Volver

**Título:** (sin título — enlace de volver al inicio)

**Cierre:**
> "Hoy han dado un paso enorme. Ahora saben hacer páginas web interactivas que responden a clics, que crean y eliminan contenido, que cambian estilos en tiempo real. Esto es lo que separa una página estática de una aplicación web. Practiquen los ejercicios, experimenten en la consola, y nos vemos en la próxima sesión. ¡Buen trabajo!"
