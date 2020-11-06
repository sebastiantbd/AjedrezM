// Todo este código sirve para crear la base de datos con las diferentes tablas con el servicio de sqlite3(bases de datos locales)
// para más información consultar documentación de sqlite3
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./../database.sqlite3');
 
db.serialize(function() {
  db.run("CREATE TABLE tbl_personas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR NOT NULL, user VARCHAR NOT NULL UNIQUE ,email VARHCAR NOT NULL,disability VARCHAR NOT NULL,genero VARCHAR NOT NULL, foto VARCHAR NOT NULL)");
  db.run("CREATE TABLE tbl_usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARHCAR NOT NULL UNIQUE, user VARHCAR NOT NULL UNIQUE, password VARHCAR NOT NULL,codigo VARCHAR , idPersona INTEGER NOT NULL, FOREIGN KEY(idPersona) REFERENCES tbl_personas(id))");
  db.run("CREATE TABLE tbl_retos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombreReto VARCHAR NOT NULL UNIQUE, descripcion VARCHAR NOT NULL)");
  db.run("CREATE TABLE tbl_logros (id INTEGER PRIMARY KEY AUTOINCREMENT, nombreLogro VARCHAR NOT NULL UNIQUE, descripcion VARCHAR NOT NULL, tipoJuego VARCHAR NOT NULL, modoJuego VARCHAR NOT NULL)");
  db.run("CREATE TABLE tbl_nivelesEducativos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR NOT NULL UNIQUE, descripcion VARCHAR NOT NULL, imagen VARCHAR NOT NULL, filas INTEGER NOT NULL, columnas INTEGER NOT NULL, caballosFila INTEGER NOT NULL)");
  db.run("CREATE TABLE tbl_configuraciones (id INTEGER PRIMARY KEY AUTOINCREMENT, fondo1 VARCHAR NOT NULL, fondo2 VARCHAR NOT NULL, tablero1 VARCHAR NOT NULL, tablero2 VARCHAR NOT NULL, idioma VARCHAR NOT NULL, caballos VARCHAR NOT NULL, sonido VARCHAR NOT NULL, idUsuario INTEGER NOT NULL, FOREIGN KEY (idUsuario) REFERENCES tbl_usuarios(id))");
  db.run("CREATE TABLE tbl_personas_nivelesEducativo (id INTEGER PRIMARY KEY AUTOINCREMENT, idPersona INTEGER NOT NULL, idNivelEducativo INTEGER NOT NULL, FOREIGN KEY (idPersona) REFERENCES tbl_personas(id), FOREIGN KEY (idNivelEducativo) REFERENCES tbl_nivelesEducativos(id))");
  db.run("CREATE TABLE tbl_partidas (id INTEGER PRIMARY KEY AUTOINCREMENT, tipoJuego VARCHAR NOT NULL, modoJuego VARCHAR NOT NULL, idUsuario INTEGER NOT NULL, puntos INTEGER NOT NULL, victoria INTEGER NOT NULL, tiempo VARCHAR NOT NULL, idPersonasNiveles INTEGER, FOREIGN KEY (idUsuario) REFERENCES tbl_usuarios(id), FOREIGN KEY (idPersonasNiveles) REFERENCES tbl_personas_nivelesEducativo(id))");
  db.run("CREATE TABLE tbl_logros_usuarios (idLogro INTEGER NOT NULL, idUsuario INTEGER NOT NULL, FOREIGN KEY (idLogro) REFERENCES tbl_logros(id), FOREIGN KEY (idUsuario) REFERENCES tbl_usuarios(id))");
  db.run("CREATE TABLE tbl_usuarios_retos (idRetos INTEGER NOT NULL, idUsuario INTEGER NOT NULL, cumplio INTEGER NOT NULL, FOREIGN KEY (idRetos) REFERENCES tbl_retos(id), FOREIGN KEY (idUsuario) REFERENCES tbl_usuarios(id))");
  db.run("CREATE TABLE tbl_figuras (id INTEGER PRIMARY KEY AUTOINCREMENT, x INTEGER NOT NULL, y INTEGER NOT NULL, idUsuario INTEGER NOT NULL, idPartida INTEGER NOT NULL, FOREIGN KEY (idUsuario) REFERENCES tbl_usuarios(id), FOREIGN KEY (idPartida) REFERENCES tbl_partidas(id))");

  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();
 
  // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //     console.log(row.id + ": " + row.info);
  // });
});
 
db.close();