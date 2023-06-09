$(document).ready(function () {
    let listaEstado = [false,false,false,false,false];
    let listaIds = ['correo','nombre','password','password2','dateNac']
    let listaName = ['correo','nombre','contraseña','confirmar contraseña','fecha de nacimiento']
    for (let i = 0; i < listaIds.length; i++) {
        $('#errorMensaje').append(`<li value="${i}" onclick="errorFocus('${listaIds[i]}')"></li>`);
        const idName = listaIds[i];
        $('#'+idName).on('blur', function () {
            validateColor(idName,i,listaEstado,listaName);
        });
    }
    $("#errorMensaje").children().hide();
    $("#errorMensaje").show();
    $("#register").submit(function (event) {
        for (let i = 0; i < listaEstado.length; i++) {
            let element = listaEstado[i];
            if (element == false) {
                for (let i = 0; i < listaIds.length; i++) {
                    const idName = listaIds[i];
                    validateColor(idName,i,listaEstado,listaName);
                }
                event.preventDefault();
                break;
            }
        }
    });
});
function mensajeError(idType,idName,pos,lista,name) {
    let msg = "No ha ingresado su ";
    let valCondi = $(idType + idName).val().trim();
    let passValid = $(idType + 'password').val().trim();
    if (idName == 'password2' && passValid!=valCondi){
        msg = "Su contraseña no coincide con el de confirmacion";
        $("#errorMensaje").children().eq(pos).html(msg);
        $("#errorMensaje").children().eq(pos).show();
        lista[pos] = false;
    } else if (valCondi.length == 0){
        msg = msg + name[pos];
        $("#errorMensaje").children().eq(pos).html(msg);
        $("#errorMensaje").children().eq(pos).show();
        lista[pos] = false;
    } else if (idName=='correo' && valCondi.indexOf('@') == -1){
        msg = "Su correo no posee el '@'"
        $("#errorMensaje").children().eq(pos).html(msg);
        $("#errorMensaje").children().eq(pos).show();
        lista[pos] = false;
    } else {
        $("#errorMensaje").children().eq(pos).hide();
        lista[pos] = true;
    }
    console.log(lista[pos])
    return lista[pos]
}
function validateColor(idName,pos,lisEst,lisName) {
    if(mensajeError('#',idName,pos,lisEst,lisName)){
        $('#'+idName).css('border-bottom', '1px solid green');
    } else {
        $('#'+idName).css('border-bottom', '1px solid red');
    }
}
function errorFocus(id){
    $('#'+id).focus();
}