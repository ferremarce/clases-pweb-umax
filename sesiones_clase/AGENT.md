# AGENT.md - Subagente de Presentaciones de Sesiones

> **NOTA:** Este archivo es el subagente especializado en la elaboración de presentaciones para las sesiones de clase del curso INI04.
>
> Este subagente es invocado desde el AGENTS.md principal cuando se solicita crear o modificar presentaciones de sesiones de clase.

## Índice

- [AGENT.md - Subagente de Presentaciones de Sesiones](#agentmd---subagente-de-presentaciones-de-sesiones)
  - [Índice](#índice)
  - [7.1 Estructura HTML Base](#71-estructura-html-base)
  - [7.2 Variables y Estilos CSS](#72-variables-y-estilos-css)
  - [7.3 Clases Utilitarias para Contenido](#73-clases-utilitarias-para-contenido)
  - [7.4 Responsive (Mobile)](#74-responsive-mobile)
  - [7.5 JavaScript del Carrusel](#75-javascript-del-carrusel)
  - [7.6 Reglas para Crear Sesiones](#76-reglas-para-crear-sesiones)

---

## 7.1 Estructura HTML Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sesión X: Título de la Sesión - INI04</title>
    <style>
        /* CSS completo aquí - ver sección 7.2 */
    </style>
</head>
<body>
    <header class="presentacion-header">
        <img src="../img/logo-umax.png" alt="Logo UMAX" class="logo">
        <div class="titulos">
            <h1>Sesión X: Título de la Sesión</h1>
            <div class="subtitulo">INI04 - Introducción al Desarrollo Web | Unidad Y</div>
        </div>
        <div class="profesor">Prof. Ing. Juan M. Ferreira</div>
    </header>

    <main class="contenedor" id="carrusel">
        <section class="diapositiva slide-portada activa" id="slide-01">
            <!-- Contenido de portada -->
        </section>

        <section class="diapositiva" id="slide-02">
            <!-- Contenido del slide 2 -->
        </section>

        <!-- Más slides... -->

        <section class="diapositiva slide-portada" id="slide-XX">
            <!-- Slide de cierre/proxima sesión -->
        </section>
    </main>

    <div class="numero-slide" id="numero-slide">1 / XX</div>

    <div class="controles">
        <button id="btn-anterior" aria-label="Anterior">❮</button>
        <div class="indicadores" id="indicadores"></div>
        <button id="btn-siguiente" aria-label="Siguiente">❯</button>
    </div>

    <script>
        // JavaScript del carrusel - ver sección 7.5
    </script>
</body>
</html>
```

---

## 7.2 Variables y Estilos CSS

```css
:root {
    --color-primario: #8B0000;      /* Rojo oscuro institucional */
    --color-secundario: #DC143C;    /* Rojo carmesí */
    --color-fondo: #FFFFFF;         /* Blanco */
    --color-texto: #1a1a1a;
    --color-texto-claro: #555555;
    --sombra: 0 4px 12px rgba(0,0,0,0.15);
    --borde-radio: 12px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--color-fondo);
    color: var(--color-texto);
    line-height: 1.6;
    overflow: hidden;
}

/* Header fijo */
header.presentacion-header {
    background: linear-gradient(135deg, var(--color-primario) 0%, var(--color-secundario) 100%);
    color: white;
    padding: 15px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 100;
}

header.presentacion-header .logo {
    width: 60px;
    height: auto;
}

header.presentacion-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
}

header.presentacion-header .titulos {
    flex: 1;
}

header.presentacion-header .subtitulo {
    font-size: 0.95rem;
    opacity: 0.9;
    margin-top: 3px;
}

header.presentacion-header .profesor {
    font-size: 0.95rem;
    opacity: 0.9;
    white-space: nowrap;
    text-align: right;
}

/* Contenedor del carrusel */
.contenedor {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    margin-top: 80px;
    overflow: hidden;
}

/* Diapositiva base */
.diapositiva {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    padding: 40px 60px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    overflow-y: auto;
}

.diapositiva.activa {
    opacity: 1;
    z-index: 1;
}

/* Títulos dentro de diapositiva */
.diapositiva h2 {
    color: var(--color-primario);
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 3px solid var(--color-secundario);
}

.diapositiva h3 {
    color: var(--color-secundario);
    font-size: 1.3rem;
    margin: 20px 0 15px;
}

.diapositiva p {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: var(--color-texto);
}

.diapositiva ul, .diapositiva ol {
    margin-left: 30px;
    margin-bottom: 20px;
}

.diapositiva li {
    margin-bottom: 12px;
    font-size: 1.05rem;
}
```

---

## 7.3 Clases Utilitarias para Contenido

```css
/* Tarjetas informativas */
.tarjeta {
    background: #f8f9fa;
    border-radius: var(--borde-radio);
    padding: 25px;
    margin: 20px 0;
    border-left: 5px solid var(--color-secundario);
}

.tarjeta-importante {
    background: #fff3f3;
    border-left-color: var(--color-primario);
}

/* Código fuente */
pre {
    background: #1e1e1e;
    color: #d4d4d4;
    border-radius: var(--borde-radio);
    padding: 25px;
    margin: 20px 0;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 18px;
    line-height: 1.5;
}

code {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 18px;
}

/* Colores para código */
.etiqueta { color: #569cd6; }
.atributo { color: #9cdcfe; }
.valor { color: #ce9178; }
.comentario { color: #6a9955; }
.texto { color: #dcdcaa; }

/* Slide de portada */
.slide-portada {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.slide-portada .logo-grande {
    width: 150px;
    margin-bottom: 30px;
}

.slide-portada h2 {
    font-size: 2.5rem;
    border: none;
    padding: 0;
}

.slide-portada .meta {
    margin-top: 30px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.slide-portada .meta span {
    background: rgba(139, 0, 0, 0.1);
    color: var(--color-primario);
    padding: 8px 20px;
    border-radius: 30px;
    font-weight: 600;
}

/* Lista de objetivos numerada */
.objetivos-lista {
    counter-reset: objetivo;
    list-style: none;
    margin-left: 0;
}

.objetivos-lista li {
    counter-increment: objetivo;
    padding-left: 50px;
    position: relative;
    margin-bottom: 20px;
}

.objetivos-lista li::before {
    content: counter(objetivo);
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
    height: 35px;
    background: var(--color-primario);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* Comparación de dos columnas */
.comparacion {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 20px 0;
}

.comparacion-item {
    background: #f8f9fa;
    padding: 25px;
    border-radius: var(--borde-radio);
    text-align: center;
}

.comparacion-item h4 {
    color: var(--color-primario);
    margin-bottom: 15px;
    font-size: 1.2rem;
}

/* Lista de pasos numerada */
.pasos {
    counter-reset: paso;
    list-style: none;
    margin-left: 0;
}

.pasos li {
    counter-increment: paso;
    padding-left: 45px;
    position: relative;
    margin-bottom: 15px;
}

.pasos li::before {
    content: counter(paso);
    position: absolute;
    left: 0;
    top: 2px;
    width: 30px;
    height: 30px;
    background: var(--color-secundario);
    color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
}

/* Botones */
.btn-navegacion {
    display: inline-block;
    background: var(--color-primario);
    color: white;
    padding: 12px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 20px;
    transition: background 0.3s;
    border: none;
    cursor: pointer;
}

.btn-navegacion:hover {
    background: var(--color-secundario);
}

.codigo-inline {
    background: #f0f0f0;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: monospace;
    color: var(--color-primario);
}

/* Controles del carrusel */
.controles {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 30px;
    z-index: 200;
    align-items: center;
}

.controles button {
    background: var(--color-primario);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.controles button:hover {
    background: var(--color-secundario);
    transform: scale(1.1);
}

.controles button:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

/* Indicadores (dots) */
.indicadores {
    display: flex;
    gap: 10px;
}

.indicador {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
}

.indicador:hover {
    transform: scale(1.2);
}

.indicador.activo {
    background: var(--color-primario);
    transform: scale(1.2);
}

.numero-slide {
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    color: var(--color-texto-claro);
    z-index: 200;
}

/* Tarjeta de actividad práctica */
.actividad-practica {
    background: #fff9e6;
    border: 2px solid #e6c200;
    border-radius: var(--borde-radio);
    padding: 30px;
    margin: 25px 0;
}

.actividad-practica h4 {
    color: #b8860b;
    margin-bottom: 15px;
}

.tiempo-badge {
    display: inline-block;
    background: var(--color-secundario);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-right: 10px;
}
```

---

## 7.4 Responsive (Mobile)

```css
@media (max-width: 768px) {
    header.presentacion-header {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        padding: 10px 20px;
        height: auto;
        min-height: 80px;
        gap: 10px;
    }
    header.presentacion-header .logo {
        width: 40px;
    }
    header.presentacion-header h1 {
        font-size: 1rem;
    }
    header.presentacion-header .titulos {
        flex: 1 1 100%;
        text-align: center;
    }
    header.presentacion-header .subtitulo,
    header.presentacion-header .profesor {
        font-size: 0.8rem;
    }
    header.presentacion-header .profesor {
        width: 100%;
        text-align: center;
    }
    .contenedor {
        margin-top: 110px;
        height: calc(100vh - 110px);
    }
    .diapositiva {
        padding: 20px;
    }
    .comparacion {
        grid-template-columns: 1fr;
    }
    pre {
        font-size: 14px;
        padding: 15px;
    }
    .controles {
        bottom: 15px;
    }
    .controles button {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }
    .numero-slide {
        bottom: 70px;
    }
}
```

---

## 7.5 JavaScript del Carrusel

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.diapositiva');
    const indicadoresContainer = document.getElementById('indicadores');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const numeroSlide = document.getElementById('numero-slide');
    
    let slideActual = 0;
    const totalSlides = slides.length;

    // Crear indicadores dinámicamente
    slides.forEach((_, index) => {
        const indicador = document.createElement('div');
        indicador.classList.add('indicador');
        if (index === 0) indicador.classList.add('activo');
        indicador.addEventListener('click', () => mostrarSlide(index));
        indicadoresContainer.appendChild(indicador);
    });

    const indicadores = document.querySelectorAll('.indicador');

    function mostrarSlide(index) {
        slides.forEach(slide => slide.classList.remove('activa'));
        indicadores.forEach(ind => ind.classList.remove('activo'));
        
        slides[index].classList.add('activa');
        indicadores[index].classList.add('activo');
        slideActual = index;
        
        numeroSlide.textContent = `${index + 1} / ${totalSlides}`;
        
        btnAnterior.disabled = index === 0;
        btnSiguiente.disabled = index === totalSlides - 1;
    }

    function siguienteSlide() {
        if (slideActual < totalSlides - 1) {
            mostrarSlide(slideActual + 1);
        }
    }

    function anteriorSlide() {
        if (slideActual > 0) {
            mostrarSlide(slideActual - 1);
        }
    }

    btnSiguiente.addEventListener('click', siguienteSlide);
    btnAnterior.addEventListener('click', anteriorSlide);

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') siguienteSlide();
        if (e.key === 'ArrowLeft') anteriorSlide();
    });

    // Inicializar
    mostrarSlide(0);
});
```

---

## 7.6 Reglas para Crear Sesiones

- **Cantidad mínima:** 15 diapositivas por sesión
- **Portada:** Primer slide con logo UMAX, título, unidad y meta (18 sesiones, 4 horas)
- **Cierre:** Último slide con resumen y temas de la próxima sesión
- **Transiciones:** Usar siempre `opacity` con `transition: 0.5s ease-in-out`
- **Código:** Usar etiquetas `<pre><code>` con colores para sintaxis
- **Imágenes:** Guardar en `img/` con nombres descriptivos
- **Responsive:** Probar en viewport de 768px y 480px
