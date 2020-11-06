// Esta es la función creada en el allTemplate.js que nos redirige automáticamente al main si se va la internet
changeInternetState();

// Aquí creamos el elemento de audio para el sonido de la carrera de caballos
var HorseRaceAudio = document.createElement('audio');
 
// Aquí le asignamos el audio con la ruta
HorseRaceAudio.setAttribute('src', './../../../assets/audio/carrera-caballos.mp3');

$(document).ready(() => {

    // Aquí le damos un evento de click al botón de play
    $('#level1').click(() => {

        // Aquí se inicia el audio de la carrera de caballos
        HorseRaceAudio.play();

        // Aquí abrimos una alerta de Swal, donde dirá buscando jugador con una animación de carga y con opciones de que no pueda quitar la alerta de ninguna forma a menos que presionen el botón cancelar...
        Swal.fire({
        html: `
        <div class="w-100 cont d-flex justify-content-center align-items-center flex-column" style="color: #68472F;">
               
                <div class="lds-roller mb-4"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <h3 class="saving">Buscando Jugador <span>.</span><span>.</span><span>.</span></h3>

        </div>
        `,
        customClass:{
            popup: 'finding',
        },
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: `<i class='fa fa-close'></i> Cancelar`,
        cancelButtonColor: 'var(--danger)',
        allowOutsideClick: false,
        allowEscapeKey: false,        
        allowEnterKey: false,         
        reverseButtons: false,  
        }).then((result) => {
            // Si presionan el botón cancelar cancelan toda operación y la vista vuelve a su estado inicial
            if (result.dismiss === Swal.DismissReason.cancel) {
                clearTimeout(run);
                clearTimeout(entorno);
                clearTimeout(level);
                clearTimeout(check);

                HorseRaceAudio.currentTime = 0;
                HorseRaceAudio.pause();
                
              }
        });

        // Aquí cambiamos el mensaje de buscando jugador... a generando entorno... en 2 segundos
        var entorno = setTimeout(() => {
            document.getElementsByClassName('saving')[0].innerHTML = `
            Generando entorno <span>.</span><span>.</span><span>.</span>`;           
        }, 2000);
    
        // Aquí cambiamos el mensaje de generando entorno... a configurando nivel... en 4 segundos
        var level = setTimeout(() => {
            document.getElementsByClassName('saving')[0].innerHTML = `
            Configurando Nivel <span>.</span><span>.</span><span>.</span>`;           
        }, 4000);

        // Aquí cambiamos el mensaje de configurando nivel... a un ícono de check, un texto de partida encontrada, la imagen del objetivo de la partida, las instrucciones de ella y un texto de cargando partida... en 6 segundos
        var check = setTimeout(() => {
            document.getElementsByClassName('cont')[0].innerHTML = `
            <div class="check_mark">
                <div class="sa-icon sa-success animate">
                    <span class="sa-line sa-tip animateSuccessTip"></span>
                    <span class="sa-line sa-long animateSuccessLong"></span>
                    <div class="sa-placeholder"></div>
                    <div class="sa-fix"></div>
                </div>
            </div>

            <h5 class='text-success mt-3'>Partida Encontrada</h5>

            <div class="mainButton mt-2 p-2 d-flex justify-content-center flex-column align-items-center w-100" style="background: #ffedce !important;">
                <div class="w-50 d-flex justify-content-center align-items-center" style="background: white; height: 150px; overflow: hidden; border-radius: 25px !important; box-shadow: 0 0 10px 1px rgba(0,0,0,0.2);">
                    <img src="./../../../assets/purpleGeo.jpg" class="w-100">
                </div>
                <p class="m-0 text-center mt-2" style='font-size: 0.8em;'>
                Derrota a tu contrincante armando las figuras <i class="fa fa-image"></i> que se muestren en pantalla antes de <strong class='text-danger'>5 Minutos!</strong><br>
                <strong>¡Buena Suerte!</strong></p>                                         
            </div>

            <h3 class="saving">Cargando Partida <span>.</span><span>.</span><span>.</span></h3>`;  

        }, 6000);

        // Aquí le decimos que en 20 segundos nos redirija a la vista de juego Experto Online
        var run = setTimeout(() => {
            location.href = './../../views/Online/OnlineExpertGame.html';            
        }, 20000);

    });
    
    
});