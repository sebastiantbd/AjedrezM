const Base64 = require('js-base64').Base64;


$(document).ready(function(){

    
    $('.icon').mouseenter(function(){
        $('.bgBlackShadowIco').fadeIn(200);
        $('.text-ico').css('margin-top','65px');
    });

    $('.icon').mouseleave(function(){
        $('.bgBlackShadowIco').fadeOut(200);
        $('.text-ico').css('margin-top','0px');
    });

});


const registerForm = document.querySelector('form');
const imgBack = document.querySelector('#imgBack');
const img = document.querySelector('#img');


img.addEventListener('change', function(e){
    imgBack.src = img.files[0].path;
});

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let nombre = $('#allName').val();
    let user = $('#user').val();
    let email = $('#email').val().toLowerCase();
    let genero = $('#genero').val();
    let disability = $('#customRadio1').is(':checked')?$('#customRadio1').val():$('#customRadio2').is(':checked')?$('#customRadio2').val():"";
    let password = $('#password').val();
    let password2 = $('#password2').val();
    if (password !='' && password2!='' && nombre!='' && email!='' && password!='' && genero!='-1' && disability!='' && user !='') {        
        if (password === password2 && password.length>0 && password2.length>0) {
            let foto = "";
            let filesSelected = document.getElementById("img").files;
            if (filesSelected.length > 0) {
                let fileToLoad = filesSelected[0];
                let fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    let srcData = fileLoadedEvent.target.result;
                    foto = srcData;

                    if (nombre=='' || email=='' || password=='' || genero=='' || disability=='' || user =='') {
                        typeV = 'error';
                        type(typeV);
                        new Noty({
                            text: 'Completa todos los campos por favor!',
                            theme: 'sunset',
                            type: typeV,
                            timeout: 2000,
                            progressBar: true,
                            animation: burbujas
                        }).show();
                    }else{
                        let persona = {nombre,user,email,password,genero,disability,foto};
                        let config = {fondo1:'#192A56', fondo2:'#FFEDCE', tablero1:'#2B2B2B', tablero2:'#ffffff',idioma:'spanish',caballos:'white',sonido:'50',idUsuario: '0'};
                        let d = {persona, config,tabla:'tbl_personas',tabla2:'tbl_usuarios',tabla3:'tbl_configuraciones'};
                        ipcRenderer.send('registerPersonas', d); 
                    }
                }
                fileReader.readAsDataURL(fileToLoad);

            }else {
                let persona = {nombre,user,email,password,genero,disability,foto};
                let config = {fondo1:'#192A56', fondo2:'#FFEDCE', tablero1:'#2B2B2B', tablero2:'#ffffff',idioma:'spanish',caballos:'white',sonido:'50',idUsuario: '0'};
                let d = {persona, config,tabla:'tbl_personas',tabla2:'tbl_usuarios',tabla3:'tbl_configuraciones'};
                ipcRenderer.send('registerPersonas', d);   
            }
        } else {
            typeV = 'error';
            type(typeV);
            new Noty({
                text: `Las contraseñas no coinciden, intentelo nuevamente!`,
                theme: 'sunset',
                type: typeV,
                timeout: 3000,
                progressBar: true,
                animation: burbujas
            }).show();
        }
    }else{
        typeV = 'error';
        type(typeV);
        new Noty({
            text: `Complete todos los campos por favor!`,
            theme: 'sunset',
            type: typeV,
            timeout: 3000,
            progressBar: true,
            animation: burbujas
        }).show();
    }    
});

// Alerta registro persona
ipcRenderer.on('registroPersonas', () => {
    typeV = 'success';

    type(typeV);

    new Noty({
        text: `Se ha registrado con éxito!`,
        theme: 'sunset',
        type: typeV,
        timeout: 2000,
        progressBar: true,
        animation: burbujas
    }).show();

    setTimeout(() => {
        window.location.href = './../views/login.html';
    }, 2000); 
})

// error registro persona
ipcRenderer.on('errorRegistroPersonas', () => {
    typeV = 'error';

    type(typeV);

    new Noty({
        text: `Ha ocurrido un error, inténtelo nuevamente!`,
        theme: 'sunset',
        type: typeV,
        timeout: 1000,
        progressBar: true,
        animation: burbujas
    }).show();
})

ipcRenderer.on('emailExiste', () => {
    typeV = 'error';

    type(typeV);

    new Noty({
        text: `El correo o usuario ya existe, inténtelo nuevamente!`,
        theme: 'sunset',
        type: typeV,
        timeout: 1000,
        progressBar: true,
        animation: burbujas
    }).show();
})




// -------------------------------------------------------test-------------------------------------------------

// aquí está el cuadro de información, posterior a llenar todos los campos del formulario y presionar en siguiente
function registerStatsModal(){
    if(modalRegister === true){
        $('#registerBurble').fadeIn(500);
        $('#registerShadow').show();

        $('#testStart').click(() => {
            $('#horseImgLeft').hide();
            $('#mainContRight').removeClass('col-md-8');
            $('#mainContRight').addClass('col-md-12');
            $('#about').hide();
        });
    }

    $('#nameInfo').html($('#allName').val());
    $('#userInfo').html($('#user').val());
    $('#emailInfo').html($('#email').val());
    if($('#genero').val() === 'man'){
        $('#sexInfo').html('Hombre');
    }else if($('#genero').val() === 'woman'){
        $('#sexInfo').html('Mujer');
    }else{
        $('#sexInfo').html('');
    }
    $('#disInfo').html($('#customRadio1').is(':checked')?$('#customRadio1').val():$('#customRadio2').is(':checked')?$('#customRadio2').val():"");

}

// Esto es para quitar el cuadro de información
function registerModalQuit(){
    $('#registerBurble').fadeOut(500);
    $('#registerShadow').hide();
}

// creamos las variables generales del cronómetro, los errores totales y los tests completados
var totalTime = "00:00";
var totalErrors = 0;
var totalTests = 0;

// ---------reloj--------------

// inicializamos la función del reloj
init();
// aquí está la función del reloj en su estado inicial
function init(){
    document.querySelectorAll(".start").forEach(e => {
        e.addEventListener("click",cronometrar);
    });
    document.querySelectorAll(".stop").forEach(e => {
        e.addEventListener("click",parar);
    })
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00";

    $('#crono').addClass('pulse1');

}       
// esta función es para empezar a cronometrar  
function cronometrar(){
    // escribir();
    id = setInterval(escribir,1000);
    document.querySelectorAll(".start").forEach(e => {
        e.removeEventListener("click",cronometrar);
    });
    $('#crono').removeClass('pulse1');
}
// sirve para condicionar los minutos y segundos, pero no es necesaria, ya se llama en el setInterval de la función cronometrar
function escribir(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = mAux + ":" + sAux; 

    totalTime = mAux + ":" + sAux;

}

// esta función sirve para detener el cronómetro
function parar(){
    clearInterval(id);
    document.querySelectorAll(".start").forEach(e => {
        e.addEventListener("click",cronometrar);
    });
    $('#crono').addClass('pulse1');

}

// esta función sirve para reiniciar el cronómetro desde cero (por el momento no la usamos pero puede servir posteriormente)
function reiniciar(){
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00";
    h=0;m=0;s=0;
    cronometrar();
}

// ---------reloj--------------

// ---------test1--------------

// Aquí capturamos los íconos para mover y los cuadros del test 1
const draggableElements = document.querySelectorAll('.draggable');

// Aquí capturamos cada cuadro para soltar y los íconos del test 1
const droppableElements = document.querySelectorAll('.droppable');

// Aquí capturamos el contenedor de los cuadros donde se sueltan los íconos
const droppableElementsCont = document.querySelector('.droppable-elements');

// Aquí recorremos mediante un ciclo cada cuadro para una función posterior
for (var i = droppableElementsCont.children.length; i >= 0; i--) {
    droppableElementsCont.appendChild(droppableElementsCont.children[Math.random() * i | 0]);
}

// inicializamos el estado inicial del test 1
formsInit();

