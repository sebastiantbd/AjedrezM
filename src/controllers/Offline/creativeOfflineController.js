// Aquí capturamos el id del input y el texto del tablero
const tabNumber2 = document.querySelector('#tabNumber2');
const tabNumber1 = document.querySelector('#tabNumber1');

// Aquí capturamos el id del input de la cantidad de caballos
const horseNumber = document.querySelector('#horseNumber');

// Aquí creamos el elemento de audio para el sonido de la carrera de caballos
var HorseRaceAudio = document.createElement('audio');
 
// Aquí le asignamos el audio con la ruta
HorseRaceAudio.setAttribute('src', './../../../assets/audio/carrera-caballos.mp3');

// Aquí creamos una variable para que el valor del input del tablero sea un número y no texto(parseInt no funcionó)
var multi = 0;

// Aquí creamos la función onkeyup llamada tablero que se ejecuta cuando escribimos en el input del tablero
function tablero(){

    // Aquí le decimos a la variable multi que va a ser el valor del input del tablero por 1
    multi = (tabNumber1.value * 1);

    // Al texto del tablero le vamos a decir que cambie por el valor del input del tablero
    tabNumber2.innerHTML = tabNumber1.value;

    // El valor del input de la cantidad de caballos va a ser igual al valor del input del tablero
    horseNumber.value = multi;

    // Aquí validamos, si el valor del input está vacío, entonces en el texto aparezca 0, o si el valor es menor o igual a 0 entonces el valor del input va a ser 0 y el texto también será 0
    if(tabNumber1.value === ""){
        tabNumber2.innerHTML = 0;
    }else if(tabNumber1.value <= 0){
        tabNumber2.innerHTML = 0;
        tabNumber1.value = "0";
    }

    // Aquí validamos si el valor del input del tablero es mayor a 20 y es diferente a vacío ó el valor es menor a 5 y diferente a vacío entonces salga una alerta de que el valor debe ser mayor a 5 y menor a 20
    if(tabNumber1.value > 20 && tabNumber1.value != "" || tabNumber1.value < 5 && tabNumber1.value != ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<strong><i class="fa fa-frown-o"></i></strong> Lo siento, Por favor escoge un número mayor a <strong>5</strong> y menor a <strong>20</strong> para el Tablero!`,
            theme: 'sunset',
            type: typeV,
            timeout: 4500,
            progressBar: true,
            animation: burbujas
        }).show();

    }

}

// Aquí creamos la función onkeyup llamada horse que se ejecuta cuando escribimos en el input de la cantidad de caballos
function horse(){

    // Aquí le decimos a la variable multi que va a ser el valor del input del tablero por 1
    multi = (tabNumber1.value * 1);
    
    // Aquí validamos si el valor del input de los caballos es mayor al valor del input del tablero(multi) y diferente a vacío ó sí el valor del input del caballo es menor o igal a 0 y el valor es diferente a vacío entonces muestre una alerta que diga que el valor debe ser mayor a 1 y menos al valor del input del tablero 
    if(horseNumber.value > multi && horseNumber.value != "" || horseNumber.value <= 0 && horseNumber.value != ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<strong><i class="fa fa-frown-o"></i></strong> Lo siento, Por favor escoge un número mayor a <strong>1</strong> y menor a <strong>${tabNumber1.value}</strong> para los Caballos!`,
            theme: 'sunset',
            type: typeV,
            timeout: 4500,
            progressBar: true,
            animation: burbujas
        }).show();

    }
}

// Aquí creamos la función del envío del formulario llamada jugar que se ejecuta al presionar el botón de play
function jugar(e){

    // Aquí le decimos a la variable multi que va a ser el valor del input del tablero por 1
    multi = (tabNumber1.value * 1);

    // Aquí validamos si el input del tablero o de la cantidad de caballos está vacío entonces salga una alaerta de que debe llenar ambos campos para continuar
    if(tabNumber1.value === "" || horseNumber.value === ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<i class="fa fa-warning"></i> Debes llenar ambos campos para continuar!`,
            theme: 'sunset',
            type: typeV,
            timeout: 3000,
            progressBar: true,
            animation: burbujas
        }).show();

    // Aquí validamos si el valor del input del tablero es mayor a 20 y es diferente a vacío ó el valor es menor a 5 y diferente a vacío entonces salga una alerta de que el valor debe ser mayor a 5 y menor a 20
    }else if(tabNumber1.value > 20 && tabNumber1.value != "" || tabNumber1.value < 5 && tabNumber1.value != ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<strong><i class="fa fa-frown-o"></i></strong> Lo siento, Por favor escoge un número mayor a <strong>5</strong> y menor a <strong>20</strong> para el Tablero!`,
            theme: 'sunset',
            type: typeV,
            timeout: 4500,
            progressBar: true,
            animation: burbujas
        }).show();

        tabNumber1.focus();

    // Aquí validamos si el valor del input de los caballos es mayor al valor del input del tablero(multi) y diferente a vacío ó sí el valor del input del caballo es menor o igal a 0 y el valor es diferente a vacío entonces muestre una alerta que diga que el valor debe ser mayor a 1 y menos al valor del input del tablero 
    }else if(horseNumber.value > multi && horseNumber.value != "" || horseNumber.value <= 0 && horseNumber.value != ""){
        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<strong><i class="fa fa-frown-o"></i></strong> Lo siento, Por favor escoge un número mayor a <strong>1</strong> y menor a <strong>${tabNumber1.value}</strong> para los Caballos!`,
            theme: 'sunset',
            type: typeV,
            timeout: 4500,
            progressBar: true,
            animation: burbujas
        }).show();

        horseNumber.focus();

    // Y aquí le decimos que si todo está correcto, entonces apareza el cuadro de cargando nivel, el botón de cancelar y se oculte el botón de play
    }else{
       
        $('#loading').removeClass('d-none');

        $('#playNow').addClass('d-none');
        $('#playNow').removeClass('d-flex');

        $('#cancel').removeClass('d-none');
        $('#cancel').addClass('d-flex');

        // Aquí ejecutamos la función que hace que en 3,1 segundos nos redireccionemos a la vista de juego y que hace que el botón cancelar funcione y devuelva todo a su estado inicial
        run();
    }

    e.preventDefault();
    
}

// Aquí creamos la función que hace que en 3,1 segundos nos redireccionemos a la vista de juego y que hace que el botón cancelar funcione y devuelva todo a su estado inicial
function run(){
    var message =

    setTimeout(() => {

        location.href = "./../../views/Offline/OfflineCreativeGame.html";    

    }, 3100);

    // Aquí iniciamos el sonido de la carrera de caballos
    HorseRaceAudio.play();

    $('#cancel').click(function(){
        clearTimeout(message);
        $('#loading').addClass('d-none');
        $('#playNow').addClass('d-flex');
        $('#cancel').removeClass('d-flex');
        $('#cancel').addClass('d-none');

    // Esto es para colocar el audio en el segundo 0 y lo pausamos
        HorseRaceAudio.currentTime = 0;
        HorseRaceAudio.pause();
    });
}