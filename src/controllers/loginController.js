// limpiar la sesión
sessionStorage.clear();

// capturamos el formulario del login
const loginForm = document.querySelector('form');
// capturo el ícono del proyecto
const moveIcon = document.querySelector('#moveIcon');
// aquí creamos un elemento de audio, esto nos va a servir para reproducir el sonido de un caballo relinchando al iniciar sesión
var startHorseAudio = document.createElement('audio');
// a ese elemento que creamos vamos a asignarle el audio mediante una ruta
startHorseAudio.setAttribute('src', './../../assets/audio/firstEnter.mp3');

// aquí añadimos el evento de "submit" al formulario anteriormente capturado
loginForm.addEventListener('submit', function(e){
    // esto es para prevenir la autorecargada de la página al enviar el formulario
    e.preventDefault();

    // capturamos el valor del input de user
    let email = document.querySelector('#user').value;
    // capturamos el valor del input de password
    let password = document.querySelector('#password').value;
    // en esta condición colocamos una alerta de error si el campo de usuario o contraseña están vacíos
    if(email === '' || password === ''){
        typeV = 'error';
        type(typeV);
        new Noty({
            text: 'Completa ambos campos por favor!',
            theme: 'sunset',
            type: typeV,
            timeout: 2000,
            progressBar: true,
            animation: burbujas
        }).show();

    }else{
        // si no están vaciós, entonces encerramos los valores de ambos inputs en un objeto para enviarlos
        let datos = {email, password};
        // aquí enviamos los datos al index.js principal
        ipcRenderer.send('loginUser', datos);
    }

});

// Aquí se recibe si el correo o usuario están mal
ipcRenderer.on('emailErroneo',() => {
    // aquí está una nota que dice que están incorrectos
    typeV = 'error';
    type(typeV);
    new Noty({
        text: 'Tu correo o contraseña es incorrecto, inténtalo nuevamente!',
        theme: 'sunset',
        type: typeV,
        timeout: 3000,
        progressBar: true,
        animation: burbujas
    }).show();
})

// Aquí se recibe si el correo o usuario y contraseña están correctos
ipcRenderer.on('userCorrecto',() => {
    // aquí está una nota que dice que todo está correcto y bienvenido
    typeV = 'success';
    type(typeV);
    new Noty({
        text: 'Bienvenido a Ajedrez M!',
        theme: 'sunset',
        type: typeV,
        timeout: 2000,
        progressBar: true,
        animation: burbujas
    }).show();

    // este es el audio que creamos anteriormente y se reproduce al momento de que el usuario ingrese
    startHorseAudio.play();

    // aquí es para que luego de iniciar sesión se redireccione a la vista principal del juego en 1 segundo
    setTimeout(() => {
        window.location.href = './../views/main.html';
    },); 
});

// Aquí es para recibir los datos de la sesión en el localStorage y se envían posteriormente
ipcRenderer.on('user', (e, data) => {
    sessionStorage.idp = (data.idPerson);
    sessionStorage.em = (data.email);
    sessionStorage.idu = (data.idUser);
    ipcRenderer.send('useSessionStorage', data);
});

// Esto es para que el ícono principal rote y luego se reproduzca la animación de bounce cada 3 segundos
/*    var loco = true;
    setInterval(() => {
        if(loco === true){
            moveIcon.className = 'w-25 mt-4 rotateEffect d-flex justify-content-center';
            loco = false;
        }else{
            moveIcon.className = 'w-25 mt-4 d-flex justify-content-center animated bounce infinite ad-3';
            loco = true;
        }
    }, 3000);
*/
// Esto es para que se muestre y oculte el texto del botón de ayuda
$(document).ready(()=>{
    $('#helpTutorial').hover(()=>{

        $('#helpText').show(300);

    }, () =>{

        $('#helpText').hide(300);

    });
});