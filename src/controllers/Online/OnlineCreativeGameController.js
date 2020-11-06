// Esta es la función creada en el allTemplate.js que nos redirige automáticamente al main si se va la internet
changeInternetState();

// Todo esto lo creamos para el correcto funcionanmiento de la animación del logo
var loco = true;
// Cada 5 segundos el logo girará y añadirá una animación de bounce
setInterval(() => {
    if(loco === true){
        moveIcon.className = 'w-25 mt-4 rotateEffect5 d-flex justify-content-center';
        loco = false;
    }else{
        moveIcon.className = 'w-25 mt-4 d-flex justify-content-center animated bounce infinite ad-5';
        loco = true;
    }
}, 5000);

// Inicializamos la función init donde el cronómetro empezará a funcionar automáticamente 
init();
// Inicializamos la función cuenta donde el temporizador empezará a funcionar automáticamente 
cuenta();

// ---------cronómetro---------

// Aquí creamos la función init para que inicie el cronómetro
function init(){
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00";

	cronometrar();
}         
// Aquí creamos la función cronometrar para que el cronómetro vaya avanzando
function cronometrar(){
	// escribir();
    id = setInterval(escribir,1000);
}
// Esta función se crea para que valide las opciones de los segundos, los minutos y horas
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
}
// Esta función es para detener el cronómetro
function parar(){
    clearInterval(id);
}

// Esta función es para regresar el cronómetro a 00:00
function reiniciar(){
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00";
    h=0;m=0;s=0;
    cronometrar();
}

// --------------temporizador--------------

// Aquí creamos dos variables que nos servirán para la cuenta regresiva, uno es para poner el tiempo y el otro para multiplicar por segundos(no tocar el segundo)
var timeLimit = 5; //tiempo en minutos
var conteo = new Date(timeLimit * 60000);

// Aquí inicializamos la function inicializar para alistar el formato del temporizador
inicializar();

// Aquí creamos la function inicializar para alistar el formato del temporizador
   function inicializar(){
      	document.getElementById('cuenta').childNodes[0].nodeValue = 
		conteo.getMinutes() + ":" + conteo.getSeconds() + 0;
   }

//    Aquí creamos la función cuenta que permite que el temporizador retroceda
   function cuenta(){
      intervaloRegresivo = setInterval("regresiva()", 1000);
   }

//    Aquí creamos la función regresiva que valida cuando el conteo llegue a 0 y cuando sea menor a 10 segundos añada un cero a la izquierda
   function regresiva(){

      if(conteo.getTime() > 0){
		 conteo.setTime(conteo.getTime() - 1000);
      }else{
         clearInterval(intervaloRegresivo);
         alert("Fin");
	  }

	  	document.getElementById('cuenta').childNodes[0].nodeValue = 
		conteo.getMinutes() + ":" + conteo.getSeconds();
	  
	  if(conteo.getSeconds() < 10){
		document.getElementById('cuenta').childNodes[0].nodeValue = 
		conteo.getMinutes() + ":" + '0' + conteo.getSeconds();
	 }

   }
   
//    Esta función sirve para pausar el temporizador (por el momento es obsoleta, pero puede funcionar luego)
	function pausaRegresiva(){
		clearInterval(intervaloRegresivo);
	}

	$(document).ready(() => {
	
		// Aquí colocamos un evento de click al botón de salir, que hace sacar una alerta de confirmación
		$('#exit').click(() => {
	
			Swal.fire({
				title: 'Estás seguro?',
				text: "Finalizarás la partida!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sí, Salir!',
				cancelButtonText: 'Cancelar',
			  }).then((result) => {
			//   Si presionas en Sí, Salir!, saldrá otra alerta de afirmación y en te redigirás en 2 segundos a la vista de la categoría Educativa
				if (result.value) {
				  Swal.fire({
					title: 'Partida Finalizada!',
					text: 'Has abandonado la partida!',
					icon: 'success',
					showConfirmButton: false,
					showCancelButton:false,
					allowOutsideClick: false,
					allowEscapeKey: false,        
					allowEnterKey: false,         
					reverseButtons: false,
				  });
	
				  setTimeout(() => {
					  location.href = './../../views/Online/creativeOnline.html';
				  }, 2000);
	
				}
			  });
	
		});

		// Aquí creo una booleana para validar que el botón reiniciar sólo pueda presionarse una vez
		var again = true;
	
		// Aquí creo el evento de click en el botón de reiniciar, si lo presiona los tableros se reestablecen a su estado inicial, pero sólo se puede hacer una vez
		$('#reset').click(() => {

			if(again === true){
				gameRestart();
				again = false;
			}

		});
	
	});

	
// Todo esto queda obsoleto, ya que inicialemente utilizamos el código fuente de otro juego de ajedrez para tomar de Base, pero ya estamos creando una nueva funcionalidad en las vistas de generarTablero 1 y 2, así que todo este código ya no es necesario, pero se deja aquí para usarlo de referente

// Todo este código es para hacer funcionar el caballo en el tablero

// ---------chess----------------

