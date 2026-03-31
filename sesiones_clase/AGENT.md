# AGENT.md - Subagente de Presentaciones de Sesiones

> Subagente especializado en la elaboración de presentaciones para sesiones del curso INI04.
> Invocado desde AGENTS.md cuando se requieren presentaciones de clase.

---

## 7.1 Estructura HTML Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sesión X: Título - INI04</title>
    <style>/* CSS en sección 7.2 */</style>
</head>
<body>
    <header class="presentacion-header">
        <img src="../img/logo_umax.png" alt="Logo UMAX" class="logo">
        <div class="titulos">
            <h1>Sesión X: Título</h1>
            <div class="subtitulo">INI04 - Desarrollo Web | Unidad Y</div>
        </div>
        <div class="profesor">Prof. Ing. Juan M. Ferreira
            <div class="enlaces-plan">
                <a href="../plan_clase/plan_de_clase_general.html" target="_blank">Plan General</a>
                <a href="../plan_clase/plan_de_clase_detallado.html" target="_blank">Plan Detallado</a>
            </div>
        </div>
    </header>

    <main class="contenedor">
        <section class="diapositiva" id="slide-01">
            <img src="../img/logo_umax.png" alt="Logo" class="logo-grande">
            <h2>Título de la Sesión</h2>
            <p style="font-size: 1.3rem; color: var(--color-texto-claro); margin-top: 10px;">Unidad Y</p>
        </section>
        <section class="diapositiva" id="slide-02"><!-- Contenido --></section>
        <!-- Más slides -->
        <section class="diapositiva" id="slide-XX">
            <a href="#" class="btn-navegacion" onclick="window.scrollTo(0, 0); return false;" style="display: block; margin: 30px auto 10px; width: fit-content;">Volver al Inicio</a>
        </section>
    </main>
    <script>/* JavaScript en sección 7.5 */</script>
