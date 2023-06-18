if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
        timeReady()
    })
} else {
    timeReady();
}
function timeReady(){
    let tiempo = setInterval(function (){
        let cantJuegos = document.getElementsByClassName('contenedor-items')[0].childElementCount
        ready();
        if (cantJuegos==20) {
            clearInterval(tiempo);
        }
    }, 1000);
}

function ready() {
    let myJuegos = document.getElementById('btnNroCatalo')
    myJuegos.addEventListener('blur',function(){
        timeReady();
    });
    /* Agregar juegos de PS, XB y NT*/
    let btnsAddCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < btnsAddCarrito.length; i++) {
        let btnAdd = btnsAddCarrito[i];
        btnAdd.addEventListener('click', agregarJuegoClicked);
    }
}

function limitTimeDay(inputDay) {
    let valInputDay = parseInt(inputDay.value);
    if (valInputDay > 21) {
        inputDay.value = 21;
        alert('Los dias de renta no debende superar los 21 dias')
    } else if (valInputDay < 3) {
        inputDay.value = 3;
        alert('Los dias de renta no debende ser inferiores a los 3 dias')
    }
}
function agregarJuegoClicked(event) {
    let miForm = document.getElementsByClassName("formulario")[0];
    eliminarInputsForm(miForm);
    let juego = document.getElementById('addJuego_Box');
    juego.style.display = "block";
    let button = event.target;
    let item = button.parentElement;
    let id = item.getElementsByClassName('id-item')[0].innerText;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let genConsole = item.getElementsByClassName('consola-item')[0];
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(id,titulo,imagenSrc, genConsole);
}

function agregarItemAlCarrito(id,titulo, imagenSrc, genConsole) {
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = document.getElementsByClassName('formulario')[0];

    let itemCarritoContenido = `
        <input type="number" name="idGame" id="idGame" value="${id}">
        <select class="consola-item rounded-3" name="idConsola" id="idConsola">
    `;
    itemCarritoContenido += genConsole.innerHTML;
    itemCarritoContenido += `
        <input type="text" name="nombre" id="nombre" value="${titulo}">
        <img src="${imagenSrc}" alt="" width="40" height="40">
        <input type="text" name="urlImage" id="urlImage" style="display:none;" value="${imagenSrc}">
        <input type="number" name="stock" id="stock" value="0">
        <input type="number" name="precio" id="precio" value="0">
        <input type="submit" id="add-game" value="¿Esta seguro?">
    `;
    
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    
}

function eliminarInputsForm(miForm){
    for (let i = 1; i < miForm.length; i++) {
        miForm.removeChild(miForm.children[i])
    }
}