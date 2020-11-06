// Esta es la función creada en el allTemplate.js que saca una alerta con el mensaje de "Selecciona una categoría" cada 10 segundos
SelectMessage(10000);

// Aquí creamos un elemento de audio para el sonido del caballo
var startHorseAudio = document.createElement('audio');
 
// Aquí asignamos la ruta del audio que vamos a colocar
startHorseAudio.setAttribute('src', './../../../assets/audio/firstEnter.mp3');

$(document).ready(() => {
    // Aquí ejecutamos una función de hover en jQuery
    // Le estamos diciendo que agregue la animación de pulseTada con margin al contenedor de educativa al poner el cursor encima
    $('#learnCont').hover(
        function() {
        $('#learnIcon').addClass('pulseTada');
        $('#learnText').addClass('m-100');
        $('#learnText').removeClass('m-0P');
        }, function() {
        $('#learnIcon').removeClass('pulseTada');
        $('#learnText').addClass('m-0P');
        $('#learnText').removeClass('m-100');
        }
    );

    // Aquí le asignamos una función de click al contenedor de educativa, lo que hace es sacar una alerta de que estamos en educativa y realiza el sonido del caballo, y luego de 1,5 segundos se redirige a la vista de educativa Offline
    $('#learnCont').click(() => {

        typeV = 'success';
        type(typeV);
        new Noty({
            text: '<i class="fa fa-book"></i> Estás en Educativa!',
            theme: 'sunset',
            type: typeV,
            timeout: 1500,
            progressBar: true,
            animation: burbujas
        }).show();

        startHorseAudio.play();

        setTimeout(() => {
            location.href='./educativeOffline.html';
        }, 1500);

    });

    // Aquí ejecutamos una función de hover en jQuery
    // Le estamos diciendo que agregue la animación de pulseTada con margin al contenedor de creativa al poner el cursor encima
    $('#creativeCont').hover(
        function() {
        $('#creativeIcon').addClass('pulseTada');
        $('#creativeText').addClass('m-100');
        $('#creativeText').removeClass('m-0P');
        }, function() {
        $('#creativeIcon').removeClass('pulseTada');
        $('#creativeText').addClass('m-0P');
        $('#creativeText').removeClass('m-100');
        }
    );

    // Aquí le asignamos una función de click al contenedor de creativa, lo que hace es sacar una alerta de que estamos en creativa y realiza el sonido del caballo, y luego de 1,5 segundos se redirige a la vista de creativa Offline
    $('#creativeCont').click(() => {

        typeV = 'success';
        type(typeV);
        new Noty({
            text: '<i class="fa fa-pencil"></i> Estás en Creativa!',
            theme: 'sunset',
            type: typeV,
            timeout: 1500,
            progressBar: true,
            animation: burbujas
        }).show();

        startHorseAudio.play();

        setTimeout(() => {
            location.href='./creativeOffline.html';
        }, 1500);

    });
    
});