$(document).ready(function () {
    let idName=$('.contenedor').children().first().attr('id')

    buscarGameAPI(idName,1,0);
    $('#btnNroCatalo').on('blur',function(event){
        $('.item').remove();
        updateCatalogView(idName,event,$('#selectFilter').val())
    });
    $('#selectFilter').on('change',function(){
        $('.item').remove();
        $('#btnNroCatalo').val(1);
        buscarGameAPI(idName,1,$(this).val());
    });
})

function updateStockPrecio(item,select){
    let stock = item.getElementsByClassName('stock-item')[0]
    let precio = item.getElementsByClassName('precio-item')[0]
    let listaStock = item.getElementsByClassName('stock-array')[0].value
    let listaprecio = item.getElementsByClassName('precio-array')[0].value
    listaStock = eval(listaStock);
    listaprecio = eval(listaprecio);
    for (let i = 0; i < select.options.length; i++) {
        const consola = listaStock[i][1];
        if (select.value==consola) {
            stock.value =listaStock[i][0]
            precio.value =listaprecio[i][0]
        }
    }
}

function changeFormClicked(event) {
    let miForm = document.getElementsByClassName("form-delete")[0];
    /* Rescatar los datos del item (Juego) seleccionado */
    let select = event.target;
    item = select.parentElement;

    let nameConsola = select.options[select.selectedIndex].textContent;
    miForm.elements[2].value = nameConsola;

    updateStockPrecio(item,select)
}

function buscarGameAPI(idName,nro,filter) {
    idName = '#'+idName;
    $(idName).children().css("display", "none");
    if (nro==1) {
        jsonObjJuegos(idName,nro,filter);
    } else {
        jsonObjJuegos(idName,nro,filter);
    }
    let tiempo = setInterval(function(){
        if ($(idName).children().length>=20) {
            for (let index = 0; index < 20; index++) {
                $(idName).children().eq(index).css("display", "grid");
            }
            clearInterval(tiempo);
        }
    },1000);
}

function llamarcsrf(){
    const section = document.getElementsByClassName('contenedor')[0];
    const primerElemento = section.children[1];
    return primerElemento.outerHTML;
}

function addCarritoGame(id,titulo,consolas,img,stockArray,precioArray,csrf) {
    let itemCarritoContenido = `
    <div class="item backgroudGame">
        <div class="id-item" style="display:none;">${id}</div>
        <span class="titulo-item">${titulo}</span>
        <img src="${img}" alt="" height="304" width="195" class="img-item">
        <select class="consola-item rounded-3" onchange="changeFormClicked(event)">`;
    for (let idx = 0; idx < consolas.length; idx++) {
        const consola = consolas[idx];
        const element = consola[1];
        itemCarritoContenido += `<option value="${consola[0]}">` + element + `</option>`
    }
    itemCarritoContenido +=`
        </select>
        <div class="fila" style="display:none;">
            <input type="number" class="stock-item" value="${stockArray[0][0]}">
            <input type="text" class="stock-array" value="${stockArray}">
        </div>
        <div class="fila" style="display:none;">
            <input type="number" class="precio-item" value="${precioArray[0][0]}">
            <input type="text" class="precio-array" value="${precioArray}">
        </div>
        <button class="boton-item" onclick="modificarJuegoClicked(event)">Modificar</button>
        <form class="form-delete" action="DML" enctype="multipart/form-data" method="POST" name="deleteGame" id="deleteGame" onsubmit="preSubmit(event)">
            ${csrf}
            <input type="number" id="idGameDel" style="display:none;" name="idGame" value="${id}">
            <input type="number" id="idConsolaDel" style="display:none;" name="idConsola" value="${consolas[0][0]}">
            <input type="submit" class="btn-delete" id="btn-delete" name="submitInput" value="Eliminar">
        </form>
      </div>`;
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

function updateCatalogView(idName,event,filter){
    $.ajax({
        url: 'http://127.0.0.1:8000/RentGame/Validar/Games/data', 
        type: 'GET',
        data: {filtro: filter},
        success: function(response) {
            let filterNro = event.target;
            let numPage = filterNro.value;
            let max = 1;

            let juegos = response.catalogo;
            if (juegos.length>20) {
                max = Math.trunc(response.catalogo.length/20)+1;
            }
            
            numPage = limitNumber(max,1,numPage);
            filterNro.value = numPage;
            buscarGameAPI(idName,numPage,filter);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}

function jsonObjJuegos(idName,nro,filter){
    console.log(filter);
    $.ajax({
        url: 'http://127.0.0.1:8000/RentGame/Validar/Games/data', 
        type: 'GET',
        data: {filtro: filter},
        success: function(response) {
            let max = 1;
            let inicio = 0;
            let juegos = response.catalogo;
            let csrf = llamarcsrf();
            if (juegos.length>20) {
                console.log('Hay mas de 20 juegos');
                max = Math.trunc(response.catalogo.length/20)+1;
                inicio = (nro-1)*20;
                for (let i = 0; i < 20; i++) {
                    const pos = i+inicio;
                    try{
                        const item = juegos[pos];
                        let addItem =addCarritoGame(item.idGame,item.nombre,item.idConsola,item.imagen,item.stock,item.precio,csrf);
                        $(idName).append(addItem);
                    } catch {
                        break;
                    }
                }
            } else {
                console.log('Solo hay una pagina con juegos (Menos de 20 juegos)');
                nro = 1;
                for (let i = 0; i < juegos.length; i++) {
                    const item = juegos[i];
                    let addItem =addCarritoGame(item.idGame,item.nombre,item.idConsola,item.imagen,item.stock,item.precio,csrf);
                    $(idName).append(addItem);
                }
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}