// Aquí creamos la función del estado inicial del test 1
function formsInit(){

    // esto es para hacer que los íconos estén desactivados con la opacidad baja y que no se puedan arrastrar
    draggableElements.forEach(e => {
        e.classList.add('dragged');
        e.setAttribute('draggable', "false");
    });

    // esto es para que los cuadros tengan el borde sólido y no se pueda soltar nada en ellos
    droppableElements.forEach(e => {
        e.classList.add('dropped');
        e.setAttribute('draggable', "false");
    });

    // aquí estoy guardando los diferentes íconos en un array para poder capturar posteriormente la posición de forma aleatoria
    var iconos = [
        `pencil`,
        `bell`,
        `home`,
        `credit-card`,
        `battery-full`,
        `cube`,
        `adjust`,
        `arrows`,
        `calculator`,
        `camera`
    ];
    
    // Aquí genero dos variables donde se genera el número aleatorio según los íconos del Array, hay una variable por cada cuadro
    var posRandom1 = Math.floor(Math.random() * iconos.length);
    var posRandom2 = Math.floor(Math.random() * iconos.length);

    // Aquí le hacemos un innerHTML a cada cuadro para que nos pinten los íconos generados aleatoriamente cuando inicie el test 1
    // Luego añadimos dos íconos que nos servirán cuando el test aún no inicie donde estará una equix y el otro es cuando se rellenen los cuadros satisfactoriamente que sería un check de correcto
    // y por último le damos al atributo data-draggable-id el nombre del ícono que se genere automáticamente
    droppableElements[0].innerHTML = `<span class='timeIcons' style="font-size: 1em; display:none;"><i class="fa fa-${iconos[posRandom1]}"></i></span>
    <i class='locked fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='check fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElements[0].setAttribute('data-draggable-id', iconos[posRandom1]);

    // aquí se hace lo mismo que en el cuadro 1, sólo que al "droppableElements[]" se le colca la posición [1]
    droppableElements[1].innerHTML = `<span class='timeIcons' style="font-size: 1em; display:none;"><i class="fa fa-${iconos[posRandom2]}"></i></span>
    <i class='locked fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='check fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElements[1].setAttribute('data-draggable-id', iconos[posRandom2]);
}

// aquí colocamos los cuadros de color rojo para indicar que aún no comienza el test
droppableElements.forEach(e => {
    e.classList.add('dropped');
    e.classList.add('bg-danger');
    // aquí le decimos a los íconos de la equix que aparezcan quitándoles el d-none
    document.querySelectorAll('.locked').forEach(es => {
        es.classList.remove('d-none');
    });
});

// esta variable la creamos para crear una función de tiempo posteriormente que va a hacer que los íconos que se generen, desaparezcan para arrastrarlos
var iconosHide;

// aquí creamos la función donde se inicia el test 1
function startMemory(){

    // aquí ocultamos el ícono de comenzar
    $('#memoryStart').removeClass('d-flex'); 
    $('#memoryStart').addClass('d-none');

    // esto es para el boton de reiniciar el test 1, pero está comentado porque el botón de reincio no debería estar
    // $('#resetmemory').addClass('d-flex'); 
    // $('#resetmemory').removeClass('d-none');

    // aquí le indicamos a los cuadros que se quiten los colores de fondo, que los bordes sean rayados y que se puedan soltar los diferentes íconos en los cuadros
    droppableElements.forEach(e => {
        e.classList.remove('dropped');
        e.classList.remove('bg-danger');
        e.classList.remove('bg-success');
        e.style.backgroundColor = 'white';
        // aquí le decimos que se quiten los íconos de la equix y del check
        document.querySelectorAll('.locked').forEach(es => {
            es.classList.add('d-none');
        });
        document.querySelectorAll('.check').forEach(es => {
            es.classList.add('d-none');
        });
    });

    // aquí le decimos que aparezcan los íconos en los cuadros
    $(document).ready(() => {
        $('.timeIcons').fadeIn(500);
    });

    // aquí le estamos asignando a la variable creada anteriormente una función que haga que en 5 segundos los íconos arrastrables se activen y los íconos en los cuadros desaparezcan
    iconosHide = setTimeout(() => {

        draggableElements.forEach(e => {
            e.classList.remove('dragged');
            e.setAttribute('draggable', "true");
        });

        $(document).ready(() => {
            $('.timeIcons').fadeOut(500);
        });

    }, 5000);

}

// Todas estas funciones sirven para hacer que los íconos en la parte superior sean arrastrables(drag), y los cuadros sean soltables(drop), para más información buscar "drag and drop javascript"
draggableElements.forEach(e => {
    e.addEventListener('dragstart', dragStart);
});

droppableElements.forEach(e => {
    e.addEventListener('dragenter', dragEnter);
    e.addEventListener('dragover', dragOver);
    e.addEventListener('dragleave', dragLeave);
    e.addEventListener('drop', drop);
});

function dragStart(e){
    e.dataTransfer.setData("text", e.target.id);
}

function dragEnter(e){
    if(!e.target.classList.contains("dropped")){
        e.target.classList.add('droppable-hover');
    }
}

function dragLeave(e){
    if(!e.target.classList.contains("dropped")){
        e.target.classList.remove('droppable-hover');
    }
}

function dragOver(e){
    if(!e.target.classList.contains("dropped")){
        e.preventDefault();
    }
}

// Aquí creamos las variables de los fallos, los puntos(nos va a servir para indicar cuántos íconos llevamos arrastrados satisfactoriamente), y los intentos realizados en todos el test
var fails = 0;
var points = 0;
var attemps = 0;

// esto es para capturar el id del texto de intentos
var attempsText = document.querySelector('#attemps');

// Aquí creamos la función drop la cual sirve para que haga algo cuando soltemos un ícono en uno de los cuadros
function drop(e){
    // esto nos sirve para evitar la recarga de la página por defecto
    e.preventDefault();
    // esto es para quitar la dureza del borde de los cuadros
    e.target.classList.remove('droppable-hover');
    // aquí capturamos el texto del ícono que estamos arrastrando
    const draggableElementData =  e.dataTransfer.getData("text");
    // aquí capturamos la información del atributo data-draggable-id del cuadro al que vayamos a soltar el ícono
    const droppableElementData = e.target.getAttribute('data-draggable-id');

    // aquí hacemos la condición, si el texto del ícono es igual al atributo del cuadro al que vayamos a soltar, entonces es correcto y me va a hacer algo
    if(draggableElementData === droppableElementData){
        // esto es para colocar el borde sólido y para que no se pueda soltar nada de nuevo encima del cuadro
        e.target.classList.add('dropped');
        // aquí capturamos el id del ícono que arrastramos
        const draggableElement = document.getElementById(draggableElementData);
        // aquí le estamos colocando al cuadro de fondo el color del ícono que arrastramos
        e.target.style.backgroundColor = draggableElement.style.color;

        // aquí le estamos colocando el ícono que arrastramos dentro del cuadro
        e.target.innerHTML = `<i class="fa fa-${draggableElementData}"></i>`;

        // aquí añadimos una animación que indica satisfacción
        e.target.classList.add('heartBeat');

        // y la removemos inmediatamente cuando termine con una función de tiempo de 1 segundo
        setTimeout(() => {
            e.target.classList.remove('heartBeat');
        }, 1000);

        // aquí sumamos 1 a los puntos
        points ++;

        // aquí hacemos la condición de que si arrastró y soltó satisfactoriamente en ambos cuadros, entonces haga algo
        if(points === 2){

            // hacemos que los cuadros se coloquen como en la posición inicial
            formsInit();

            // aquí quitamos los bordes sólidos de los cuadros(lo hago para evitar bugs)
            e.target.classList.remove('dropped');
            
            // aquí añadimos la animación de satisfacción, colocamos los bordes sólidos, y añadimos un color verde de fondo para todos los cuadros 
            droppableElements.forEach(e => {
                e.classList.add('heartBeat');
                e.classList.add('dropped');
                e.classList.add('bg-success');
                // aquí hacemos que en todos los cuadros se active el ícono del check
                document.querySelectorAll('.check').forEach(e => {
                    e.classList.remove('d-none');
                });
            });

            // aquí creamos una función de tiempo donde en 1 segundo, los cuadros se me vuelvan a activar y se inicie otra ronda de arrastrar y soltar
            setTimeout(() => {
                startMemory();
                // aquí quitamos la clase de la animación de satisfacción de todos los cuadros
                droppableElements.forEach(e => {
                    e.classList.remove('heartBeat');
                });
            }, 1000);

            // aquí hacemos que cuando vuelva a llenar ambos cuadros satisfactoriamente, entonces haga algo
        }else if(points === 4){
            // aquí hacemos que el número "2" en la parte inferior se active y se le quite el fondo rojo y se quite el color blanco del texto
            $('#number2').removeClass('bg-danger text-white');
            // aquí le decimos que cuando presione el número "2" abra las instrucciones del test 2
            $('#number2').click(() => {
                test2ModalOpen();
            }); 

            // $('#resetmemory').removeClass('d-flex'); 
            // $('#resetmemory').addClass('d-none');

            // esto es para que añada un botón que diga "Siguiente Test" para que pases al test 2 y se abra el cuadro de instrucciones del mismo
            $('#test1Buttons').append(`
                <button class="mainButton pr-3 pl-3 pt-2 pb-2 hvr-icon-rotate hvr-float d-flex align-items-center text-success" data-target="#tests" data-slide-to="2" onclick="test2ModalOpen()"><i class="fa fa-arrow-circle-right hvr-icon mr-2" style="font-size: 1.5em;"></i>Siguiente Test</button>
            `);

            // esto es para que quite todo el contenedor que dice "No Disponible" del test 2
            $('#test2error').addClass('d-none'); 
            $('#test2error').removeClass('d-flex'); 

            // Esto es para que aparezca todo el contenedor del test 2
            $('#test2success').removeClass('d-none');
            $('#test2success').addClass('d-flex');

            // Esto es para que se quite el botón de instrucciones del test 1, ya que es obsoleta en este caso
            $('#help1Tutorial').removeClass('d-flex');
            $('#help1Tutorial').addClass('d-none');

            // esto es para hacer que los íconos del test 1 queden desactivados y con poca opacidad
            draggableElements.forEach(e => {
                e.classList.add('dragged');
                e.setAttribute('draggable', "false");
            });

            // Aquí lanzamos una alerta que nos indique que el test 1 ya ha sido completado
            Swal.fire({
                title: 'Test Completado',
                html: "Has completado este <strong>Test</strong>.<br> <strong>El <span class='text-success'>Test 2</span> ahora está disponible! <i class='text-success fa fa-arrow-circle-right'></i></strong>",
                icon: 'success',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                allowEscapeKey: false,        
                allowEnterKey: false,         
                reverseButtons: false, 
              });

            //   aquí hacemos una función de tiempo que nos cierre la alerta a los 6 segundos
              setTimeout(() => {
                  Swal.close();
              }, 6000);

            //   esta función sirve para detener el tiempo del cronómetro 
              parar();

            //   Esto es para aumentar la cantidad de tests completados
              totalTests++;
        }

    }else{

        // aquí se añade una animación de error si el ícono que se suelta en el cuadro no es correcto
        e.target.classList.add('shake');

        // aquí hacemos que se quite la clase de la animación de error en 1 segundo
        setTimeout(() => {
            e.target.classList.remove('shake');
        }, 1000);

        // aquí hacemos que se incrementen los errores de a 1
        fails++;

        // y aquí incrementamos de a 1 los errores totales de los tests
        totalErrors++;

        // Aquí creamos la condición, si comete un error pase algo
        if(fails === 1){

            // aquí detenemos el tiempo del cronómetro
            parar();

            // aquí removemos la clase de la animación de satisfacción de todos los cuadros
            droppableElements.forEach(e => {
                e.classList.remove('heartBeat');
            });

            // Aquí indicamos en el cuadro de estadísticas que el usuario va a AjedrezM Diferencial
            $('#personType').html('Diferencial');

            // Aquí llamamos a la función donde aparece el cuadro de estadísticas del usuario
            checkTestsInformation();

            // Aquí colocamos una alerta donde nos indique que se terminó el test porque falló
            Swal.fire({
                title: 'Test Terminado!',
                text: "Has fallado el Test!",
                icon: 'error',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,        
                allowEnterKey: false,         
                reverseButtons: false, 
              });

            //   Aquí cerramos la alerta a los 3 segundos
              setTimeout(() => {
                Swal.close();
            }, 3000);

        }

    }
    
}

