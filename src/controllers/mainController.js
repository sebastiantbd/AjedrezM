// Esta es la función creada en el allTemplate.js que saca una alerta con el mensaje de "Selecciona una categoría" cada 10 segundos
SelectMessage(10000);

// Aquí capturamos el id de ambas opciones, la de Un Jugador y Multijugador
const offlineCont = document.querySelector('#offlineCont');
const onlineCont = document.querySelector('#onlineCont');

$(document).ready(() => {
    // Aquí ejecutamos una función de hover en jQuery para ambos contenedores
    // Le estamos diciendo que agregue la animación de pulseTada con margin a ambos contenedores al poner el cursor encima
    $('#offlineCont').hover(
        function() {
        $('#offlineIcon').addClass('pulseTada');
        $('#offlineText').addClass('m-100');
        $('#offlineText').removeClass('m-0P');
        }, function() {
        $('#offlineIcon').removeClass('pulseTada');
        $('#offlineText').addClass('m-0P');
        $('#offlineText').removeClass('m-100');
        }
    );

    $('#onlineCont').hover(
        function() {
        $('#onlineIcon').addClass('pulseTada');
        $('#onlineText').addClass('m-100');
        $('#onlineText').removeClass('m-0P');
        }, function() {
        $('#onlineIcon').removeClass('pulseTada');
        $('#onlineText').addClass('m-0P');
        $('#onlineText').removeClass('m-100');
        }
    );
    
});

// Aquí estamos creando un elemento de audio que se va a reproducir al presionar alguna de las dos opciones
var startHorseAudio = document.createElement('audio');
 
// Aquí le estamos asignando el audio con la ruta
startHorseAudio.setAttribute('src', './../../assets/audio/firstEnter.mp3');

// ------------Internet Main Status----------

// Aquí le estamos dando una función de click cuando presione en Un Jugador, lo que hace es salir una alerta que dice que estás en Un Jugador y te redirecciona a la vista de Un Jugador
offlineCont.addEventListener('click', (e) => {

    typeV = 'success';

    type(typeV);

    new Noty({
        text: `<i class="fa fa-user"></i> Estás en Un Jugador!`,
        theme: 'sunset',
        type: typeV,
        timeout: 1500,
        progressBar: true,
        animation: burbujas
    }).show();

    // Aquí le decimos que reproduzca el audio del caballo al entrar a esta función
    startHorseAudio.play();

    setTimeout(() => {
        location.href = './../views/Offline/offlineCategories.html';
    }, 1500);

});

// Aquí le estamos dando una función de click cuando presione en Multijugador, lo que hace es salir una alerta que dice que estás en Multijugador y te redirecciona a la vista de Multijugador sólo si estás conectado a internet, de lo contrario te sale una alerta de que necesitas Internet para continuar
onlineCont.addEventListener('click', (e) => {

    if(onlineActive === true){

        typeV = 'success';

        type(typeV);

        new Noty({
            text: `<i class="fa fa-group"></i> Estás en Multijugador!`,
            theme: 'sunset',
            type: typeV,
            timeout: 1500,
            progressBar: true,
            animation: burbujas
        }).show();

    // Aquí le decimos que reproduzca el audio del caballo al entrar a esta función
        startHorseAudio.play();

        setTimeout(() => {
            location.href = './../views/Online/onlineCategories.html';
        }, 1500);

    }else{
        
        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<i class="fa fa-rss"></i> Por favor conéctate a Internet para continuar!`,
            theme: 'sunset',
            type: typeV,
            timeout: 2000,
            progressBar: true,
            animation: burbujas
        }).show();

    }

});

// Esta es la función de Cerrar Sesión, donde si se presiona el botón de cerrar sesión, te sale una alerta de confirmación, si la aceptas, sale otra alerta de sesión finalizada éxitosamente y se cierra la sesión y te redireccionas a la vista del login a los 2,5 segundos
function logOut() {
    Swal.fire({
        title: 'Finalizar sesión',
        icon: 'warning',
        text: '¿Esta seguro que desea cerrar sesión?',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        reverseButtons: false,
        showCancelButton: true
    }).then((result) => {
        if(result.value){
            Swal.fire({
                title: 'Sesión finalizada exitosamente!',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                reverseButtons: false,
                showCancelButton: false,
                showConfirmButton: false
            });

            setTimeout(() => {
                sessionStorage.clear();
                Swal.close();
                window.location.href = './../views/login.html';
                ipcRenderer.send('CierreSesion');
            }, 2500); 
        }
    });
}

// Aquí estamos validando el texto del nivel Online que tiene el Usuario cuando de repente se vaya el Internet, sí hay internet se hace un innerHTML con la información del nivel, de lo contrario, se quita la información
if(navigator.onLine){

    document.querySelector('#OnlineLevel').innerHTML = 
    `<div class="mainButton w-50 d-flex justify-content-center align-items-center pr-1 pl-1" style="border-width: 3px !important;">
        <p class="m-0"><i class="fa fa-star" style="color: #e0874b;"></i><strong class="m-0 ml-1">122</strong></p>
    </div>`;

}else{

   document.querySelector('#OnlineLevel').innerHTML = ``;
    
}
    
// Aquí estamos validando el texto del nivel Online que tiene el Usuario cuando cargue la vista del main, sí hay internet se hace un innerHTML con la información del nivel, de lo contrario, se quita la información
window.addEventListener('online', function() {

    document.querySelector('#OnlineLevel').innerHTML = 
    `<div class="mainButton w-50 d-flex justify-content-center align-items-center pr-1 pl-1" style="border-width: 3px !important;">
        <p class="m-0"><i class="fa fa-star" style="color: #e0874b;"></i><strong class="m-0 ml-1">122</strong></p>
    </div>`;

}, false);
    
window.addEventListener('offline', function() {

    document.querySelector('#OnlineLevel').innerHTML = ``;

}, false);