if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    /* Actualizar precio de juegos en carrito de las consolas PS, XB y NT*/
    let getDiaTotal = document.getElementsByClassName('carrito-dias-total')[0];
    getDiaTotal.addEventListener("blur", function () {
        limitTimeDay(getDiaTotal);
        actualizarTotalCarrito();
    });
    let btnPagar = document.getElementsByClassName('btn-pagar')[0];
    btnPagar.addEventListener("click",actualizarFormCarrito);
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

function agregarAlCarritoClicked(event) {
    let carrito = document.getElementById('carrito');
    carrito.style.display = "block";
    let button = event.target;
    let item = button.parentElement;
    let id = item.getElementsByClassName('id-item')[0].innerText;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let genConsole = item.getElementsByClassName('consola-item')[0];
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(id,titulo, precio, imagenSrc, genConsole);
}

function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    let divItem = buttonClicked.parentElement.parentElement.parentElement;
    divItem.remove();
    actualizarTotalCarrito();

    ocultarCarrito();
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.display = 'none';
    }
}
function agregarItemAlCarrito(id,titulo, precio, imagenSrc, genConsole) {
    let item = document.createElement('div');
    item.classList.add = ('item');
    let initConsole = genConsole.innerText.substr(0, 1);
    if (initConsole=='P') {
        initConsole='PS'
    } else if (initConsole=='N') {
        initConsole='NT'
    } else {
        initConsole='XB'
    }
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    let consoleSelected = genConsole.options[genConsole.selectedIndex].textContent;
    let idConsole = genConsole.value;

    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert(titulo+" ya se encuentra en el carrito");
            return;
        }
    }

    let itemCarritoContenido = `
        <div class="carrito-item">
            <div class="carrito-item-detalles backgroud${initConsole}">
                <div class="id-item" style="display:none;">${id}</div>
                <span class="carrito-item-titulo">${titulo}</span>
                <img src="${imagenSrc}" alt="" height="304">
                <div class="fila">
                    <strong>Precio/dia: </strong>
                    <span class="carrito-item-precio">
                        $${precio} CLP
                    </span>
                </div>
                <div class="fila">
                    <div class="idConsole-item" style="display:none;">${idConsole}</div>
                    <span class="consola-item">
                    ${consoleSelected}
                    </span>
                </div>
                <button style="background: #000; color: #fff;" class="btn-borrar">Borrar</button>
            </div>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    
    let btnDelete = item.getElementsByClassName('btn-borrar')[0];
    btnDelete.addEventListener('click',eliminarItemCarrito);

    actualizarTotalCarrito();
}
function actualizarTotalCarrito() {
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItem = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    for (let i = 0; i < carritoItem.length; i++) {
        let item = carritoItem[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        let precio = parseInt(precioElemento.innerText.replace('$', '').replace(' CLP', ''));
        let cantidadItemDias = document.getElementsByClassName('carrito-dias-total')[0];
        let cantidadDias = cantidadItemDias.value;
        total = total + (precio * cantidadDias);
    }
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total + " CLP";
}

function actualizarFormCarrito(event){
    let carrito = document.getElementsByClassName('carrito')[0];
    let items = carrito.getElementsByClassName('carrito-items')[0].children;
    let precioTot = carrito.getElementsByClassName('carrito-precio-total')[0].innerText;
    let dias = carrito.getElementsByClassName('carrito-dias-total')[0].value;
    let form = carrito.getElementsByClassName('form-update')[0];

    let cadenaGameForm = form.querySelector('[name="cadenaJuegos"]');
    let precioForm = form.querySelector('[name="precio"]');
    let diasForm = form.querySelector('[name="dias"]');

    precioTot = parseInt(precioTot.replace('$','').replace(' CLP',''));
    let listaGameBuy = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const idGame = parseInt(item.getElementsByClassName('id-item')[0].innerText);
        const idConsole = parseInt(item.getElementsByClassName('idConsole-item')[0].innerText);
        listaGameBuy.push([idGame,idConsole]);
    }

    cadenaGameForm.value = JSON.stringify(listaGameBuy);
    diasForm.value = parseInt(dias);
    precioForm.value = precioTot;
}