// Aquí creamos la función para reiniciar el test 1, por el momento está obsoleta, pero sirve por si el cliente quiere incorporarlo
function resetMemory(){

    // Esto es para que los cuadros e íconos estén en su posición inicial
    formsInit();

    // Esto es para parar la función de tiempo que hace que los íconos en los cuadros desaparezcan
    clearTimeout(iconosHide);

    // Esto es para volver a mostrar el botón de comenzar
    $('#memoryStart').addClass('d-flex'); 
    $('#memoryStart').removeClass('d-none');

    // Esto es para ocultar el botón de reiniciar
    // $('#resetmemory').removeClass('d-flex'); 
    // $('#resetmemory').addClass('d-none');

    // Esto es para que los cuadros tengan los bordes sólidos y no se pueda soltar nada, también se le añade un fondo rojo y el ícono de la equix
    droppableElements.forEach(e => {
        e.classList.add('dropped');
        e.classList.add('bg-danger');
        document.querySelectorAll('.locked').forEach(es => {
            es.classList.remove('d-none');
        });
    });

    // los fallos y puntos vuelven a 0
    fails = 0;

    points = 0;

    // se suman los intentos de a 1
    attemps++;

    // se le hace un innerHTML al texto de los intentos
    attempsText.innerHTML = attemps;
}

// Aquí creamos la función de quitar la ventana de instrucciones del test 1
function test1ModalQuit(){

    $('#test1Burble').fadeOut(500);
    $('#test1Shadow').hide();
}

// Aquí creamos una variable boolena que nos sirve para que al presionar el botón "1" de la parte inferior, no se abra la ventana de instrucciones del test 1 siempre
var modal1Level = true;

// Aquí creamos la función para que abra la ventana de instrucciones del test 1
function test1ModalOpen(){

    // aquí colocamos la condición que sirve para que solo se ejecute una vez, a menos que cambiemos la variable a true posteriormente(lo hacemos para el botón de instrucciones del test 1)
    if(modal1Level === true){
        modal1Level = false;
        $('#test1Burble').fadeIn(500);
        $('#test1Shadow').show();
    }

}

$(document).ready(()=>{
    
    // Esto nos sirve para que se nos muestre un texto al poner el cursor encima del botón de instrucciones del test 1
    $('#help1Tutorial').hover(()=>{

        $('#helpText').show(300);

    }, () =>{

        $('#helpText').hide(300);

    });

    // Esto nos sirve para que se nos muestre un texto al poner el cursor encima del botón de instrucciones del test 2

    $('#help2Tutorial').hover(()=>{

        $('#helpText2').show(300);

    }, () =>{

        $('#helpText2').hide(300);

    });

});

// ---------test1--------------

// ---------test2--------------

// Aquí capturamos los íconos para mover y los cuadros del test 2
const draggableElementsA = document.querySelectorAll('.draggableA');

// Aquí capturamos cada cuadro para soltar y los íconos del test 2
const droppableElementsA = document.querySelectorAll('.droppableA');

// Aquí capturamos el contenedor de los cuadros donde se sueltan los íconos
const droppableElementsContA = document.querySelector('.droppable-elementsA');

// Aquí recorremos mediante un ciclo cada cuadro para una función posterior
for (var i = droppableElementsContA.children.length; i >= 0; i--) {
    droppableElementsContA.appendChild(droppableElementsContA.children[Math.random() * i | 0]);
}

// inicializamos el estado inicial del test 2
formsInitA();

