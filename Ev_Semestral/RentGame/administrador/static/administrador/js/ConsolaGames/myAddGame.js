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
    /* Cancelar la accion de agregar juegos de PS, XB y/o NT*/
    let btnCancelar = document.getElementsByClassName('btn-cancel')[0];
    btnCancelar.addEventListener('click',ocultarAddGame);
}

function agregarJuegoClicked(event) {
    let miForm = document.getElementsByClassName("formulario")[0];
    eliminarInputsForm(miForm);
    /* Rescatar los datos del item (Juego) seleccionado */
    let button = event.target;
    let item = button.parentElement;
    let id = item.getElementsByClassName('id-item')[0].innerText;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let genConsole = item.getElementsByClassName('consola-item')[0];
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    
    mostrarAddGame(imagenSrc);
    agregarItemAlCarrito(id,titulo,imagenSrc, genConsole);
}

function agregarItemAlCarrito(id,titulo, imagenSrc, genConsole) {
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = document.getElementsByClassName('formulario')[0];

    let itemCarritoContenido = `
        <input type="number" name="idGame" id="idGame" style="display:none;" value="${id}">
        <div class="m-3 form-floating">
            <input class="form-control" type="text" name="nombre" id="nombre" readonly placeholder=" " value="${titulo}">
            <label for="nombre">Nombre:</label>
        </div>
        <div class="m-3 form-floating">
            <select class="consola-item form-select rounded-3" name="idConsola" id="idConsola">
    `;
    itemCarritoContenido += genConsole.innerHTML;
    itemCarritoContenido += `
            </select>
            <label for="idConsola">Consola:</label>
        </div>
        <input type="text" name="urlImage" id="urlImage" style="display:none;" value="${imagenSrc}">
        <div class="m-3 form-floating">
            <input class="form-control" type="number" name="stock" id="stock" placeholder=" " value="0">
            <label for="stock">Stock:</label>
        </div>
        <div class="m-3 form-floating">
            <input class="form-control" type="number" name="precio" id="precio" placeholder=" " value="0">
            <label for="precio">Precio:</label>
        </div>
        <input type="submit" id="add-game" value="Agregar">
    `;
    
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    
}
function mostrarAddGame(src){
    /* Ocultar los juegos, borrar los inputs del formulario y 
    mostrar los datos seleccionados para Django */
    let viewJuegos = document.getElementById("capaGame")
    let addJuego = document.getElementById('addJuego_Box');
    var imagen = document.getElementsByClassName("avatar")[0];
    imagen.src = src;

    viewJuegos.style.display = 'none';
    addJuego.style.display = "block";
}

function ocultarAddGame(event){
    let button = event.target;
    let itemAdd = button.parentElement;
    let viewJuegos = document.getElementById("capaGame");

    itemAdd.style.display='none';
    viewJuegos.style.display='block';
    
}

function eliminarInputsForm(miForm){
    for (let i = 1; i < miForm.length; i++) {
        miForm.removeChild(miForm.children[i])
    }
}