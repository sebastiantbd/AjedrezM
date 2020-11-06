// Todo este script es para generar el tablero 1 en el juego de cualquier categoría
let filas = 8;
let columnas = 8;
let fallos = 0;
let puntaje = 0;
let movimientos = 0;
let horses = 8;
let caballo = 0;
let board = new Array(columnas);
let horsePosition = new Object();
var validOption = [];

let cellSelected_x ;
let cellSelected_y;

$(`.filas`).html(columnas);
$(`.columnas`).html(columnas);

// realizacion del tablero adaptable al tamaño deceado
var tablero = document.querySelector("#tablero1"),
tbl = document.createElement("table");
tbl.style.borderStyle = "solid";
$(tbl).attr('id', 'tabla');

for (var x = 0; x <= filas; x++) {
  var tr = tbl.insertRow();
    for (var y = 0; y <= columnas; y++) {
        let td = tr.insertCell();  
        td.style.margin = "0px !important";
        td.style.padding = "0px !important";
        td.setAttribute('trCell', x);
        // $(td).html(`x:${x} y:${y}`);
        if (y===0 && x>=0) {
            td.appendChild(document.createTextNode(x));
            $(td).attr('id', 'c'+x+y).addClass('pb-0 pt-0 pr-2 pl-2 text-center');
            $(td).attr('style', 'background-color: #ffffff !important; border-width: 2px 0 2px 0 !important;');
            $(td).attr('onClick', `checkCell(${x},${y})`);
        }else if(x===0 && y>=0){
            td.appendChild(document.createTextNode(y)); 
            td.style.border = "1px solid black";
            $(td).attr('id', 'c'+x+y).addClass('p-0 text-center');
            $(td).attr('style', 'background-color: #ffffff !important; border-width: 0 2px 0 2px !important;');
            $(td).attr('onClick', `checkCell(${x},${y})`);
        }else{
            td.appendChild(document.createTextNode(""));
            td.style.border = "1px solid black";
            $(td).attr('id', 'c'+x+y);
            $(td).attr('onClick', `checkCell(${x},${y})`);
        }

        // condicion posision 0,0
        if (x===0 && y===0) {     
            $(td).attr('style','border-width:0 !important; background:white;')
            $(td).html('');
        }

        // condicion para pintar las casillas blancas o negras
        if (y>=1 && x>=1) {

            $(td).hover(() => {
                $(td).css({'box-shadow':'inset 0 0 0 2px var(--info)','transition': 'all .2s ease'}); 
            }, () => {
                $(td).css('box-shadow','inherit');
            });

            if (y%2===0 && x%2 || y%2 && x%2===0) {
                td.style.backgroundColor = "var(--blackChess)";   
                td.style.color = "#fff";
            }else {
                td.style.backgroundColor = "white";
            }
        } 

        // Esto es para pintar las coordenadas en x-y según la casilla donde se posicione el cursor
        $(td).hover(() => {
            if($(td).attr('id').substr(1,4).length === 3 && parseInt($(td).attr('id').substr(1,2)) >= 10 && $(td).attr('id').substr(1,4).length === 3 && parseInt($(td).attr('id').substr(1,2)) <= 20 && td.getAttribute('trCell') != 1){
                $('#coordenadas').html(`(${$(td).attr('id').substr(3,1)},${$(td).attr('id').substr(1,2)})`);  
            }else if($(td).attr('id').substr(1,4).length === 3){
                $('#coordenadas').html(`(${$(td).attr('id').substr(2,2)},${$(td).attr('id').substr(1,1)})`);  
            }else if($(td).attr('id').substr(1,4).length === 4){
                $('#coordenadas').html(`(${$(td).attr('id').substr(3,2)},${$(td).attr('id').substr(1,2)})`);  
            }else{
                $('#coordenadas').html(`(${$(td).attr('id').substr(2,1)},${$(td).attr('id').substr(1,1)})`);  
            }
        }, () => {
            $('#coordenadas').html(`(0,0)`);  
        }); 

    }

    tablero.appendChild(tbl);
}
// fin tablero adaptable
function paintCell(x,y){
    cell = document.getElementById('c'+x+y);
    if (y>=1 && x>=1) {
        if (y%2===0 && x%2 || y%2 && x%2===0) {
            cell.style.backgroundColor = "var(--blackChess)";   
            cell.style.color = "#fff";
            $(cell).attr('style',"background-color: var(--blackChess);");
        }else {
            cell.style.backgroundColor = "white";
            $(cell).attr('style',"background-color: white;");
        }
    }
}

function paintCellHorse(x,y,color){
    cell = document.getElementById('c'+x+y);
    cell.style.background = color;

    if (y%2===0 && x%2 || y%2 && x%2===0) {
        cell.style.backgroundColor = "var(--blackChess)";   
        cell.style.color = "#fff";
        $(cell).attr('style',"background-color: var(--blackChess);background-image: url('./../../../assets/pieces/whiteHorse2.png') !important;");
    } else {
        cell.style.backgroundColor = "white";
        $(cell).attr('style',"background-color: white;background-image: url('./../../../assets/pieces/whiteHorse2.png') !important");
        
    }

}

function selectCell(x,y){
    if (board[x][y]===0 && y==1) {
        board[x][y] = x;
    }else{      
        board[x][y]=caballo;
        validOption.splice();
    }    
    
    paintCell(cellSelected_x, cellSelected_y); 
    paintCellHorse(x, y, "green"); 
    
    cellSelected_x = x;
    cellSelected_y = y;

    puntaje++;
    movimientos++;    
}

