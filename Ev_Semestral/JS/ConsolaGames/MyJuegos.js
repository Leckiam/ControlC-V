$(document).ready(function () {
    // Enlace de info de videojuegos
    let ulrPS = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms=15%2C16%2C18";
    let ulrPS2 = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms=15%2C16%2C18&page=";
    let ulrNT = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms=8%2C9%2C11";
    let ulrNT2 = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms=8%2C9%2C11&page=";
    let ulrXB = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms=1%2C14";
    let ulrXB2 = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&platforms=1%2C14&page=";
    
    let lista_url_PS = [ulrPS, ulrPS2];
    let lista_url_NT = [ulrNT, ulrNT2];
    let lista_url_XB = [ulrXB, ulrXB2];

    let initConsola = "";
    let listaUrl = [];
    if (document.getElementById('btnItemPS')) {
        initConsola = "PS";
        listaUrl = lista_url_PS;
    } else if (document.getElementById('btnItemNT')) {
        initConsola = "NT";
        listaUrl = lista_url_NT;
    } else if (document.getElementById('btnItemXB')) {
        initConsola = "XB";
        listaUrl = lista_url_XB;
    }
    buscarGameAPI(initConsola,listaUrl,1);
    $('#btnNroCatalo').on('blur',function(){
        $('.item').remove();
        buscarGameAPI(initConsola,listaUrl,$(this).val());
    })
})

function buscarGameAPI(consolaInit,lista_url,nro) {
    let idName = "#btnItem" + consolaInit
    $(idName).children().css("display", "none");
    if (nro==1) {
        $.get(lista_url[0],
            function (data) {
                $.each(data.results, function(i,item){
                    console.log(item)
                    $(idName).append(addCarritoGame(consolaInit, item.name, item.platforms,item.background_image));
                })
            });
    } else {
        $.get(lista_url[1]+nro,
            function (data) {
                $.each(data.results, function(i,item){
                    console.log(item)
                    $(idName).append(addCarritoGame(consolaInit, item.name, item.platforms,item.background_image));
                })
            });
    }
    let tiempo = setInterval(function(){
        if ($(idName).children().length>=20) {
            for (let index = 0; index < 20; index++) {
                $(idName).children().eq(index).css("display", "grid");
            }
            clearInterval(tiempo)
        }
    },1000);
}

function addCarritoGame(init, titulo,genConsola,img) {
    let listagenConsola = ['n 2','n 3','n 4','3DS',' DS','Wii','360','One'];
    let existe = false;
    let itemCarritoContenido = `
        <div class="item backgroud${init}">
            <span class="titulo-item">${titulo}</span>
            <img src="${img}" alt="" height="304" width="195" class="img-item">
            <select class="consola-item rounded-3">`;
    for (let i = 0; i < genConsola.length; i++) {
        let element = genConsola[i].platform.name;
        if (element=='Wii') {
            element='Nintendo '+element;
        }
        if (listagenConsola.includes(element.substr(-3,3)) &&
        element.substr(0,1)==init.substr(0,1)) {
            itemCarritoContenido += `<option>` + element + `</option>`
            existe=true
        } 
    }
    itemCarritoContenido +=
        `</select>
            <button class="boton-item">Agregar al Carrito</button>
        </div>
    `;
    if (existe==false) {
        itemCarritoContenido=``;
    }
    return itemCarritoContenido;
}