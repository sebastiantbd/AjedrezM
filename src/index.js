// Aquí llamamos a los módulos que necesitamos de elecron js, que sirven para inicializar la aplicación
const { app, BrowserWindow, ipcMain } = require('electron');
// globalShortcut sirve para asignar un evento o función mediante un comando del teclado
const globalShortcut = require('electron').globalShortcut;
// bcrypt y salt sirve para encriptar las contraseñas que lleguen y guardarlas en la DB
const bcrypt = require('bcryptjs');
const salt  = bcrypt . genSaltSync ( 10 ) ; 
// Esta librería de NodeJS sirve para el envío de mensajes por correo electrónico, para más información ver Nodemailer.js
const mai = require('./email');

// si descomentan la siguiente linea se creara la base de datos del proyecto, el modelo de la creacion se encuentra en: AjedrezM/database
// require('./../database/database');

// Ambas constantes sirven para cargar la aplicación desde una vista mediante una url
const url = require('url');
const path = require('path');

// a continuacion proseguimos con la creacion de la conexion a la DB 
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './database.sqlite3'
    },
    useNullAsDefault: true
});

//esto es para que recargue la aplicación automáticamente cuando se hagan cambios en el editor de código,
//también se inserta un método para que también se recargue automáticamente cuando se cambie el index.js
// como se puede ver la siguiente linea dice "process.env.NODE_ENV !== 'production'" la palabra production cambiara a  cuando se termine la aplicacion.
if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

// Esta variable la creamos para que abra la ventana principal de la aplicación
let mainWindow;

//Aquí es donde se abre la aplicación por completo
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        frame: false,
        titleBarStyle: 'hidden',
        show: false,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true
        },
        width: 1280,
        height:720,
        icon: __dirname + "./../assets/Logo-Remasterizado2.png"
    });

    // se asigna cual sera la pagina de inicio para el juego
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file',
        slashes: true
    }));

    // la siguiente funcion hace que cuando el proyecto este listo para ejecucion lo abra de inmediato.
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // esta funcion cerra la ventana al dar clic en la "X"
    mainWindow.on('close', () => {
        app.quit();
    });
    
    // esta funcion al apretar las teclas asignadas cerrara la aplicacion
    globalShortcut.register('Ctrl+Q', () => app.quit());

});

// cuando el usuario salga de la aplicacion el sessionStorage que almacena sus datos se eliminara
ipcMain.on("salir", () => {
    mainWindow.webContents.send('cierreSesionForzosa');
});

// se usa la siguiente funcion para que cierre el juego cuando el usuario de clic en cerrar
ipcMain.on('appQuit', () => {
    app.quit();
})


//Esto se coloca para que si la aplicación está en Mac, entonces se coloque el nombre de la aplicación
//en el templateMenu
if(process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    })
};

// ------------- Este es el login y la comparacion de la contraseña encriptada ----------------
ipcMain.on('loginUser', (e, datos) => {
    knex('tbl_usuarios')
    .select('*').where({email: datos.email}).orWhere({user: datos.email})
    .then(rows=> {
        console.log("login",rows);
        
            if (rows!=0) {
                let comparacion = bcrypt.compareSync( datos.password ,  rows[0].password );
                if (comparacion) {
                    mainWindow.webContents.send('userCorrecto');
                    let user = {idUser:rows[0].id, idPerson:rows[0].idPersona, email:rows[0].email}
                    mainWindow.webContents.send('user', user);
                }else{                    
                    mainWindow.webContents.send('emailErroneo');        
                }
            }else if(rows==0){
                mainWindow.webContents.send('emailErroneo');
            }
    })
})

// -------------- Recibir los datos para el registro de personas y usuarios -------
ipcMain.on('registerPersonas', (e, datos) => {
    knex(datos.tabla)
    .select('*').where({email:datos.persona.email}).orWhere({user: datos.persona.user})
    .then(rows => {
        // hacer el registro de personas, usuarios y configuracion
        if (rows == 0) {
            // registrar persona
            knex(datos.tabla)
            .insert({user: datos.persona.user,nombre: datos.persona.nombre, email: datos.persona.email, disability: datos.persona.disability, genero: datos.persona.genero, foto:datos.persona.foto})    
            .then(() => {
                mainWindow.webContents.send('registroPersonas');
            })
            .catch(e =>{
                mainWindow.webContents.send('errorRegistroPersonas');        
            }) 

            // consultar persona y registrar usuario
            knex(datos.tabla)
            .select('*').where({email:datos.persona.email}).orWhere({user: datos.persona.user})
            .then(rows => {
                let contra = bcrypt.hashSync( datos.persona.password ,  salt) ; 
                knex(datos.tabla2)
                .insert({ email: datos.persona.email, user: datos.persona.user,password: contra, idPersona: rows[0].id})
                .then(()=>{
                    mainWindow.webContents.send('registroUsuario');

                })
                .catch(e=>{
                    mainWindow.webContents.send('errorRegistroUsuario');
                })

                // consultar usuarios y registrar configuracion
                knex(datos.tabla2)
                .select('*').where({email:datos.persona.email})
                .then(rows => {
                    let v = datos.config;
                    v.idUsuario = rows[0].id;
                    knex(datos.tabla3)
                    .insert(v)
                    .then(()=>{
                        mainWindow.webContents.send('reistroConfig');
                    })
                    .catch(e=>{
                        mainWindow.webContents.send('errorRegistroConfig');
                    })
                })
            })
        }else{
            mainWindow.webContents.send('emailExiste');
        }
    })
});

// recuperacion de contraseña
ipcMain.on('mailPassword', (e, datos)=> {
    knex(datos.tabla)
    .select('*').where({email:datos.email})
    .then(rows => {
        if (rows == 0) {
            console.log("entre 3");
            mainWindow.webContents.send('emailNoExiste');
        }else{
            let code = Math.floor(999999 * Math.random())+100000;
            let email = datos.email;

            let info = {email, code}
            mai.prueba(info);
        }
    })
    .catch( e => {
        mainWindow.webContents.send('ErrorEnvio');
        console.log(e);
        
    })
});

// PARTE INTERNA DE LA APLICACION, A LA CUAL SE DEBE APLICAR JWT PARA LA AUTENTIFICACION
ipcMain.on('useSessionStorage',(e, data)=>{
    // Actualizar personas y usuarios
    ipcMain.on('actualizarPersona', (e, datos) => {
        knex('tbl_personas')
        .where({id:data.idPerson})
        .update(datos)
        .then(()=>{
            console.log("1. se cambiaron", datos, data.idPerson);
        })
        .catch((e)=>{
            console.log("no cambiaron");
        })
        mainWindow.reload();

        // knex('tbl_usuarios')
        // .where({id:tok.idUser})
        // .update({email: datos.email})
        // .then(()=>{
        //     console.log("2. se cambiaron", datos.email,tok.idUser);
        // })
        // .catch(()=>{
        //     console.log("no cambiaron");
        // })
    })
    // Fin acualizar personas y usuarios

        // Ver datos del perfil
    ipcMain.on('verPerfil', () => {        
        knex('tbl_personas')
        .select('*')
        .where('id',data.idPerson)
        .then(rows=>{
            let data = rows;
            mainWindow.webContents.send('perfil', data)
        })
        .catch(()=>{
            console.log("errorPerfil", e);
        })
    }) 
});
// FIN AUTENTIFICACION

ipcMain.on('CierreSesion',() => {
    // knex.destroy();
})

// para más información leer documentación de Electron.js
