$(document).ready(function () {
    // Enlace de info de videojuegos
    let urlApi = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55"
    let platPS ='15%2C16%2C18';
    let platNT ='8%2C9%2C11';
    let platXB ='1%2C14';
    urlApi+='&platforms='+platPS+'%2C'+platNT+'%2C'+platXB

    let idName=$('.contenedor').children().first().attr('id')
    if(buscarGameAPI(idName,urlApi,1)){
        $('#btnNroCatalo').on('blur',function(){
            $('.item').remove();
            buscarGameAPI(idName,urlApi,$(this).val());
        })
    }
})

function buscarGameAPI(idName,url,nro) {
    idName = '#'+idName
    let estApi = true;
    $(idName).children().css("display", "none");
    if (nro==1) {
        $.get(url,
            function (data) {
                if (data){
                    $.each(data.results, function(i,item){
                        $(idName).append(addCarritoGame(item.id,item.name, item.platforms,item.background_image));
                    })
                } else {
                    estApi=false;
                }
            });
    } else {
        $.get(url+'&page='+nro,
            function (data) {
                $.each(data.results, function(i,item){
                    $(idName).append(addCarritoGame(item.id,item.name, item.platforms,item.background_image));
                })
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

function addCarritoGame(id,titulo,genConsola,img) {
    let listagenConsola = ['n 2','n 3','n 4','3DS',' DS','Wii','360','One'];
    let existe = false;
    let itemCarritoContenido = `
        <div class="item backgroudGame">
            <div class="id-item" style="display:none;">${id}</div>
            <span class="titulo-item">${titulo}</span>
            <img src="${img}" alt="" height="304" width="195" class="img-item">
            <select class="consola-item rounded-3" style="display:none;">`;
    for (let i = 0; i < genConsola.length; i++) {
        let element = genConsola[i].platform.name;
        if (element=='Wii') {
            element='Nintendo '+element;
        }
        if (listagenConsola.includes(element.substr(-3,3))) {
            itemCarritoContenido += `<option>` + element + `</option>`
            existe=true
        } 
    }
    itemCarritoContenido +=`
            </select>
            <button class="boton-item">Agregar juego</button>
        </div>
    `;
    if (existe==false) {
        itemCarritoContenido=``;
    }
    return itemCarritoContenido;
}

function localViewGame(titulo,img,Gen){
    let nameConsole='Name';
    let cantGen=0;
    switch (init.substr(0,1)) {
        case 'P':
            cantGen=Gen.length;
            nameConsole='Play Station';
            break;
        case 'X':
            cantGen=Gen.length/3;
            nameConsole='Xbox';
            break;
        case 'N':
            cantGen=Gen.length/3;
            nameConsole='Nintendo';
            break;
        default:
            break;
    }
    let itemCarritoContenido = `
        <div class="item backgroud${init}">
            <span class="titulo-item">${titulo}</span>
            <img src="img/Juegos/Vertical/${nameConsole.replace(' ','')}/Game_${img}" alt="" height="304" width="195" class="img-item">
            <select class="consola-item rounded-3" style="display:none;">`;
    for (let i = 0; i < cantGen; i++) {
            itemCarritoContenido += `<option>` + nameConsole +' '+ Gen.substr(i,1) +`</option>`
    }
    itemCarritoContenido +=
        `</select>
            <button class="boton-item">Agregar juego</button>
        </div>
    `;
    return itemCarritoContenido;
}