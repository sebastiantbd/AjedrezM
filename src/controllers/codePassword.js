// Aquí capturamos el formulario y el input del código
var passwordForm = document.querySelector('form');
var code = document.querySelector('#code');

// Aquí creamos el evento de envío con el formulario
passwordForm.addEventListener('submit', (e) => {
    // Esto previene la recarga automática por defecto
    e.preventDefault();
    // Esto condición es para validar si el input no está vacío, de lo contrario, muestra una alerta
    if(code.value === ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: 'Por favor completa el campo para continuar!',
            theme: 'sunset',
            type: typeV,
            timeout: 3000,
            progressBar: true,
            animation: burbujas
        }).show();
    }

    // Esto es para que se redirija a otra vista al enviar este formulario
    window.location.href = './recoverPassword.html';
});