$(document).ready(function () {
    TraerTerritorios();
    TraerRegiones();
    $('.divTable').hide();
    $('#alertMensajes').hide();

    $('.table tbody').on('click', '.btn', function () {
        var fila = $(this).closest('tr');
        var idTT = fila.find('td:eq(0)').text();
        var descTT = fila.find('td:eq(1)').text();
        var regID = fila.find('td:eq(2)').text();
        $("#ttID").val(idTT);
        $("#ttDesc").val(descTT);
        $("#slctRegion").val(regID);
        $(window).scrollTop(0);
    });

    $('#form-validation').validate({
        rules: {
            'IDTerritory':
            {
                required: true,
                minlength: 3,
                maxlength: 6
            },
            'DescTerritory':
            {
                required: true,
                minlength: 3,
                maxlength: 25
            },
            'selectBoxRegion':
            {
                required: true
            }
        },
        messages: {
            'IDTerritory':
            {
                required: "Ingrese un id",
                minlength: "Demasiado corto",
                maxlength: "El id es demasiado largo"
            },
            'DescTerritory':
            {
                required: "Ingrese una descripcion",
                minlength: "Descripcion muy corta",
                maxlength: "Descripcion muy larga"
            },
            'selectBoxRegion':
            {
                required: "Debe seleccionar una opcion"
            }
        },
        submitHandler: function (form) {
            GuardarNuevoTerritorio();
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("hasError");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("has-success").removeClass("has-error");
        }
    });


    $("#btnAgregar").click(function () {
        var form = $('#form-validation');
        form.validate();
        if (form.valid()) {
            GuardarNuevoTerritorio();
        }
    });

    $("#btnModificar").click(function () {
        var form = $('#form-validation');
        form.validate();
        if (form.valid()) {
            ModificarTerritorio();
        }
    });

    $("#btnEliminar").click(function () {
        var form = $('#form-validation');
        form.validate();
        if (form.valid()) {
            EliminarTerritorio();
        }
    });

    $("#btnBuscar").click(function () {

        if ($("#buscarDesc").val() !== "") {
            TraerUnTerritorio();
        }
    });

    

});


function ModificarTerritorio() {
    var ttObj = {};
    ttObj.TerritoryID = $('#ttID').val();
    ttObj.TerritoryDescription = $('#ttDesc').val();
    ttObj.RegionID = $('#slctRegion').val();
    ttObj.Method = "ModificarUno";

    var jsonTerritory = JSON.stringify(ttObj);

    $.ajax({
        type: "POST",                                              // tipo de request 
        url: 'HandlerTerritory.ashx',                                  // URL a donde vamos
        data: null,                                                // data permite enviar params al server
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",                                          // como se enviaran los datos
        async: true,
        data: jsonTerritory,
        success: function (respuesta) {

            console.log(respuesta);
            
            if (respuesta == 1) {
                LimpiarFormulario();
                ExitoMessage("Se modifico un territorio!");
                TraerTerritorios();
            }
            else {
                ErrorMessage("Error al modificar. Revise los campos e intente nuevamente");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error);
        }
    });
}

function EliminarTerritorio() {
    var ttObj = {};
    ttObj.TerritoryID = $('#ttID').val();
    ttObj.TerritoryDescription = $('#ttDesc').val();
    ttObj.RegionID = $('#slctRegion').val();
    ttObj.Method = "EliminarUno";

    var jsonTerritory = JSON.stringify(ttObj);

    $.ajax({
        type: "POST",                                              // tipo de request 
        url: 'HandlerTerritory.ashx',                                  // URL a donde vamos
        data: null,                                                // data permite enviar params al server
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",                                          // como se enviaran los datos
        async: true,
        data: jsonTerritory,
        success: function (respuesta) {


            if (respuesta == 1) {
                LimpiarFormulario();
                ExitoMessage("Se elimino un territorio!");
                TraerTerritorios();
            }
            else {
                ErrorMessage("Error al eliminar. Revise los campos e intente nuevamente");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error);
        }
    });
}

