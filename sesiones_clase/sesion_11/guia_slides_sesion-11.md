# Guía Docente — Sesión 11: JavaScript III — Funciones

> **Duración estimada:** ~4 h (teoría + práctica)
> **Objetivo:** Que los estudiantes comprendan qué son las funciones, cómo declararlas de distintas formas (declaración, expresión, arrow), manejen parámetros, ámbito de variables, y se introduzcan al concepto de callbacks.
> **Estilo:** Explicación como si estuvieras frente a la clase, con ejemplos, preguntas y transiciones.

---

## Slide 1 — Portada

**Título:** JavaScript III — Funciones

**Explicación al alumno:**
> "Bienvenidos a la sesión 11. Hoy vamos a aprender uno de los conceptos más importantes de JavaScript: las funciones. Las funciones son el bloque fundamental para organizar y reutilizar código. Con lo que aprendamos hoy, podremos escribir programas mucho más limpios, modulares y fáciles de mantener."

**Nota docente:** Mostrar la portada mientras los estudiantes se preparan. Preguntar si recuerdan las estructuras de control de la sesión anterior.

**Transición:** "Vamos a ver qué objetivos tenemos para esta sesión."

---

## Slide 2 — Objetivos de la Sesión

**Título:** Objetivos de la Sesión

**Explicación al alumno:**
> "Estos son los objetivos de hoy. Vamos a aprender a declarar funciones de tres formas distintas: declaración tradicional, expresión de función, y arrow functions. También veremos parámetros con valores por defecto, cómo funciona el ámbito de variables, y el concepto de callbacks — funciones que se pasan como argumento a otras funciones. Al finalizar, podréis organizar vuestro código de forma profesional."

**Pregunta a la clase:** "¿Alguien ha usado funciones antes, aunque sea en otro lenguaje?"

**Analogía:** "Pensad en una función como una receta de cocina: tenéis una lista de ingredientes (parámetros) y unos pasos (el código). Cada vez que queréis hacer ese plato, seguís la misma receta sin tener que escribirla de nuevo."

**Transición:** "Empecemos por lo básico: ¿qué es una función?"

---

## Slide 3 — Qué son las Funciones

**Título:** Qué son las Funciones

**Explicación al alumno:**
> "Una función es un bloque de código reutilizable que realiza una tarea específica. Imaginad que en un programa tenéis que calcular el IVA de un producto en cinco sitios distintos. Sin funciones, tendríais que escribir la misma fórmula cinco veces. Con una función, escribís la fórmula una vez y la llamáis cada vez que la necesitéis."

**Analogía:** "Una función es como un trabajador especializado. Si necesitáis que alguien pinte una pared, llamáis al pintor (la función), le pasáis la pared (parámetros), y él os devuelve la pared pintada (el resultado). No necesitáis saber cómo mezcla la pintura, solo que hace su trabajo."

**Pregunta a la clase:** "¿Qué ventajas creéis que tiene usar funciones?"

**Transición:** "Veamos cómo se declara una función en JavaScript."

---

## Slide 4 — Declaración de Funciones

**Título:** Declaración de Funciones

**Explicación al alumno:**
> "Esta es la forma más clásica de declarar una función. Usamos la palabra reservada `function`, le damos un nombre, y entre paréntesis los parámetros que recibe. El cuerpo va entre llaves. La función `saludar` recibe un nombre y devuelve un saludo. La llamamos simplemente escribiendo su nombre y pasándole los argumentos."

**Demo en vivo:** Escribir en la consola del navegador:
```javascript
function saludar(nombre) {
    return "Hola, " + nombre;
}
alert(saludar("Juan"));
```

**Nota docente:** Explicar el concepto de `return`: devuelve un valor y termina la ejecución de la función. Mencionar el hoisting: las funciones declaradas con `function` pueden llamarse antes de su declaración en el código.

**Pregunta a la clase:** "¿Qué pasa si una función no tiene `return`?"

**Transición:** "Además de la declaración tradicional, hay otras formas de crear funciones."

---

## Slide 5 — Expresión de Función y Arrow

**Título:** Expresión de Función y Arrow

**Explicación al alumno:**
> "En JavaScript, las funciones son valores, como los números o los strings. Eso significa que podemos asignar una función a una variable. A esto se le llama expresión de función. Pero hay una forma aún más moderna y compacta: las arrow functions. Se escriben con `=>` y si tienen una sola línea, podemos omitir las llaves y el `return`."

**Demo en vivo:**
```javascript
// Expresión
let saludar = function(nombre) {
    return "Hola, " + nombre;
};

// Arrow function (más corta)
let saludar = (nombre) => "Hola, " + nombre;
```

**Analogía:** "Las arrow functions son como los mensajes de texto frente a las cartas formales: hacen lo mismo pero con menos escritura."

**Pregunta trampa:** "¿Las arrow functions tienen hoisting como las funciones tradicionales?" (Respuesta: No, porque se asignan a variables, y `let` no tiene hoisting.)

**Transición:** "Ahora veamos cómo trabajar con parámetros y valores de retorno."

---

## Slide 6 — Parámetros y Retorno

**Título:** Parámetros y Retorno

**Explicación al alumno:**
> "Las funciones pueden recibir múltiples parámetros. Desde ES6, podemos asignar valores por defecto a los parámetros. Si no se pasa un argumento, se usa el valor por defecto. También es importante recordar que si una función no tiene `return`, devuelve `undefined`."

**Demo en vivo:**
```javascript
function saludar(nombre = "Usuario") {
    return "Hola, " + nombre;
}
alert(saludar()); // "Hola, Usuario"
```

