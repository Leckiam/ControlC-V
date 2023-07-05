$(document).ready(function () {
    let listaEstado = [false,false,false,false,false,false,false];
    let listaIds = ['correo','nombre','apPaterno','dateNac','genero','telefono','direccion']
    let listaName = ['correo','nombre','apellido paterno','fecha de nacimiento','genero','telefono','direccion']

    for (let i = 0; i < listaIds.length; i++) {
        $('#errorMensaje').append(`<li value="${i}"></li>`);
        const idName = listaIds[i];
        $('#'+idName).on('blur', function () {
            validateColor(idName,i,listaEstado,listaName);
        });
    }

    $('#imagen').on('change',function(){
        if ($('#imagen').val()==="") {
            $('#imagen').css('color','transparent');
        } else {
            $('#imagen').css('color','#fff');
        }
    })

    $("#errorMensaje").children().hide();
    $("#errorMensaje").show();

    $("#perfil").submit(function (event) {
        for (let i = 0; i < listaEstado.length; i++) {
            let element = listaEstado[i];
            if (element === false) {
                for (let i = 0; i < listaIds.length; i++) {
                    const idName = listaIds[i];
                    validateColor(idName,i,listaEstado,listaName);
                }
                event.preventDefault();
                break;
            }
        }
    });
    $("#perfil").on('reset',defaultColor);
    $("#clearImg").on('change',function(){
        if ($(this).is(":checked")) {
            $("#divImg").hide();
        } else {
            $("#divImg").show();
        }
    })
    $(".nextPerfil").on('click',function(){
        $("#pageOnePerfil").hide();
        $("#pageTwoPerfil").show();
    })
    $(".backPerfil").on('click',function(){
        $("#pageTwoPerfil").hide();
        $("#pageOnePerfil").show();
    })
});
function mensajeError(idType,idName,pos,lista,name) {
    let msg = "No ha ingresado su ";
    let valCondi = $(idType + idName).val().trim();
    if (valCondi.length === 0){
        msg = msg + name[pos];
        $("#errorMensaje").children().eq(pos).html(msg)
        $("#errorMensaje").children().eq(pos).show();
        lista[pos] = false;
    } else if (idName==='correo' && valCondi.indexOf('@') === -1){
        msg = "Su correo no posee el '@'"
        $("#errorMensaje").children().eq(pos).html(msg)
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
function defaultColor(){
    $('#perfil input').css('border-bottom', '1px solid white');
    $("#perfil input[type='file'], #perfil input[type='checkbox']").css('border-bottom', 'none');
    $('#perfil select').css('border-bottom', '1px solid white');
    $("#errorMensaje").children().hide();
    $("#errorMensaje").show();
}