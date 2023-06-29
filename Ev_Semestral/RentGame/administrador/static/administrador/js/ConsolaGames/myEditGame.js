if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
        ready()
    })
} else {
    ready();
}

function ready() {
    let myJuegos = document.getElementById('btnNroCatalo')
    myJuegos.addEventListener('blur',function(){
        ready();
    });
    /* Agregar juegos de PS, XB y NT*/
    let btnsEditJuego = document.getElementsByClassName('boton-item');
    for (let i = 0; i < btnsEditJuego.length; i++) {
        let btnEdit = btnsEditJuego[i];
        btnEdit.addEventListener('click', modificarJuegoClicked);
    }
    let consolaItem = document.getElementsByClassName('consola-item');
    for (let i = 0; i < consolaItem.length; i++) {
        let btnEdit = consolaItem[i];
        btnEdit.addEventListener('change', changeFormClicked);
    }
    let formDeleteClass = document.getElementsByClassName('form-delete');
    for (let i = 0; i < formDeleteClass.length; i++) {
        let formDelete = formDeleteClass[i];
        formDelete.addEventListener('submit',function (event){
            if (formDelete.childElementCount!=4){
                event.preventDefault()
            }
        });
    }
    let btnCancelar = document.getElementsByClassName('btn-cancel')[0];
    btnCancelar.addEventListener('click',ocultarEditGame);
}

function modificarJuegoClicked(event) {
    let miForm = document.getElementsByClassName("form-update")[0];
    let csrf = miForm.elements[0];
    miForm.innerHTML='';
    miForm.appendChild(csrf)
    /* Rescatar los datos del item (Juego) seleccionado */
    let listaDatoGame=llamarDatoBtn(event);

    mostrarEditGame(listaDatoGame[3]);
    listaDML=[miForm,'','Modificar']
    valor=listaDatoGame[2].value
    modificarItemAlForm(listaDatoGame,listaDML,valor);
}

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

function llamarDatoBtn(event){
    let listaReturn=[];
    let eventTarget = event.target;
    let item = eventTarget.parentElement;
    let id = item.getElementsByClassName('id-item')[0].innerText;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let genConsole = item.getElementsByClassName('consola-item')[0];
    let stock = item.getElementsByClassName('stock-item')[0].value;
    let precio = item.getElementsByClassName('precio-item')[0].value;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    return listaReturn=[id,titulo,genConsole,imagenSrc,stock,precio];
}

function modificarItemAlForm(listaDatoGame,listaDML,valor) {
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = listaDML[0];

    let itemCarritoContenido = `
        <input type="number" name="idGame" id="idGame" style="display:none;" value="${listaDatoGame[0]}">
        <input type="text" name="nombre" id="nombre" style="${listaDML[1]}" value="${listaDatoGame[1]}">
        <select class="consola-item rounded-3" name="idConsola" style="${listaDML[1]}" id="idConsola">
    `;
    itemCarritoContenido += listaDatoGame[2].innerHTML;
    itemCarritoContenido += `
        </select>
        <img src="${listaDatoGame[3]}" style="display:none;" alt="" width="40" height="40">
        <input type="text" name="urlImage" id="urlImage" style="display:none;" value="${listaDatoGame[3]}">
        <input type="number" name="stock" id="stock" style="${listaDML[1]}" value="${listaDatoGame[4]}">
        <input type="number" name="precio" id="precio" style="${listaDML[1]}" value="${listaDatoGame[5]}">
        <input type="submit" id="add-game" name="submitInput" value="${listaDML[2]}">
    `;
    item.innerHTML = itemCarritoContenido;
    let select= item.getElementsByClassName('consola-item')[0];
    select.value =valor;
    let consolaItem = item.getElementsByClassName('consola-item')[0];
    consolaItem.addEventListener('change', function(){
        updateStockPrecio(item,select)
    });
    itemsCarrito.append(item);
}
function mostrarEditGame(src){
    /* Ocultar los juegos, borrar los inputs del formulario y 
    mostrar los datos seleccionados para Django */
    let viewJuegos = document.getElementById("capaGame")
    let addJuego = document.getElementById('addJuego_Box');
    var imagen = document.getElementsByClassName("avatar")[0];
    imagen.src = src;

    viewJuegos.style.display = 'none';
    addJuego.style.display = "block";
}

function ocultarEditGame(event){
    let button = event.target;
    let itemAdd = button.parentElement;
    let viewJuegos = document.getElementById("capaGame");

    itemAdd.style.display='none';
    viewJuegos.style.display='block';
    
}
