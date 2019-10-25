package com.ericsson.pedido;

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
		
		Elemento elemento = new Elemento("Pedido1.Elemento1");
		elementosRepository.save(elemento);

		Pedido pedido = new Pedido("Titulo de Pedido1");
		pedido.getElementos().add(elemento);
		pedidosRepository.save(pedido);

		elemento = new Elemento("Pedido2.Elemento2");
		elementosRepository.save(elemento);

		pedido = new Pedido("Titulo de Pedido2");
		pedido.getElementos().add(elemento);
		pedidosRepository.save(pedido);
	}

	@GetMapping("/")	
	public String mostrarListaPedidos(Model model) {	
		model.addAttribute("pedidos", pedidosRepository.findAll());
		return "TablonPedidos_template";
	}

	@GetMapping("/Nuevo{titulo}")
	public String NuevoPedido(Model model, 
			@RequestParam String titulo) {

		pedidosRepository.save(new Pedido(titulo));	

		model.addAttribute("titulo", titulo);

		return "VerPedido_template";
	}
	
	@GetMapping("/pedido/{id}")
	public String verPedido(Model model,
			@PathVariable long id) {
		Optional<Pedido> Pedido = pedidosRepository.findById(id);
		
		if(Pedido.isPresent()) {
			model.addAttribute("titulo", Pedido.get().titulo);
		}

		return "VerPedido_template";
	}
}
