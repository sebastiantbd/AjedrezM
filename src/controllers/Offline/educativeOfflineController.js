    // Aquí creamos el elemento de audio para el sonido de la carrera de caballos
    var HorseRaceAudio = document.createElement('audio');
 
    // Aquí le asignamos el audio con la ruta
    HorseRaceAudio.setAttribute('src', './../../../assets/audio/carrera-caballos.mp3');
    
    $(document).ready(() => {

        // le asignamos una función de click al botón de play, esto lo que hace es mostrar el cuadro de cargando nivel, el botón de cancelar y oculta todos los botones de play
        $('.playNow').click(() => {
            $('#loading').removeClass('d-none');

            $('.playNow').addClass('d-none');
            $('.playNow').removeClass('d-flex');

            $('#cancel').removeClass('d-none');
            $('#cancel').addClass('d-flex');

            // Aquí ejecutamos la función que hace que en 3,1 segundos nos redireccionemos a la vista de juego y que hace que el botón cancelar funcione y devuelva todo a su estado inicial
            run();

            // Aquí iniciamos el sonido de la carrera de caballos
            HorseRaceAudio.play();

        });

        // esto es para que al poner el cursor encima de la flecha izquierda, aparezca sólo una vez(variable booleana arrPrev), la información de presionar la flecha izquierda para devolverse
        var arrPrev = true;

        $('#arrowPrev').hover(() => {

            if(arrPrev === true){
                arrPrev = false;
                $('#arrowPrevBurble').fadeIn(1000);
                $('#arrowPrevShadow').show();
            }

        });

        // Esto es para que al presionar cualquier parte de la pantalla se desaparezca el mensaje de retroceder con la flecha izquierda
        $('#arrowPrevCont').click(() => {
            $('#arrowPrevBurble').fadeOut(1000);
            $('#arrowPrevShadow').hide();
        });

        // esto es para que al poner el cursor encima de la flecha derecha, aparezca sólo una vez(variable booleana arrNext), la información de presionar la flecha derecha para avanzar
        var arrNext = true;

        $('#arrowNext').hover(() => {

            if(arrNext === true){
                arrNext = false;
                $('#arrowNextBurble').fadeIn(1000);
                $('#arrowNextShadow').show();
            }

        });

        // Esto es para que al presionar cualquier parte de la pantalla se desaparezca el mensaje de avanzar con la flecha derecha
        $('#arrowNextCont').click(() => {
            $('#arrowNextBurble').fadeOut(1000);
            $('#arrowNextShadow').hide();
        });


    });

// Aquí creamos la función que hace que en 3,1 segundos nos redireccionemos a la vista de juego y que hace que el botón cancelar funcione y devuelva todo a su estado inicial
function run(){
var message =

setTimeout(() => {

    location.href = "./../../views/Offline/OfflineEducativeGame.html";    

}, 3100);

$('#cancel').click(function(){
    clearTimeout(message);
    $('#loading').addClass('d-none');
    $('.playNow').addClass('d-flex');
    $('#cancel').removeClass('d-flex');
    $('#cancel').addClass('d-none');

    // Esto es para colocar el audio en el segundo 0 y lo pausamos
    HorseRaceAudio.currentTime = 0;
    HorseRaceAudio.pause();

});
}