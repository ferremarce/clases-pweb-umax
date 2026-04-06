# AGENT.md - Subagente de Sesiones (Presentaciones, Ejercicios y Soluciones)

> Subagente especializado en elaborar presentaciones de clase, ejercicios de práctica y soluciones del curso INI04.
> Invocado desde AGENTS.md cuando se requieren contenidos de sesiones.

---

## 1. Slides de Presentación (index.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sesión X: Título - INI04</title>
    <link rel="stylesheet" href="css/estilos_slides.css">
</head>
<body>
    <header class="presentacion-header">
        <img src="images/logo_umax.png" alt="Logo UMAX" class="logo">
        <div class="titulos">
            <h1>Sesión X: Título</h1>
            <div class="subtitulo">INI04 - Desarrollo Web | Unidad Y</div>
        </div>
        <div class="profesor">Prof. Ing. Juan M. Ferreira
            <div class="enlaces-plan">
                <a href="../../plan_clase/plan_de_clase_general.html" target="_blank">Plan General</a>
                <a href="../../plan_clase/plan_de_clase_detallado.html" target="_blank">Plan Detallado</a>
            </div>
        </div>
    </header>

    <main class="contenedor">
        <section class="diapositiva" id="slide-01">
            <img src="images/logo_umax.png" alt="Logo" class="logo-grande">
            <h2>Título de la Sesión</h2>
            <p style="font-size: 1.3rem; color: var(--color-texto-claro); margin-top: 10px;">Unidad Y</p>
        </section>
        <section class="diapositiva" id="slide-02"><!-- Contenido --></section>
        <!-- Más slides (mín 15) -->
        <section class="diapositiva" id="slide-XX">
            <a href="#" class="btn-navegacion" onclick="window.scrollTo(0, 0); return false;" style="display: block; margin: 30px auto 10px; width: fit-content;">Volver al Inicio</a>
        </section>
    </main>
    <script src="js/script.js"></script>
</body>
</html>
```

---

## 2. CSS de Slides

> Todo el CSS de presentaciones está en `css/estilos_slides.css`. No usar CSS inline.

---

## 3. JavaScript

> El JavaScript para navegación de slides está en `js/script.js`.

---

## 4. Ejercicios de Práctica

### 4.1 index_ejercicios.html (Índice de ejercicios)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicios - Sesión X - INI04</title>
    <link rel="stylesheet" href="css/estilos_practica.css">
</head>
<body>
    <header class="header-ejercicios">
        <img src="images/logo_umax.png" alt="Logo UMAX">
        <div class="header-texto">
            <h1>Sesión X: Título de la Sesión</h1>
            <p>Ejercicios de Práctica</p>
        </div>
        <div class="profesor">Prof. Ing. Juan M. Ferreira</div>
    </header>

    <main class="contenedor">
        <section class="instrucciones">
            <h2>Instrucciones Generales</h2>
            <div class="tarjeta">
                <p>Descripción de la actividad.</p>
                <p><strong>Duración:</strong> X horas</p>
            </div>
        </section>

        <section class="ejercicios-lista">
            <h2>Ejercicios</h2>
            
            <div class="tarjeta-ejercicio">
                <div class="ejercicio-numero">01</div>
                <div class="ejercicio-contenido">
                    <h3>Nombre del Ejercicio</h3>
                    <span class="badge-dificultad">Básico</span>
                    <p>Descripción breve.</p>
                    <a href="ejercicios/ejercicio_01.html" class="btn-ejercicio">Ver Enunciado</a>
                    <a href="soluciones/solucion_01.html" class="btn-ejercicio btn-secundario btn-solucion" style="display:none;">Ver Solución</a>
                </div>
            </div>

            <!-- Más ejercicios -->
        </section>

        <section class="recursos">
            <h2>Recursos de Apoyo</h2>
            <div class="tarjeta">
                <h3>Documentación recomendada:</h3>
                <ul>
                    <li><a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank">MDN Web Docs - HTML</a></li>
                    <li><a href="https://www.w3schools.com/html/" target="_blank">W3Schools - Tutorial de HTML</a></li>
                </ul>
            </div>
        </section>
    </main>

    <!-- Script para mostrar botones de solución solo en localhost/127.0.0.1 -->
    <script>
        (function() {
            const allowedHosts = ['127.0.0.1', 'localhost', ''];
            const currentHost = window.location.hostname;
            const isLocal = allowedHosts.includes(currentHost) || window.location.protocol === 'file:';
            
            if (isLocal) {
                const buttons = document.querySelectorAll('.btn-solucion');
                buttons.forEach(btn => btn.style.display = 'inline-block');
            }
        })();
    </script>
</body>
</html>
```

