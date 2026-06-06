# Guía Docente — Sesión 9: JavaScript I

> **Duración estimada:** ~1.2 h de teoría
> **Objetivo:** Introducir los fundamentos de JavaScript: qué es, variables, tipos, operadores e interacción básica.
> **Estilo:** Explicación como si estuvieras frente a la clase, con ejemplos, preguntas y transiciones.

---

## Slide 1 — Portada

**Título:** JavaScript I — Variables, Tipos de Datos y Operadores

**Explicación al alumno:**

> "Buenos días. Hasta ahora hemos visto HTML, que nos da la estructura de una página web, y CSS, que nos permite darle estilo y hacerla responsive. Hoy damos un salto importante: empezamos con **programación**. JavaScript es el lenguaje que hace que las páginas web cobren vida, que reaccionen a lo que el usuario hace, que validen formularios, que muestren mensajes, que hagan cálculos... en definitiva, el **comportamiento** de la web."

**Nota docente:** Haz una pausa aquí. Pregunta si alguien ha visto o usado JavaScript antes. Crea expectación.

---

## Slide 2 — Objetivos de la Sesión

**Explicación al alumno:**

> "Vamos a ver qué vamos a aprender hoy. Al terminar esta sesión serán capaces de:
>
> 1. **Entender qué es JavaScript** y cómo encaja con HTML y CSS.
> 2. **Declarar variables** con `let` y `const`, y entender por qué ya no usamos `var`.
> 3. **Reconocer los tipos de datos** básicos: texto, números y booleanos.
> 4. **Usar operadores aritméticos y de asignación** para hacer cálculos y acumular valores.
> 5. **Interactuar con el usuario** usando `alert`, `prompt` y la consola.
> 6. **Convertir tipos de datos** cuando sea necesario.
> 7. **Escribir código limpio** con buenas prácticas desde el primer día.
>
> Al final, veremos un ejemplo completo que integra todo lo aprendido."

**Nota docente:** Lee los objetivos en voz alta.

**Transición:** "Antes de escribir código, necesitamos entender qué es JavaScript y por qué es tan importante."

---

## Slide 3 — ¿Qué es JavaScript?

**Explicación al alumno:**

> "JavaScript se creó en 1995. Brendan Eich lo desarrolló en solo 10 días para el navegador Netscape. Originalmente se llamaba Mocha, luego LiveScript y finalmente JavaScript.
>
> ¿Por qué es importante? Porque **es el lenguaje nativo del navegador**. Todos los navegadores modernos tienen un motor que entiende JavaScript:
> - Chrome usa **V8**
> - Firefox usa **SpiderMonkey**
> - Safari usa **JavaScriptCore**
>
> Esto significa que JS se ejecuta **del lado del cliente**, en el computadora del usuario, sin necesidad de enviar nada al servidor.
>
> Un error común: **JavaScript NO es Java**. Son lenguajes completamente distintos. Java es como el inglés británico y JavaScript como el español, comparten alguna palabra pero no se parecen en nada. El nombre fue una estrategia de marketing.
>
> El estándar que seguimos hoy es **ECMAScript 6+** (ES6+), que trajo mejoras enormes como `let`, `const`, las arrow functions y mucho más."

**Analogía:** "Si HTML es el esqueleto de una persona y CSS es la ropa que viste, JavaScript es el cerebro y los músculos que permiten moverse y reaccionar."

**Pregunta a la clase:** "¿Alguien ha usado JavaScript en alguna página web sin saberlo?" (Ejemplo: un clic que abre un menú, un formulario que valida datos...)

**Transición:** "Ahora que sabemos qué es, veamos cómo se relaciona con lo que ya aprendieron."

---

## Slide 4 — La Tríada Web

**Explicación al alumno:**

> "Esta diapositiva es muy importante porque conecta todo lo que hemos visto hasta ahora con lo que viene.
>
> Miren las tres columnas:
>
> - **HTML**: define la estructura. Es como los cimientos y las paredes de una casa. Ya vimos etiquetas semánticas, listas, tablas, formularios... en las sesiones 1 a 4.
> - **CSS**: define la presentación. Es como la pintura, los muebles, la decoración. Lo vimos en las sesiones 5 a 8: Flexbox, Grid, diseño responsive...
> - **JavaScript**: define el comportamiento. Es como la electricidad, la fontanería, el sistema de calefacción. Una casa puede tener paredes y pintura, pero sin electricidad no funciona el interruptor de la luz.
>
> Estas tres tecnologías **siempre trabajan juntas** en el desarrollo web moderno."

