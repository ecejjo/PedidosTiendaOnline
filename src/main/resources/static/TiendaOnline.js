/**
 * 
 */

function enableDisableRegistrarPedidoButton() {
	
	$('button#registrar-pedido-button').prop("disabled", false);
	
	if ($('input#titulo-text-input').val() == "") {
		$('button#registrar-pedido-button').prop("disabled", true);
		return;
	}
	
	$("ul#ListaElementos input:text").each(function(index) {
		console.log("Comprobando elementos ...")
		if ($(this).val() == "") {
			console.log("Un elemento vacío.")
			$('button#registrar-pedido-button').prop("disabled", true);
			return;
		}
		else{
			console.log("Un elemento lleno.")
		}
	});
}

function enableDisableAnadirElementoButton() {
	if ($('input#element-text-input').val() == "") {
		$('button#anadir-elemento-button').prop("disabled", true);
	}
	else {
		$('button#anadir-elemento-button').prop("disabled", false);
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

	aux += "<input ";
	aux += "class='form-check-input inline'";
	aux += "type='checkbox' ";
	aux += "onchange=\"strikeInputText('" + id + "')\" ";
	aux += ">";
	
	aux += "<button ";
	aux += "class='btn btn-primary btn-sm inline' ";
	aux += "type=button ";
	aux += "id='deleteElementButton'";
	aux += "onclick='removeLi(\"" + id + "\")'";
	aux += ">";
	aux += "Borrar Elemento";
	aux += "</button>";

	aux += "<input ";
	aux += "class='form-control col-4 inline' ";
	aux += "type=text ";
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
	
	enableDisableRegistrarPedidoButton();
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


function confirmarBorrarPedido(pedidoId, titulo) {
	if (confirm("¿Borrar pedido con título '" + titulo + "'? [id=" + pedidoId + "]")) {
		document.getElementById("borrar-pedido-link").click();
	}
}
function editarPedido(pedidoId) {
	document.getElementById("editar-pedido-link").click();
}


//A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "Document ready!" );
    $('input#titulo-text-input').blur(enableDisableRegistrarPedidoButton);
    $('input#element-text-input').blur(enableDisableAnadirElementoButton);
    $('button#anadir-elemento-button').click(addInputToListaElementos);
    refreshForm();
});


