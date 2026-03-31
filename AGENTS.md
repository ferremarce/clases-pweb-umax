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
├── img/ (logo_umax.png, ...)
├── plan_clase/
│   ├── plan_de_clase_general.html
│   └── plan_de_clase_detallado.html
└── sesiones_clase/
    ├── AGENT.md
    └── sesion_01/
        ├── index.html              (presentación)
        ├── index_ejercicios.html  (enunciados)
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
            └── ...
```

---

## 3. Convenciones

| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Carpetas sesión | `sesion-XX` | `sesion_01/` |
| Archivos | `snake_case` | `estilos_generales.css` |
| Clases CSS | `snake_case` | `.tarjeta_principal` |
| Variables/Funciones JS | `camelCase` | `nombreUsuario` |
| Constantes JS | `UPPER_SNAKE_CASE` | `MAX_INTENTOS` |

---

## 4. Estándares

### HTML
- `<!DOCTYPE html>` + `lang="es"`
- Logo UMAX en header (`img/logo_umax.png`)
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

> Ver `sesiones_clase/AGENT.md` para plantillas y estructura de ejercicios.

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