**Pregunta a la clase:** "¿Qué creéis que pasa si llamamos a una función con más argumentos de los que tiene parámetros?"

**Transición:** "Ahora hablemos de dónde viven las variables que declaramos."

---

## Slide 7 — Ámbito de Variables (Scope)

**Título:** Ámbito de Variables (Scope)

**Explicación al alumno:**
> "El ámbito o scope de una variable determina desde dónde podemos acceder a ella. Las variables declaradas fuera de cualquier función tienen ámbito global: se pueden usar en cualquier parte del código. Las variables declaradas dentro de una función son locales: solo existen dentro de esa función. Esto es muy importante para evitar conflictos."

**Analogía:** "Pensad en una empresa: la variable global sería como un anuncio en la recepción que todos pueden ver. La variable local sería como un documento en el escritorio de un empleado: solo él puede acceder a él."

**Pregunta trampa:** "¿Qué pasa si declaramos una variable con `var` dentro de un bloque `if`?" (Respuesta: Con `var` el ámbito es de función, no de bloque. Con `let` y `const` es de bloque.)

**Demo en vivo:** Mostrar el ejemplo del slide y preguntar qué va a pasar.

**Transición:** "Ahora vamos a ver un concepto muy potente: pasar funciones como argumentos."

---

## Slide 8 — Callbacks: Funciones como Argumento

**Título:** Callbacks: Funciones como Argumento

**Explicación al alumno:**
> "Un callback es una función que se pasa como argumento a otra función. La función que recibe el callback lo ejecuta en el momento adecuado. Esto es muy útil para personalizar el comportamiento. En el ejemplo, la función `procesar` recibe un dato y un callback. Lo ejecuta con el resultado."

**Analogía:** "Es como pedir una pizza: llamáis a la pizzería (función principal) y les decís que os llamen cuando esté lista (callback). No os quedáis esperando en la cocina; seguís haciendo otras cosas y ellos os avisan."

**Demo en vivo:**
```javascript
function procesar(dato, callback) {
    let resultado = dato * 2;
    callback(resultado);
}

procesar(5, (valor) => {
    alert("El doble es: " + valor);
});
```

**Pregunta a la clase:** "¿Dónde creéis que se usan los callbacks en la vida real del desarrollo web?"

**Transición:** "Para terminar la teoría, veamos algunas buenas prácticas."

---

## Slide 9 — Buenas Prácticas con Funciones

**Título:** Buenas Prácticas con Funciones

**Explicación al alumno:**
> "Estas son las reglas que deberíais seguir al escribir funciones. La más importante: responsabilidad única. Cada función debe hacer una sola cosa y hacerla bien. Si una función hace más de una cosa, divididla. También usad nombres descriptivos y evitad modificar variables globales desde dentro de una función."

**Pregunta a la clase:** "¿Por qué creéis que es malo modificar una variable global desde una función?"

**Actividad rápida:** "Pensad en un nombre para una función que calcula el precio con descuento. ¿Cómo la llamaríais?"

**Transición:** "Ahora vamos a practicar todo lo que hemos aprendido."

---

## Slide 10 — Ejercicios de Práctica

**Título:** Ejercicios de Práctica

**Explicación al alumno:**
> "Vamos a hacer dos ejercicios. El primero, una calculadora con funciones separadas para cada operación, usando arrow functions y pasando la operación como callback. El segundo, más completo: vamos a refactorizar el Gestor de Tareas de la sesión anterior para organizarlo con funciones y callbacks."

**Nota docente:** Explicar que los ejercicios se resuelven con prompt/alert, sin DOM. El ejercicio 1 es el que harán en clase; el ejercicio 2 es para entregar.

**Transición:** "Abrid el enlace a los enunciados y empecemos con el ejercicio 1."

---

## Slide 11 — Resumen de la Sesión

**Título:** Resumen de la Sesión

**Explicación al alumno:**
> "Recapitulando: hoy hemos aprendido que las funciones son bloques reutilizables de código. Vimos tres formas de declararlas: función tradicional, expresión de función, y arrow functions. Aprendimos sobre parámetros con valores por defecto, ámbito de variables, y una de las ideas más potentes de JavaScript: los callbacks, que nos permiten pasar funciones como argumentos."

**Pregunta a la clase:** "¿Qué diferencia clave hay entre una función declarada con `function` y una arrow function?" (Respuesta: La sintaxis más corta y el manejo de `this`, aunque este último lo veremos más adelante.)

**Transición:** "Veamos qué viene en la próxima sesión."

---

## Slide 12 — Temas Próximos

**Título:** Temas Próximos

**Explicación al alumno:**
> "En la sesión 12 vamos a dar el salto al DOM: podréis seleccionar elementos HTML, modificar su contenido, responder a eventos como clics, crear elementos dinámicamente, y usar localStorage para guardar datos. Todo lo que hemos aprendido sobre funciones os será muy útil allí."

**Preparación:** "Os recomiendo repasar los conceptos de funciones para la próxima sesión. Vamos a usarlos intensivamente."

**Transición:** "Eso es todo por hoy. Vamos a cerrar la sesión."

---

## Slide 13 — Volver

**Título:** (sin título — enlace de volver al inicio)

**Cierre:**
> "Hemos cubierto mucho hoy. Las funciones son la base para escribir código profesional y os acompañarán en cada proyecto que hagáis. Recordad: función que hace una sola cosa, nombre descriptivo, y no modifiquéis variables globales. Practicad los ejercicios y nos vemos en la próxima sesión. ¡Buen trabajo!"