// Aquí creamos la función del estado inicial del test 2
function formsInitA(){

    // esto es para hacer que los íconos estén desactivados con la opacidad baja y que no se puedan arrastrar
    draggableElementsA.forEach(e => {
        e.classList.add('dragged');
        e.setAttribute('draggable', "false");
    });

    // esto es para que los cuadros tengan el borde sólido y no se pueda soltar nada en ellos
    droppableElementsA.forEach(e => {
        e.classList.add('dropped');
        e.setAttribute('draggable', "false");
    });

    // aquí estoy guardando los diferentes íconos en un array para poder capturar posteriormente la posición de forma aleatoria
    var iconosA = [
        `pencil`,
        `bell`,
        `home`,
        `credit-card`,
        `battery-full`,
        `cube`,
        `adjust`,
        `arrows`,
        `calculator`,
        `camera`
    ];
    
    // Aquí genero tres variables donde se genera el número aleatorio según los íconos del Array, hay una variable por cada cuadro
    var posRandom1A = Math.floor(Math.random() * iconosA.length);
    var posRandom2A = Math.floor(Math.random() * iconosA.length);
    var posRandom3A = Math.floor(Math.random() * iconosA.length);

     // Aquí le hacemos un innerHTML a cada cuadro para que nos pinten los íconos generados aleatoriamente cuando inicie el test 2
    // Luego añadimos dos íconos que nos servirán cuando el test aún no inicie donde estará una equix y el otro es cuando se rellenen los cuadros satisfactoriamente que sería un check de correcto
    // y por último le damos al atributo data-draggable-id el nombre del ícono que se genere automáticamente
    droppableElementsA[0].innerHTML = `<span class='timeIconsA' style="font-size: 1em; display:none;"><i class="fa fa-${iconosA[posRandom1A]}"></i></span>
    <i class='lockedA fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkA fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsA[0].setAttribute('data-draggable-id', iconosA[posRandom1A]);

    // aquí se hace lo mismo que en el cuadro 1, sólo que al "droppableElements[]" se le colca la posición [1]
    droppableElementsA[1].innerHTML = `<span class='timeIconsA' style="font-size: 1em; display:none;"><i class="fa fa-${iconosA[posRandom2A]}"></i></span>
    <i class='lockedA fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkA fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsA[1].setAttribute('data-draggable-id', iconosA[posRandom2A]);

    // aquí se hace lo mismo que en el cuadro 1, sólo que al "droppableElements[]" se le colca la posición [2]
    droppableElementsA[2].innerHTML = `<span class='timeIconsA' style="font-size: 1em; display:none;"><i class="fa fa-${iconosA[posRandom3A]}"></i></span>
    <i class='lockedA fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkA fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsA[2].setAttribute('data-draggable-id', iconosA[posRandom3A]);
}

// aquí colocamos los cuadros de color rojo para indicar que aún no comienza el test
droppableElementsA.forEach(e => {
    e.classList.add('dropped');
    e.classList.add('bg-danger');
    document.querySelectorAll('.lockedA').forEach(es => {
        es.classList.remove('d-none');
    });
});

// esta variable la creamos para crear una función de tiempo posteriormente que va a hacer que los íconos que se generen, desaparezcan para arrastrarlos
var iconosHideA;

// aquí creamos la función donde se inicia el test 2
function startMemory2(){

    // aquí ocultamos el ícono de comenzar
    $('#memoryStart2').removeClass('d-flex'); 
    $('#memoryStart2').addClass('d-none');

    // esto es para el boton de reiniciar el test 2, pero está comentado porque el botón de reincio no debería estar
    // $('#resetmemory2').addClass('d-flex'); 
    // $('#resetmemory2').removeClass('d-none');

    // aquí le indicamos a los cuadros que se quiten los colores de fondo, que los bordes sean rayados y que se puedan soltar los diferentes íconos en los cuadros
    droppableElementsA.forEach(e => {
        e.classList.remove('dropped');
        e.classList.remove('bg-danger');
        e.classList.remove('bg-success');
        e.style.backgroundColor = 'white';
        // aquí le decimos que se quiten los íconos de la equix y del check
        document.querySelectorAll('.lockedA').forEach(es => {
            es.classList.add('d-none');
        });
        document.querySelectorAll('.checkA').forEach(es => {
            es.classList.add('d-none');
        });
    });

    // aquí le decimos que aparezcan los íconos en los cuadros
    $(document).ready(() => {
        $('.timeIconsA').fadeIn(500);
    });

    // aquí le estamos asignando a la variable creada anteriormente una función que haga que en 5 segundos los íconos arrastrables se activen y los íconos en los cuadros desaparezcan
    iconosHideA = setTimeout(() => {

        draggableElementsA.forEach(e => {
            e.classList.remove('dragged');
            e.setAttribute('draggable', "true");
        });

        $(document).ready(() => {
            $('.timeIconsA').fadeOut(500);
        });

    }, 5000);

}

// Todas estas funciones sirven para hacer que los íconos en la parte superior sean arrastrables(drag), y los cuadros sean soltables(drop), para más información buscar "drag and drop javascript"
draggableElementsA.forEach(e => {
    e.addEventListener('dragstart', dragStartA);
});

droppableElementsA.forEach(e => {
    e.addEventListener('dragenter', dragEnterA);
    e.addEventListener('dragover', dragOverA);
    e.addEventListener('dragleave', dragLeaveA);
    e.addEventListener('drop', dropA);
});

function dragStartA(e){
    e.dataTransfer.setData("text", e.target.id);
}

function dragEnterA(e){
    if(!e.target.classList.contains("dropped")){
        e.target.classList.add('droppable-hover');
    }
}

function dragLeaveA(e){
    if(!e.target.classList.contains("dropped")){
        e.target.classList.remove('droppable-hover');
    }
}

function dragOverA(e){
    if(!e.target.classList.contains("dropped")){
        e.preventDefault();
    }
}

// Aquí creamos las variables de los fallos, los puntos(nos va a servir para indicar cuántos íconos llevamos arrastrados satisfactoriamente)
var failsA = 0;
var pointsA = 0;

// esto es para capturar el id del texto de fallos(aquí necesitamos mostrar cuántos fallos ha realizado el usuario)
var failsTextA = document.querySelector('#failsA');

// Aquí creamos la función drop la cual sirve para que haga algo cuando soltemos un ícono en uno de los cuadros
function dropA(e){
    // esto nos sirve para evitar la recarga de la página por defecto
    e.preventDefault();
    // esto es para quitar la dureza del borde de los cuadros
    e.target.classList.remove('droppable-hover');
    // aquí capturamos el texto del ícono que estamos arrastrando
    const draggableElementDataA =  e.dataTransfer.getData("text");
    // aquí capturamos la información del atributo data-draggable-id del cuadro al que vayamos a soltar el ícono
    const droppableElementDataA = e.target.getAttribute('data-draggable-id');

    // aquí hacemos la condición, si el texto del ícono es igual al atributo del cuadro al que vayamos a soltar, entonces es correcto y me va a hacer algo
    if(draggableElementDataA === droppableElementDataA){
        // esto es para colocar el borde sólido y para que no se pueda soltar nada de nuevo encima del cuadro
        e.target.classList.add('dropped');
        // aquí capturamos el id del ícono que arrastramos
        const draggableElementA = document.getElementById(draggableElementDataA);
        // aquí le estamos colocando al cuadro de fondo el color del ícono que arrastramos
        e.target.style.backgroundColor = draggableElementA.style.color;

        // aquí le estamos colocando el ícono que arrastramos dentro del cuadro
        e.target.innerHTML = `<i class="fa fa-${draggableElementDataA}"></i>`;

        // aquí añadimos una animación que indica satisfacción
        e.target.classList.add('heartBeat');

        // y la removemos inmediatamente cuando termine con una función de tiempo de 1 segundo
        setTimeout(() => {
            e.target.classList.remove('heartBeat');
        }, 1000);

        // aquí sumamos 1 a los puntos
        pointsA ++;

        // aquí hacemos la condición de que si arrastró y soltó satisfactoriamente en los tres cuadros, entonces haga algo
        if(pointsA === 3){

            // hacemos que los cuadros se coloquen como en la posición inicial
            formsInitA();

            // aquí quitamos los bordes sólidos de los cuadros(lo hago para evitar bugs)
            e.target.classList.remove('dropped');
            
            // aquí añadimos la animación de satisfacción, colocamos los bordes sólidos, y añadimos un color verde de fondo para todos los cuadros 
            droppableElementsA.forEach(e => {
                e.classList.add('heartBeat');
                e.classList.add('dropped');
                e.classList.add('bg-success');
                document.querySelectorAll('.checkA').forEach(e => {
                    e.classList.remove('d-none');
                });
            });

            // aquí creamos una función de tiempo donde en 1 segundo, los cuadros se me vuelvan a activar y se inicie otra ronda de arrastrar y soltar
            setTimeout(() => {
                startMemory2();
                // aquí quitamos la clase de la animación de satisfacción de todos los cuadros
                droppableElementsA.forEach(e => {
                    e.classList.remove('heartBeat');
                });
            }, 1000);

            // aquí hacemos que cuando vuelva a llenar los tres cuadros satisfactoriamente, entonces haga algo
        }else if(pointsA === 6){
            // aquí hacemos que el número "3" en la parte inferior se active y se le quite el fondo rojo, se quite el color blanco del texto y se la añada un fondo azul indicando que es un test bonus
            $('#number3').removeClass('bg-danger');
            $('#number3').addClass('bg-info');
            // aquí le decimos que cuando presione el número "3" abra las instrucciones del test 3
            $('#number3').click(() => {
                test3ModalOpen();
            }); 

            // aquí hacemos que el número "4" en la parte inferior se active y se le quite el fondo rojo y se quite el color blanco del texto
            $('#number4').removeClass('bg-danger text-white');
            // aquí le decimos que cuando presione el número "3" abra las instrucciones del test 3
            $('#number4').click(() => {
                test4ModalOpen();
            }); 

            // $('#resetmemory2').removeClass('d-flex'); 
            // $('#resetmemory2').addClass('d-none');

            // esto es para que añada un botón que diga "Siguiente Test" para que pases al test 3 y se abra el cuadro de instrucciones del mismo
            $('#test2Buttons').append(`
                <button class="mainButton pr-3 pl-3 pt-2 pb-2 hvr-icon-rotate hvr-float d-flex align-items-center text-success" data-target="#tests" data-slide-to="3" onclick="test3ModalOpen()"><i class="fa fa-arrow-circle-right hvr-icon mr-2" style="font-size: 1.5em;"></i>Siguiente Test</button>
            `);

            // esto es para que quite todo el contenedor que dice "No Disponible" del test 3
            $('#test3error').addClass('d-none'); 
            $('#test3error').removeClass('d-flex'); 

            // Esto es para que aparezca todo el contenedor del test 3
            $('#test3success').removeClass('d-none');
            $('#test3success').addClass('d-flex');

            // esto es para que quite todo el contenedor que dice "No Disponible" del test 4
            $('#test4error').addClass('d-none'); 
            $('#test4error').removeClass('d-flex'); 

            // Esto es para que aparezca todo el contenedor del test 4
            $('#test4success').removeClass('d-none');
            $('#test4success').addClass('d-flex');

            // Esto es para que se quite el botón de instrucciones del test 2, ya que es obsoleta en este caso
            $('#help2Tutorial').removeClass('d-flex');
            $('#help2Tutorial').addClass('d-none');


            // esto es para hacer que los íconos del test 2 queden desactivados y con poca opacidad
            draggableElementsA.forEach(e => {
                e.classList.add('dragged');
                e.setAttribute('draggable', "false");
            });

            // Aquí lanzamos una alerta que nos indique que el test 2 ya ha sido completado
            Swal.fire({
                title: 'Test Completado',
                html: "Has completado este <strong>Test</strong>.<br> <strong>El <span class='text-success'>Test 3</span> y <span class='text-success'>Test 4</span> ahora están disponibles! <i class='text-success fa fa-arrow-circle-right'></i></strong>",
                icon: 'success',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                allowEscapeKey: false,        
                allowEnterKey: false,         
                reverseButtons: false, 
              })

            //   aquí hacemos una función de tiempo que nos cierre la alerta a los 6 segundos
              setTimeout(() => {
                  Swal.close();
              }, 6000);

            //   esta función sirve para detener el tiempo del cronómetro 
              parar();

            //   Esto es para aumentar la cantidad de tests completados
              totalTests++;
        }

    }else{

        // aquí se añade una animación de error si el ícono que se suelta en el cuadro no es correcto
        e.target.classList.add('shake');

        // aquí hacemos que se quite la clase de la animación de error en 1 segundo
        setTimeout(() => {
            e.target.classList.remove('shake');
        }, 1000);

        // aquí hacemos que se incrementen los errores de a 1
        failsA++;
        // aquí hacemos un innerHTML para que se muestren los errores cometidos
        failsTextA.innerHTML = failsA;

        // y aquí incrementamos de a 1 los errores totales de los tests
        totalErrors++;

        // Aquí creamos la condición, si comete 3 errores pase algo
        if(failsA === 3){

            // aquí detenemos el tiempo del cronómetro
            parar();

            // aquí removemos la clase de la animación de satisfacción de todos los cuadros
            droppableElementsA.forEach(e => {
                e.classList.remove('heartBeat');
            });

            // Aquí indicamos en el cuadro de estadísticas que el usuario va a AjedrezM Diferencial
            $('#personType').html('Diferencial');

            // Aquí llamamos a la función donde aparece el cuadro de estadísticas del usuario
            checkTestsInformation();

            // Aquí colocamos una alerta donde nos indique que se terminó el test porque falló
            Swal.fire({
                title: 'Test Terminado!',
                text: "Has fallado el Test!",
                icon: 'error',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,        
                allowEnterKey: false,         
                reverseButtons: false, 
              });

            //   Aquí cerramos la alerta a los 3 segundos
              setTimeout(() => {
                Swal.close();
            }, 3000);

        }

    }
    
}

// Aquí creamos la función para reiniciar el test 2, por el momento está obsoleta, pero sirve por si el cliente quiere incorporarlo
function resetMemory2(){

    // Esto es para que los cuadros e íconos estén en su posición inicial
    formsInitA();

    // Esto es para parar la función de tiempo que hace que los íconos en los cuadros desaparezcan
    clearTimeout(iconosHideA);

    // Esto es para volver a mostrar el botón de comenzar
    $('#memoryStart2').addClass('d-flex'); 
    $('#memoryStart2').removeClass('d-none');

    // Esto es para ocultar el botón de reiniciar
    // $('#resetmemory2').removeClass('d-flex'); 
    // $('#resetmemory2').addClass('d-none');

    // Esto es para que los cuadros tengan los bordes sólidos y no se pueda soltar nada, también se le añade un fondo rojo y el ícono de la equix
    droppableElementsA.forEach(e => {
        e.classList.add('dropped');
        e.classList.add('bg-danger');
        document.querySelectorAll('.lockedA').forEach(es => {
            es.classList.remove('d-none');
        });
    });

    // los fallos y puntos vuelven a 0
    failsA = 0;
    // se le hace un innerHTML al texto de los fallos
    failsTextA.innerHTML = failsA;

    pointsA = 0;

    // se suman los intentos de a 1
    attemps++;

    // se le hace un innerHTML al texto de los intentos
    attempsText.innerHTML = attemps;
}

// Aquí creamos la función de quitar la ventana de instrucciones del test 2
function test2ModalQuit(){

    $('#test2Burble').fadeOut(500);
    $('#test2Shadow').hide();
}

// Aquí creamos una variable boolena que nos sirve para que al presionar el botón "2" de la parte inferior, no se abra la ventana de instrucciones del test 2 siempre
var modal2Level = true;

// Aquí creamos la función para que abra la ventana de instrucciones del test 2
function test2ModalOpen(){

    // aquí colocamos la condición que sirve para que solo se ejecute una vez, a menos que cambiemos la variable a true posteriormente(lo hacemos para el botón de instrucciones del test 2)
    if(modal2Level === true){
        modal2Level = false;
        $('#test2Burble').fadeIn(500);
        $('#test2Shadow').show();
    }

}

$(document).ready(()=>{

    // Esto nos sirve para que se nos muestre un texto al poner el cursor encima del botón de instrucciones del test 2
    $('#help3Tutorial').hover(()=>{

        $('#helpText3').show(300);

    }, () =>{

        $('#helpText3').hide(300);

    });

});

// ---------test2--------------

// ---------test3--------------

// Aquí capturamos los íconos para mover y los cuadros del test 3
const draggableElementsB = document.querySelectorAll('.draggableB');
// Aquí capturamos cada cuadro para soltar y los íconos del test 3
const droppableElementsB = document.querySelectorAll('.droppableB');

// Aquí capturamos el contenedor de los cuadros donde se sueltan los íconos
const droppableElementsContB = document.querySelector('.droppable-elementsB');

// Aquí recorremos mediante un ciclo cada cuadro para una función posterior
for (var i = droppableElementsContB.children.length; i >= 0; i--) {
    droppableElementsContB.appendChild(droppableElementsContB.children[Math.random() * i | 0]);
}

// inicializamos el estado inicial del test 3
formsInitB();

// Aquí creamos la función del estado inicial del test 3
function formsInitB(){

    // esto es para hacer que los íconos estén desactivados con la opacidad baja y que no se puedan arrastrar
    draggableElementsB.forEach(e => {
        e.classList.add('dragged');
        e.setAttribute('draggable', "false");
    });

    // esto es para que los cuadros tengan el borde sólido y no se pueda soltar nada en ellos
    droppableElementsB.forEach(e => {
        e.classList.add('dropped');
        e.setAttribute('draggable', "false");
    });

    // aquí estoy guardando los diferentes íconos en un array para poder capturar posteriormente la posición de forma aleatoria
    var iconosB = [
        `pencil`,
        `bell`,
        `home`,
        `credit-card`,
        `battery-full`,
        `cube`,
        `adjust`,
        `arrows`,
        `calculator`,
        `camera`
    ];
    
    // Aquí genero cuatro variables donde se genera el número aleatorio según los íconos del Array, hay una variable por cada cuadro
    var posRandom1B = Math.floor(Math.random() * iconosB.length);
    var posRandom2B = Math.floor(Math.random() * iconosB.length);
    var posRandom3B = Math.floor(Math.random() * iconosB.length);
    var posRandom4B = Math.floor(Math.random() * iconosB.length);

    // Aquí le hacemos un innerHTML a cada cuadro para que nos pinten los íconos generados aleatoriamente cuando inicie el test 3
    // Luego añadimos dos íconos que nos servirán cuando el test aún no inicie donde estará una equix y el otro es cuando se rellenen los cuadros satisfactoriamente que sería un check de correcto
    // y por último le damos al atributo data-draggable-id el nombre del ícono que se genere automáticamente
    droppableElementsB[0].innerHTML = `<span class='timeIconsB' style="font-size: 1em; display:none;"><i class="fa fa-${iconosB[posRandom1B]}"></i></span>
    <i class='lockedB fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkB fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsB[0].setAttribute('data-draggable-id', iconosB[posRandom1B]);

    // aquí se hace lo mismo que en el cuadro 1, sólo que al "droppableElements[]" se le colca la posición [1]
    droppableElementsB[1].innerHTML = `<span class='timeIconsB' style="font-size: 1em; display:none;"><i class="fa fa-${iconosB[posRandom2B]}"></i></span>
    <i class='lockedB fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkB fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsB[1].setAttribute('data-draggable-id', iconosB[posRandom2B]);

    // aquí se hace lo mismo que en el cuadro 1, sólo que al "droppableElements[]" se le colca la posición [2]
    droppableElementsB[2].innerHTML = `<span class='timeIconsB' style="font-size: 1em; display:none;"><i class="fa fa-${iconosB[posRandom3B]}"></i></span>
    <i class='lockedB fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkB fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsB[2].setAttribute('data-draggable-id', iconosB[posRandom3B]);

    // aquí se hace lo mismo que en el cuadro 1, sólo que al "droppableElements[]" se le colca la posición [3]
    droppableElementsB[3].innerHTML = `<span class='timeIconsB' style="font-size: 1em; display:none;"><i class="fa fa-${iconosB[posRandom4B]}"></i></span>
    <i class='lockedB fa fa-close d-none' style='font-size: 1em; color: #7b2921;'></i>
    <i class='checkB fa fa-check d-none' style='font-size: 1em; color: #0a735f;'></i>`;
    droppableElementsB[3].setAttribute('data-draggable-id', iconosB[posRandom4B]);
}