**Pregunta a la clase:** "¿Alguien me da un ejemplo de interactividad en una página web?" (Espera respuestas: botones, menús desplegables, validación de formularios, galerías de imágenes...)

**Actividad rápida:** "Abran una página web cualquiera. Desactiven JavaScript en el navegador y verán cómo muchas cosas dejan de funcionar."

**Transición:** "Muy bien. ¿Y cómo metemos JavaScript dentro de una página HTML? Veámoslo."

---

## Slide 5 — Insertar JavaScript en HTML

**Explicación al alumno:**

> "Hay tres formas de añadir JavaScript a una página HTML. Vamos a verlas de peor a mejor.
>
> **1. Inline** — No recomendado. Escribimos el código directamente en el atributo `onclick` de un botón, por ejemplo. Problema: mezcla HTML con JS, difícil de mantener.
>
> **2. Interno** — Usamos la etiqueta `<script>` dentro del HTML, normalmente al final del `<body>`. Mejor que inline, pero si tenemos varias páginas, repetimos código.
>
> **3. Externo** — La forma recomendada. Creamos un archivo `.js` separado y lo enlazamos con `<script src="ruta/al/archivo.js">`. Ventajas:
>    - Separación de responsabilidades (HTML y JS separados)
>    - Reutilizable en múltiples páginas
>    - El navegador lo cachea, mejorando el rendimiento
>    - Más fácil de leer y mantener
>
> La etiqueta `<script>` se coloca **al final del body** para que el HTML se cargue primero y luego se ejecute el JS."

**Demo en vivo:** Abre el archivo `index.html` de la sesión y muestra la línea `<script src="js/script.js"></script>` al final del body.

**Pregunta:** "¿Por qué creen que ponemos el script al final y no en el `<head>`?" (Respuesta: porque si el script está en el head, bloquearía la carga del HTML.)

**Transición:** "Muy bien. Ahora vamos a escribir nuestras primeras variables."

---

## Slide 6 — Variables en JavaScript

**Explicación al alumno:**

> "Las variables son como **cajas** donde guardamos datos. En JavaScript tenemos tres formas de declarar variables:
>
> - **`var`** — La forma antigua. Tiene ámbito de función, no de bloque. Esto puede causar bugs difíciles de encontrar. **No la usaremos.**
> - **`let`** — Moderna (ES6+). Ámbito de bloque. La usamos cuando el valor va a cambiar.
> - **`const`** — Moderna (ES6+). Ámbito de bloque. El valor NO puede reasignarse. La usamos por defecto.
>
> La regla de oro: **`const` por defecto, `let` cuando necesites reasignar.**
>
> Fíjense en la tabla: `const` no puede reasignarse, pero ojo, si es un objeto, sus propiedades SÍ pueden cambiar. Lo veremos en el ejemplo siguiente."

**Analogía:** "Imaginen que `const` es como una taquilla asignada. No pueden cambiar la taquilla, pero pueden cambiar lo que hay dentro."

**Pregunta:** "¿Saben por qué `var` es problemático? Imaginen que declaran una variable dentro de un `if` o un `for` esperando que solo exista ahí dentro, pero con `var` esa variable 'se escapa' y está disponible fuera también. Eso puede sobrescribir otras variables sin que se den cuenta. Con `let` y `const` eso no pasa: solo existen dentro del bloque donde las declaran. Por eso desde ES6+ se recomienda no usar `var`."

**Transición:** "Veamos un ejemplo práctico de cómo declarar variables."

---

## Slide 7 — Ejemplo: Declarar Variables

**Explicación al alumno:**

> "Vamos a ver código real. Fíjense en los comentarios que empiezan con `//`.
>
> - Con `var` declaramos `nombre`. Pero como dijimos, evítenlo.
> - Con `let` declaramos `edad`. Primero vale 30, luego cambia a 31. Esto es perfectamente válido.
> - Con `const` declaramos `PI`. Si intentamos cambiar PI, JavaScript nos da un error.
> - Luego viene el caso interesante: `const usuario = { nombre: "Ana", edad: 25 }`. La variable `usuario` no puede reasignarse (no podemos hacer `usuario = {}`), pero **sí podemos modificar sus propiedades**: `usuario.edad = 26` funciona.
>
> A esto se le llama que los objetos son **mutables** aunque se declaren con `const`."