### 4.2 ejercicios/ejercicio_XX.html (Enunciados)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio X - Nombre - INI04</title>
    <link rel="stylesheet" href="../css/estilos_practica.css">
</head>
<body>
    <header class="header-ejercicios">
        <img src="../images/logo_umax.png" alt="Logo UMAX">
        <div class="header-texto">
            <h1>Ejercicio X: Nombre del Ejercicio</h1>
            <p>Sesión N - Título de la Sesión</p>
        </div>
        <div class="profesor">Prof. Ing. Juan M. Ferreira</div>
    </header>

    <main class="contenedor">
        <div class="enunciado">
            <section class="requisitos">
                <h2>📝 Enunciado</h2>
                <p>Descripción del ejercicio.</p>
            </section>

            <section class="requisitos">
                <h2>✅ Requisitos</h2>
                <ul>
                    <li>Requisito 1</li>
                    <li>Requisito 2</li>
                </ul>
            </section>

            <section class="pistas">
                <h2>💡 Pistas</h2>
                <details>
                    <summary>Ver pistas</summary>
                    <ul>
                        <li>Pista 1</li>
                        <li>Pista 2</li>
                    </ul>
                </details>
            </section>

            <section class="resultado-esperado">
                <h2>🎯 Resultado Esperado</h2>
                <p>Descripción visual o textual del resultado.</p>
            </section>
        </div>
    </main>
</body>
</html>
```

### 4.3 CSS de Práctica

> Todo el CSS de ejercicios y soluciones está en `css/estilos_practica.css`. No usar CSS inline.
> Los estilos incluyen: header-ejercicios, contenedor, enunciado, requisitos, pistas, solucion, codigo, vista-previa.

---

## 5. Soluciones

### 5.1 soluciones/solucion_XX.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solución Ejercicio X - Nombre</title>
    <link rel="stylesheet" href="../css/estilos_practica.css">
</head>
<body>
    <header class="header-ejercicios">
        <img src="../images/logo_umax.png" alt="Logo UMAX">
        <div class="header-texto">
            <h1>Solución: Ejercicio X - Nombre</h1>
            <p>Sesión N - Título de la Sesión</p>
        </div>
        <div class="profesor">Prof. Ing. Juan M. Ferreira</div>
    </header>

    <main class="contenedor">
        <div class="solucion">
            <h2>Código de la Solución</h2>
            
            <div class="codigo">
<span class="comentario">&lt;!-- Código con highlighting --&gt;</span>
<span class="etiqueta">&lt;html&gt;</span>...<span class="etiqueta">&lt;/html&gt;</span>
            </div>

            <div class="nota">
                <strong>💡 Nota:</strong> Esta es UNA posible solución.
            </div>

            <h2>Resultado Visual</h2>
            <div class="vista-previa">
                <!-- Renderizado visual del código -->
            </div>
        </div>
    </main>
</body>
</html>
```

---

## 6. Estructura de Carpetas

```
sesion_XX/
├── index.html              (presentación de la sesión)
├── index_ejercicios.html   (índice de ejercicios)
├── README.md
├── ejercicios/
│   ├── ejercicio_01.html
│   ├── ejercicio_02.html
│   └── ejercicio_03.html
├── soluciones/
│   ├── solucion_01.html
│   ├── solucion_02.html
│   └── solucion_03.html
├── css/
│   ├── estilos_slides.css
│   └── estilos_practica.css
├── js/
│   └── script.js
└── images/
    ├── logo_umax.png
    └── ...
```

---

## 7. Reglas

### Slides de Presentación
- Mín: 15 slides por sesión
- Slide-01: Logo UMAX (100px), título, unidad
- Slide final: Resumen y temas próximos
- Navegación: Scroll vertical + botón "Siguiente"
- Header: Completo en slide-01, mini en slide-02+
- Código: `<pre><code>` con colores para sintaxis
- Imágenes: `images/` con nombres descriptivos
- Responsive: Probar en 768px y 480px