function GuardarNuevoTerritorio() {

    var ttObj = {};
    ttObj.TerritoryID = $('#ttID').val();
    ttObj.TerritoryDescription = $('#ttDesc').val();
    ttObj.RegionID = $('#slctRegion').val();
    ttObj.Method = "AgregarUno";

    var jsonTerritory = JSON.stringify(ttObj);

    $.ajax({
        type: "POST",                                              // tipo de request 
        url: 'HandlerTerritory.ashx',                                  // URL a donde vamos
        data: null,                                                // data permite enviar params al server
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",                                          // como se enviaran los datos
        async: true,
        data: jsonTerritory,
        success: function (respuesta) {

            console.log(respuesta);
            if (respuesta == 1) {
                LimpiarFormulario();
                ExitoMessage("Se agrego un nuevo usuario!");
                TraerTerritorios();
            }
            else
            {
                ErrorMessage("Error al agregar territorio. Revise los campos e intente nuevamente");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error);
        }
    });
}

function LimpiarFormulario() {
    $("#ttID").val(""); 
    $("#ttDesc").val("");
    $("#slctRegion").val("");
    
}

function ExitoMessage(message) {
    $('#alertMensajes').removeClass("alert-danger").addClass("alert-success").text(message);
    $('#alertMensajes').show();
    setTimeout(function () {
        $('#alertMensajes').hide();
    }, 2500);
}

function ErrorMessage(message) {
    $('#alertMensajes').removeClass("alert-success").addClass("alert-danger").text(message);
    $('#alertMensajes').show();
    setTimeout(function () {
        $('#alertMensajes').hide();
    }, 2500);
}

function TraerTerritorios() {
    $.ajax({
        type: "GET",                                              // tipo de request 
        url: 'HandlerTerritory.ashx',                                  // URL a donde vamos
        data: null,                                                // data permite enviar params al server
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",
        data: {Method: 'TraerTodos'},
        async: true,                                               // si es asincrónico o no
        success: function (misTerritorios) {

            console.log(misTerritorios);

            $('#tableBody').html("");
            for (var i = 0; i < misTerritorios.length; i++) {

                var html = "<tr>";
                html += "<td>" + misTerritorios[i].TerritoryID + "</td>";
                html += "<td>" + misTerritorios[i].TerritoryDescription.trim() + "</td>";
                html += "<td>" + misTerritorios[i].Region.RegionID + "</td>";
                html += "<td><input id='btnSeleccionar' type='button' value='Seleccionar' class='btn btn-md btn-info'/></td>";
                html += "</tr> ";
                $('#tableBody').append(html);
            }

            $('.divTable').show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error);
        }
    });
}

function TraerUnTerritorio() {

    $.ajax({
        type: "GET",                                              // tipo de request 
        url: 'HandlerTerritory.ashx',                                  // URL a donde vamos
        data: null,                                                // data permite enviar params al server
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",
        data: { Method: 'TraerUno', Data: $('#buscarDesc').val() },
        async: true,                                               // si es asincrónico o no
        success: function (unTerritorio) {

            console.log(unTerritorio);
            if (unTerritorio !== null) {
                $("#ttID").val(unTerritorio["TerritoryID"]);
                $("#ttDesc").val(unTerritorio['TerritoryDescription'].trim());
                $("#slctRegion").val(unTerritorio['RegionID']);
            }
          
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error);
        }
    });
}

function TraerRegiones() {
    $.ajax({
        type: "GET",                                              // tipo de request 
        url: 'HandlerRegion.ashx',                                  // URL a donde vamos
        data: null,                                                // data permite enviar params al server
        contentType: "application/json; charset=utf-8",            // tipo de contenido
        dataType: "json",                                          // como se enviaran los datos
        async: true,                                                // si es asincrónico o no
        success: function (regiones) {

            console.log(regiones);
            // función callback que va a ejecutar si el pedido fue exitoso
            
            var options = "";
            for (var i = 0; i < regiones.length; i++) {
                options = ""
                options = "<option value='" + regiones[i].RegionID + "'>" + regiones[i].RegionDescription.trim() + "</option>";    
                $("#slctRegion").append(options);
            }


            
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { // función que va a ejecutar si hubo algún tipo de error en el pedido
            var error = eval("(" + XMLHttpRequest.responseText + ")");
            console.log(error);
        }
    });
}