**Demo en vivo:** Abre la consola del navegador y escribe estos ejemplos. Muestra el error al reasignar una constante. Los alumnos recordarán mejor lo que ven en pantalla.

**Pregunta trampa:** "¿Qué pasa si hago `PI = 3.15`?" (Error: Assignment to constant variable.)

**Transición:** "Y hablando de comentarios... ¿cómo se escriben y para qué sirven?"

---

## Slide 8 — Comentarios en JavaScript

**Explicación al alumno:**

> "Los comentarios son texto que JavaScript ignora por completo. Sirven para:
> - Explicar qué hace un bloque de código
> - Dejar notas para otros programadores (o para ti mismo en el futuro)
> - **Desactivar temporalmente** líneas de código mientras depuras
>
> Tenemos dos tipos:
> - **Una línea**: `//` Todo lo que va después en esa línea es un comentario.
> - **Varias líneas**: `/* ... */` Todo lo que está entre las marcas es un comentario.
>
> Una buena práctica: comenten el **por qué** hacen algo, no el **qué**. El código ya dice qué hace. Por ejemplo:
> - Mal: `// Sumar 5 + 3` (el código ya muestra que sumas)
> - Bien: `// Usamos 5% de descuento por ser cliente nuevo` (explica la intención)"

**Analogía:** "Los comentarios son como las notas adhesivas que ponen en un libro de texto. Les ayudan a recordar por qué algo es importante."

**Transición:** "Perfecto. Pasemos a los tipos de datos que podemos guardar en las variables."

---

## Slide 9 — Tipos de Datos Primitivos

**Explicación al alumno:**

> "En JavaScript tenemos tipos de datos **primitivos**. Hoy veremos los tres más importantes:
>
> - **String** (cadena de texto): se escribe entre comillas dobles `" "` o simples `' '`. En JavaScript da igual cuál uses, pero sean **consistentes**. En este curso usaremos dobles.
> - **Number** (número): no hay diferenciación entre enteros y decimales. Tanto `25` como `19.99` son del tipo `number`.
> - **Boolean** (booleano): solo tiene dos valores: `true` (verdadero) o `false` (falso). Es fundamental para la lógica y las condiciones.
>
> Fíjense: los strings se declaran con comillas, los números sin comillas. Es muy importante no confundirlos. `"25"` (string) es diferente de `25` (number)."

**Pregunta a la clase:** "¿Qué creen que pasa si sumo `"5" + 3`?" (Genera intriga para el slide de coerción.)

**Mini-ejercicio mental:** "Piensen en tres variables que podrían necesitar en un programa. ¿De qué tipo sería cada una?" (Ej: nombre → string, edad → number, mayorDeEdad → boolean)

**Transición:** "Y además de estos, hay dos valores especiales que deben conocer: `null` y `undefined`."

---

## Slide 10 — Tipos de Datos: null y undefined

**Explicación al alumno:**

> "`undefined` y `null` son dos valores que suelen confundirse, pero tienen significados distintos.
>
> - **`undefined`**: significa que una variable ha sido declarada pero **no se le ha asignado ningún valor**. Es el valor por defecto de JavaScript cuando declaramos y no asignamos.
> - **`null`**: significa que la variable tiene un valor **intencionalmente vacío**. El programador decide asignarle `null` para indicar 'sin valor'.
>
> Es la diferencia entre:
> - Tener una caja vacía porque nadie la ha llenado todavía (`undefined`)
> - Tener una caja vacía porque alguien la vació a propósito (`null`)"

**Pregunta:** "Si declaro `let precio;` sin asignar nada, ¿qué valor tiene?" (undefined)

**Transición:** "Ahora que sabemos guardar datos, veamos qué podemos hacer con ellos: los operadores."

---

## Slide 11 — Operadores Aritméticos

**Explicación al alumno:**

> "Los operadores aritméticos son los que usamos para hacer cálculos matemáticos. La mayoría los conocen de las matemáticas:
>
> - `+` Suma. Ojo: también sirve para concatenar strings.
> - `-` Resta.
> - `*` Multiplicación.
> - `/` División.
> - `%` Módulo o resto de la división. Muy útil para saber si un número es par (`numero % 2 === 0`).
> - `**` Exponenciación (base elevada a exponente). ES6+.
>
> Ejemplos destacables:
> - `17 % 5 = 2` porque 5 cabe 3 veces en 17 (15) y sobran 2.
> - `2 ** 3 = 8` porque 2³ = 2×2×2 = 8."

