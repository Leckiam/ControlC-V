$(document).ready(function () {
    // Enlace de info de videojuegos
    blood = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=bloodborne";
    dsrem = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=dark+souls+remastered";
    mkx = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=MORTAL+KOMBAT+X";
    usfiv = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=ULTRA+STREET+FIGHTER+IV";
    dbzbt3 = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=DRAGON+BALL+Z+BUDOKAI+TENKAICHI+3";
    wsr = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=wii+sports+resort";
    smb3ds = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=super+smash+bros+3ds";
    nsmb = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=new+super+mario+bros";
    hinf = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=halo+infinite";
    h5guard = "https://api.rawg.io/api/games?key=0ad66594af1341d28032732692211c55&search=halo+5+guardians";
    
    let lista_url_PS = [blood, dsrem, mkx, usfiv, dbzbt3];
    let lista_url_NT = [wsr, smb3ds, dbzbt3, nsmb];
    let lista_url_XB = [hinf, h5guard, dsrem, mkx, usfiv];

    if (document.getElementById('btnItemPS')) {
        buscarGameAPI("PS", lista_url_PS);
    } else if (document.getElementById('btnItemNT')) {
        buscarGameAPI("NT", lista_url_NT);
    } else if (document.getElementById('btnItemXB')) {
        buscarGameAPI("XB", lista_url_XB);
    }
})

function buscarGameAPI(consolaInit, lista_url) {
    let className = "#btnItem" + consolaInit
    for (let i = 0; i < lista_url.length; i++) {
        $.get(lista_url[i],
            function (data) {
                console.log(data)
                let item = data.results[0]
                $(className).append(addCarritoGame(consolaInit, item.name, item.platforms,item.background_image));
            });
    }
}

function addCarritoGame(init, titulo,genConsola,img) {
    let listagenConsola = ['n 2','n 3','n 4','3DS',' DS','Wii','360','One'];
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
        } 
    }
    itemCarritoContenido +=
        `</select>
            <button class="boton-item">Agregar al Carrito</button>
        </div>
    `;
    return itemCarritoContenido;
}