# AGENTS.md - Guía para Agentes de Código

> Guía principal. Para presentaciones, usar `sesiones_clase/AGENT.md`.

---

## 1. Proyecto

- **Curso:** INI04 - Introducción al Desarrollo Web
- **Duración:** 18 sesiones × 4h = 72h totales
- **Tecnologías:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Idioma:** Español (contenido), Inglés (código)
- **Estudiantes:** Primer curso, nivel principiante
- **Sesiones:** ~4h con teoría, práctica y ejercicios

---

## 2. Estructura

```
clases-pweb-umax/
├── AGENTS.md / readme.md
├── ejercicios_clase/sesion-XX/
├── img/ (logo-umax.png, ...)
├── plan_clase/
│   ├── plan_de_clase_general.html
│   └── plan_de_clase_detallado.html
└── sesiones_clase/
    ├── AGENT.md
    └── sesion_01.html ... sesion_18.html
```

---

## 3. Convenciones

| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Carpetas sesión | `sesion-XX` | `sesion-01/` |
| Archivos | `kebab-case` | `estilos-generales.css` |
| Clases CSS | `kebab-case` | `.tarjeta-principal` |
| Variables/Funciones JS | `camelCase` | `nombreUsuario` |
| Constantes JS | `UPPER_SNAKE_CASE` | `MAX_INTENTOS` |

---

## 4. Estándares

### HTML
- `<!DOCTYPE html>` + `lang="es"`
- Logo UMAX en header (`img/logo-umax.png`)
- Semántico: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- Imágenes con `alt` descriptivo
- Botones con `<button>`, enlaces con `<a>`
- Formularios con `<label>` asociados

### CSS
```css
:root { --color-primario: #8B0000; --color-secundario: #DC143C; --color-fondo: #fff; --color-texto: #1a1a1a; --sombra: 0 4px 12px rgba(0,0,0,0.15); --radio: 12px; }
* { box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; }
.tarjeta { background: white; border-radius: var(--radio); box-shadow: var(--sombra); }
.btn-primario { background: var(--color-primario); color: white; }
```
- Mobile-first, Flexbox/Grid para layouts

### JS
- ES6+: `const`, `let`, arrow functions, template literals
- Variables en español para estudiantes
- Funciones pequeñas con responsabilidad única
- try/catch para manejo de errores

```javascript
const validarCampo = (id) => {
    const campo = document.getElementById(id);
    if (!campo.value.trim()) throw new Error(`Campo ${id} obligatorio`);
    return true;
};
```

---

## 5. Presentaciones

> Usar `sesiones_clase/AGENT.md` para crear/modificar presentaciones de sesiones.

---

## 6. Ejercicios

```
sesion-XX/
├── index.html        (enunciado)
├── ejercicios/
│   ├── ejercicio-01.html ...
├── soluciones/
│   ├── solucion-01.html ...
├── assets/
│   ├── estilos.css / script.js
└── README.md
```

### Plantilla
```html
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ejercicio - INI04</title><link rel="stylesheet" href="../assets/estilos.css"></head><body><header><img src="../../img/logo-umax.png" alt="Logo"><h1>Ejercicio</h1></header><main><section class="enunciado"><h2>Enunciado</h2><p>...</p></section><section class="resultado"><h2>Resultado Esperado</h2><p>...</p></section><section class="pistas"><details><summary>Pistas</summary><ul><li>...</li></ul></details></section></main><script src="../assets/script.js"></script></body></html>
```
- Enunciado claro, código base proporcionado, pistas con `<details>`

---

## 7. Git

### Commits
```
feat: agrega sesión 03 HTML y CSS
fix: corrige error en solución
docs: actualiza plan de clase
```

### Ramas
```
main → producción
├── sesion-XX → desarrollo
└── hotfix-XXX → correcciones
```

### Reglas
- Un cambio por commit
- Mensajes en español, imperativo presente
- Commit solo cuando se solicite
- Push por separado

---

## 8. Checklist

- [ ] HTML semántico correcto
- [ ] Logo UMAX en presentaciones
- [ ] Variables CSS con colores institucionales
- [ ] JS con ES6+
- [ ] Atributos `alt` en imágenes
- [ ] Diseño responsive
- [ ] Archivos organizados
- [ ] Commits descriptivos en español