// aquí colocamos los cuadros de color rojo para indicar que aún no comienza el test
droppableElementsB.forEach(e => {
    e.classList.add('dropped');
    e.classList.add('bg-danger');
    document.querySelectorAll('.lockedB').forEach(es => {
        es.classList.remove('d-none');
    });
});

// esta variable la creamos para crear una función de tiempo posteriormente que va a hacer que los íconos que se generen, desaparezcan para arrastrarlos
var iconosHideB;

// aquí creamos la función donde se inicia el test 3
function startMemory3(){

    // aquí ocultamos el ícono de comenzar
    $('#memoryStart3').removeClass('d-flex'); 
    $('#memoryStart3').addClass('d-none');

    // esto es para el boton de reiniciar el test 3, como este test es un bonus, entonces el botón de reinciar sí está disponible
    $('#resetmemory3').addClass('d-flex'); 
    $('#resetmemory3').removeClass('d-none');

    // aquí le indicamos a los cuadros que se quiten los colores de fondo, que los bordes sean rayados y que se puedan soltar los diferentes íconos en los cuadros
    droppableElementsB.forEach(e => {
        e.classList.remove('dropped');
        e.classList.remove('bg-danger');
        e.classList.remove('bg-success');
        e.style.backgroundColor = 'white';
        // aquí le decimos que se quiten los íconos de la equix y del check
        document.querySelectorAll('.lockedB').forEach(es => {
            es.classList.add('d-none');
        });
        document.querySelectorAll('.checkB').forEach(es => {
            es.classList.add('d-none');
        });
    });

    // aquí le decimos que aparezcan los íconos en los cuadros
    $(document).ready(() => {
        $('.timeIconsB').fadeIn(500);
    });

    // aquí le estamos asignando a la variable creada anteriormente una función que haga que en 5 segundos los íconos arrastrables se activen y los íconos en los cuadros desaparezcan
    iconosHideB = setTimeout(() => {

        draggableElementsB.forEach(e => {
            e.classList.remove('dragged');
            e.setAttribute('draggable', "true");
        });

        $(document).ready(() => {
            $('.timeIconsB').fadeOut(500);
        });

    }, 5000);

}

