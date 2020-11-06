// Aquí llamamos al módulo de ipcRenderer que sirve para el envío de datos a diferentes vistas en la app de electron
const { ipcRenderer } = require('electron');
// Aquí llamamos al módulo de Menu y MenuItem de electron para crear un nuevo menú en la parte superior
const  { Menu, MenuItem } = require('electron').remote;
// Aquí llamamos a la librería de customTitlebar para crear una nueva barra de menú personalizada
const customTitlebar = require('custom-electron-titlebar');
// Aquí llamamos al módulo de noty para que funcionen las alertas
const Noty = require('noty');
// Aquí llamamos a la librería de mojs para que funcionen las burbujas en las alertas de noty
const  mojs  = require('mo-js');    
// Esta es una librería de alertas más grandes y con más funcionalidades que las usamos para funciones más específicas
const Swal = require('sweetalert2');
// Aquí llamamos a la librería de introJs que sirve para la guía paso a paso de las diferentes vistas de la app
const introJs = require('intro.js/intro');

// -------Menú Superior-------

// Aquí llamamos a la barra de menú personalizado y le asignamos el color y el ícono
let titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#254053'),
    icon: "./../../assets/Logo-Remasterizado2.png"
});

// Aquí creamos los items del menú y submenú de la barra personalizada
const menu = new Menu();
menu.append(new MenuItem({
    label: 'Archivo',
        submenu: [
            {
                label: 'Cerrar Sesión',
                click(){
                    location.href = './../views/login.html';
                }
            },
            {
                type:'separator'
            },
            {
                label: 'Salir',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    ipcRenderer.send('salir');
                }
            }
        ]
}));
 
