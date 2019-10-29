/**
 * 
 */

var elementsList = new Array();

function refreshSubmitButton() {
	if (document.getElementById("titulo-text-input").value == "") {
		document.getElementById("submitFormButton").disabled = true;
	}
	else {
		document.getElementById("submitFormButton").disabled = false;
	}
}

function addElement() {
	elementsList.push(document.getElementById("element-text-input").value);
	document.getElementById("element-text-input").value = "";
	showElementsInList();
}

function deleteElementFromList(index) {
	console.log("Running deleteElementFromList()...");
	console.log("deleteElementFromList(): before delete, elementsList is: " + elementsList);
	elementsList.splice(index, 1);
	console.log("deleteElementFromList(): after delete, elementsList is: " + elementsList);
	showElementsInList();
}

function addDeleteElementButton(index) {
	return " <button id=\"delete.element." + index
	+ "\" onclick=\"deleteElementFromList(" + index
	+ ")\">Borrar Elemento</button>";
}

function showElementsInList() {
	console.log("Running showElementsInList()...");

	if (elementsList.length == 0) {
		aux = "Ningún elemento en la lista.";
	} else {
		aux = "<ul>";
		for (var i = 0; i < elementsList.length; i++) {
			aux += "<li>";
			aux += elementsList[i];
			if (elementsList.length > 1) {
				aux += addDeleteElementButton(i);
			}
			aux += "</li>";
		}
		aux += "</ul>";
	}
	console.log("showElementsInList(): aux is: " + aux);
	document.getElementById("ListaElementos").innerHTML = aux;
}

function submitNuevoPedido() {
	console.log("submitNuevoPedido(): titulo-text-input.value is: "
			+ document.getElementById("titulo-text-input").value);
	console.log("submitNuevoPedido(): elementsList is: "
			+ elementsList);
	document.getElementById("titulo").value = document.getElementById("titulo-text-input").value;
	document.getElementById("elementos").value = elementsList;
	document.forms["NuevoPedido"].submit();
}

function submitSalvarPedido() {
	console.log("submitSalvarPedido(): titulo-text-input.value is: "
			+ document.getElementById("titulo-text-input").value);
	console.log("submitSalvarPedido(): elementsList is: "
			+ elementsList);
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