// Todas estas funciones sirven para hacer que los íconos en la parte superior sean arrastrables(drag), y los cuadros sean soltables(drop), para más información buscar "drag and drop javascript"
draggableElementsB.forEach(e => {
    e.addEventListener('dragstart', dragStartB);
});

droppableElementsB.forEach(e => {
    e.addEventListener('dragenter', dragEnterB);
    e.addEventListener('dragover', dragOverB);
    e.addEventListener('dragleave', dragLeaveB);
    e.addEventListener('drop', dropB);
});

function dragStartB(e){
    e.dataTransfer.setData("text", e.target.id);
}

function dragEnterB(e){
    if(!e.target.classList.contains("dropped")){
        e.target.classList.add('droppable-hover');
    }
}

function dragLeaveB(e){
    if(!e.target.classList.contains("dropped")){
        e.target.classList.remove('droppable-hover');
    }
}

function dragOverB(e){
    if(!e.target.classList.contains("dropped")){
        e.preventDefault();
    }
}

// Aquí creamos las variables de los fallos, los puntos(nos va a servir para indicar cuántos íconos llevamos arrastrados satisfactoriamente)
var failsB = 0;
var pointsB = 0;

// esto es para capturar el id del texto de fallos(aquí necesitamos mostrar cuántos fallos ha realizado el usuario)
var failsTextB = document.querySelector('#failsB');

// Aquí creamos la función drop la cual sirve para que haga algo cuando soltemos un ícono en uno de los cuadros
function dropB(e){
    // esto nos sirve para evitar la recarga de la página por defecto
    e.preventDefault();
    // esto es para quitar la dureza del borde de los cuadros
    e.target.classList.remove('droppable-hover');
    // aquí capturamos el texto del ícono que estamos arrastrando
    const draggableElementDataB =  e.dataTransfer.getData("text");
    // aquí capturamos la información del atributo data-draggable-id del cuadro al que vayamos a soltar el ícono
    const droppableElementDataB = e.target.getAttribute('data-draggable-id');

    // aquí hacemos la condición, si el texto del ícono es igual al atributo del cuadro al que vayamos a soltar, entonces es correcto y me va a hacer algo
    if(draggableElementDataB === droppableElementDataB){
        // esto es para colocar el borde sólido y para que no se pueda soltar nada de nuevo encima del cuadro
        e.target.classList.add('dropped');
        // aquí capturamos el id del ícono que arrastramos
        const draggableElementB = document.getElementById(draggableElementDataB);
        // aquí le estamos colocando al cuadro de fondo el color del ícono que arrastramos
        e.target.style.backgroundColor = draggableElementB.style.color;

        // aquí le estamos colocando el ícono que arrastramos dentro del cuadro
        e.target.innerHTML = `<i class="fa fa-${draggableElementDataB}"></i>`;

        // aquí añadimos una animación que indica satisfacción
        e.target.classList.add('heartBeat');

        // y la removemos inmediatamente cuando termine con una función de tiempo de 1 segundo
        setTimeout(() => {
            e.target.classList.remove('heartBeat');
        }, 1000);

        // aquí sumamos 1 a los puntos
        pointsB ++;

        // aquí hacemos la condición de que si arrastró y soltó satisfactoriamente en los cuatro cuadros, entonces haga algo
        if(pointsB === 4){

            // hacemos que los cuadros se coloquen como en la posición inicial
            formsInitB();

            // aquí quitamos los bordes sólidos de los cuadros(lo hago para evitar bugs)
            e.target.classList.remove('dropped');
            
            // aquí añadimos la animación de satisfacción, colocamos los bordes sólidos, y añadimos un color verde de fondo para todos los cuadros 
            droppableElementsB.forEach(e => {
                e.classList.add('heartBeat');
                e.classList.add('dropped');
                e.classList.add('bg-success');
                document.querySelectorAll('.checkB').forEach(e => {
                    e.classList.remove('d-none');
                });
            });

            // aquí creamos una función de tiempo donde en 1 segundo, los cuadros se me vuelvan a activar y se inicie otra ronda de arrastrar y soltar
            setTimeout(() => {
                startMemory3();
                // aquí quitamos la clase de la animación de satisfacción de todos los cuadros
                droppableElementsB.forEach(e => {
                    e.classList.remove('heartBeat');
                });
            }, 1000);

            // aquí hacemos que cuando vuelva a llenar los cuatro cuadros satisfactoriamente, entonces haga algo
        }else if(pointsB === 8){

            // esto es para que el botón de reiniciar se oculte
            $('#resetmemory3').removeClass('d-flex'); 
            $('#resetmemory3').addClass('d-none');

            // Esto es para que se quite el botón de instrucciones del test 3, ya que es obsoleta en este caso
            $('#help3Tutorial').removeClass('d-flex');
            $('#help3Tutorial').addClass('d-none');


            // esto es para hacer que los íconos del test 3 queden desactivados y con poca opacidad
            draggableElementsB.forEach(e => {
                e.classList.add('dragged');
                e.setAttribute('draggable', "false");
            });

            // Aquí lanzamos una alerta que nos indique que el test 3 ya ha sido completado
            Swal.fire({
                title: 'Test Completado',
                html: "Has completado este <strong>Test</strong>.<br> <strong>Tienes grandes Habilidades Cognitivas, <span class='text-success'>Felicitaciones! <i class='text-warning fa fa-star'></i></span></strong>",
                icon: 'success',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                allowEscapeKey: false,        
                allowEnterKey: false,         
                reverseButtons: false, 
              })

            //   aquí hacemos una función de tiempo que nos cierre la alerta a los 6 segundos
              setTimeout(() => {
                  Swal.close();
              }, 6000);

            //   esta función sirve para detener el tiempo del cronómetro 
              parar();

            //   Esto es para aumentar la cantidad de tests completados
              totalTests++;
        }

    }else{

        // aquí se añade una animación de error si el ícono que se suelta en el cuadro no es correcto
        e.target.classList.add('shake');

        // aquí hacemos que se quite la clase de la animación de error en 1 segundo
        setTimeout(() => {
            e.target.classList.remove('shake');
        }, 1000);

        // aquí hacemos que se incrementen los errores de a 1
        failsB++;
        // aquí hacemos un innerHTML para que se muestren los errores cometidos
        failsTextB.innerHTML = failsB;

        // y aquí incrementamos de a 1 los errores totales de los tests
        totalErrors++;

        // Aquí creamos la condición, si comete 3 errores pase algo
        if(failsB === 3){

            // aquí detenemos el tiempo del cronómetro
            parar();

            // aquí removemos la clase de la animación de satisfacción de todos los cuadros
            droppableElementsB.forEach(e => {
                e.classList.remove('heartBeat');
            });

            // Aquí colocamos una alerta donde nos indique que se terminó el test porque falló, pero con la opción de reintentar
            Swal.fire({
                title: 'Test Terminado',
                text: "Has fallado muchas veces",
                icon: 'error',
                showCloseButton: true,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: '<i class="fa fa-refresh"></i> Reintentar',
                allowOutsideClick: false,
                allowEscapeKey: false,        
                allowEnterKey: false,         
                reverseButtons: false, 
              }).then((result) => {
                //   si presiona en reintentar entra a esta condición
                if (result.value) {

                    // esto es para iniciar el cronómetro
                  cronometrar();

                    // hacemos que los cuadros se coloquen como en la posición inicial
                  formsInitB();

                    // Esto es para parar la función de tiempo que hace que los íconos en los cuadros desaparezcan
                  clearTimeout(iconosHideB);

                    // Esto es para volver a mostrar el botón de comenzar
                  $('#memoryStart3').addClass('d-flex'); 
                  $('#memoryStart3').removeClass('d-none');

                    // Esto es para ocultar el botón de reiniciar
                  $('#resetmemory3').removeClass('d-flex'); 
                  $('#resetmemory3').addClass('d-none');

                    // Esto es para que los cuadros tengan los bordes sólidos y no se pueda soltar nada, también se le añade un fondo rojo y el ícono de la equix
                  droppableElementsB.forEach(e => {
                        e.classList.add('dropped');
                        e.classList.add('bg-danger');
                        document.querySelectorAll('.lockedB').forEach(es => {
                            es.classList.remove('d-none');
                        });
                    });

                    // los fallos y puntos vuelven a 0
                    failsB = 0;
                    // se le hace un innerHTML al texto de los fallos
                    failsTextB.innerHTML = failsB;

                    pointsB = 0;

                    // se suman los intentos de a 1
                    attemps++;

                    // se le hace un innerHTML al texto de los intentos
                    attempsText.innerHTML = attemps;

                }
              });

        }

    }
    
}