// Aquí agregamos la barra de herramientas de desarrollador (DevTools), y recargar la vista en el menu, solo si la app está en modo desarrollo
if(process.env.NODE_ENV !== 'production'){

    menu.append(new MenuItem({
        label: 'DevTools',
            submenu: [
                {
                    label: 'Show/Hide DevTools',
                    accelerator: process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
    }));

}
 
// Aquí le decimos que vamos a actualizar la barra de menu personalizada por el menu que acabamos de crear
titlebar.updateMenu(menu);

// Esta es una alerta que está en algunas vistas donde indica al usuario que debe seleccionar alguna categoría
function SelectMessage(time){ 

    var message =

    setInterval(() => {

        typeV = 'info';

        type(typeV);

        new Noty({
            text: `Selecciona una categoría! <i class='fa fa-arrow-down'></i>`,
            theme: 'sunset',
            type: typeV,
            timeout: 2500,
            progressBar: true,
            animation: burbujas,
            callbacks:{
                onClick: () => {clearInterval(message)},
            }
        }).show();

    }, time);

}

// ------alertas Noty------

// Aquí creamos las variables de los colores de las burbujas de las alertas de Noty
var burbleColor = '';
var successBurble = '#00a57a';
var warningBurble = '#EBD761';
var errorBurble = '#c53154';
var infoBurble = '#0d6b8a';

// Aquí creamos la función donde están las condiciones para que las burbujas se asignen al color de la alerta de noty
function type(type){

    if(type === 'error'){
        burbleColor = errorBurble;
    }else if(type === 'success'){
        burbleColor = successBurble;
    }else if(type === 'warning'){
        burbleColor = warningBurble;
    }else{
        burbleColor = infoBurble;
    }
}

// Aquí está toda la función que permite que las burbujas funcionen en las alertas de Noty
const burbujas = {

    open: function (promise) {
    var n = this;
    var Timeline = new mojs.Timeline();
    var body = new mojs.Html({
        el        : n.barDom,
        x         : {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
        isForce3d : true,
        onComplete: function () {
            promise(function(resolve) {
                resolve();
            })
        }
    });

    var parent = new mojs.Shape({
        parent: n.barDom,
        width      : 200,
        height     : n.barDom.getBoundingClientRect().height,
        radius     : 0,
        x          : {[150]: -150},
        duration   : 1.2 * 500,
        isShowStart: true
    });

    n.barDom.style['overflow'] = 'visible';
    parent.el.style['overflow'] = 'hidden';

    var burst = new mojs.Burst({
        parent  : parent.el,
        count   : 10,
        top     : n.barDom.getBoundingClientRect().height + 75,
        degree  : 90,
        radius  : 75,
        angle   : {[-90]: 40},
        children: {
            fill     : burbleColor,
            delay    : 'stagger(500, -50)',
            radius   : 'rand(8, 25)',
            direction: -1,
            isSwirl  : true
        }
    });

    var fadeBurst = new mojs.Burst({
        parent  : parent.el,
        count   : 2,
        degree  : 0,
        angle   : 75,
        radius  : {0: 100},
        top     : '90%',
        children: {
            fill     : burbleColor,
            pathScale: [.65, 1],
            radius   : 'rand(12, 15)',
            direction: [-1, 1],
            delay    : .8 * 500,
            isSwirl  : true
        }
    });

    Timeline.add(body, burst, fadeBurst, parent);
    Timeline.play();
    },
    close: function (promise) {
        var n = this;
        new mojs.Html({
            el        : n.barDom,
            x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
            skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
            isForce3d : true,
            onComplete: function () {
                promise(function(resolve) {
                    resolve();
                })
            }
        }).play();
    }
}

// -------Internet Functions-------

// Esta función sirve para regresar automáticamente a la vista del menú principal si se pierde la conexión estando en la sección de Multijugador
function changeInternetState(){

    if(navigator.onLine){

    }else{
    
        typeV = 'error';
    
        type(typeV);

        new Noty({
            text: `<i class="fa fa-rss"></i> Por favor conéctate a Internet para continuar!`,
            theme: 'sunset',
            type: typeV,
            timeout: 2000,
            progressBar: true,
            animation: burbujas,
            callbacks:{
                onClose: () => {
                    location.href = "./../../views/main.html";
                }
            }
        }).show();
        
    }
        
    window.addEventListener('offline', function() {

        typeV = 'error';

        type(typeV);

        new Noty({
            text: `<i class="fa fa-rss"></i> Por favor conéctate a Internet para continuar!`,
            theme: 'sunset',
            type: typeV,
            timeout: 2000,
            progressBar: true,
            animation: burbujas,
            callbacks:{
                onClose: () => {
                    location.href = "./../../views/main.html";
                }
            }
        }).show();

    }, false);
}

// Aquí creamos una variable booleana que sirve para hacer la condición en la vista de mainController, sí tienes internet vas a ingresar a multijugador, sino, entonces no puedes ingresar
var onlineActive = false;

// Aquí creamos un elemento div que nos va a indicar por medio de un cuadro en la parte inferior izquierda de todas las vistas si estamos en Línea o estamos sin Internet
var Online = document.createElement('div');

// Aquí hacemos la condición de que si en la aplicación hay internet, entonces genere el cuadro de Online con un cículo verde
if(navigator.onLine){
    Online.className = 'onlineCont mainButton p-2 d-flex justify-content-center align-items-center flex-row';
    Online.innerHTML = '<div class="mr-1 onlineBall" style="width:10px; height:10px; border-radius:100%"></div>';
    Online.innerHTML += '<h6 class="m-0" style="font-size: 0.8em">En Línea</h6>';
    document.body.appendChild(Online); 

    onlineActive = true;
// Si no hay internet me va a generar un cuadro de Offline con un círculo rojo
}else{
    Online.className = 'onlineCont mainButton p-2 d-flex justify-content-center align-items-center flex-row';
    Online.innerHTML = '<div class="mr-1 offlineBall" style="width:10px; height:10px; border-radius:100%"></div>';
    Online.innerHTML += '<h6 class="m-0" style="font-size: 0.8em">Sin Conexión</h6>';
    document.body.appendChild(Online);
    
    onlineActive = false;
    
}

// Aquí hacemos la condición de que si al entrar en la aplicación hay internet, entonces genere el cuadro de Online con un cículo verde
window.addEventListener('online', function() {

    Online.className = 'onlineCont mainButton p-2 d-flex justify-content-center align-items-center flex-row';
    Online.innerHTML = '<div class="mr-1 onlineBall" style="width:10px; height:10px; border-radius:100%"></div>';
    Online.innerHTML += '<h6 class="m-0" style="font-size: 0.8em">En Línea</h6>';

    onlineActive = true;

  }, false);

// Si no hay internet me va a generar un cuadro de Offline con un círculo rojo
  window.addEventListener('offline', function() {
    Online.className = 'onlineCont mainButton p-2 d-flex justify-content-center align-items-center flex-row';
    Online.innerHTML = '<div class="mr-1 offlineBall" style="width:10px; height:10px; border-radius:100%"></div>';
    Online.innerHTML += '<h6 class="m-0" style="font-size: 0.8em">Sin Conexión</h6>';

    onlineActive = false;

  }, false);

//   Todo esto es para cerrar la sesión del usuario
  ipcRenderer.on('cierreSesionForzosa', () => {
    sessionStorage.clear();
    Swal.fire({
        title: 'Cerrar juego',
        icon: 'warning',
        text: '¿Quiere cerrar el el juego AjedrezM?',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        reverseButtons: false,
        showCancelButton: true,
        confirmButtonText: '<i class="fa fa-check-circle"></i> Si',
        cancelButtonText: '<i class="fa fa-close"></i> No'
    }).then((result) => {
        if(result.value){
            Swal.fire({
                title: 'Ha cerrado el juego correctamente!',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                reverseButtons: false,
                showCancelButton: false,
                showConfirmButton: false,
            });

            setTimeout(() => {
                Swal.close();
                // window.location.href = './../views/login.html';
                ipcRenderer.send('appQuit');
            }, 2000); 
        }
    });
});

// Esto es para cuando se cierre la aplicación
ipcRenderer.on('sesionExpirada', () => {
    console.log("asdfasasd");
    
    Swal.fire({
        title: 'Cerrar juego',
        icon: 'warning',
        text: '¿Quiere cerrar el el juego AjedrezM?',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        reverseButtons: false,
        showCancelButton: true,
        confirmButtonText: '<i class="fa fa-check-circle"></i> Si',
        cancelButtonText: '<i class="fa fa-close"></i> No'
    })
    setTimeout(() => {
        Swal.close();
        window.location.href = './../views/login.html';
    }, 2000); 
    
});

// ------Librerías------
  
// Aquí llamamos a jQuery
window.$ = window.jQuery = require('jquery/dist/jquery');
// Aquí llamamos a la librería js de Bootstrap
require('bootstrap/dist/js/bootstrap');
// A Popper la llamamos para que bootstrap funcione perfectamente
require('popper.js/dist/umd/popper');
// Aquí llamamos al js de la librería de Noty
require('noty/lib/noty');
// Esta es la librería del Internet que está obsoleta
// require('offline-js/offline');

// Esto es un método de Bootstrap que se usa para abrir mensajes al poner el cursor sobre un objeto, se tiene que llamar en el js para que funcione
$(document).ready(() => {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });

});

// aquí se envía una función para ver los datos de la persona que inició sesión
ipcRenderer.send('verPerfil');

// Aquí se reciben los datos del perfil de la persona que ingresó
ipcRenderer.on('perfil', (e, data) => {
    data.map(e => {
        $('.nameUser').html(e.nombre);      
    })
});