var emptyTable=true;
var knightChess = "url('./../../../assets/pieces/skyHorse.png')"
var piece = "";
var validOption = [];
var score = 0;
var gameOver=2; // 0 for game lost, 1 for game won, 2 for init.
function SquareClicked(x)
{

	console.log(x[4] + x[5] + x[6]);
	
	var square = document.getElementById(x);
	if(emptyTable)
	{
		emptyTable = false;
		square.style.backgroundImage = knightChess;
		piece = x[4] + x[5];

	}
	else if(x[4] + x[5] == piece)
	{
		SearchOption();
		if(validOption.length == 0)
		{
			getGameOverStatus();
		}
	}
	else 
	{
		for(var i=0;i<validOption.length;i++)
		{
			if(x==validOption[i])
			{
				square = document.getElementById(x);
				square.style.backgroundImage = knightChess;
				score++;
				document.getElementById("score").innerHTML = score + " de 64";
				if(square.style.backgroundColor == "var(--danger)") 
				{
					square.style.backgroundColor = "var(--blackChess)";
				}
				else
				{
					square.style.backgroundColor = "white";
				}
				document.getElementById("elem"+piece).style.backgroundImage="";
				if(document.getElementById("elem"+piece).style.backgroundColor == "white")
				{
					document.getElementById("elem"+piece).style.backgroundColor="var(--warning)";
				}
				else if(document.getElementById("elem"+piece).style.backgroundColor == "var(--blackChess)")
				{
					document.getElementById("elem"+piece).style.backgroundColor="var(--info)";
				}
				piece = x[4] + x[5];

			}
			else
			{
				if(document.getElementById(validOption[i]).style.backgroundColor == "var(--pink)")
				{
					document.getElementById(validOption[i]).style.backgroundColor="white";
				}
				else if(document.getElementById(validOption[i]).style.backgroundColor == "var(--danger)")
				{
					document.getElementById(validOption[i]).style.backgroundColor="var(--blackChess)";
				}
			}
		}
		validOption = [];
	}
}

function SearchOption()
{
	var tdRow = parseInt(piece[0]);
	var tdCol = parseInt(piece[1]);
	
	if(tdRow+2 < 8 && tdCol+1 < 8) //hard coded option 1
	{
		var elem="elem"+(tdRow+2)+(tdCol+1);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow+2 < 8 && tdCol-1 >=0) //hard coded option 2
	{
		var elem="elem"+(tdRow+2)+(tdCol-1);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow+1 < 8 && tdCol+2 < 8) //hard coded option 3
	{
		var elem="elem"+(tdRow+1)+(tdCol+2);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow-1 >= 0 && tdCol+2 < 8) //hard coded option 4
	{
		var elem="elem"+(tdRow-1)+(tdCol+2);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{

			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow+1 < 8 && tdCol-2 >=0) //hard coded option 5
	{
		var elem="elem"+(tdRow+1)+(tdCol-2);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow-1 >= 0 && tdCol-2 >=0) //hard coded option 6
	{
		var elem="elem"+(tdRow-1)+(tdCol-2);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow-2 >= 0 && tdCol+1 < 8) //hard coded option 7
	{
		var elem="elem"+(tdRow-2)+(tdCol+1);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
				document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
	if(tdRow-2 >= 0 && tdCol-1 >= 0) //hard coded option 8
	{
		var elem="elem"+(tdRow-2)+(tdCol-1);
		if(document.getElementById(elem).style.backgroundColor!="var(--warning)" &&
			document.getElementById(elem).style.backgroundColor!="var(--info)")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="var(--pink)";
			}
			else if(document.getElementById(elem).style.backgroundColor=="var(--blackChess)")
			{		
				document.getElementById(elem).style.backgroundColor="var(--danger)";
			}
		}
	}
}
function getGameOverStatus()
{
	for(var i =0; i<8; i++)
	{
		for(var j=0;j<8;j++)
		{
			if(document.getElementById("elem"+i+j).style.backgroundColor == "white" ||
				document.getElementById("elem"+i+j).style.backgroundColor == "var(--blackChess)")
			{
				document.getElementById("result").innerHTML = "<i class='fa fa-frown-o'></i> Game Over!";
				document.getElementById("result").color = "var(--danger)";
				gameOver=0;
				break;
			}
		}
	}
	if(gameOver!=0)
	{
		document.getElementById("result").innerHTML = "<i class='fa fa-smile-o'></i> Congratulations!";
		document.getElementById("result").color = "green";
	}
}

function gameRestart()
{
	emptyTable=true;
	piece=""
	validOption = [];
	score = 0;
	gameOver=2; // 0 for game lost, 1 for game won, 2 for init.
	document.getElementById("score").innerHTML = "0 de 64";
	document.getElementById("result").color = "white";
	document.getElementById("result").innerHTML = "";
	for(var i =0; i<8; i++)
	{
		for(var j=0;j<8;j++)
		{
			if(document.getElementById("elem"+i+j).style.backgroundColor == "var(--warning)" ||
				document.getElementById("elem"+i+j).style.backgroundColor == "var(--pink)")
			{
				document.getElementById("elem"+i+j).style.backgroundColor = "white";
			}
			else if(document.getElementById("elem"+i+j).style.backgroundColor == "var(--info)" ||
				document.getElementById("elem"+i+j).style.backgroundColor == "var(--danger)")
			{
				document.getElementById("elem"+i+j).style.backgroundColor = "var(--blackChess)";
			}
			document.getElementById("elem"+i+j).style.backgroundImage = "";		
		}
	}
}