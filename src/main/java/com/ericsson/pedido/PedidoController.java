package com.ericsson.pedido;

import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PedidoController {

	@Autowired
	private PedidosRepository pedidosRepository;
	
	@Autowired
	private ElementosRepository elementosRepository;

	@PostConstruct
	public void init() {

		Pedido pedido = new Pedido("Titulo de Pedido1: con un elemento");
		Elemento elemento = new Elemento("Pedido1.Elemento1");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);
		pedidosRepository.save(pedido);

		pedido = new Pedido("Titulo de Pedido2: con 2 elementos");
		
		elemento = new Elemento("Pedido2.Elemento1");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);

		elemento = new Elemento("Pedido2.Elemento2");
		elementosRepository.save(elemento);
		pedido.getElementos().add(elemento);

		pedidosRepository.save(pedido);
		
		pedido = new Pedido("Titulo de Pedido3: sin elementos");
		pedidosRepository.save(pedido);

	}

	@GetMapping("/")	
	public String mostrarListaPedidos(Model model) {	
		model.addAttribute("pedidos", pedidosRepository.findAll());
		return "TablonPedidos_template";
	}

	@GetMapping("/Nuevo{titulo}{elementos}")
	public String NuevoPedido(Model model, 
			@RequestParam String titulo,
			@RequestParam List<String> elementos) {

		Pedido pedido = new Pedido(titulo);
		
		for (int index = 0; index < elementos.size(); index++) {
			Elemento elemento = new Elemento(elementos.get(index));
			pedido.getElementos().add(elemento);
			elementosRepository.save(elemento);
		}
		pedidosRepository.save(pedido);

		model.addAttribute("pedido", pedido);

		return "VerPedido_template";
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
		return "TablonPedidos_template";
	}

}
