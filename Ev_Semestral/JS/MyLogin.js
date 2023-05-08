$(document).ready(function() {
    let mensaje = "";
    let estadoUser = false;
    let estadoPass = false;
    $("#errorMensaje").children().hide();
    $("#errorMensaje").show();
    $('#username').on('blur', function(){
        if ($("#username").val().trim().length == 0) {    
            mensaje = "El nombre está en blanco";
            $("#errorMensaje").children().eq(0).html(mensaje)
            $("#errorMensaje").children().eq(0).show();
            estadoUser = false;
        } else {
            $("#errorMensaje").children().eq(0).hide();
            estadoUser=true;
        }
    });
    $('#password').on('blur',function(){
        if ($("#password").val().trim().length == 0) {    
            mensaje = "La contraseña está vacía";
            $("#errorMensaje").children().eq(1).html(mensaje)
            $("#errorMensaje").children().eq(1).show();
            estadoPass = false;
        } else {
            $("#errorMensaje").children().eq(1).hide();
            estadoPass=true;
        }
    })
    $("#Login").submit(function () {
        if (estadoUser==false || estadoPass==false) {
            event.preventDefault();
        }
    });
  });