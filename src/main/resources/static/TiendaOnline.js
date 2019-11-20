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

function enableDisableAnadirElementoButton() {
	if ($('input#element-text-input').val() == "") {
		$('button#add-element-button').prop("disabled", true);
	}
	else {
		$('button#add-element-button').prop("disabled", false);
	}
}


function toggleNoHayElementos() {
	console.log("toggleNoHayElementos(): Starting ...");
	if ($('#ListaElementos').children().length == 0) {
		$('p#NoHayElementos').show();
	}
	else {
		$('p#NoHayElementos').hide();
	}
	console.log("toggleNoHayElementos(): Done.");
}

function addInputToListaElementos() {
	if ($('input#element-text-input').val() != "") {
		addToListaElementos($('input#element-text-input').val());
	}
}

function addToListaElementos(value) {
	id = Math.random().toString(36).substring(2, 15);
	// id = Date.now();
	
	aux = "<li id = " + id + ">";
	
	aux += "<div class='input-group'>";

	aux += "<input type='checkbox' ";
	aux += "onchange=\"strikeInputText('" + id + "')\" ";
	aux += "class='custom-control-input inline' ";
	aux += ">";
	
	aux += "<button ";
	aux += "class='btn btn-primary btn-sm inline' ";
	aux += "type=button ";
	aux += "id='deleteElementButton'";
	aux += "onclick='removeLi(\"" + id + "\")'";
	aux += ">";
	aux += "Borrar Elemento";
	aux += "</button>";

	aux += "<input class='form-control col-4' type=text ";
	aux += "value = '" + value + "' ";
	aux += "onblur='refreshElementosJson()'";
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
	$('#' + id + " input:text").toggleClass('strike');
	refreshForm();
}


function refreshForm() {
	console.log("refreshFrom(): starting ...")
	toggleNoHayElementos();
	refreshElementosJson();
	refreshDeleteButtons();
	$('input#element-text-input').val("");
	console.log("refreshFrom(): Done.")
}

function refreshElementosJson() {

	var checkboxArray = new Array();
	$("ul#ListaElementos input:checkbox").each(function(index) {
		console.log("refreshElementosJson(): value is:" + index + ": " + $(this).val() );
		if ($(this).is(":checked")) {
			checkboxArray.push(true);	
		}
		else {
			checkboxArray.push(false);
		}
	});
	
	var textArray = new Array();
	$("ul#ListaElementos input:text").each(function(index) {
		console.log("refreshElementosJson(): value is:" + index + ": " + $(this).val() );
		textArray.push($(this).val());
	});
	
	var elementsArray = new Array();
	for (var i = 0; i < checkboxArray.length; i++) {
		elementsArray.push(
				"{" + 
					"\"strike\":" + checkboxArray[i] + 
					", " +
					"\"texto\":\"" + textArray[i] + 
				"\"}");
	}

	console.log("refreshElementosJson(): elementsArray is:" + elementsArray);
	aux = "[" + elementsArray + "]";
	console.log("refreshElementosJson(): aux is:" + aux);
	$('#elementosJson').val(aux);
}

function refreshDeleteButtons() {
	if ($('ul#ListaElementos').children().length > 1) {
		console.log("deleteElementButton(): more than 1 elements.")
		// $('#deleteElementButton').css("display", "block");
		$('#deleteElementButton').show();
	}
	else {
		console.log("deleteElementButton: less than 1 elements.");
		// $('#deleteElementButton').css("display", "none");
		$('#deleteElementButton').hide();
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
    $('input#element-text-input').blur(enableDisableAnadirElementoButton);
    $('button#add-element-button').click(addInputToListaElementos);
    refreshForm();
});


