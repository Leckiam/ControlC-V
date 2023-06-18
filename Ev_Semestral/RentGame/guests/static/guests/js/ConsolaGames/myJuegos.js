$(document).ready(function () {
    // Enlace de info de videojuegos
    let urlApi = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55"
    let listaTitulo=[]

    let initConsola = "";
    let idName=$('.contenedor').children().first().attr('id')
    initConsola=idName.substr(-2,2)
    if (initConsola=='PS'){
        urlApi+='&platforms=15%2C16%2C18';
    } else if (initConsola=='NT'){
        urlApi+='&platforms=8%2C9%2C11';
    } else if (initConsola=='XB'){
        urlApi+='&platforms=1%2C14';
    }
    if(buscarGameAPI(idName,urlApi,1)){
        $('#btnNroCatalo').on('blur',function(){
            $('.item').remove();
            buscarGameAPI(idName,urlApi,$(this).val());
        })
    }else {
        if (initConsola == "PS") {
            listaTitulo=['Bloodborne','Dark Souls Remastered','Mortal Kombat X','Ultra Street Fighter IV','Dragon Ball Z BUDOKAI TENKAICHI 3']
            listaImg=['Bloodborne.png','DarkSouls.png','MortalKombatX.png','UltraStreetFighterIV.png','DragonBallZBT3.png']
            listaGen=['43','4','4','43','2']
        } else if (initConsola == "XB"){
            listaTitulo=['Halo Infinite','Halo 5: Guardians','Dark Souls Remastered','Mortal Kombat X','Ultra Street Fighter IV']
            listaImg=['HaloInfinite.png','Halo5Guardians.png','DarkSouls.png','MortalKombatX.png','UltraStreetFighterIV.png']
            listaGen=['One','One','One','One','360']
        }else if (initConsola == "NT"){
            listaTitulo=['Wii Sports Resort','Dragon Ball Z BUDOKAI TENKAICHI 3','Super Smash Bros 3DS','New Super Mario Bros']
            listaImg=['WiiSportsResort.png','DragonBallZBT3.png','SuperSmashBros3DS.png','NewSuperMarioBros.png']
            listaGen=['Wii','Wii','3DS',' DS']
        }
        for (let i = 0; i < listaTitulo.length; i++) {
            $('#'+idName).append(localViewGame(listaTitulo[i],listaImg[i],listaGen[i],initConsola));
            console.log($('#'+idName))
        }
    }
})

function buscarGameAPI(idName,url,nro) {
    idName = '#'+idName
    let estApi = true;
    let consolaInit = idName.substr(-2,2)
    let estBtn = ''
    if (idName.substr(-5,3)=='Gue'){
        estBtn = 'disabled'
    }
    $(idName).children().css("display", "none");
    if (nro==1) {
        $.get(url,
        function (data) {
            $.each(data.results, function(i,item){
                $(idName).append(addCarritoGame(consolaInit, item.name, item.platforms,item.background_image,estBtn));
            })
            if (data.results.length<20){
                console.log(data.results.length)
                estApi=false;
            }
        });
        
    } else {
        $.get(url+'&page='+nro,
            function (data) {
                $.each(data.results, function(i,item){
                    $(idName).append(addCarritoGame(consolaInit, item.name, item.platforms,item.background_image,estBtn));
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

function addCarritoGame(init, titulo,genConsola,img,estBtn) {
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
        <button class="boton-item ${estBtn}">Agregar al Carrito</button>
        </div>
    `;
    if (existe==false) {
        itemCarritoContenido=``;
    }
    return itemCarritoContenido;
}

function localViewGame(titulo,img,Gen,init){
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
            <img src="http://127.0.0.1:8000/media/juegos/local/${nameConsole.replace(' ','')}/Game_${img}" alt="" height="304" width="195" class="img-item">
            <select class="consola-item rounded-3">`;
    for (let i = 0; i < cantGen; i++) {
            itemCarritoContenido += `<option>` + nameConsole +' '+ Gen.substr(i,1) +`</option>`
    }
    itemCarritoContenido +=
        `</select>
            <button class="boton-item">Agregar al Carrito</button>
        </div>
    `;
    return itemCarritoContenido;
}