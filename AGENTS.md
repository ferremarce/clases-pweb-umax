# AGENTS.md - Guía para Agentes de Código

> **NOTA:** Este archivo es la guía principal. Para crear presentaciones de sesiones de clase, usar el subagente `sesiones_clase/AGENT.md`.

## 1. Identificación del Proyecto

- **Curso:** INI04 - Introducción al Desarrollo Web
- **Duración:** 18 sesiones × 4 horas = 72 horas totales
- **Tecnologías:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Idioma:** Español para contenido educativo, inglés para código
- **Experiencia:** Los estudiantes son de primer curso de la carrera de ingenieria informática (nivel principiante)
- **Sesiones de clase***: cada sesion de clase debe durar aproximadamente 4hs incluyendo teoria, práctica y ejercicios propuestos.
- **Cantidad de slides**: al menos debe tener 15 slides
---

## 2. Estructura de Carpetas

```
clases-pweb-umax/
├── AGENTS.md                      (este archivo - guía general)
├── readme.md
├── ejercicios_clase/
│   ├── sesion-01/
│   │   ├── index.html
│   │   ├── estilos.css
│   │   └── script.js
│   ├── sesion-02/
│   │   └── ...
│   └── sesion-18/
├── img/
│   ├── logo-umax.png          (logo institucional)
│   └── ...                    (imágenes de apoyo)
├── plan_clase/
│   ├── plan_de_clase.html     (plan general 18 sesiones)
│   └── contenidos_unidades.html (contenido detallado)
└── sesiones_clase/
    ├── AGENT.md               (formatos y estilos para presentaciones)
    ├── sesion-01.html         (presentación sesión 1)
    ├── sesion-02.html
    └── sesion-18.html
```

---

## 3. Convenciones de Nombres

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Carpetas sesión | `sesion-XX` (2 dígitos) | `sesion-01/`, `sesion-12/` |
| Archivos | `kebab-case` | `estilos-generales.css` |
| Clases CSS | `kebab-case` | `.tarjeta-principal` |
| Variables JS | `camelCase` | `nombreUsuario`, `esValido` |
| Funciones JS | `camelCase` | `calcularTotal()`, `validarFormulario()` |
| Constantes JS | `UPPER_SNAKE_CASE` | `MAX_INTENTOS`, `API_URL` |

---

## 4. Estándares HTML

### 4.1 Estructura Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título de la Sesión - INI04</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <!-- Contenido -->
    <script src="script.js"></script>
