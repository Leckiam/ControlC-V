
$(document).ready(function () {
    // Enlace de info de videojuegos
    let urlApi = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms="
    let platPS ='15%2C16%2C18';
    let platNT ='8%2C9%2C11';
    let platXB ='1%2C14';
    let urlApiAll =urlApi+platPS+'%2C'+platNT+'%2C'+platXB
    let listaUrl = [urlApiAll,urlApi]

    let idName=$('.contenedor').children().first().attr('id')
    buscarGameAPI(idName,listaUrl,1,0)
    $('#btnNroCatalo').on('blur',function(){
        $('.item').remove();
        buscarGameAPI(idName,listaUrl,$(this).val(),$('#selectFilter').val());
    });
    $('#selectFilter').on('change',function(){
        $('.item').remove();
        $('#btnNroCatalo').val(1);
        buscarGameAPI(idName,listaUrl,1,$(this).val());
    });
})

function buscarGameAPI(idName,listaUrl,nro,filter) {
    idName = '#'+idName
    let url = '';
    if (filter==0) {
        url = listaUrl[0]
    } else {
        url = listaUrl[1]+filter
    }
    let estApi = true;
    $(idName).children().css("display", "none");
    if (nro==1) {
        $.get(url, function (data) {
            if (data){
                let i = 0;
                i = procesarItem(i,data,idName);
            } else {
                estApi=false;
            }
        });
    } else {
        $.get(url+'&page='+nro, function (data) {
            if (data){
                let i = 0;
                i = procesarItem(i,data,idName);
            } else {
                estApi=false;
            }
        });
    }
    let tiempo = setInterval(function(){
        if ($(idName).children().length>=20) {
            for (let index = 0; index < 20; index++) {
                $(idName).children().eq(index).css("display", "grid");
            }
            clearInterval(tiempo);
        }
    },1000);
    return estApi;
}

function procesarItem(i,data,idName) {
    if (i < data.results.length) {
        const item = data.results[i];
        validarDatoGame(idName, item);
        
        setTimeout(function() {
            i++;
            procesarItem(i,data,idName);
        }, 10);
    }
    return i
}

function addGame(id,titulo,genConsola,consolas,img) {
    let itemCarritoContenido = `
        <div class="item backgroudGame">
            <div class="id-item" style="display:none;">${id}</div>
            <span class="titulo-item">${titulo}</span>
            <img src="${img}" alt="" height="304" width="195" class="img-item">
            <select class="consola-item rounded-3" style="display:none;">`;
    for (let i = 0; i < genConsola.length; i++) {
        for (let idx = 0; idx < consolas.length; idx++) {
            const consola = consolas[idx];
            if (consola[0]==genConsola[i].platform.id && 
                consola[2]!=true){
                const element = consola[1];
                itemCarritoContenido += `<option value="${consola[0]}">` + element + `</option>`
            }
        }
    }
    itemCarritoContenido +=`
            </select>
            <button class="boton-item" onclick="agregarJuegoClicked(event)">Agregar juego</button>
        </div>
    `;
    return itemCarritoContenido;
}

function validarDatoGame(idName,item){
    $.ajax({
        url: 'http://127.0.0.1:8000/RentGame/Validar/GameConsola/data', 
        type: 'GET',
        data: { idGame: item.id},
        success: function(response) {
            let consolas = response.consolas
            $(idName).append(addGame(item.id,item.name,item.platforms,consolas,item.background_image));
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error('Error en la solicitud AJAX: ' + errorThrown);
        }
    });
}