// Esta función es para reiniciar el test 3
function resetMemory3(){

    // Esto es para que los cuadros e íconos estén en su posición inicial
    formsInitB();

    // Esto es para parar la función de tiempo que hace que los íconos en los cuadros desaparezcan
    clearTimeout(iconosHideB);

    // Esto es para volver a mostrar el botón de comenzar
    $('#memoryStart3').addClass('d-flex'); 
    $('#memoryStart3').removeClass('d-none');

    // Esto es para ocultar el botón de reiniciar
    $('#resetmemory3').removeClass('d-flex'); 
    $('#resetmemory3').addClass('d-none');

    // Esto es para que los cuadros tengan los bordes sólidos y no se pueda soltar nada, también se le añade un fondo rojo y el ícono de la equix
    droppableElementsB.forEach(e => {
        e.classList.add('dropped');
        e.classList.add('bg-danger');
        document.querySelectorAll('.lockedB').forEach(es => {
            es.classList.remove('d-none');
        });
    });

    // los fallos y puntos vuelven a 0
    failsB = 0;
    // se le hace un innerHTML al texto de los fallos
    failsTextB.innerHTML = failsB;

    pointsA = 0;

    // se suman los intentos de a 1
    attemps++;

    // se le hace un innerHTML al texto de los intentos
    attempsText.innerHTML = attemps;
}

// Aquí creamos la función de quitar la ventana de instrucciones del test 3
function test3ModalQuit(){

    $('#test3Burble').fadeOut(500);
    $('#test3Shadow').hide();
}

// Aquí creamos una variable boolena que nos sirve para que al presionar el botón "3" de la parte inferior, no se abra la ventana de instrucciones del test 3 siempre
var modal3Level = true;

// Aquí creamos la función para que abra la ventana de instrucciones del test 3
function test3ModalOpen(){

    // aquí colocamos la condición que sirve para que solo se ejecute una vez, a menos que cambiemos la variable a true posteriormente(lo hacemos para el botón de instrucciones del test 3)
    if(modal3Level === true){
        modal3Level = false;
        $('#test3Burble').fadeIn(500);
        $('#test3Shadow').show();
    }

}

$(document).ready(()=>{

// Esto nos sirve para que se nos muestre un texto al poner el cursor encima del botón de instrucciones del test 3
    $('#help4Tutorial').hover(()=>{

        $('#helpText4').show(300);

    }, () =>{

        $('#helpText4').hide(300);

    });

});

// ---------test3--------------

// ---------test4--------------

// Aquí creamos la función de quitar la ventana de instrucciones del test 4
function test4ModalQuit(){

    $('#test4Burble').fadeOut(500);
    $('#test4Shadow').hide();
}

// Aquí creamos una variable boolena que nos sirve para que al presionar el botón "4" de la parte inferior, no se abra la ventana de instrucciones del test 4 siempre
var modal4Level = true;

// Aquí creamos la función para que abra la ventana de instrucciones del test 4
function test4ModalOpen(){

    // aquí colocamos la condición que sirve para que solo se ejecute una vez, a menos que cambiemos la variable a true posteriormente(lo hacemos para el botón de instrucciones del test 4)
    if(modal4Level === true){
        modal4Level = false;
        $('#test4Burble').fadeIn(500);
        $('#test4Shadow').show();
    }

}

    // Se crean referencias para los cuatro pulsadores y demás elementos a fin de mejorar la legibilidad del código en los sucesivo..
    var pulsVerde = document.querySelector('#verde'),
    pulsRojo = document.querySelector('#rojo'),
    pulsAmarillo = document.querySelector('#amarillo'),
    pulsAzul = document.querySelector('#azul'),
    aparato = document.querySelector('#aparato'),
    empezar = document.querySelector('#empezar'),
    salida = document.querySelector('#salida'),
    // variables con los estilos CSS para los cuatro pulsadores en ambos estados: apagado y encendido...
    verdeApagado = 'background: var(--success)',
    verdeEncendido = 'background: #00ffcd; transform: scale(1.2);',
    rojoApagado = 'background: var(--danger)',
    rojoEncendido = 'background: #ff8b80; transform: scale(1.2);',
    amarilloApagado = 'background: var(--warning)',
    amarilloEncendido = 'background: #ffc363; transform: scale(1.2);',
    azulApagado = 'background: var(--info)',
    azulEncendido = 'background: #76c8ff; transform: scale(1.2);',
    nivel,          // indica el nivel actual
    secuencia,      // array con los colores a repetir
    indSec,         //indica el índice de la secuencia
    repeatSec,      //booleana utilizada al perder el test 4
    attempSec4,     //indica si pierde totalmente el test 4 si llega a 2 fallos
    cantidadSecuencias; //indica el nivel en el que se encuentra del test 4

 // Se programa que cuando se cliqueé el botón "COMENZAR" comienze la partida...

empezar.addEventListener("click", comienzaPartida);

cantidadSecuencias = 1;

repeatSec = false;

attempSec4 = 0;

