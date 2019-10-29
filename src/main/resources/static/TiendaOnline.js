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

function readElements() {
	index = 1;
	while(document.getElementById("element-text-input-" + index) != null) {
		elementsList.push(document.getElementById("element-text-input-" + index).value);
		index ++;
	}
}

function deleteElementFromList(index) {
	console.log("Running deleteElementFromList()...");
	console.log("deleteElementFromList(): before delete, elementsList is: " + elementsList);
	elementsList.splice(index, 1);
	console.log("deleteElementFromList(): after delete, elementsList is: " + elementsList);
	showElementsList();
}

function addDeleteElementButton(index) {
	return " <button id=\"delete.element." + index
	+ "\" onclick=\"deleteElementFromList(" + index
	+ ")\">Borrar Elemento</button>";
}

function showElementsList() {
	if (elementsList.length == 0) {
		aux = "Ningún elemento en la lista.";
	} else {
		aux = "<ul>";
		for (var i = 0; i < elementsList.length; i++) {
			aux += "<li>";
			if (editable == true) {
				type = "type=\"text\"";
			}
			else {
				aux += elementsList[i];
				type = "type=\"hidden\"";
			}
			aux += "<input " + type + "id=\"element-text-input-{{-index}}\" type=\"text\" value=\"" + elementsList[i] + "\">";
			if (elementsList.length > 1) {
				aux += addDeleteElementButton(i);
			}
			aux += "</li>";
		}
		aux += "</ul>";
	}
	document.getElementById("ListaElementos").innerHTML = aux;
}

function submitNuevoPedido() {
	console.log("submitNuevoPedido(): titulo-text-input.value is: "
			+ document.getElementById("titulo-text-input").value);
	console.log("submitNuevoPedido(): elementsList is: " + elementsList);
	document.getElementById("titulo").value = document.getElementById("titulo-text-input").value;
	document.getElementById("elementos").value = elementsList;
	document.forms["NuevoPedido"].submit();
}

function submitSalvarPedido() {
	console.log("submitSalvarPedido(): titulo-text-input.value is: "
			+ document.getElementById("titulo-text-input").value);
	readElements();
	console.log("submitSalvarPedido(): elementsList is: " + elementsList);
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

