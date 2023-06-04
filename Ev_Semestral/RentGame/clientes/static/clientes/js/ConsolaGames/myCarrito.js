if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
        timeReady()
    })
} else {
    timeReady();
}
function timeReady(){
    let segundos = 0;
    let tiempo = setInterval(function (){
        segundos++;
        if (parseFloat(segundos/5)==parseInt(segundos/5)) {
            ready();
        } else if (segundos==30) {
            clearInterval(tiempo);
        }
    }, 1000);
}

function ready() {
    /* Borrar o quitar alguno de los items (los juegos), del carrito */
    
    /* Pagar carrito de PS, XB o NT*/
    let btnPagar = document.getElementsByClassName('btn-pagar')[0]
    btnPagar.addEventListener('click', function () {
        location.href = "Index.html";
    });
    /* Actualizar precio de juegos en carrito de las consolas PS, XB y NT*/
    let getDiaTotal = document.getElementsByClassName('carrito-dias-total')[0];
    getDiaTotal.addEventListener("blur", function () {
        limitTimeDay(getDiaTotal);
        actualizarTotalCarrito();
    });
    /* Agregar carrito en PS, XB y en NT*/
    let btnsAddCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < btnsAddCarrito.length; i++) {
        let btnAdd = btnsAddCarrito[i];
        btnAdd.addEventListener('click', agregarAlCarritoClicked);
    }
    cantGame = document.getElementsByClassName('item').length;
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
function obtenerPrecio(consola) {
    let listaPrice = [100, 600, 1100];
    let listaGen3PS = ['n 2', 'n 3', 'n 4'];
    let listaGen2XB = ['360', 'One'];
    let listaGen1NT = ['Wii', ' DS', '3DS'];
    let cantGenConsole = consola.value;
    let genConsole = cantGenConsole.substr(-3, 3);
    let lastGenConsole = cantGenConsole.substr(0, 1);
    let precio = 0;
    let pos = 0;
    switch (lastGenConsole) {
        case 'P':
            pos = forPrice(listaGen3PS, genConsole);
            break;
        case 'X':
            pos = forPrice(listaGen2XB, genConsole);
            break;
        case 'N':
            pos = forPrice(listaGen1NT, genConsole);
            break;
    }
    function forPrice(listaGen, genConsole) {
        let numPrice = 0;
        for (let i = 0; i < listaGen.length; i++) {
            if (listaGen[i] == genConsole) {
                return numPrice = i;
            }
        }
    }
    
    return precio = listaPrice[pos];
}
function agregarAlCarritoClicked(event) {
    let carrito = document.getElementById('carrito');
    carrito.style.display = "block";
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let genConsole = item.getElementsByClassName('consola-item')[0];
    let precio = obtenerPrecio(genConsole);
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc, genConsole);
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
function agregarItemAlCarrito(titulo, precio, imagenSrc, genConsole) {
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
    let consoleSelected = genConsole.value;

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
                <span class="carrito-item-titulo">${titulo}</span>
                <img src="${imagenSrc}" alt="" height="304">
                <div class="fila">
                    <strong>Precio/dia: </strong>
                    <span class="carrito-item-precio">
                        $${precio} CLP
                    </span>
                </div>
                <div class="fila">
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