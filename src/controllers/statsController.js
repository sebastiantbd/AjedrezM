// Aquí llamamos a la librería moment.js que sirve para dar la fecha exacta en diferentes formatos facilmente
var moment = require('moment');

// Todo esto es para hacer funcionar el cronómetro en la parte de estadísticas
var inicio=0;
var timeout=0;

if(timeout==0)
    {

        inicio=vuelta=new Date().getTime();

        funcionando();
    }
 
	function empezarDetener(elemento)
	{
		if(timeout==0)
		{
			// empezar el cronometro
 
			elemento.value="Detener";
 
			// Obtenemos el valor actual
			inicio=vuelta=new Date().getTime();
 
			// iniciamos el proceso
			funcionando();
		}else{
			// detener el cronometro
 
			elemento.value="Empezar";
			clearTimeout(timeout);
			timeout=0;
		}
    }
    
	function funcionando()
	{
		// obtenemos la fecha actual
		var actual = new Date().getTime();
 
		// obtenemos la diferencia entre la fecha actual y la de inicio
		var diff=new Date(actual-inicio);
 
		// mostramos la diferencia entre la fecha actual y la inicial
		var result=LeadingZero(diff.getUTCHours())+":"+LeadingZero(diff.getUTCMinutes())+":"+LeadingZero(diff.getUTCSeconds());
		document.getElementById('crono').innerHTML = result;
 
		// Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
		timeout=setTimeout("funcionando()",1000);
	}
 
	/* Funcion que pone un 0 delante de un valor si es necesario */
	function LeadingZero(Time) {
		return (Time < 10) ? "0" + Time : + Time;
    }

	// Esto funciona para indicar bajo la librería moment.js, hace cuanto pasó algo, en este ejemplo está la fecha 31 de octubre del 2019, y al resultado se la hace un innerHTML para verse en la parte inferior del modal de figuras formadas
    $('#created').html(moment("20191031", "YYYYMMDD").locale('es').fromNow());