</body>
</html>
```

### 4.2 Reglas

- Usar siempre `<!DOCTYPE html>` y `lang="es"`
- Incluir logo UMAX (`img/logo-umax.png`) en el header de presentaciones
- HTML5 semántico: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- Todos los `<img>` deben tener atributo `alt` descriptivo
- Usar `<button>` para botones, `<a>` para enlaces
-表单 (forms) deben tener `<label>` asociado a cada input

---

## 5. Estándares CSS

### 5.1 Variables CSS (obligatorio)

```css
:root {
    --color-primario: #8B0000;      /* Rojo oscuro */
    --color-secundario: #DC143C;    /* Rojo carmesí */
    --color-fondo: #FFFFFF;         /* Blanco */
    --color-texto: #1a1a1a;
    --color-texto-claro: #555555;
    --sombra: 0 2px 8px rgba(0,0,0,0.1);
    --borde-radio: 8px;
}
```

### 5.2 Reglas

- Usar `box-sizing: border-box` globalmente
- Sistema de diseño mobile-first (min-width en media queries)
- Separar propiedades por lógica: ubicación → tamaño → color → tipografía
- No usar `!important` excepto para overrides de Bootstrap
- Preferir clases reutilizables sobre selectores específicos
- Usar Flexbox y Grid para layouts, evitar floats

### 5.3 Clases Utilitarias Comunes

```css
.contenedor { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.tarjeta { background: white; border-radius: var(--borde-radio); box-shadow: var(--sombra); }
.btn-primario { background: var(--color-primario); color: white; }
.btn-secundario { background: var(--color-secundario); color: white; }
.texto-centrado { text-align: center; }
```

---

## 6. Estándares JavaScript

### 6.1 Reglas

- Usar ES6+: `const`, `let`, arrow functions, template literals
- Declarar variables con nombres descriptivos en español para estudiantes
- Comentarios en español que expliquen el "por qué", no el "qué"
- Funciones pequeñas y con responsabilidad única
- Manejo de errores con `try/catch` en ejemplos educativos

### 6.2 Ejemplo

```javascript
// Validar que el campo no esté vacío
function validarCampo(nombreCampo) {
    const campo = document.getElementById(nombreCampo);
    if (!campo.value.trim()) {
        throw new Error(`El campo ${nombreCampo} es obligatorio`);
    }
    return true;
}

// Event listener con validación
document.getElementById('btnEnviar').addEventListener('click', () => {
    try {
        validarCampo('nombre');
        mostrarMensaje('Formulario válido', 'success');
    } catch (error) {
        mostrarMensaje(error.message, 'error');
    }
});
```

---

## 7. Presentaciones de Sesiones de Clase

> **NOTA IMPORTANTE:** El archivo `sesiones_clase/AGENT.md` es un subagente especializado en la elaboración de presentaciones para las sesiones de clase.
>
> Para crear cualquier presentación de sesión de clase, **DEBE** consultarse y utilizarse exclusivamente el archivo `sesiones_clase/AGENT.md`, el cual contiene todos los formatos, estilos y plantillas actualizadas para generar las presentaciones del curso.
>
> El AGENTS.md principal solo proporciona referencias generales del proyecto.

---

## 8. Formato Ejercicios (ejercicios_clase/sesion-XX/)

### 8.1 Estructura por Sesión

```
sesion-05/
├── index.html           (enunciado del ejercicio)
├── ejercicios/
│   ├── ejercicio-01.html
│   ├── ejercicio-02.html
│   └── ejercicio-03.html
├── soluciones/
│   ├── solucion-01.html
│   └── ...
├── assets/
│   ├── estilos.css
│   └── script.js
└── README.md           (instrucciones para el estudiante)
```

### 8.2 Plantilla de Enunciado

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio X - Sesión Y - INI04</title>
    <link rel="stylesheet" href="../assets/estilos.css">
</head>
<body>
    <header>
        <img src="../../img/logo-umax.png" alt="Logo UMAX">
        <h1>Ejercicio 1: Título del Ejercicio</h1>
    </header>

    <main>
        <section class="enunciado">
            <h2>📝 Enunciado</h2>
            <p>Descripción clara de lo que debe hacer el estudiante...</p>
        </section>

        <section class="resultado-esperado">
            <h2>✅ Resultado Esperado</h2>
            <p>Descripción o imagen del resultado...</p>
        </section>

        <section class="pistas">
            <details>
                <summary>💡 Pistas</summary>
                <ul>
                    <li>Pista 1...</li>
                    <li>Pista 2...</li>
                </ul>
            </details>
        </section>
    </main>

    <script src="../assets/script.js"></script>
</body>
</html>
```

### 8.3 Reglas

- Enunciado claro y conciso en español
- Código base proporcionado para no partir de cero
- Resultado esperado visible o describible
- Secciones de pistas collapsible con `<details>`
- Niveles de dificultad: Básico, Intermedio, Avanzado

---

## 9. Flujo de Git

### 9.1 Commits

```
feat: agrega presentacion sesion-03 HTML y CSS
feat: agrega ejercicios sesion-04 formularios
fix: corrige error en solucion ejercicio-02
docs: actualiza plan de clase unidad III
```

### 9.2 Ramas

```
main                    (producción)
├── sesion-XX           (desarrollo por sesión)
└── hotfix-XXX          (correcciones urgentes)
```

### 9.3 Reglas

- Commits atómicos: un cambio por commit
- Mensajes en español, imperativos presente
- Hacer commit SOLO cuando el usuario lo solicite explícitamente
- NO hacer commit automáticamente después de cada cambio
- Para hacer commit, usar: `git add . && git commit -m "mensaje"`
- El push se hace por separado solo cuando el usuario lo pida
- Pull requests con descripción del contenido agregado

---

## 10. Checklist de Calidad

Antes de crear contenido nuevo, verificar:

- [ ] HTML usa semántica correcta
- [ ] Logo UMAX presente en presentaciones
- [ ] Variables CSS definidas con colores institucionales
- [ ] Código JavaScript usa ES6+
- [ ] Atributos `alt` en todas las imágenes
- [ ] Diseño responsive (mobile-first)
- [ ] Archivos organizados en estructura correcta
- [ ] Commits descriptivos en español
