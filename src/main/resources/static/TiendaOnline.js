/**
 * 
 */

function refreshSubmitButton() {
	console.log("refreshSubmitButton(): starting ...")
	if (document.getElementById("titulo-text-input").value == "") {
		document.getElementById("submitFormButton").disabled = true;
	}
	else {
		document.getElementById("submitFormButton").disabled = false;
	}
	console.log("refreshSubmitButton(): Done.")
}

function refreshListaElementosText() {
	console.log("refreshListaElementosText(): length is:" + $('ul#ListaElementos').children().length);
	if ($('ul#ListaElementos').children().length == 0) {
		$('p#ListaElementosText').text("No hay elementos en la lista.");		
	}
	else {
		$('p#ListaElementosText').text("Hay elementos");		
	}
	console.log("refreshListaElementosText(): done.")
}

function addInputToListaElementos() {
	addToListaElementos($('input#element-text-input').val());
}

function addToListaElementos(value) {
	
	id = Math.random().toString(36).substring(2, 15);
	// id = Date.now();
	
	aux = "<li id = " + id + ">";
	aux += "<input type=text ";
	aux += "value = '" + value + "' ";
	aux += ">";
	aux += "<button type=button style='display:none;' ";
	aux += "onclick='deleteFromListaElementos(\"" + id + "\")'";
	// aux += "onclick='deleteFromListaElementos($(this).parent().id)'";
	// aux += "onclick=$(" + id + ").remove()";
	aux += ">";
	aux += "Borrar Elemento";
	aux += "</button>";
	aux += "</li>"
		
	$('ul#ListaElementos').append(aux);
	$('input#element-text-input').val("");
	
	refreshForm();
}

function deleteFromListaElementos(id) {
	console.log("deleteFromListaElementos(): id is: " + id);
	$('#' + id).remove("li");
	// $(id).detach();
    // $(this).parent().remove();
	refreshForm();
}

function refreshForm() {
	refreshListaElementosText();
	refreshElementosFromList();
	refreshDeleteButtonsInListaElementos();
}

function refreshElementosFromList() {

	console.log("refreshElementosFromList(): running ...")
	
	var elementsArray = new Array();

	$("ul#ListaElementos > li > input").each(function( index ) {
		console.log("value is:" + index + ": " + $( this ).val() );
		elementsArray.push($( this ).val());
	});
	
	$('input#elementos').val(elementsArray);
}

function refreshDeleteButtonsInListaElementos() {
	if ($('ul#ListaElementos').children().length > 1) {
		// $('ul#ListaElementos > li > button').css("display", "block");
		$('ul#ListaElementos > li > button').show();
	}
	else {
		console.log("Hidding ...");
		// $('ul#ListaElementos > li > button').hide();
		$('ul#ListaElementos > li > button').css("display", "none");
	}
}

function getInputHtml(type, id, value, onchange, extraAttributes) {
	var html = "<input ";
	if ( (type != null) && (type != "") ) html +="type=\"" + type + "\"";
	if ( (id != null) && (id != "") ) html +="id=\"" + id + "\"";
	if ( (value != null) && (value != "") ) html +="value=\"" + value + "\"";
	if ( (onchange != null) && (onchange != "") ) html +=" onchange=\"" + onchange + "\"";
	if ( (extraAttributes != null) && (extraAttributes != "") ) html += extraAttributes;
	html+= ">";
	console.log("getInputHtml(): html is:" + html);
	return html;
}

function getButtonHtml(id, value, onclick) {
	var html = "<button ";
	if ( (id != null) && (id != "") ) html +="id=\"" + id + "\"";
	if ( (onclick != null) && (onclick != "") ) html +=" onclick=\"" + onclick + "\"";
	html+= ">";
	if ( (value != null) && (value != "") ) html += value;
	html+= "</button>";
	console.log("getButtonHtml(): html is:" + html);
	return html;
}


function getUlHtml(arrayList) {
	console.log("getUlHtml(): arrayList is: " + arrayList);
	var htmlUl = "<ul>";
	for (var i=0; i<arrayList.lenght; i++) {
		htmlUl += arrayList[i];
	}
	htmlUl += "</ul>";
	return htmlUl;
}

function getLiHtml(value) {
	return "<li>" + value + "</li>";
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
    $('input#titulo-text-input').blur(refreshSubmitButton);
    $('button#add-element-button').click(addInputToListaElementos);
    refreshListaElementosText();
});


