document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header.presentacion-header');
    const slides = document.querySelectorAll('.diapositiva');
    const totalSlides = slides.length;

    slides.forEach((slide, index) => {
        const numeracion = document.createElement('div');
        numeracion.className = 'numeracion';
        numeracion.textContent = `${index + 1}/${totalSlides}`;
        slide.appendChild(numeracion);

        if (index < slides.length - 1) {
            const btn = document.createElement('a');
            btn.href = '#';
            btn.className = 'btn-siguiente';
            btn.textContent = 'Siguiente ▶';
            btn.onclick = (e) => {
                e.preventDefault();
                const nextSlide = slides[index + 1];
                nextSlide.scrollIntoView({ behavior: 'smooth' });
            };
            slide.appendChild(btn);
        }
    });

    function actualizarHeader() {
        const slide01 = document.getElementById('slide-01');
        const rect = slide01.getBoundingClientRect();
        header.classList.toggle('mini', rect.bottom <= 80);
    }

    window.addEventListener('scroll', actualizarHeader);
    actualizarHeader();
});
