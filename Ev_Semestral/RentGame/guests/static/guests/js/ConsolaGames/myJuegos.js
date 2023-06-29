$(document).ready(function () {
    let initConsola = "";
    let idName=$('.contenedor').children().first().attr('id')
    initConsola=idName.substr(-2,2)

    buscarGameAPI(idName,1);
    $('#btnNroCatalo').on('blur',function(){
        $('.item').remove();
        buscarGameAPI(idName,$(this).val());
    })
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

function buscarGameAPI(idName,nro) {
    idName = '#'+idName
    let consolaInit = idName.substr(-2,2)
    let estBtn = ''
    if (idName.substr(-5,3)=='Gue'){
        estBtn = 'disabled'
    }
    $(idName).children().css("display", "none");
    if (nro==1) {
        jsonObjJuegos(idName,consolaInit,estBtn,nro)
    } else {
        jsonObjJuegos(idName,consolaInit,estBtn,nro)
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

function addCarritoGame(init,id,titulo,consolas,img,precio,estBtn) {
    let itemCarritoContenido = `
        <div class="item backgroud${init}">
            <div class="id-item" style="display:none;">${id}</div>
            <span class="titulo-item">${titulo}</span>
            <img src="${img}" alt="" height="304" width="195" class="img-item">
            <select class="consola-item rounded-3">`;
    for (let idx = 0; idx < consolas.length; idx++) {
        const consola = consolas[idx];
        const element = consola[1];
        itemCarritoContenido += `<option value="${consola[0]}">` + element + `</option>`
    }
    itemCarritoContenido +=`
            </select>
            <div class="precio-item" style="display:none;">${precio[0][0]}</div>
            <div class="precio-item-array" style="display:none;">${precio}</div>
            <button class="boton-item ${estBtn}">Agregar al Carrito</button>
        </div>
    `;
    return itemCarritoContenido;
}

function jsonObjJuegos(idName,init,estBtn,nro){
    $.ajax({
        url: 'http://127.0.0.1:8000/RentGame/objJuegoJson/data', 
        type: 'GET',
        data: { initC: init},
        success: function(response) {
            let max = 1;
            let inicio = 0
            let juegos = response.catalogo
            if (juegos.length>20) {
                console.log('Hay mas de 20 juegos');
                max = Math.trunc(response.catalogo.length/20)+1;
                inicio = (nro-1)*20;
                for (let i = 0; i < 20; i++) {
                    const pos = i+inicio;
                    try{
                        const item = juegos[pos];
                        let addItem =addCarritoGame(init,item.idGame,item.nombre,item.idConsola,item.imagen,item.precio,estBtn)
                        $(idName).append(addItem);
                        let posHijo = $(idName).children.length-1;
                    } catch {
                        break;
                    }
                }
            } else {
                console.log('Solo hay una pagina con juegos (Menos de 20 juegos)');
                nro = 1;
                for (let i = 0; i < juegos.length; i++) {
                    const item = juegos[i];
                    let addItem =addCarritoGame(init,item.idGame,item.nombre,item.idConsola,item.imagen,item.precio,estBtn)
                    $(idName).append(addItem);
                    let posHijo = $(idName).children.length-1;
                }
            }
            $('.consola-item').on('change',changeFormClicked)
            $('#btnNroCatalo').on('blur',function(){
                console.log(max)
                if ($(this).val()>=max){
                    $(this).val(max);
                } else if ($(this).val()<=1){
                    $(this).val(1);
                }
            })
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}