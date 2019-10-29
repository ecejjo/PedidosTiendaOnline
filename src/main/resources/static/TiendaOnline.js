/**
 * 
 */

var elementsList = new Array();
var editable = false;

function refreshSubmitButton() {
	if (document.getElementById("titulo-text-input").value == "") {
		document.getElementById("submitFormButton").disabled = true;
	}
	else {
		document.getElementById("submitFormButton").disabled = false;
	}
}

function addElement(text) {
	if (text != null) {
		elementsList.push(text);		
	}
	else {
		elementsList.push(document.getElementById("element-text-input").value);
		document.getElementById("element-text-input").value = "";
	}
	showElementsList();
}

function deleteElementFromList(index) {
	elementsList.splice(index, 1);
	showElementsList();
}

function addDeleteElementButton(index) {
	return " <button id=\"delete.element." + index
	+ "\" onclick=\"deleteElementFromList(" + index
	+ ")\">Borrar Elemento</button>";
}

function showElementsList() {
	if (elementsList.length == 0) {
		html = "Ningún elemento en la lista.";
	} else {
		html = "<ul>";
		for (var i = 0; i < elementsList.length; i++) {
			html += "<li>";
			if (editable == true) {
				type = "type=\"text\" ";
			}
			else {
				html += elementsList[i];
				type = "type=\"hidden\" ";
			}
			html += "<input " + type; 
			html += "id=\"element-text-input-{{-index}}\" ";
			html += "value=\"" + elementsList[i] + "\">";
			
			if (elementsList.length > 1) {
				html += addDeleteElementButton(i);
			}
			html += "</li>";
		}
		html += "</ul>";
	}
	document.getElementById("ListaElementos").innerHTML = html;
}

function submitNuevoPedido() {
	document.getElementById("titulo").value = document.getElementById("titulo-text-input").value;
	document.getElementById("elementos").value = elementsList;
	document.forms["NuevoPedido"].submit();
}

function readElementsInForm() {
	index = 1;
	while(document.getElementById("element-text-input-" + index) != null) {
		elementsList.push(document.getElementById("element-text-input-" + index).value);
		index ++;
	}
}

function submitSalvarPedido() {
	readElementsInForm();
	document.getElementById("titulo").value = document.getElementById("titulo-text-input").value;
	document.getElementById("elementos").value = elementsList;
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