**Pregunta:** "¿Para qué creen que sirve el operador módulo `%` en programación?" (Ejemplos: saber si un número es par o impar, ciclos, horas, etc.)

**Transición:** "Ahora, ¿cómo hacemos para actualizar el valor de una variable de forma más eficiente?"

---

## Slide 12 — Operadores de Asignación

**Explicación al alumno:**

> "Los operadores de asignación nos permiten modificar el valor de una variable de forma abreviada.
>
> En lugar de escribir:
> ```javascript
> x = x + 3;
> ```
> Podemos escribir:
> ```javascript
> x += 3;
> ```
>
> Esto funciona con todos los operadores aritméticos: `+=`, `-=`, `*=`, `/=`.
>
> La ventaja: es más corto y más legible cuando estás acumulando valores. Lo usarán mucho en bucles (sesión 10)."

**Demo en vivo:** "Abrimos la consola y probamos: `let contador = 0; contador += 5; console.log(contador);`"

**Transición:** "Muy bien. Pasemos a un tema fundamental: cómo comparar valores."

---

## Slide 13 — Interactuar con el Usuario

**Explicación al alumno:**

> "JavaScript nos da tres funciones muy útiles para interactuar con el usuario:
>
> 1. **`alert()`**: Muestra un mensaje en una ventanita emergente. El usuario solo puede hacer clic en 'Aceptar'.
> 2. **`prompt()`**: Muestra un mensaje y pide al usuario que escriba algo. Devuelve lo que el usuario escribió (como string).
> 3. **`console.log()`**: No lo ve el usuario, pero nosotros sí. Muestra mensajes en la **consola del navegador**. Es nuestra herramienta de depuración favorita.
>
> También tenemos `console.warn()` para advertencias (aparece en amarillo) y `console.error()` para errores (en rojo).
>
> Para abrir la consola: **F12** o botón derecho → Inspeccionar → pestaña Console."

**Demo en vivo:** Pide a los alumnos que abran la consola (F12). Escribe:
```javascript
alert("¡Hola, clase!");
let nombre = prompt("¿Cómo te llamas?");
console.log("El alumno se llama:", nombre);
```

**Pregunta:** "¿Qué tipo de dato devuelve `prompt()`?" (String, siempre. Por eso luego tenemos que convertirlo.)

**Transición:** "Hablando de conversión... ¿qué pasa cuando mezclamos tipos?"

---

## Slide 14 — Conversión de Tipos (Coerción)

**Explicación al alumno:**

> "En JavaScript hay dos tipos de conversión:
>
> **1. Implícita** — JavaScript la hace automáticamente. Eso puede ser útil pero también peligroso.
> - `"5" + 3` → `"53"` (convierte el número a string y concatena)
> - `"5" - 3` → `2` (convierte el string a número y resta)
> - `"5" == 5` → `true` (convierte el string a número para comparar)
>
> **2. Explícita** — Nosotros controlamos la conversión:
> - `Number("5")` → 5 (string a número)
> - `String(5)` → `"5"` (número a string)
> - `Boolean(1)` → `true` (número a booleano)
> - `parseInt("5")` → 5 (string a entero)
> - `parseFloat("5.5")` → 5.5 (string a decimal)
>
> La regla: **sean explícitos, no confíen en la coerción automática**. Especialmente con `prompt()`, que siempre devuelve string."

**Pregunta trampa:** "¿Qué da `"10" + 5`?" ("105" — porque el + con strings concatena)

**Pregunta:** "¿Y `"10" - 5`?" (5 — porque el - solo tiene sentido matemático)

**Transición:** "Ahora que tenemos todos los conceptos, veamos un par de buenas prácticas antes del ejemplo final."

---

## Slide 15 — Buenas Prácticas y Nomenclatura

**Explicación al alumno:**

> "Desde el primer día quiero que escriban código limpio. Vamos a establecer las reglas:
>
> 1. **camelCase**: la primera palabra en minúscula, las siguientes con mayúscula inicial. Ej: `nombreUsuario`, `edadPersona`, `precioTotal`. No usen guiones bajos ni mayúscula inicial.
> 2. **Nombres descriptivos**: `precioTotal` es mejor que `pt`. Dentro de un mes, cuando vuelvan a leer su código, se lo agradecerán.
> 3. **`const` por defecto**: solo usen `let` si el valor va a cambiar. `var` queda prohibido en esta clase.
> 4. **Punto y coma**: es opcional en JS, pero sean consistentes. En este curso lo usaremos.
> 5. **Comentarios**: expliquen el **por qué**, no el **qué**. El código ya dice qué hace."

