/**
 * 
 */

function enableDisableSubmitButton() {
	if ($('input#titulo-text-input').val() == "") {
		$('button#submitFormButton').prop("disabled", true);
	}
	else {
		$('button#submitFormButton').prop("disabled", false);
	}
}

function refreshListaElementosText() {
	if ($('#ListaElementos').children().length == 0) {
		$('p#ListaElementosText').text("No hay elementos en la lista.");		
	}
	else {
		$('p#ListaElementosText').empty();		
	}
}

function addInputToListaElementos() {
	if ($('input#element-text-input').val() != "") {
		addToListaElementos($('input#element-text-input').val());
		$('ul#ListaElementos > li > div > input:checkbox').attr("disabled", "disabled");
		$('ul#ListaElementos > li > div > input:text').attr("disabled", "disabled");
	}
}

function addToListaElementos(value) {
	id = Math.random().toString(36).substring(2, 15);
	// id = Date.now();
	
	aux = "<li id = " + id + ">";
	
	aux += "<div class='input-group'>";

	aux += "<input type='checkbox' class='custom-control-input inline' ";
	aux += "onclick='strikeInputText(\"" + id + "\")'";
	aux += ">";
	
	aux += "<button class='btn btn-primary btn-sm inline' type=button style='display:none;' ";
	aux += "onclick='removeLi(\"" + id + "\")'";
	aux += ">";
	aux += "Borrar Elemento";
	aux += "</button>";

	aux += "<input class='form-control col-4' type=text ";
	aux += "value = '" + value + "' ";
	aux += "> ";

	aux += "</div>"
			
	aux += "</li>"
		
	$('ul#ListaElementos').append(aux);
	
	refreshForm();
}

function removeLi(id) {
	$('#' + id).remove("li");
	// $(id).detach();
    // $(this).parent().remove();
	refreshForm();
}

function strikeInputText(id) {
	$('#' + id + " > input").toggleClass('strike');
	refreshForm();
}


function refreshForm() {
	refreshListaElementosText();
	refreshInputElementos();
	refreshDeleteButtons();
	$('input#element-text-input').val("");
}

function refreshInputElementos() {
	
	var elementsArray = new Array();
	
	var checkboxArray = new Array();
	$("ul#ListaElementos > li > input:checkbox").each(function( index ) {
		console.log("value is:" + index + ": " + $( this ).val() );
		if ($(this).is(":checked")) {
			checkboxArray.push(true);	
		}
		else {
			checkboxArray.push(false);
		}
	});
	
	var textArray = new Array();
	$("ul#ListaElementos > li > input:text").each(function( index ) {
		console.log("value is:" + index + ": " + $( this ).val() );
		textArray.push($(this).val());
	});
	
	for (var i = 0; i < checkboxArray.length; i++) {
		elementsArray.push("{ \"strike\":" + 
				checkboxArray[i] + 
				", \"texto\":\"" + 
				textArray[i] + "\"}");
	}

	console.log("refreshInputElementos(): elementsArray is:" + elementsArray);
	aux = "[" + elementsArray + "]";
	console.log("aux is:" + aux);
	$('input#elementos').val(aux);
}

function refreshDeleteButtons() {
	if ($('ul#ListaElementos').children().length > 1) {
		// $('ul#ListaElementos > li > button').css("display", "block");
		$('ul#ListaElementos > li > div > button').show();
	}
	else {
		console.log("Hidding ...");
		// $('ul#ListaElementos > li > button').hide();
		$('ul#ListaElementos > li > button').css("display", "none");
	}
}

function submitNuevoPedido() {
	document.getElementById("titulo").value = document.getElementById("titulo-text-input").value;
	document.forms["NuevoPedido"].submit();
}

function submitSalvarPedido() {
	document.getElementById("titulo").value = document.getElementById("titulo-text-input").value;
	document.forms["SalvarPedido"].submit();
}


function confirmarBorrarPedido(pedidoId) {
	if (confirm("¿Borrar Pedido? [id=" + pedidoId + "]")) {
		document.getElementById("borrar-pedido-link").click();
	}
}
function editarPedido(pedidoId) {
	document.getElementById("editar-pedido-link").click();
}


//A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "Document ready!" );
    $('input#titulo-text-input').blur(enableDisableSubmitButton);
    $('button#add-element-button').click(addInputToListaElementos);
    refreshForm();
});


