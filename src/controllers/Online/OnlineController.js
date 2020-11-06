// Esta es la función creada en el allTemplate.js que saca una alerta con el mensaje de "Selecciona una categoría" cada 10 segundos
SelectMessage(10000);
// Esta es la función creada en el allTemplate.js que nos redirige automáticamente al main si se va la internet
changeInternetState();

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

    // Aquí le asignamos una función de click al contenedor de educativa, lo que hace es sacar una alerta de que estamos en educativa y realiza el sonido del caballo, y luego de 1,5 segundos se redirige a la vista de educativa Online
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
            location.href='./educativeOnline.html';
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

    // Aquí le asignamos una función de click al contenedor de creativa, lo que hace es sacar una alerta de que estamos en creativa y realiza el sonido del caballo, y luego de 1,5 segundos se redirige a la vista de creativa Online
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
            location.href='./creativeOnline.html';
        }, 1500);

    });
    // Aquí ejecutamos una función de hover en jQuery
    // Le estamos diciendo que agregue la animación de pulseTada con margin al contenedor de experta al poner el cursor encima
    $('#expertCont').hover(
        function() {
        $('#expertIcon').addClass('pulseTada');
        $('#expertText').addClass('m-100');
        $('#expertText').removeClass('m-0P');
        }, function() {
        $('#expertIcon').removeClass('pulseTada');
        $('#expertText').addClass('m-0P');
        $('#expertText').removeClass('m-100');
        }
    );

    // Aquí le asignamos una función de click al contenedor de experta, lo que hace es sacar una alerta de que estamos en experta y realiza el sonido del caballo, y luego de 1,5 segundos se redirige a la vista de experta Online
    $('#expertCont').click(() => {

        typeV = 'success';
        type(typeV);
        new Noty({
            text: '<i class="fa fa-flash"></i> Estás en Experta!',
            theme: 'sunset',
            type: typeV,
            timeout: 1500,
            progressBar: true,
            animation: burbujas
        }).show();

        startHorseAudio.play();

        setTimeout(() => {
            location.href='./expertOnline.html';
        }, 1500);

    });
    
});