// Esto es para Añadir una sombra encima de alguno de los dos tableros cuando uno esté activo para mover el caballo y el otro no
$('#shadowTab1').addClass('d-none');
$('#shadowTab2').removeClass('d-none');

// Esto es para hacer que el cursor se cambie por un símbolo de bloqueado al ponerlo encima del tablero que tiene la sombra(Inactivo)
$('#shadowTab1').css('cursor', 'not-allowed');
$('#shadowTab2').css('cursor', 'not-allowed');

$('#tabla td').css('cursor', 'pointer');

// esta funcion se activa al hacer clic en una selda del tablero del ajedrez
function checkCell(x,y){
    console.log("posion y caballo",x,y, board[x][y]);
    checkTrue = false;
    if (board[x][y]!=0) {
        SearchOption(x,y);
    }
    // let posAc = horsePosition[caballo].fA + horsePosition[caballo].cA;
    // let ultPos = horsePosition[caballo].Uf + horsePosition[caballo].Uc;

    for (let i = 0; i < validOption.length; i++) {
        
        if(`c${x}${y}` == validOption[i]){
            $(`.movimientos`).html(movimientos);

            document.getElementById("score").innerHTML = puntaje + " de 64";
            dif_x =x - horsePosition[caballo].fA;
            dif_y =y - horsePosition[caballo].cA;

            // modificamos el array que contiene la informacion sobre de los caballo
            // para cambiar la ultima pocision en filas(Uf = x) y columnas(Uc = y) y
            horsePosition[caballo].Uf = horsePosition[caballo].fA;
            horsePosition[caballo].Uc = horsePosition[caballo].cA;
            // para cambiar la pocision actual en filas(fA = x) y columna (cA = y);
            horsePosition[caballo].fA += dif_x;
            horsePosition[caballo].cA += dif_y;
            console.log("info del caballo",horsePosition[caballo]);
            

            $('body').css('cursor', 'url(./../../../assets/pieces/burningHorseCursor.png) 4 12, auto');
            // condicion para que no pise una casilla en la que ya se habia movido
            if (board[x][y]==0) {
                // movimientos hacia la derecha
                if(dif_x == 1 && dif_y == -2) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                else if(dif_x == 2 && dif_y == -1) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                else if(dif_x == 1 && dif_y == 2) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                else if(dif_x == 2 && dif_y == 1) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }

                // movimientos hacia la izquierda
                else if(dif_x == -1 && dif_y == -2) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                else if(dif_x == -2 && dif_y == -1) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                else if(dif_x == -1 && dif_y == 2) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                else if(dif_x == -2 && dif_y == 1) {
                    checkTrue = true;
                    $('#shadowTab1').removeClass('d-none');
                    $('#shadowTab2').addClass('d-none');
                }
                
                // valida si checktrue cambia de false a true para continuar con el movimiento
                if (checkTrue)  selectCell(x,y);
            }else{
                checkTrue = false
            }
        }
    }
    console.log("tablero",board);    
}

// inicia el juego 
function autoplay(){
    for (let i = 0; i <= filas; i++) {
        board[i] = new Array(filas);
    }

    for (let i = 0; i <= filas; i++) {
        for (let j = 0; j <= columnas; j++) {
            board[i][j]=0;
        }        
    }

    for (let i = 0; i <= horses; i++) {
        if (i!=0) {
            x=i;
            y=1;
            cellSelected_x = x;
            cellSelected_y = y;
            horsePosition[i]= {"id":i, "cA":1, "fA":i, "Uc":cellSelected_x, "Uf":cellSelected_y, "move":true};
            $(`#c${x}${y}`).addClass(`horse${i}`);
        
            selectCell(x,y);
        }
    }   
    // x=Math.floor(Math.random()*filas+1);
    // y=1;    
}
autoplay();

// busca las opciones posibles del movimiento del caballo
function SearchOption(x, y) {
    let tdRow = x;  // fila 2
    let tdCol = y; //columna 0
    caballo = board[tdRow][tdCol];
    // Movimientos a la izquierda
    if (tdRow + 2 <= filas && tdCol + 1 <= columnas) //abajo a la derecha corto
    {
        var elem = "c" + (tdRow + 2) + (tdCol + 1);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
    if (tdRow - 2 > 0 && tdCol + 1 <= columnas) //arriba a la derecha corto
    {
        var elem = "c" + (tdRow - 2) + (tdCol + 1);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
    if (tdRow + 1 <= filas && tdCol + 2 <= columnas) //abajo corto a la derecha
    {
        var elem = "c" + (tdRow + 1) + (tdCol + 2);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
    if (tdRow - 1 > 0 && tdCol + 2 <= columnas) //arriba corto a la derecha
    {
        var elem = "c" + (tdRow - 1) + (tdCol + 2);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }

    // Movimientos a la derecha
    if (tdRow + 2 <= filas && tdCol - 1 > 0) //abajo a la izquierda corto
    {
        var elem = "c" + (tdRow + 2) + (tdCol - 1);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
    if (tdRow - 2 > 0 && tdCol - 1 > 0) //arriba a la izquierda corto
    {
        var elem = "c" + (tdRow - 2) + (tdCol - 1);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
    if (tdRow + 1 <= filas && tdCol - 2 > 0) //abajo corto a la izquierda
    {
        var elem = "c" + (tdRow + 1) + (tdCol - 2);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
    if (tdRow - 1 > 0 && tdCol - 2 > 0) //arriba corto a la izquierda
    {
        var elem = "c" + (tdRow - 1) + (tdCol - 2);        
        document.getElementById(elem).style.backgroundColor = "var(--pink)";
        validOption.push(elem);    
    }
}