// esta función sirve para iniciar la secuencia en el nivel 1
function comienzaPartida(){
    $('#salida').removeClass('text-danger');                                    
    $('#salida').addClass('text-info');  
    empezar.style.cssText = 'display: none;';           // se oculta el botón "EMPEZAR"
    aparato.style.cursor = 'pointer';
    reseteaAparato();
    aniadeColorSecuencia();
    reproduceSecuencia();
    function reseteaAparato(){
        nivel = 0;
        secuencia = [];
        indSec = 0;
        pulsVerde.style.cssText = verdeApagado;
        pulsRojo.style.cssText = rojoApagado;
        pulsAmarillo.style.cssText = amarilloApagado;
        pulsAzul.style.cssText = azulApagado;
        salida.innerHTML =  nivel + '/5';
    }

    // esta condición es para que sume los intentos y los muestre con el innerHTML si es que pierde el test
    if(repeatSec === true){
        attemps++;
        attempsText.innerHTML = attemps;
    }

    // esto es para iniciar la secuencia de forma aleatoria
    function aniadeColorSecuencia(){
        var colores = ['verde', 'rojo', 'amarillo', 'azul'];
        secuencia.push( colores[numAleat(0,3)] );   // se añade un color aleatorio al final del array
    }
    // esto es para que empiece a reproducir la secuencia
    function reproduceSecuencia(){

        document.querySelectorAll('.colorF').forEach(e => {
            e.classList.remove('bg-success');
            $('.checkI').fadeOut(500);
            e.innerHTML = ``;
        });

        if(indSec < secuencia.length){      // Si quedan colores por encender en la reproducción de la secuencia...
            enciendeColor();
        }
        else{                               // Secuencia reproducida, ahora le toca al jugador repetirla
            indSec = 0;
            aparato.addEventListener('click', compruebaPulsacion);

            document.querySelectorAll('.colorF').forEach(e => {
                e.style.border = '3px solid white';
            });
        }
        // esto hace que los diferentes colores se enciendan
        function enciendeColor(){
            switch(secuencia[indSec]){
                case 'verde':
                    pulsVerde.style.cssText = verdeEncendido;
                    pulsVerde.style.border = '3px solid var(--danger)';
                    break;
                case 'rojo':
                    pulsRojo.style.cssText = rojoEncendido;
                    pulsRojo.style.border = '3px solid var(--danger)';
                    break;
                case 'amarillo':
                    pulsAmarillo.style.cssText = amarilloEncendido;
                    pulsAmarillo.style.border = '3px solid var(--danger)';
                    break;
                case 'azul':
                    pulsAzul.style.cssText = azulEncendido;
                    pulsAzul.style.border = '3px solid var(--danger)';
                    break;
            }

            // esto es para que los bordes de los colores sean rojos mientras se ilumina la secuencia
            document.querySelectorAll('.colorF').forEach(e => {
                e.style.border = '3px solid var(--danger)';
            });

            setTimeout(apagaColor, 500);
        }
        // esto es para que los diferentes colores se apaguen
        function apagaColor(){
            switch(secuencia[indSec]){
                case 'verde':
                    pulsVerde.style.cssText = verdeApagado;
                    pulsVerde.style.border = '3px solid var(--danger)';
                    break;
                case 'rojo':
                    pulsRojo.style.cssText = rojoApagado;
                    pulsRojo.style.border = '3px solid var(--danger)';
                    break;
                case 'amarillo':
                    pulsAmarillo.style.cssText = amarilloApagado;
                    pulsAmarillo.style.border = '3px solid var(--danger)';
                    break;
                case 'azul':
                    pulsAzul.style.cssText = azulApagado;
                    pulsAzul.style.border = '3px solid var(--danger)';
                    break;
            }

            indSec++;
            setTimeout(reproduceSecuencia, 500);
        }
        // aquí es cuando valida si el color que preionaste sí es el mismo que se mostró en la secuencia
        function compruebaPulsacion(ev){

            var pulsador = ev.target;
            if(pulsador.id != 'aparato'){
                if(pulsador.id === secuencia[indSec]){       // Si se pulsa el pulsador correcto...
                    enciendePulsador(pulsador.id);
                }else{
                    // todo esto ocurre si falla en la secuencia
                    $('#secTxt').html('');                                    
                    $('#salida').removeClass('text-info');                                    
                    $('#salida').addClass('text-danger');                                    
                    salida.innerHTML = 'PERDISTE!. Haz clic en <span class="text-success"><i class="fa fa-play"></i> Comenzar</span> para volver a jugar';
                    aparato.removeEventListener('click', compruebaPulsacion);
                    empezar.style.cssText = 'display: flex';          // se vuelve a mostrar el botón "EMPEZAR"
                    document.querySelectorAll('.colorF').forEach(e => {
                        e.style.transform = 'scale(1)';
                        e.style.background = 'var(--danger)';
                    });

                    aparato.style.cursor = 'inherit';
                    
                    repeatSec = true;

                    cantidadSecuencias = 1;

                    $('#secuencias').html(cantidadSecuencias);

                    totalErrors++;

                    attempSec4++;

                    // si falla dos veces termina el test y se muestra la ventana de estadísticas donde se muestra que el usuario va a AjedrezM Diferencial
                    if(attempSec4 === 2){
                        Swal.fire({
                            title: 'Test Terminado!',
                            text: "Has fallado el Test!",
                            icon: 'error',
                            showCloseButton: true,
                            showCancelButton: false,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,        
                            allowEnterKey: false,         
                            reverseButtons: false, 
                          });
            
                          setTimeout(() => {
                            Swal.close();
                        }, 3000);
    
                        checkTestsInformation();
    
                        $('#personType').html('Diferencial');
                    }

                }
            }

            // esta función enciendo el color cuando presionas sobre él
            function enciendePulsador(pulsador){
                switch(pulsador){
                    case 'verde':
                        pulsVerde.style.cssText = verdeEncendido;
                        break;
                    case 'rojo':
                        pulsRojo.style.cssText = rojoEncendido;
                        break;
                    case 'amarillo':
                        pulsAmarillo.style.cssText = amarilloEncendido;
                        break;
                    case 'azul':
                        pulsAzul.style.cssText = azulEncendido;
                        break;
                }
                setTimeout(apagaPulsador, 500, pulsador);
            }
            // esta función apaga el color cuando presionas sobre él
            function apagaPulsador(pulsador){
                switch(pulsador){
                    case 'verde':
                        pulsVerde.style.cssText = verdeApagado;
                        break;
                    case 'rojo':
                        pulsRojo.style.cssText = rojoApagado;
                        break;
                    case 'amarillo':
                        pulsAmarillo.style.cssText = amarilloApagado;
                        break;
                    case 'azul':
                        pulsAzul.style.cssText = azulApagado;
                        break;
                }
                indSec++;
                if(indSec == secuencia.length){             // Si ya no queda secuencia, Nivel superado
                    nivel++;                                // se pasa al siguiente nivel
                    salida.innerHTML = nivel + '/5';
                    aniadeColorSecuencia();                 // se añade un nuevo color al final de la secuencia
                    indSec = 0;                             // y se resetea el índice de la misma
                    aparato.removeEventListener('click', compruebaPulsacion);   // se elimina el escuchador de evento clic

                    // aquí todos los colores se vuelven verdes y se les coloca un ícono de check si reprodució la secuencia correctamente
                    document.querySelectorAll('.colorF').forEach(e => {
                        e.classList.add('bg-success');
                        e.innerHTML = `
                            <i class="fa fa-check checkI" style="font-size: 5em; display: none; color: #0a735f;"></i>
                        `;
                    });
                
                    $('.checkI').fadeIn(500);
                    // aquí se le añade una animación de satisfacción
                    $('#aparato').addClass('heartBeat');

                    // aquí se le remueve la animación en 1 segundo
                    setTimeout(() => {
                        $('#aparato').removeClass('heartBeat');
                    }, 1000);

                    var secuenciaPlay = setTimeout(reproduceSecuencia, 1500);   // y se programa que tras un segundo se reproduzca la secuencia, repitiéndose así el proceso
                    var secBool = true;
                    // si llega a 5 secuencias satisfactoriamente inicia el nivel 2
                    if(nivel === 5){
                        aparato.removeEventListener('click', compruebaPulsacion);
                        clearTimeout(secuenciaPlay);
                        cantidadSecuencias++;
                        $('#secuencias').html(cantidadSecuencias);
                        $('#secuencAnim').addClass('jackInTheBox');
                        $('#secuencAnim').attr('style','color: var(--purple);');
                        setTimeout(() => {       
                            reseteaAparato();
                            aniadeColorSecuencia();
                            $('#secuencAnim').removeClass('jackInTheBox');
                            if(secBool === true){
                                reproduceSecuencia();
                                aparato.style.cursor = 'pointer';
                                empezar.style.cssText = 'display: none;';           // se oculta el botón "EMPEZAR"
                            }
                        }, 1500);

                    }

                    // si completa ambos niveles satisfactoriamente termina el test totalmente y se muestra un botón que abre la ventana de estadísticas donde se dice que el usuario pasa a AjedrezM Normal
                    if(cantidadSecuencias === 3){
                        secBool = false;
                        empezar.style.cssText = 'display: none';  
                        aparato.style.cursor = 'inherit';
                        $('#test4Buttons').append(`
                            <button class="mainButton pr-3 pl-3 pt-2 pb-2 hvr-icon-rotate hvr-float d-flex align-items-center text-info" onclick="checkTestsInformation()"><i class="fa fa-list hvr-icon mr-2" style="font-size: 1.5em;"></i>Ver Estadísticas</button>
                        `);

                        $('#help4Tutorial').removeClass('d-flex');
                        $('#help4Tutorial').addClass('d-none');

                        $('#secuencias').html('0');

                        Swal.fire({
                            title: 'Test Completado',
                            html: "Has completado los diferentes <strong>Tests</strong> Satisfactoriamente!<br> Ahora puedes pasar a jugar <strong><span class='text-success'>Ajedrez M!</span><br><h4><strong>Bienvenido a esta aventura!</strong></h4> <i class='text-success fa fa-sign-out' style='font-size:2em;'></i></strong>",
                            icon: 'success',
                            showCloseButton: true,
                            showCancelButton: false,
                            showConfirmButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            allowOutsideClick: false,
                            allowEscapeKey: false,        
                            allowEnterKey: false,         
                            reverseButtons: false, 
                          })
            
                          setTimeout(() => {
                              Swal.close();
                          }, 10000);

                        parar();

                        $('#personType').html('Normal');

                        totalTests++;

                        if(totalTests === 4){
                            $('#starTests').html(`<i class="text-warning fa fa-star"></i>`);
                        }

                    }

                }
            }
        }

    }
    
// esta función es la que genera el número aleatorio para la secuencia de los colores
    function numAleat(limInf, limSup){
        return limInf + Math.floor( Math.random() * (limSup - limInf + 1) );
    }
}

// ---------test4--------------

//---------checkTestsInformation-----------

// Esta es la función que abre la ventana de estadísticas
function checkTestsInformation(){

    $('#checkTestBurble').fadeIn(500);
    $('#checkTestShadow').show();

    $('#totalTime').html(totalTime);
    $('#totalErrors').html(totalErrors);
    $('#totalAttemps').html(attemps);
    $('#totalTests').html(totalTests);

}

//---------checkTestsInformation-----------