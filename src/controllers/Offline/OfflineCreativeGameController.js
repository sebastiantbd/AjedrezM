// Todo esto lo creamos para el correcto funcionanmiento de la animación del logo
var loco = true;
// Cada 5 segundos el logo girará y añadirá una animación de bounce
setInterval(() => {
	if (loco === true) {
		moveIcon.className = 'w-25 mt-4 rotateEffect5 d-flex justify-content-center';
		loco = false;
	} else {
		moveIcon.className = 'w-25 mt-4 d-flex justify-content-center animated bounce infinite ad-5';
		loco = true;
	}
}, 5000);

$(document).ready(() => {

	// le asigamos un evento de click al botón de pausa que haga desaparecer el ícono de pausa, aparezca el ícono de reanudar, se añada una animación al cronómetro de pulse1, y hacemos que no se pueda interactuar con ningún elemento de la vista hasta que se reanude el nivel
	$('#pause').click(() => {
		$('#pause').removeClass('d-flex');
		$('#pause').addClass('d-none');

		$('#play').addClass('d-flex');
		$('#play').removeClass('d-none');

		$('#crono').addClass('pulse1');

		$('.logoCenter').css('z-index', '3');

		$('.logoCenter').css('background', 'rgba(0,0,0,0.2)');

		$('.logoCenter').css('cursor', 'not-allowed');
    });

	// Lo que hace este evento de click es reanudar el juego volviéndolo a su estado inicial
	$('#play').click(() => {
		$('#play').removeClass('d-flex');
		$('#play').addClass('d-none');

		$('#pause').addClass('d-flex');
		$('#pause').removeClass('d-none');

		$('#crono').removeClass('pulse1');

		$('.logoCenter').css('z-index', '1');

		$('.logoCenter').css('background', 'rgba(0,0,0,0)');

		$('.logoCenter').css('cursor', 'inherit');

    });

	// Este botón hace que el juego vuelva al estado incial y se inicialize la función de gameRestart para reestablecer todos los elementos y estados por defecto para recomenzar el nivel
	$('#reset').click(() => {
		$('#play').removeClass('d-flex');
		$('#play').addClass('d-none');

		$('#pause').addClass('d-flex');
		$('#pause').removeClass('d-none');

		$('#crono').removeClass('pulse1');

		$('.logoCenter').css('z-index', '1');

		$('.logoCenter').css('background', 'rgba(0,0,0,0)');

		gameRestart();
	});

});

// Inicializamos la función init donde el cronómetro empezará a funcionar automáticamente 
init();

// Aquí creamos la función init para asignarle las diferentes funciones a las clases del cronómetro y para que inicie el cronómetro
function init() {
	document.querySelector(".reiniciar").addEventListener("click", reiniciar);
	h = 0;
	m = 0;
	s = 0;
	document.getElementById("hms").innerHTML = "00:00";

	cronometrar();
}
// Aquí creamos la función cronometrar para que el cronómetro vaya avanzando
function cronometrar() {
	id = setInterval(escribir, 1000);
}
// Esta función se crea para que valide las opciones de los segundos, los minutos y horas
function escribir() {
	var hAux, mAux, sAux;
	s++;
	if (s > 59) { m++; s = 0; }
	if (m > 59) { h++; m = 0; }
	if (h > 24) { h = 0; }

	if (s < 10) { sAux = "0" + s; } else { sAux = s; }
	if (m < 10) { mAux = "0" + m; } else { mAux = m; }
	if (h < 10) { hAux = "0" + h; } else { hAux = h; }

	document.getElementById("hms").innerHTML = mAux + ":" + sAux;
}
// Esta función es para detener el cronómetro
function parar() {
	clearInterval(id);
}

// Esta función es para regresar el cronómetro a 00:00
function reiniciar() {
	clearInterval(id);
	document.getElementById("hms").innerHTML = "00:00";
	h = 0; m = 0; s = 0;
	cronometrar();
}

// Todo esto queda obsoleto, ya que inicialemente utilizamos el código fuente de otro juego de ajedrez para tomar de Base, pero ya estamos creando una nueva funcionalidad en las vistas de generarTablero 1 y 2, así que todo este código ya no es necesario, pero se deja aquí para usarlo de referente

// Todo este código es para hacer funcionar el caballo en el tablero

// ---------chess----------------

