if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
const seeCarrito = document.getElementsByClassName('carrito')[0];

function ready() {
    /* Pagar carrito de PS, XB o NT*/
    let btnPagar = document.getElementsByClassName('btn-pagar')
    for (let i = 0; i < btnPagar.length; i++) {
        let buttonP = btnPagar[i];
        buttonP.addEventListener('click', function () {
            alert('xd')
        });
    }
    /* Actualizar precio de juegos en carrito de las consolas PS, XB y NT*/
    let getDiaTotal = document.getElementsByClassName('carrito-dias-total')[0];
    getDiaTotal.addEventListener("input", function () {
        limitTimeDay(getDiaTotal);
        actualizarTotalCarrito();
    });
    /* Agregar carrito en PS, XB y en NT*/
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
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
function obtenerPrecio(consola,estado) {
    let listaPrice = [100, 600, 1100];
    let listaGen3PS = ['n 2', 'n 3', 'n 4'];
    let listaGen2XB = ['One', '360'];
    let listaGen1NT = ['Wii', ' DS', '3DS'];
    let cantGenConsole = consola.children;
    let genConsole = cantGenConsole[0].innerText.substr(-3, 3);
    let lastGenConsole = cantGenConsole[0].innerText.substr(0, 1);
    let precio = 0;
    let pos = 0;
    if (estado == true) {
        genConsole = consola.value.substr(-3, 3);
    }
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
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const genConsole = item.getElementsByClassName('consola-item')[0];
    let precio = obtenerPrecio(genConsole, false);
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc, genConsole);
}
function agregarItemAlCarrito(titulo, precio, imagenSrc, genConsole) {
    let item = document.createElement('div');
    item.classList.add = ('item');
    let initConsole = genConsole.innerText.substr(0, 1);
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    let consoleChild = genConsole.children;

    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    let itemCarritoContenido = `
        <div class="carrito-item">
            <div class="carrito-item-detalles backgroud${initConsole}">
                <span class="carrito-item-titulo">${titulo}</span>
                <img src="${imagenSrc}" alt="">
                <div class="fila">
                    <strong>Precio/dia: </strong>
                    <span class="carrito-item-precio">
                        $${precio} CLP
                    </span>
                </div>
                <div class="fila form-floating">
                    <select class="form-control generacion" name="generacion">`;
    for (let i = 0; i < consoleChild.length; i++) {
        itemCarritoContenido = itemCarritoContenido + (`<option>${consoleChild[i].innerText}</option>`);
    }
    itemCarritoContenido = itemCarritoContenido + (`<label for="generacion">Generacion de consola</label>
                    </select>
                </div>
            </div>
        </div>
    `);
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    alert('hola')
    let getGeneration = document.getElementsByClassName('generacion')[0];
    getGeneration.addEventListener("change",function(){
        alert('xd')
        getGeneration.addEventListener("click",function(){
            alert('bucle xd')
        })
    })

    actualizarTotalCarrito();
}
function actualizarTotalCarrito() {
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        let precio = parseInt(precioElemento.innerText.replace('$', '').replace(' CLP', ''));
        let cantidadItem = document.getElementsByClassName('carrito-dias-total')[0];
        console.log(precio);
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total + " CLP";

}