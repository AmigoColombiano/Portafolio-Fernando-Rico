// Variables globales para el manejo de audio
const audioPlayer = document.getElementById('backgroundMusic');
const musicPaths = {
    'about': '/MUSICA/about.mp3',
    'experience': '/MUSICA/experience.mp3',
    'publications': '/MUSICA/publications.mp3',
    'achievements': '/MUSICA/achievements.mp3',
    'business': '/MUSICA/business.mp3',
    'contact': '/MUSICA/contact.mp3'
};

// Descripciones detalladas para cada sección
const buttonDescriptions = {
    'about': 'Conoce mi trayectoria profesional y personal en el campo de la tecnología',
    'experience': 'Explora mis más de 30 años de experiencia en desarrollo de software y consultoría',
    'publications': 'Descubre mis publicaciones académicas y contribuciones literarias',
    'achievements': 'Revisa mis reconocimientos en ajedrez, literatura, atletismo y tecnología',
    'business': 'Conoce mi proyecto empresarial en economía solidaria y comercio justo',
    'contact': 'Ponte en contacto conmigo para consultas o colaboraciones'
};

// Función para reproducir música
function playMusic(sectionId) {
    const musicPath = musicPaths[sectionId];
    if (musicPath) {
        audioPlayer.src = musicPath;
        audioPlayer.play().catch(error => {
            console.log('Error al reproducir el audio:', error);
        });
    }
}

// Función para mostrar la descripción del botón
function showButtonDescription(sectionId) {
    const descriptionBox = document.getElementById('description-box');
    if (descriptionBox && buttonDescriptions[sectionId]) {
        descriptionBox.style.opacity = '0';
        setTimeout(() => {
            descriptionBox.textContent = buttonDescriptions[sectionId];
            descriptionBox.style.opacity = '1';
        }, 200);
    }
}

// Función para mostrar secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Reproducir música correspondiente
    playMusic(sectionId);
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar sección inicial
    showSection('about');
    
    // Agregar eventos hover a los botones
    document.querySelectorAll('.nav-button').forEach(button => {
        const sectionId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        button.addEventListener('mouseenter', () => {
            showButtonDescription(sectionId);
            playMusic(sectionId);
        });
    });
    
    // Manejar el envío del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensaje enviado con éxito. Gracias por contactarme.');
            this.reset();
        });
    }
});
