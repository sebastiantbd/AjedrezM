$(document).ready(function(){

    // Esto es para agregarle a la imagen del usuario la animación de la sombra con el texto de cambiar imagen en el modo editor cuando el cursor esté encima
    $('.icon-medium').mouseenter(function(){
        $('.bgBlackShadowIco-medium').fadeIn(200);
        $('.text-ico').css('margin-top','30px');
    });

    $('.icon-medium').mouseleave(function(){
        $('.bgBlackShadowIco-medium').fadeOut(200);
        $('.text-ico').css('margin-top','0px');
    });

});

// En resumen toda esta función es para cambiar los textos del modo visualización, por los inputs en el modo editor para actualizar los datos personales
function edit(){
    $('#updateButton').removeClass('d-none');
    $('#cancelButton').removeClass('d-none');
    $('#userInput').removeClass('d-none');
    $('#emailInput').removeClass('d-none');
    $('#imgInput').removeClass('d-none');
    $('#sexInput').removeClass('d-none');
    $('#imgNormal').removeClass('d-flex');

    $('#editButton').addClass('d-none');
    $('#imgInput').addClass('d-flex');
    $('#userText').addClass('d-none');
    $('#emailText').addClass('d-none');
    $('#imgNormal').addClass('d-none');
    $('#sexText').addClass('d-none');
}

// Toda esta función es para devolver los inputs del modo editor a los textos del modo visualización
function cancel(){
    $('#updateButton').addClass('d-none');
    $('#cancelButton').addClass('d-none');
    $('#userInput').addClass('d-none');
    $('#emailInput').addClass('d-none');
    $('#imgInput').addClass('d-none');
    $('#sexInput').addClass('d-none');
    $('#imgNormal').addClass('d-flex');

    $('#imgInput').removeClass('d-flex');
    $('#editButton').removeClass('d-none');
    $('#userText').removeClass('d-none');
    $('#emailText').removeClass('d-none');
    $('#imgNormal').removeClass('d-none');
    $('#sexText').removeClass('d-none');
}

// Aquí capturamos el id de formulario de datos personales, la imagen del usuario, el input de la imagen, el input del nombre, el input del correo y el input del sexo
const registerForm = document.querySelector('#profileForm');
const imgBack = document.querySelector('#imgBack');

const img = document.querySelector('#img');
const user = document.querySelector('#userInput');
const email = document.querySelector('#emailInput');
const sex = document.querySelector('#sexInput');

// Aquí le damos un evento de cambio al input de la imagen, para que la ruta de la imagen seleccionada se añada a la imagen del usuario
img.addEventListener('change', function(e){
    imgBack.src = img.files[0].path;
});

// Aquí le damos un evento de envío al formulario de los datos personales
registerForm.addEventListener('submit', function(e){
    // esto previene la recarga de la página por defecto
    e.preventDefault();

    // Aquí capturamos los valores de los diferentes inputs del formulario
    let nombre = $('#userInput').val();
    let email = $('#emailInput').val();
    let genero = $('#sexInput').val();
    let foto = "";
    let datos = {};
    // Esto es para capturar la ruta de la imagen seleccionada, y la guarde en una ruta especificada(URL)
    let filesSelected = document.getElementById("img").files;
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result;
            foto = srcData;
            // Aquí guardamos todos los valores de los inputs en un objeto para enviarlos al index.js
            datos = {nombre,email,genero,foto};
            ipcRenderer.send('actualizarPersona', datos);           
        }
        // Aquí es donde guardamos la imagen en una ruta especificada
        fileReader.readAsDataURL(fileToLoad);
    }else {
        // Aquí nos hace lo mismo, sólo que si no hay foto, entonces me la envíe vacía
        datos = {nombre,email,genero,foto: ""};
        ipcRenderer.send('actualizarPersona', datos);             
    }
});

// Aquí capturamos el formulario de la contraseña
const passwordForm = document.querySelector('#passwordForm');

// Aquí le damos un evento de envío al fomulario de la contraseña
passwordForm.addEventListener('submit', function(e){

    // Esto previene la recarga por defecto
    e.preventDefault();

    // window.location.href = './../views/register.html';

    // Por el momento no funciona, sólo hay una alerta de que estás en la contraseña
    typeV = 'info';

    type(typeV);

    new Noty({
        text: `Estás en tu Contraseña!`,
        theme: 'sunset',
        type: typeV,
        timeout: 1000,
        progressBar: true,
        animation: burbujas
    }).show();

});

// Aquí enviamos la función del perfil del usuario
ipcRenderer.send('verPerfil');

// Aquí recibimos el perfil del usuario que contiene toda la información de éste
ipcRenderer.on('perfil', (e, data) => {
    // El map sirve para hacer un recorrido(ciclo o mapeo), de la información suministrada, funciona como un ciclo for
    data.map(e => {
        // lo que estamos haciendo con todo esto es cambiar toda la información de los inputs y los textos, por las del usuario registrado en la base de datos
        console.log(e);
        
        $('#userInput').val(e.nombre);
        $('#emailInput').val(e.email);
        $('#sexInput').val(e.genero);
        $('#userText').html(e.nombre);
        $('#emailText').html(e.email);
        $('#sexText').html(e.genero);
        
        if (e.foto!="") {
            let newImage = document.createElement('img');
            newImage.style.height = '100%';
            newImage.src = e.foto;
            document.getElementById("imgInput").innerHTML = newImage.outerHTML;
            document.getElementById("imgNormal").innerHTML = newImage.outerHTML;
            document.getElementById("imgInput").innerHTML += `<div class="bgBlackShadowIco-medium justify-content-center text-center">
                <p class="text-white mb-0 text-ico" style="transition: 0.3s ease-in-out;">Cambiar Imagen</p>
            </div>`;

        }

        
})
});