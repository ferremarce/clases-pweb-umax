# Guía Docente — Sesión 10: JavaScript II

> **Duración estimada:** ~1.5 h de teoría
> **Objetivo:** Introducir estructuras condicionales (if/else, switch, ternario), bucles (for, while, do-while) e iteración de arrays en JavaScript.
> **Estilo:** Explicación como si estuvieras frente a la clase, con ejemplos, preguntas y transiciones.

---

## Slide 1 — Portada

**Título:** JavaScript II — Condicionales y Bucles

**Explicación al alumno:**

> "Buenos días. En la sesión anterior aprendimos los fundamentos de JavaScript: variables, tipos de datos, operadores aritméticos, de comparación y lógicos. Hoy vamos a dar el siguiente paso: **tomar decisiones** con condicionales y **repetir acciones** con bucles.
>
> Estas dos estructuras son la base de cualquier programa. Con condicionales, nuestro código puede reaccionar a diferentes situaciones. Con bucles, podemos automatizar tareas repetitivas sin escribir el mismo código una y otra vez."

**Nota docente:** Haz una pausa. Pregunta si recuerdan los operadores de comparación y lógicos de la sesión 9.

---

## Slide 2 — Objetivos de la Sesión

**Explicación al alumno:**

> "Al terminar esta sesión serán capaces de:
>
> 1. **Usar if/else, else if y switch** para que el programa tome decisiones.
> 2. **Aplicar el operador ternario** para condiciones simples en una línea.
> 3. **Usar bucles while, do-while y for** para repetir código.
> 4. **Recorrer arrays con for** para procesar listas de datos.
> 5. **Controlar el flujo** con break y continue.
>
> Todo esto lo pondremos en práctica con dos ejercicios: una calculadora con menú y un gestor de tareas interactivo."

**Transición:** "Empecemos por lo más básico: tomar decisiones con if/else."

---

## Slide 3 — Condicionales: if / else

**Explicación al alumno:**

> "Un condicional permite ejecutar un bloque de código solo si se cumple una condición. La estructura es muy simple:
>
> ```javascript
> if (condición) {
>     // código si es verdadero
> } else {
>     // código si es falso
> }
> ```
>
> La condición debe ser una expresión booleana (true o false). Si es true, se ejecuta el primer bloque; si es false, el segundo.
>
> Ejemplo clásico: determinar si alguien es mayor de edad.
>
> ```javascript
> let edad = 18;
>
> if (edad >= 18) {
>     alert("Eres mayor de edad");
> } else {
>     alert("Eres menor de edad");
> }
> ```
>
> Si edad es 20, muestra 'Eres mayor de edad'. Si edad es 15, muestra 'Eres menor de edad'."

**Analogía:** "El if es como un semáforo: si está verde (true), avanzas; si está rojo (false), te detienes."

**Demo en vivo:** Escribe en la consola:
```javascript
let edad = prompt("¿Cuántos años tienes?");
if (edad >= 18) {
    alert("Puedes votar");
} else {
    alert("No puedes votar");
}
```

**Pregunta:** "¿Qué pasa si no pongo el else?" (Si la condición es false, simplemente no se ejecuta nada.)

**Transición:** "Muy bien. ¿Y si tenemos más de dos caminos posibles?"

---

## Slide 4 — Condicionales: else if

**Explicación al alumno:**

> "Cuando tenemos múltiples condiciones, encadenamos varios if usando `else if`.
>
> ```javascript
> let nota = 85;
>
> if (nota >= 90) {
>     alert("Excelente");
> } else if (nota >= 70) {
>     alert("Aprobado");
> } else if (nota >= 50) {
>     alert("Reprobado");
> } else {
>     alert("Repetición obligatoria");
> }
> ```
>
> El programa evalúa de arriba a abajo. En cuanto encuentra una condición verdadera, ejecuta ese bloque y **salta el resto**. Si nota es 85, muestra 'Aprobado' y no sigue evaluando."

**Pregunta a la clase:** "Si nota es 95, ¿qué mensaje se muestra?" (Excelente — porque 95 >= 90 es true.)

**Pregunta trampa:** "¿Y si nota es 60?" (Reprobado — porque 60 >= 50 es true, y es el primer else if que se cumple después de los anteriores.)

**Actividad rápida:** "Piensen en un sistema de clasificación: si temperatura > 30 es 'Calor', si > 20 es 'Templado', si no 'Frío'. ¿Cómo lo escribirían?"

**Transición:** "Hay una forma más corta de escribir condiciones simples: el operador ternario."

