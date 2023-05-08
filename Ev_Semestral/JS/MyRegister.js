$(document).ready(function () {
    let msg = "";
    let listaEstado = [false, false, false, false, false];
    $("#errorMensaje").children().hide();
    $("#errorMensaje").show();
    $('#username').on('blur', function () {
        msg = "Está en blanco el ";
        mensajeError('#','username',0,listaEstado,msg);
    });
    $('#correo').on('blur', function () {
        msg = "No se ha ingrasado ";
        mensajeError('#','correo',1,listaEstado,msg);
    });
    $('#comuna').on('blur', function () {
        msg = "No se ha ingrasado ";
        mensajeError('#','comuna',2,listaEstado,msg);
    });
    $('#direccion').on('blur', function () {
        msg = "No se ha ingrasado ";
        mensajeError('#','direccion',3,listaEstado,msg);
    });
    $('#password').on('blur', function () {
        msg = "Está vacía la ";
        mensajeError('#','password',4,listaEstado,msg);
    })
    $("#Register").submit(function () {
        for (let i = 0; i < listaEstado.length; i++) {
            let element = listaEstado[i];
            if (element == false) {
                event.preventDefault();
                break;
            }
        }
    });
});
function mensajeError(idclass, name, pos, lista,msg) {
    let mensaje = "";
    if ($(idclass + name).val().trim().length == 0) {
        mensaje = msg + name;
        $("#errorMensaje").children().eq(pos).html(mensaje)
        $("#errorMensaje").children().eq(pos).show();
        lista[pos] = false;
    } else {
        $("#errorMensaje").children().eq(pos).hide();
        lista[pos] = true;
    }
}