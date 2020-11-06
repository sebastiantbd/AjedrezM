// estas variables capturan el formulario, el input de la contraseña y el input de repetir contraseña
var passwordForm = document.querySelector('form');
var passwordNew = document.querySelector('#password1');
var passwordRepeat = document.querySelector('#password2');

// Aquí creamos el evento de envío con el formulario
passwordForm.addEventListener('submit', (e) => {
    // esto previene la recarga automática por defecto
    e.preventDefault();

    // Aquí se hace la condición de que si ambas contraseñas coinciden haga algo
    if(passwordNew.value === passwordRepeat.value){

        console.log(passwordNew.value);
        console.log(passwordRepeat.value);

    // Esta condición es por si alguna de las dos contraseñas está vacía
    }else if(passwordNew.value === "" || passwordRepeat.value === ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: 'Por favor completa ambos campos para continuar!',
            theme: 'sunset',
            type: typeV,
            timeout: 3500,
            progressBar: true,
            animation: burbujas
        }).show();
        // Esta condición es por si ambas contraseñas no coinciden, se muestran alertas que nos indican esto
    }else{
        typeV = 'error';

        type(typeV);

        new Noty({
            text: 'Las contraseñas no coinciden, por favor inténtalo de nuevo!',
            theme: 'sunset',
            type: typeV,
            timeout: 3500,
            progressBar: true,
            animation: burbujas
        }).show();
    }
});