---

## Slide 5 — Operador Ternario

**Explicación al alumno:**

> "El operador ternario es una forma compacta de escribir un if/else cuando solo tenemos una línea por cada caso.
>
> ```javascript
> condición ? valorSiVerdadero : valorSiFalso
> ```
>
> Ejemplo:
>
> ```javascript
> let edad = 20;
> let mensaje = edad >= 18 ? "Adulto" : "Menor";
> alert(mensaje);  // "Adulto"
> ```
>
> Esto es equivalente a:
>
> ```javascript
> let mensaje;
> if (edad >= 18) {
>     mensaje = "Adulto";
> } else {
>     mensaje = "Menor";
> }
> ```
>
> El ternario es ideal para asignar valores según una condición. Pero no lo usen para cosas complejas: si la lógica es larga, mejor usen if/else para que sea más legible."

**Analogía:** "El ternario es como un atajo: cuando sabes exactamente a dónde vas, es más rápido, pero si necesitas navegar, mejor el camino completo (if/else)."

**Demo en vivo:** "En la consola: `let precio = 100; let mensaje = precio > 50 ? 'Caro' : 'Barato'; console.log(mensaje);`"

**Transición:** "A veces necesitamos comparar una variable contra muchos valores. Para eso existe switch."

---

## Slide 6 — Switch: Estructura

**Explicación al alumno:**

> "El switch es una estructura que compara una variable contra múltiples valores posibles. Es más limpio que un if/else largo cuando todos los casos comparan la misma variable.
>
> ```javascript
> switch (variable) {
>     case valor1:
>         // código si variable === valor1
>         break;
>     case valor2:
>         // código si variable === valor2
>         break;
>     default:
>         // código si no coincide ningún caso
> }
> ```
>
> Puntos importantes:
> - **break**: es obligatorio al final de cada case. Sin break, el programa 'cae' al siguiente caso (fall-through).
> - **default**: es opcional, pero recomendado. Se ejecuta si ningún case coincide.
> - Switch usa **comparación estricta (===)**, así que '5' y 5 son diferentes."

**Analogía:** "Switch es como un control remoto: cada botón (case) hace una cosa diferente. Si no sueltas el botón (break), sigue ejecutando el siguiente."

**Transición:** "Veamos un ejemplo concreto."

---

## Slide 7 — Switch: Ejemplo

**Explicación al alumno:**

> "Vamos a convertir un número de día a su nombre:
>
> ```javascript
> let dia = prompt("Ingresa un día (1-7):");
>
> switch (dia) {
>     case "1":
>         alert("Domingo");
>         break;
>     case "2":
>         alert("Lunes");
>         break;
>     case "3":
>         alert("Martes");
>         break;
>     case "4":
>         alert("Miércoles");
>         break;
>     case "5":
>         alert("Jueves");
>         break;
>     case "6":
>         alert("Viernes");
>         break;
>     case "7":
>         alert("Sábado");
>         break;
>     default:
>         alert("Día inválido");
> }
> ```
>
> Fíjense que cada case termina con break. Si no lo ponemos y el usuario ingresa '3', después de 'Martes' también se ejecutaría 'Miércoles', 'Jueves', etc. Eso es el fall-through."

**Pregunta a la clase:** "¿Qué pasa si el usuario ingresa '8'?" (Se ejecuta default y muestra 'Día inválido'.)

**Pregunta trampa:** "¿Y si quitamos todos los breaks y el usuario ingresa '3'?" (Se ejecutan todos los case desde el 3 en adelante: Martes, Miércoles, Jueves, Viernes, Sábado, default.)

**Transición:** "Perfecto. Ahora pasemos a los bucles: cómo repetir código."

---

## Slide 8 — Bucles: while

**Explicación al alumno:**

> "Los bucles nos permiten ejecutar el mismo bloque de código varias veces. El `while` repite mientras una condición sea verdadera.
>
> ```javascript
> while (condición) {
>     // código a repetir
> }
> ```
>
> Ejemplo — Contar del 1 al 5:
>
> ```javascript
> let contador = 1;
>
> while (contador <= 5) {
>     console.log(contador);
>     contador++;
> }
> // Resultado: 1, 2, 3, 4, 5
> ```
>
> ¿Qué pasa aquí?
> 1. contador empieza en 1
> 2. Se evalúa: ¿1 <= 5? Sí → ejecuta
> 3. Muestra 1 y suma 1 (contador ahora es 2)
> 4. Se repite hasta que contador sea 6 (6 <= 5 es false)
>
> **¡Cuidado con los bucles infinitos!** Si la condición nunca se vuelve false, el bucle no termina nunca."

