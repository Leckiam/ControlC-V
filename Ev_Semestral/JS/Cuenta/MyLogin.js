$(document).ready(function() {
    let mensaje = "";
    let estadoUser = false;
    let estadoPass = false;
    $("#errorMensaje").children().hide();
    $("#errorMensaje").show();
    $('#username').on('blur', function(){
        mensaje = "El nombre está en blanco";
        validarError('#username',mensaje,0,estadoUser);
    });
    $('#password').on('blur',function(){   
        mensaje = "La contraseña está vacía";
        validarError('#password',mensaje,1,estadoPass)
    })
    $("#Login").submit(function () {
        if (estadoUser==false || estadoPass==false) {
            event.preventDefault();
        }
    });
  });

function validarError(id,msj,pos,estado){
    if ($(id).val().trim().length == 0) {    
        mensaje = msj;
        $("#errorMensaje").children().eq(pos).html(msj)
        $("#errorMensaje").children().eq(pos).show();
        estado = false;
    } else {
        $("#errorMensaje").children().eq(1).hide();
        estado=true;
    }
}