// Audio player
let audioPlayer = document.getElementById('backgroundMusic');
let currentMusic = null;

// Función para mostrar secciones y manejar música
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';
}

// Función para cambiar la música
function changeMusic(musicPath) {
    if (currentMusic !== musicPath) {
        audioPlayer.src = musicPath;
        audioPlayer.play().catch(error => {
            console.log("Reproducción automática bloqueada por el navegador");
        });
        currentMusic = musicPath;
    }
}

// Función para mostrar descripción
function showDescription(description) {
    const descriptionBox = document.getElementById('description-box');
    descriptionBox.style.opacity = '0';
    setTimeout(() => {
        descriptionBox.textContent = description;
        descriptionBox.style.opacity = '1';
    }, 200);
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar sección inicial
    showSection('about');
    
    // Configurar eventos para los botones
    document.querySelectorAll('.nav-button').forEach(button => {
        // Evento hover
        button.addEventListener('mouseenter', () => {
            const description = button.getAttribute('data-description');
            const musicPath = button.getAttribute('data-music');
            showDescription(description);
            changeMusic(musicPath);
        });
        
        // Evento click
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Configurar el formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recoger los datos del formulario
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Enviar los datos usando EmailJS (debes configurar tu cuenta y servicio)
            emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', formData)
                .then(function(response) {
                    alert('¡Mensaje enviado con éxito!');
                    contactForm.reset();
                }, function(error) {
                    alert('Error al enviar el mensaje: ' + error);
                });
        });
    }
});
