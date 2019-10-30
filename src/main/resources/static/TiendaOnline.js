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


function showElementsList() {
	
	var html = "";
	
	if (elementsList.length == 0) {
		html += "Ningún elemento en la lista.";
	} else {
		html += "<ul>";
		for (var i = 0; i < elementsList.length; i++) {
			html += "<li>";
			
			extraAttributes = "";
			if (elementsList[i].strike == true) {
				extraAttributes = "checked";
			}
			html += getInputHtml("checkbox", "element-checkbox-input-" + i, "", "readElementsInForm()", extraAttributes);

			extraAttributes = "";
			if (editable == false) {
				extraAttributes = "disabled";
			}
			html += getInputHtml("text", "element-text-input-" + i, elementsList[i], "readElementsInForm()", extraAttributes);
			
			if (elementsList.length > 1) {
				html += getButtonHtml("delete.element." + i, "Borrar Elemento", "deleteElementFromList(" + i + ")");
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
	index = 0;
	elementsList = new Array();
	while(document.getElementById("element-text-input-" + index) != null) {
		elementsList.push(document.getElementById("element-text-input-" + index).value);
		index ++;
	}
	console.log("readElementsInForm(): elementsList is:" + elementsList);
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

