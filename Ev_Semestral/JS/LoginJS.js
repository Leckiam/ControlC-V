if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    /* Pagar carrito de PS, XB o NT*/
    let btnLogin = document.getElementById('iniciar-sesion')
    btnLogin.addEventListener('click', validarLogin);
}

function validarLogin() {
    let usuario = 'Maikel';
    validarUsuario(usuario);
}

function validarUsuario(user){
    return user;
}