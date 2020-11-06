// Esta variable booleana la creamos para validar el ícono del check en el caballo presionado
var check = false;
// Esta variable la vamos a usar para identificar cual de qué color es el caballo presionado
let horse = "white";
// Aquí creamos la función que nos servira para que se agregue el ícono del check cuando presionemos sobre un caballo y se desapareza en el anterior
function checkHorse(checkr){

    // Aquí le decimos que lo quite al presionar
    $('.checkHorses').remove();
    
    // Aquí validamos para que se agregue el ícono sólo en el caballo presionado
    if(check === false || check === true){
        $(checkr).append(
            `<div class="checkHorses w-100 d-flex justify-content-start align-items-start position-absolute" marked="${$(checkr).attr('horse')}">
                <div class="mainButton text-success pr-1 pl-1" style="margin-top: -30px;"><i class="fa fa-check"></i></div>
            </div>`
        );
        check = true;
    }else{
        // sino me lo remueve
        $('.checkHorses').remove();
        check = false;
    }

    // Aquí le indicamos a la variable horse el color del caballo presionado
    horse = $('.checkHorses').attr('marked');

    // Ejemplo de las condiciones que se pueden hacer con la variable horse
    // if (horse === 'red') {
    //     alert('red');
    // }

    return horse;
}

// Aquí capturamos el id de input del color de fondo principal, el color del fondo principal, el input del color de fondo secundario, el color de la casilla del tablero uno y dos y el input del sonido
const back1 = document.querySelector('#back1');
const colorBack1 = document.querySelector('#colorBack1');
const back2 = document.querySelector('#back1');
const tab1 = document.querySelector('#tab1');
const tab2 = document.querySelector('#tab2');
const sound = document.querySelector('#sound');

// Aquí le damos un evento de cambio al input del color de fondo principal y le decimos que al valor del color seleccionado tambien cambien el color de fondo principal
back1.addEventListener('change', () => {
    colorBack1.style.background = back1.value;
});

// Aquí le estamos diciendo que el número del nivel de sonido se cambie automáticamente por el valor del input de rango en el sonido
$(document).on('input', '#sound', function() {
    $('#soundValue').html( $(this).val() );
});

// Aquí capturamos el id del select de los lenguajes y de la imagen del idioma
const language = document.querySelector('#language');
const imgLanguage = document.querySelector('#imgLanguage');

// Aquí le asignamos un evento de cambio al Selection, y validamos si el idioma es en español, entonces coloque la imagen de españa, sino entonces la del reino unido
language.addEventListener('change', () => {
    if(language.value === 'spanish'){
        imgLanguage.src = './../../assets/flags/spain.png';
    }else{
        imgLanguage.src = './../../assets/flags/united-kingdom.png';
    }
});

// Aquí capturamos el valor de todos los inputs y del color de los caballos
back1.value;back2.value;tab1.value;tab2.value;sound.value;language.value;horse;
// Aquí guardamos los datos de todos los inputs y del color de los caballos para enviarlos al index.js
let conf = {back1,back2,tab1,tab2,sound,language,horse}
ipcRenderer.send('config', conf);
