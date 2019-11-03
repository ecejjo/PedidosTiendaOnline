package com.ericsson.pedido;

import java.util.Optional;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Controller
public class PedidoController {

	@Autowired
	private PedidosRepository pedidosRepository;
	
	@Autowired
	private ElementosRepository elementosRepository;

	@PostConstruct
	public void init() {

		Pedido pedido = new Pedido("Titulo de Pedido 1: con un elemento");
		Elemento elemento = new Elemento("Pedido1.Elemento1");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);
		pedidosRepository.save(pedido);

		pedido = new Pedido("Titulo de Pedido 2: con 2 elementos");
		
		elemento = new Elemento("Pedido 2 - Elemento 1");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);

		elemento = new Elemento("Pedido 2 - Elemento 2");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);
		pedidosRepository.save(pedido);
		
		pedido = new Pedido("Titulo de Pedido 3: sin elementos");
		pedidosRepository.save(pedido);

		pedido = new Pedido("Titulo de Pedido 4: con elemento tachados");
		
		elemento = new Elemento("Pedido 4 - Elemento 1 - Tachado");
		elemento.setStrike(true);
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);

		elemento = new Elemento("Pedido 4 - Elemento 2 - No tachado");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);
		pedidosRepository.save(pedido);

		pedidosRepository.save(pedido);
	}

	@GetMapping("/")	
	public String mostrarListaPedidos(Model model) {	
		model.addAttribute("pedidos", pedidosRepository.findAll());
		return "TablonPedidos_template";
	}
	
	@GetMapping("/pedido/{id}")
	public String verPedido(Model model,
			@PathVariable long id) {
		Optional<Pedido> Pedido = pedidosRepository.findById(id);
		
		if(Pedido.isPresent()) {
			model.addAttribute("pedido", Pedido.get());			
		}
		else {
			model.addAttribute("titulo", "Pedido no encontrado.");			
		}
			
		return "VerPedido_template";
	}
	
	@GetMapping("/Nuevo{titulo}{elementos}")
	public String NuevoPedido(Model model, 
			@RequestParam String titulo,
			@RequestParam String elementos) {

		Pedido pedido = new Pedido(titulo);
		parseElementosIntoPedido(pedido, elementos);		
		pedidosRepository.save(pedido);
		model.addAttribute("pedido", pedido);
		return "VerPedido_template";
	}
	
	@GetMapping("/Borrar/{id}")
	public String borrarPedido(Model model,
			@PathVariable long id) {
		
		Optional<Pedido> Pedido = pedidosRepository.findById(id);
		
		if(Pedido.isPresent()) {
			pedidosRepository.deleteById(id);
			model.addAttribute("alertMessage", "Pedido Borrado. [Id: " + id + "]");
		}
		else {
			model.addAttribute("alertMessage", "Pedido no encontrado. [Id: " + id + "]");
		}
		model.addAttribute("pedidos", pedidosRepository.findAll());
		return "WindowLocationToTablonPedidos_template";
	}
	
	@GetMapping("/Editar/{id}")
	public String editarPedido(Model model,
			@PathVariable long id) {
		
		Optional<Pedido> Pedido = pedidosRepository.findById(id);
		
		if(Pedido.isPresent()) {
			model.addAttribute("pedido", Pedido.get());
		}
		else {
			model.addAttribute("alertMessage", "Pedido no encontrado. [Id: " + id + "]");
		}
		model.addAttribute("pedidos", pedidosRepository.findAll());
		return "EditarPedido_template";
	}
	
	@GetMapping("/Salvar{id}{titulo}{elementos}")
	public String salvarPedido(Model model,
			@RequestParam long id,
			@RequestParam String titulo,
			@RequestParam String elementos) {
		
		Optional<Pedido> repoPedido = pedidosRepository.findById(id);
		
		if(repoPedido.isPresent()) {
			Pedido pedido = new Pedido(id);
			pedido.setTitulo(titulo);
			
			parseElementosIntoPedido(pedido, elementos);
			pedidosRepository.save(pedido);
			model.addAttribute("pedido", repoPedido.get());
			model.addAttribute("alertMessage", "Pedido salvado. [Id: " + id + "]");
			return "VerPedido_template";
		}
		else {
			model.addAttribute("alertMessage", "Pedido no encontrado. [Id: " + id + "]");
			return "WindowLocationToTablonPedidos_template";
		}
	}
	
	public void parseElementosIntoPedido(Pedido pedido, String elementos) {
	    JsonParser parser = new JsonParser();
	    JsonArray gsonArr = parser.parse(elementos).getAsJsonArray();
	    for (JsonElement obj : gsonArr) {
	        JsonObject gsonObj = obj.getAsJsonObject();

			Elemento elemento = new Elemento (gsonObj.get("texto").getAsString());
			elemento.setStrike(gsonObj.get("strike").getAsBoolean());
			pedido.getElementos().add(elemento);
			elementosRepository.save(elemento);
		}		
	}
}