**Analogía:** "While es como lavar platos mientras haya platos sucios. Cuando ya no quedan, paras."

**Pregunta:** "¿Qué pasa si no incremento contador?" (Bucle infinito: siempre será 1, siempre cumplirá la condición.)

**Demo en vivo:** "Abran la consola y prueben: `let i = 1; while (i <= 3) { console.log(i); i++; }`"

**Transición:** "Y si necesitamos que el código se ejecute al menos una vez, tenemos do-while."

---

## Slide 9 — Bucles: do-while

**Explicación al alumno:**

> "Do-while es muy parecido a while, pero con una diferencia clave: **el código se ejecuta al menos una vez** antes de verificar la condición.
>
> ```javascript
> do {
>     // código a repetir
> } while (condición);
> ```
>
> Ejemplo — Pedir un número mayor a 10:
>
> ```javascript
> let numero;
>
> do {
>     numero = prompt("Ingresa un número mayor a 10:");
> } while (numero <= 10);
>
> alert("Gracias");
> ```
>
> Aquí el prompt se muestra al menos una vez. Si el usuario ingresa 5, se vuelve a preguntar porque 5 <= 10 es true. Si ingresa 15, el bucle termina y muestra 'Gracias'.
>
> La diferencia con while: **while evalúa primero, do-while ejecuta primero**. En do-while, aunque la condición sea false desde el inicio, el código dentro del do se ejecuta una vez."

**Pregunta:** "¿Cuándo usarían do-while en lugar de while?" (Cuando necesitan que algo pase al menos una vez, como pedir datos al usuario.)

**Transición:** "El bucle más común y versátil es el for. Veámoslo."

---

## Slide 10 — Bucles: for

**Explicación al alumno:**

> "El bucle for es el más usado porque combina en una sola línea: inicialización, condición e incremento.
>
> ```javascript
> for (inicialización; condición; incremento) {
>     // código a repetir
> }
> ```
>
> Ejemplo clásico — Contar del 1 al 5:
>
> ```javascript
> for (let i = 1; i <= 5; i++) {
>     console.log(i);
> }
> // Resultado: 1, 2, 3, 4, 5
> ```
>
> Este for hace lo mismo que el while que vimos antes, pero en una línea más compacta.
>
> El flujo es:
> 1. **Inicialización**: `let i = 1` — se ejecuta una vez al inicio
> 2. **Condición**: `i <= 5` — se evalúa antes de cada iteración
> 3. **Cuerpo**: `console.log(i)` — se ejecuta si la condición es true
> 4. **Incremento**: `i++` — se ejecuta después del cuerpo
> 5. Vuelve al paso 2"

**Analogía:** "For es como una cinta transportadora: el contador (i) empieza en un valor, avanza de uno en uno, y para cuando llega al límite."

**Pregunta:** "¿Cómo harían un for que muestre los números pares del 2 al 10?" (for (let i = 2; i <= 10; i += 2))

**Transición:** "A veces necesitamos controlar el flujo del bucle desde dentro. Aquí entran break y continue."

---

## Slide 11 — Break y Continue

**Explicación al alumno:**

> "Dentro de un bucle podemos usar dos palabras especiales:
>
> **break** — Sale del bucle completamente. Útil cuando encontramos lo que buscábamos y no necesitamos seguir.
>
> **continue** — Salta a la siguiente iteración, ignorando el resto del código del bucle en esa vuelta.
>
> Ejemplo de break:
> ```javascript
> for (let i = 1; i <= 10; i++) {
>     if (i === 5) {
>         break;  // Sale del bucle
>     }
>     console.log(i);
> }
> // Resultado: 1, 2, 3, 4
> ```
>
> Ejemplo de continue:
> ```javascript
> for (let i = 1; i <= 5; i++) {
>     if (i === 3) {
>         continue;  // Salta el 3
>     }
>     console.log(i);
> }
> // Resultado: 1, 2, 4, 5
> ```
>
> break se usa mucho en bucles de búsqueda: cuando encuentras el elemento, paras. continue es útil para filtrar valores que no te interesan."

**Pregunta:** "¿Qué pasa si usamos break en un switch?" (Sale del switch, igual que en un bucle.)

**Demo en vivo:** "En la consola prueben: `for (let i = 0; i < 10; i++) { if (i % 2 === 0) continue; console.log(i); }`" (Muestra solo los impares.)

