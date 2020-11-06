// Esta es la función creada en el allTemplate.js que saca una alerta con el mensaje de "Selecciona una categoría" cada 10 segundos
SelectMessage(10000);

$(document).ready(() => {
    // Aquí ejecutamos una función de hover en jQuery para los tres contenedores
    // Le estamos diciendo que agregue la animación de pulseTada con margin a los tres contenedores al poner el cursor encima
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
    
});