### Ejercicios
- Usar siempre `css/estilos_practica.css` (NO CSS inline)
- Header: clase `header-ejercicios` con logo, título, subtítulo y profesor alineado a la derecha
- Estructura: `<header>`, `<main class="contenedor">`, contenido en `<div class="enunciado">`
- **Incluir badge de dificultad** (Básico/Intermedio/Avanzado) con clase `.badge-dificultad`
- Profesores: siempre "Prof. Ing. Juan M. Ferreira"
- Botones "Ver Enunciado" y "Ver Solución" en cada ejercicio (el botón solución solo visible en localhost/127.0.0.1)

### Soluciones
- Usar siempre `css/estilos_practica.css` (NO CSS inline)
- **Incluir badge de dificultad** (Básico/Intermedio/Avanzado) con clase `.badge-dificultad`
- Incluir código con highlighting + resultado visual
- Estructura similar a ejercicios
- Usar clases: `.codigo`, `.comentario`, `.etiqueta`, `.atributo`, `.valor`, `.vista-previa`, `.nota`

### Convenciones de Nombres
- Archivos: snake_case (ejercicio_01.html, solucion_02.html)
- Imágenes: snake_case (logo_umax.png, diagrama_cliente_servidor.png)
- Carpetas sesión: sesion_XX (sesion_01, sesion_02)

### Rutas
- Desde sesión raíz: `css/`, `js/`, `images/`
- Desde ejercicios/soluciones: `../css/`, `../images/`
- Links a planes: `../../plan_clase/`

---

## 8. Directrices de Ejercicios

### Siempre 3 ejercicios por sesión

| Ejercicio | Nivel | Descripción |
|-----------|-------|-------------|
| ejercicio_01.html | **Básico** | Conceptos fundamentales, introducción al tema |
| ejercicio_02.html | **Intermedio** | Aplicación de conceptos, práctica guiada |
| ejercicio_03.html | **Avanzado** | Integración, desafíos, uso de todos los conceptos |

### Estructura de cada ejercicio
- **Enunciado:** claro y conciso
- **Requisitos:** específicos y medibles
- **Pistas:** opcionales (usar `<details><summary>`)
- **Resultado esperado:** visual o textual

### Estructura de cada solución
- Código con highlighting de sintaxis
- Resultado visual renderizado
- Nota explicativa ("UNA posible solución")

### Notas importantes
- Los niveles (Básico/Intermedio/Avanzado) se muestran como badges en la UI usando la clase `.badge-dificultad`
- El subagente debe crear los 3 ejercicios en orden de dificultad progresiva
- Los botones "Ver Solución" solo son visibles cuando se accede desde localhost o 127.0.0.1

---

## 9. Comportamiento con Git

Sigue la directivas del AGENTS.md principal

---

## 10. Actualización de Enlaces en Planes de Clase

### Regla Obligatoria
Al crear una nueva sesión, EL SUBAGENTE DEBE actualizar automáticamente los enlaces en:
1. `plan_clase/plan_de_clase_general.html` - Tabla de sesiones (línea por sesión)
2. `plan_clase/plan_de_clase_detallado.html` - Cards de cada sesión

### Enlaces a incluir en plan_detallado:

| Enlace | Ruta | Descripción |
|--------|------|-------------|
| Presentación | `../sesiones_clase/sesion_XX/index.html` | Slide de la sesión |
| Ejercicios | `../sesiones_clase/sesion_XX/index_ejercicios.html` | Índice de ejercicios |

### Formato de enlace para plan_detallado:

```html
<span class="session-title">
    <a href="../sesiones_clase/sesion_XX/index.html">Título de la Sesión</a>
</span>
<span class="session-exercises">
    <a href="../sesiones_clase/sesion_XX/index_ejercicios.html">📝 Ejercicios</a>
</span>
```

### CSS requerido para .session-exercises:
```css
.session-exercises {
    margin-left: auto;
}

.session-exercises a {
    background: #28a745;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
}
```

### Ejecutar SIEMPRE antes de finalizar la sesión
1. Crear la estructura de carpetas y archivos de la sesión
2. Crear el archivo `index_ejercicios.html`
3. Actualizar el enlace en plan_general.html
4. Actualizar ambos enlaces en plan_detallado.html (presentación + ejercicios)
5. Verificar que todos los enlaces funcionen 