**Transición:** "Ahora que sabemos bucles, veamos cómo recorrer arrays con for."

---

## Slide 12 — Iterar Arrays con for

**Explicación al alumno:**

> "Una de las aplicaciones más útiles de for es recorrer arrays. La combinación de for + arrays es ubicua en programación.
>
> ```javascript
> let nombres = ["Ana", "Juan", "Pedro", "María"];
>
> for (let i = 0; i < nombres.length; i++) {
>     console.log("Hola, " + nombres[i]);
> }
> ```
>
> **nombres.length** nos da la cantidad de elementos (4). i va de 0 a 3, y nombres[i] accede a cada elemento.
>
> Así podemos:
> - Mostrar todos los elementos
> - Buscar un elemento específico
> - Modificar cada elemento
> - Sumar valores numéricos
> - Filtrar elementos con if dentro del for
>
> Ejemplo práctico — Sumar elementos de un array:
> ```javascript
> let numeros = [10, 20, 30, 40];
> let suma = 0;
>
> for (let i = 0; i < numeros.length; i++) {
>     suma += numeros[i];
> }
>
> console.log(suma); // 100
> ```"

**Analogía:** "Recorrer un array con for es como revisar los casilleros de un colegio: abres el casillero 0, luego el 1, luego el 2... hasta el último."

**Pregunta:** "¿Qué pasa si ponemos `i <= nombres.length` en lugar de `i < nombres.length`?" (Error: cuando i = 4, nombres[4] es undefined porque el array solo tiene índices 0-3.)

**Transición:** "Ahora que sabemos recorrer arrays, pasemos a los ejercicios prácticos."

---

## Slide 13 — Actividad Práctica

**Explicación al alumno:**

> "Vamos a la práctica. Tienen **2 horas y media** para resolver estos ejercicios:
>
> **Ejercicio 1 — Calculadora con Menú** (Básico): Crear una calculadora que muestre un menú de operaciones y ejecute la opción seleccionada usando if/else o switch. Practican condicionales.
>
> **Ejercicio 2 — Gestor de Tareas v2** (Intermedio): Crear un gestor de tareas con menú persistente usando while, switch, arrays y for para agregar, ver, completar tareas y mostrar resumen. Es la evolución del ejercicio de la sesión 9, ahora con bucles y arrays.
>
> Intenten resolverlos solos antes de mirar las soluciones. Los errores son parte del aprendizaje."

**Instrucciones:** "Abran el enlace 'Ver Ejercicios' que les lleva al listado. Cada ejercicio tiene su enunciado y pistas si se atascan."

**Transición:** "Antes de que empiecen, repasemos en 1 minuto los puntos clave de la sesión."

---

## Slide 14 — Resumen de la Sesión

**Explicación al alumno (recapitulación rápida):**

> "Resumen de lo que aprendimos hoy:
>
> - **Condicionales**: if, else if, else — para tomar decisiones.
> - **Operador ternario**: condición ? true : false — forma compacta.
> - **Switch**: para múltiples valores de una misma variable. No olviden el break.
> - **While**: repite mientras se cumpla la condición.
> - **Do-while**: igual, pero ejecuta al menos una vez.
> - **For**: bucle con contador, el más usado.
> - **Break**: sale del bucle; **Continue**: salta a la siguiente iteración.
> - **Arrays + For**: la combinación perfecta para procesar listas."

**Pregunta final:** "¿Alguna duda antes de empezar la práctica?"

---

## Slide 15 — Temas Próximos

**Explicación al alumno:**

> "En la **Sesión 11** veremos:
> - **Funciones**: declaración, expresión, arrow functions.
> - **Parámetros y retorno**: cómo pasar datos y devolver resultados.
> - **Ámbito de variables**: global vs local.
> - **Callbacks**: funciones que se pasan a otras funciones.
>
> Las funciones nos permiten organizar el código en bloques reutilizables. Es el paso siguiente para escribir programas más complejos y ordenados.
>
> Como lectura recomendada, revisen la guía de MDN sobre control de flujo y bucles."

**Cierre:** "Recuerden: la práctica es la clave. Estos ejercicios están diseñados para que enfrenten problemas reales. No se rindan si algo no sale a la primera. ¡Adelante!"

---

## Slide 16 — Volver al Inicio

**Explicación al alumno:**

> "Eso es todo por hoy. Repasen los conceptos y practiquen. Nos vemos en la próxima sesión."

**Cierre:** "La programación es como aprender un idioma nuevo: al principio cuesta, pero con práctica diaria se vuelve natural. ¡Sigan programando!"