</body>
</html>
```

---

## 7.2 CSS Principal

```css
:root {
    --color-primario: #8B0000;
    --color-secundario: #DC143C;
    --color-fondo: #FFFFFF;
    --color-texto: #1a1a1a;
    --color-texto-claro: #555555;
    --sombra: 0 4px 12px rgba(0,0,0,0.15);
    --radio: 12px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body { font-family: 'Segoe UI', sans-serif; background: var(--color-fondo); color: var(--color-texto); line-height: 1.6; }

/* Header */
header.presentacion-header {
    background: linear-gradient(135deg, var(--color-primario), var(--color-secundario));
    color: white; padding: 15px 50px; display: flex; align-items: center; justify-content: space-between;
    position: fixed; top: 0; width: 100%; height: 80px; z-index: 100; transition: all 0.3s;
}
header.presentacion-header .logo { width: 60px; }
header.presentacion-header h1 { font-size: 1.5rem; font-weight: 600; }
header.presentacion-header .titulos { flex: 1; }
header.presentacion-header .subtitulo { font-size: 0.95rem; opacity: 0.9; margin-top: 3px; }
header.presentacion-header .profesor { font-size: 0.95rem; opacity: 0.9; white-space: nowrap; text-align: right; }
header.presentacion-header .enlaces-plan { display: flex; gap: 15px; font-size: 0.75rem; margin-top: 4px; }
header.presentacion-header .enlaces-plan a { color: white; text-decoration: none; opacity: 0.85; }
header.presentacion-header .enlaces-plan a:hover { text-decoration: underline; opacity: 1; }

/* Header mini (slide 2+) */
header.presentacion-header.mini { height: 50px; padding: 8px 30px; gap: 20px; }
header.presentacion-header.mini .logo { width: 35px; }
header.presentacion-header.mini h1 { font-size: 1rem; }
header.presentacion-header.mini .subtitulo, header.presentacion-header.mini .profesor { font-size: 0.8rem; }
header.presentacion-header.mini .enlaces-plan { font-size: 0.65rem; gap: 8px; }

/* Contenedor */
.contenedor { width: 100%; margin-top: 80px; padding: 20px 40px 40px; }

/* Diapositiva */
.diapositiva { background: white; padding: 40px 60px; margin-bottom: 30px; min-height: 300px; border-radius: var(--radio); box-shadow: var(--sombra); position: relative; scroll-margin-top: 100px; }
.numeracion { position: absolute; top: 15px; right: 20px; background: var(--color-primario); color: white; width: 50px; height: 35px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem; }

/* Textos */
.diapositiva h2 { color: var(--color-primario); font-size: 1.8rem; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid var(--color-secundario); }
.diapositiva h3 { color: var(--color-secundario); font-size: 1.3rem; margin: 20px 0 15px; }
.diapositiva p { font-size: 1.1rem; margin-bottom: 15px; }
.diapositiva ul, .diapositiva ol { margin-left: 30px; margin-bottom: 20px; }
.diapositiva li { margin-bottom: 12px; font-size: 1.05rem; }

/* Utilitarias */
.tarjeta { background: #f8f9fa; border-radius: var(--radio); padding: 25px; margin: 20px 0; border-left: 5px solid var(--color-secundario); }
.tarjeta-importante { background: #fff3f3; border-left-color: var(--color-primario); }
.logo-grande { width: 100px; display: block; margin: 0 auto 30px; }
.comparacion { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 20px 0; }
.comparacion-item { background: #f8f9fa; padding: 25px; border-radius: var(--radio); text-align: center; }
.comparacion-item h4 { color: var(--color-primario); margin-bottom: 15px; }

/* Código */
pre { background: #1e1e1e; color: #d4d4d4; border-radius: var(--radio); padding: 25px; margin: 20px 0; overflow-x: auto; font-family: 'Consolas', monospace; font-size: 18px; line-height: 1.5; }
code { font-family: 'Consolas', monospace; font-size: 18px; }
.etiqueta { color: #569cd6; }
.atributo { color: #9cdcfe; }
.valor { color: #ce9178; }
.comentario { color: #6a9955; }
.texto { color: #dcdcaa; }
.codigo-inline { background: #f0f0f0; padding: 3px 8px; border-radius: 4px; font-family: monospace; color: var(--color-primario); }

/* Botones */
.btn-navegacion { display: inline-block; background: var(--color-primario); color: white; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: 600; margin-top: 20px; transition: background 0.3s; border: none; cursor: pointer; }
.btn-navegacion:hover { background: var(--color-secundario); }
.btn-siguiente { display: block; width: fit-content; margin: 30px auto 10px; background: var(--color-primario); color: white; padding: 12px 40px; border-radius: 30px; text-decoration: none; font-weight: 600; }
.btn-siguiente:hover { background: var(--color-secundario); }

/* Actividad */
.actividad-practica { background: #fff9e6; border: 2px solid #e6c200; border-radius: var(--radio); padding: 30px; margin: 25px 0; }
.actividad-practica h4 { color: #b8860b; margin-bottom: 15px; }
.tiempo-badge { display: inline-block; background: var(--color-secundario); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-right: 10px; }

/* Listas */
.pasos, .objetivos-lista { counter-reset: item; list-style: none; margin-left: 0; }
.pasos li, .objetivos-lista li { counter-increment: item; padding-left: 45px; position: relative; margin-bottom: 15px; }
.pasos li::before, .objetivos-lista li::before { content: counter(item); position: absolute; left: 0; width: 30px; height: 30px; background: var(--color-secundario); color: white; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; }
.objetivos-lista li::before { width: 35px; height: 35px; border-radius: 50%; }
.objetivos-lista li { margin-bottom: 20px; }

/* Responsive */
@media (max-width: 768px) {
    header.presentacion-header { flex-direction: row; flex-wrap: wrap; justify-content: center; text-align: center; padding: 10px 20px; height: auto; min-height: 80px; gap: 10px; }
    header.presentacion-header .logo { width: 40px; }
    header.presentacion-header h1 { font-size: 1rem; }
    header.presentacion-header .titulos { flex: 1 1 100%; text-align: center; }
    header.presentacion-header .subtitulo, header.presentacion-header .profesor { font-size: 0.8rem; }
    header.presentacion-header .profesor { width: 100%; text-align: center; }
    .contenedor { margin-top: 110px; padding: 15px 20px; }
    .diapositiva { padding: 20px; }
    .comparacion { grid-template-columns: 1fr; }
    pre { font-size: 14px; padding: 15px; }
}
```

---

## 7.3 JavaScript

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header.presentacion-header');
    const slides = document.querySelectorAll('.diapositiva');
    const total = slides.length;

    slides.forEach((slide, i) => {
        slide.insertAdjacentHTML('beforeend', `<div class="numeracion">${i + 1}/${total}</div>`);
        if (i < total - 1) {
            const btn = document.createElement('a');
            btn.href = '#';
            btn.className = 'btn-siguiente';
            btn.textContent = 'Siguiente ▶';
            btn.onclick = e => { e.preventDefault(); slides[i + 1].scrollIntoView({ behavior: 'smooth' }); };
            slide.appendChild(btn);
        }
    });

    window.addEventListener('scroll', () => {
        const rect = document.getElementById('slide-01')?.getBoundingClientRect();
        header.classList.toggle('mini', rect?.bottom <= 80);
    });
});
```

---

## 7.4 Reglas

- Mín: 15 slides por sesión
- Slide-01: Logo UMAX (100px), título, unidad
- Slide final: Resumen y temas próximos
- Navegación: Scroll vertical + botón "Siguiente"
- Header: Completo en slide-01, mini en slide-02+
- Código: `<pre><code>` con colores para sintaxis
- Imágenes: `img/` con nombres descriptivos, usar `<figure><figcaption>`
- Responsive: Probar en 768px y 480px
