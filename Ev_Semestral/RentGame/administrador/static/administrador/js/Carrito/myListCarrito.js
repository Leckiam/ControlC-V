$(document).ready(function () {
    let idName='carritos';

    buscarGameAPI(idName,1);
    $('#back-btn').on('click',function(event){
        let nroTmp = $('#btnNroCatalo').val()
        $('#btnNroCatalo').val(parseInt(nroTmp)-1)
        updateCarritoView(idName,event);
    })
    $('#next-btn').on('click',function(event){
        let nroTmp = $('#btnNroCatalo').val()
        $('#btnNroCatalo').val(parseInt(nroTmp)+1)
        updateCarritoView(idName,event);
    })
    $('#btnCloseGame').on('click',function(event){
        $('.carrito-item').remove();
        $('.carrito').css('display','none');
        $('.container').css('display','block');
    })
})


function buscarGameAPI(idName,nro) {
    idName = '#'+idName;
    if (nro==1) {
        jsonObjCarrito(idName,nro);
    } else {
        jsonObjCarrito(idName,nro);
    }
}

function mostrarJuegos(event){
    $('.carrito-item').remove();
    $('.carrito').css('display','block');
    $('.container').css('display','none');
    let ids = llamarIdsGame(event);
    let listaDP = llamarDiasPrecioTot(event);
    let listaIds = JSON.parse(ids);
    for (let i = 0; i < listaIds.length; i++) {
        const juego = listaIds[i];
        llamarGame(juego[0],juego[1])
    }

    updateDiaPrecioTot(listaDP);
}
function addGameCarrito(listaGame) {
    let itemCarritoContenido = `
    <div class="carrito-item">
        <div class="carrito-item-detalles backgroudGame">
            <div class="id-item" style="display:none;">${listaGame[0]}</div>
            <span class="carrito-item-titulo">${listaGame[2]}</span>
            <img src="${listaGame[3]}" alt="" height="304">
            <div class="fila">
                <strong>Precio/dia: </strong>
                <span class="carrito-item-precio">
                    $${listaGame[5]} CLP
                </span>
            </div>
            <div class="fila">
                <div class="idConsole-item" style="display:none;">${listaGame[1][0]}</div>
                <span class="consola-item">
                ${listaGame[1][1]}
                </span>
            </div>
        </div>
    </div>
    `;
    return itemCarritoContenido;
}

function llamarIdsGame(event){
    let button = event.target;
    let carrito = button.parentElement.parentElement;
    let ids = carrito.getElementsByClassName('ids-juegos')[0].innerText;

    return ids;
}
function llamarDiasPrecioTot(event){
    let button = event.target;
    let carrito = button.parentElement.parentElement;
    let dias = carrito.getElementsByClassName('dias-renta')[0].innerText;
    let precio = carrito.getElementsByClassName('precio-carrito')[0].innerText;
    let listaEnd = [parseInt(dias),parseInt(precio)]
    return listaEnd
}

function addInfoCarrito(listaInfo) {
    let itemCarritoContenido = `
    <tr style="background: #d1d1d1; text-align: center;" class="item">
        <td>${listaInfo[0]}</td>
        <td>${listaInfo[1]}</td>
        <td style="display:none;" class="ids-juegos">${listaInfo[2]}</td>
        <td><button type="button" class="btnVerGame rounded" onclick="mostrarJuegos(event)">Ver Juegos</button></td>
        <td>${listaInfo[3]}</td>
        <td class="dias-renta">${listaInfo[4]}</td>
        <td>${listaInfo[5]}</td>
        <td class="precio-carrito">${listaInfo[6]}</td>
        <td><button type="button" class="btnDelete rounded"><a href="Delete/Carrito/${listaInfo[0]}">Eliminar</a></button></td>
    </tr>
    `;
    return itemCarritoContenido;
}

function limitNumber(max,min,num){
    let numTmp = num;
    if (num > max) {
        numTmp = max;
    } else if(num < min){
        numTmp = min;
    }
    return numTmp
}

function updateDiaPrecioTot(listaDP){
    let carrito = document.getElementById('carrito');
    let dias = carrito.getElementsByClassName('carrito-dias-total')[0];
    let precioTot = carrito.getElementsByClassName('carrito-precio-total')[0];

    dias.value = listaDP[0];
    precioTot.innerText = '$'+listaDP[1]+' CLP';
}

function llamarGame(idGame,idConsola){
    $.ajax({
        url: "http://127.0.0.1:8000/RentGame/get/juego/data", 
        type: 'GET',
        data: {idGame: idGame,
               idConsola: idConsola},
        success: function(response) {
            item = response.juego
            listaGame = [item.idGame,item.idConsola,item.nombre,item.imagen,item.stock,item.precio];
            carritoItem = addGameCarrito(listaGame)
            $('.carrito-items').append(carritoItem);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}

function updateCarritoView(idName,event){
    $.ajax({
        url: "http://127.0.0.1:8000/RentGame/get/carritos/all", 
        type: 'GET',
        data: {},
        success: function(response) {
            let numPage = parseInt($('#btnNroCatalo').val());
            let max = 1;

            let carritos = response.carritos;
            if (carritos.length>13) {
                max = Math.trunc(carritos.length/13)+1;
                $('.item').remove();
                numPage = limitNumber(max,1,numPage);
                $('#btnNroCatalo').val(numPage);
                buscarGameAPI(idName,numPage);
            } else {
                console.log
                event.preventDefault();
                numPage = limitNumber(max,1,numPage);
                $('#btnNroCatalo').val(numPage);
            }
            
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}

function jsonObjCarrito(idName,nro){
    $.ajax({
        url: "http://127.0.0.1:8000/RentGame/get/carritos/all", 
        type: 'GET',
        data: {},
        success: function(response) {
            let max = 1;
            let inicio = 0
            let carritos = response.carritos
            if (carritos.length>13) {
                console.log('Hay mas de 13 carritos');
                max = Math.trunc(carritos.length/13)+1;
                inicio = (nro-1)*13;
                
                $('#next-btn').css('display','block');
                if (nro==1) {
                    $('#back-btn').css('display','none');
                } else {
                    $('#back-btn').css('display','block');
                }
                for (let i = 0; i < 13; i++) {
                    const pos = i+inicio;
                    try{
                        const item = carritos[pos];
                        const listaInfo = [item.idCarro,item.nombreCli,item.cadenaJuegos,item.fecha_emicion,item.dias_renta,item.fecha_fin,item.precio]
                        let addItem =addInfoCarrito(listaInfo)
                        $(idName).append(addItem);
                    } catch {
                        $('#next-btn').css('display','none');
                        break;
                    }
                }
            } else {
                console.log('Solo hay una pagina con carritos (Menos de 13 carritos)');
                nro = 1;
                for (let i = 0; i < carritos.length; i++) {
                    const item = carritos[i];
                    const listaInfo = [item.idCarro,item.nombreCli,item.cadenaJuegos,item.fecha_emicion,item.dias_renta,item.fecha_fin,item.precio]
                    let addItem =addInfoCarrito(listaInfo)
                    $(idName).append(addItem);
                }
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}