var emptyTable = true;
var knightChess = "url('./../../../assets/pieces/skyHorse.png')"
var piece = "";
var validOption = [];
var score = 0;
var gameOver = 2; // 0 for game lost, 1 for game won, 2 for init.
function SquareClicked(x) {
	var square = document.getElementById(x);


	if (emptyTable) {
		emptyTable = false;
		square.style.backgroundImage = knightChess;
		piece = x[4] + x[5];
		

	}
	else if (x[4] + x[5] == piece) {
		SearchOption();
		if (validOption.length == 0) {
			getGameOverStatus();
		}
	}
	else {
		for (var i = 0; i < validOption.length; i++) {
			if (x == validOption[i]) {
				square = document.getElementById(x);
				square.style.backgroundImage = knightChess;
				score++;
				document.getElementById("score").innerHTML = score + " de 64";
				if (square.style.backgroundColor == "var(--danger)") {
					square.style.backgroundColor = "var(--blackChess)";
				}
				else {
					square.style.backgroundColor = "white";
				}
				document.getElementById("elem" + piece).style.backgroundImage = "";
				if (document.getElementById("elem" + piece).style.backgroundColor == "white") {
					document.getElementById("elem" + piece).style.backgroundColor = "var(--warning)";
				}
				else if (document.getElementById("elem" + piece).style.backgroundColor == "var(--blackChess)") {
					document.getElementById("elem" + piece).style.backgroundColor = "var(--info)";
				}
				piece = x[4] + x[5];

			}
			else {
				if (document.getElementById(validOption[i]).style.backgroundColor == "var(--pink)") {
					document.getElementById(validOption[i]).style.backgroundColor = "white";
				}
				else if (document.getElementById(validOption[i]).style.backgroundColor == "var(--danger)") {
					document.getElementById(validOption[i]).style.backgroundColor = "var(--blackChess)";
				}
			}
		}
		validOption = [];
	}
}

function SearchOption() {
	var tdRow = parseInt(piece[0]);  // fila 2
	var tdCol = parseInt(piece[1]); //columna 0

	if (tdRow + 2 < 8 && tdCol + 1 < 8) //hard coded option 1
	{
		var elem = "elem" + (tdRow + 2) + (tdCol + 1);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}

	if (tdRow + 2 < 8 && tdCol - 1 >= 0) //hard coded option 2
	{
		var elem = "elem" + (tdRow + 2) + (tdCol - 1);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
	if (tdRow + 1 < 8 && tdCol + 2 < 8) //hard coded option 3
	{
		var elem = "elem" + (tdRow + 1) + (tdCol + 2);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
	if (tdRow - 1 >= 0 && tdCol + 2 < 8) //hard coded option 4
	{
		var elem = "elem" + (tdRow - 1) + (tdCol + 2);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {

			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
	if (tdRow + 1 < 8 && tdCol - 2 >= 0) //hard coded option 5
	{
		var elem = "elem" + (tdRow + 1) + (tdCol - 2);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
	if (tdRow - 1 >= 0 && tdCol - 2 >= 0) //hard coded option 6
	{
		var elem = "elem" + (tdRow - 1) + (tdCol - 2);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
	if (tdRow - 2 >= 0 && tdCol + 1 < 8) //hard coded option 7
	{
		var elem = "elem" + (tdRow - 2) + (tdCol + 1);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
	if (tdRow - 2 >= 0 && tdCol - 1 >= 0) //hard coded option 8
	{
		var elem = "elem" + (tdRow - 2) + (tdCol - 1);
		if (document.getElementById(elem).style.backgroundColor != "var(--warning)" &&
			document.getElementById(elem).style.backgroundColor != "var(--info)") {
			validOption.push(elem);
			if (document.getElementById(elem).style.backgroundColor == "white") {
				document.getElementById(elem).style.backgroundColor = "var(--pink)";
			}
			else if (document.getElementById(elem).style.backgroundColor == "var(--blackChess)") {
				document.getElementById(elem).style.backgroundColor = "var(--danger)";
			}
		}
	}
}

function getGameOverStatus() {
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (document.getElementById("elem" + i + j).style.backgroundColor == "white" ||
				document.getElementById("elem" + i + j).style.backgroundColor == "var(--blackChess)") {
				document.getElementById("result").innerHTML = "<i class='fa fa-frown-o'></i> Game Over!";
				document.getElementById("result").color = "var(--danger)";
				gameOver = 0;
				break;
			}
		}
	}
	if (gameOver != 0) {
		document.getElementById("result").innerHTML = "<i class='fa fa-smile-o'></i> Congratulations!";
		document.getElementById("result").color = "green";
	}
}

function gameRestart() {
	emptyTable = true;
	piece = ""
	validOption = [];
	score = 0;
	gameOver = 2; // 0 for game lost, 1 for game won, 2 for init.
	document.getElementById("score").innerHTML = "0 de 64";
	document.getElementById("result").color = "white";
	document.getElementById("result").innerHTML = "";
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (document.getElementById("elem" + i + j).style.backgroundColor == "var(--warning)" ||
				document.getElementById("elem" + i + j).style.backgroundColor == "var(--pink)") {
				document.getElementById("elem" + i + j).style.backgroundColor = "white";
			}
			else if (document.getElementById("elem" + i + j).style.backgroundColor == "var(--info)" ||
				document.getElementById("elem" + i + j).style.backgroundColor == "var(--danger)") {
				document.getElementById("elem" + i + j).style.backgroundColor = "var(--blackChess)";
			}
			document.getElementById("elem" + i + j).style.backgroundImage = "";
		}
	}
}