**Refuerzo:** "Estas no son opcionales. Las evaluaré en los ejercicios."

**Transición:** "Ahora sí, veamos un ejemplo que integra todo lo que hemos aprendido."

---

## Slide 16 — Ejemplo Completo

**Explicación al alumno:**

> "Vamos a analizar este programa juntos. Es una calculadora simple:
>
> 1. Pedimos dos números con `prompt()`
> 2. Los convertimos con `Number()`
> 3. Realizamos las 4 operaciones aritméticas
> 4. Mostramos los resultados con `alert()`
>
> Fíjense en los comentarios: explican cada bloque. Esto es un ejemplo de código limpio.
>
> También noten: usamos `let` porque `num1` y `num2` cambian de valor (de string a número).
>
> Este programa lo van a hacer ustedes en el ejercicio 1 de la práctica."

**Demo en vivo:** Ejecuta el código en la consola o abre el archivo de ejemplo. Muestra cómo funciona con valores reales.

**Pregunta:** "¿Qué pasa si no convierto con `Number()`?" (Los números se concatenarían como strings: "5"+"3"="53")

**Transición:** "Perfecto. Ahora es su turno."

---

## Slide 17 — Actividad Práctica

**Explicación al alumno:**

> "Vamos a la práctica. Tienen **2 horas y media** para resolver estos ejercicios:
>
> **Ejercicio 1 — Calculadora Básica** (Básico): Pedir dos números y mostrar el resultado de las 4 operaciones aritméticas. Usen `Number()` para convertir los valores y `alert()` para mostrar los resultados.
>
> **Ejercicio 2 — Repartidor de Cuenta** (Intermedio): Calcular cuánto debe pagar cada persona al dividir una cuenta de restaurante, incluyendo propina. Usen `toFixed(2)` para los decimales.
>
> IMPORTANTE: Intenten resolverlos solos antes de mirar las soluciones. Los errores son parte del aprendizaje."

**Instrucciones:** "Abran el enlace 'Ver Ejercicios' que les lleva al listado. Cada ejercicio tiene su enunciado y pistas si se atascan."

**Transición:** Antes de que empiecen, repasa en 1 minuto el resumen de la sesión (slide 18).

---

## Slide 18 — Resumen de la Sesión

**Explicación al alumno (recapitulación rápida):**

> "Antes de que empiecen con los ejercicios, repasemos los puntos clave:
>
> - **JavaScript** es el lenguaje de comportamiento de la web.
> - **Tríada web**: HTML estructura + CSS presentación + JS comportamiento.
> - **Variables**: `const` por defecto, `let` si se reasigna, `var` ni tocarlo.
> - **Tipos primitivos**: string, number, boolean, null, undefined.
> - **Operadores**: aritméticos (+, -, *, /, %, **) y de asignación (+=, -=...).
> - **Interacción**: alert(), prompt(), console.log().
> - **Conversión**: Number(), String(), Boolean() — sean explícitos.
> - **Buenas prácticas**: camelCase, nombres descriptivos, comentarios."

**Pregunta final:** "¿Alguna duda antes de empezar la práctica?"

---

## Slide 19 — Temas Próximos

**Explicación al alumno:**

> "En la **Sesión 10** veremos:
> - **Operadores de comparación y lógicos**: `===`, `!==`, `>`, `<`, `&&`, `||`, `!`.
> - **Condicionales**: `if`, `else if`, `else` y `switch` para tomar decisiones.
> - **Operador ternario**: una forma compacta de escribir if/else.
> - **Bucles**: `for`, `while` y `do-while` para repetir acciones.
> - **Ejercicios de lógica**: pondremos en práctica todo.
>
> Como lectura recomendada, les dejo la guía de MDN sobre JavaScript. Es la mejor fuente de documentación.
>
> ¡Manos a la obra con los ejercicios!"

**Cierre:** "Recuerden: la programación se aprende **programando**. No tengan miedo a equivocarse. Cada error es una oportunidad para aprender. ¡Ánimo!"
