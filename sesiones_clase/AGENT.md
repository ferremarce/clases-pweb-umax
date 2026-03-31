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
        <!-- Más slides -->
        <section class="diapositiva" id="slide-XX">
            <a href="#" class="btn-navegacion" onclick="window.scrollTo(0, 0); return false;" style="display: block; margin: 30px auto 10px; width: fit-content;">Volver al Inicio</a>
        </section>
    </main>
    <script src="js/script.js"></script>
</body>
</html>
```

---

## 7.2 CSS Principal

> Todo el CSS ya está incluido en `css/estilos_slides.css`. No es necesario incluir CSS inline.

---

## 7.3 JavaScript

> Todo el JavaScript ya está incluido en `js/script.js`. No es necesario incluir scripts inline.

---

## 7.4 Estructura de Carpetas

```
sesion_XX/
├── index.html              (presentación de la sesión)
├── index_ejercicios.html   (enunciados de ejercicios)
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

## 7.5 Reglas

- Mín: 15 slides por sesión
- Slide-01: Logo UMAX (100px), título, unidad
- Slide final: Resumen y temas próximos
- Navegación: Scroll vertical + botón "Siguiente"
- Header: Completo en slide-01, mini en slide-02+
- Código: `<pre><code>` con colores para sintaxis
- Imágenes: `images/` con nombres descriptivos
- Responsive: Probar en 768px y 480px
