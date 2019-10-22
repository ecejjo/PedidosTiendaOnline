package com.ericsson.pedido;

import java.util.Optional;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class PedidoController {

	@Autowired
	private PedidosRepository repository;

	@PostConstruct
	public void init() {
		repository.save(new Pedido("TituloPedido1"));
		repository.save(new Pedido("TituloPedido2"));
	}

	@GetMapping("/")	
	public String mostrarListaPedidos(Model model) {	
		model.addAttribute("pedidos", repository.findAll());
		return "TablonPedidos_template";
	}


	@GetMapping("/Nuevo")
	public String NuevoPedido(Model model, 
		@RequestParam String titulo) {
	
		repository.save(new Pedido(titulo));
		
		model.addAttribute("titulo", titulo);

		return "NuevoPedido_template";
	}
	
	@GetMapping("/pedido/{id}")
	public String verPedido(Model model,
			@PathVariable long id) {
		Optional<Pedido> Pedido = repository.findById(id);
		model.addAttribute("titulo", Pedido);
		return "VerPedido_template";
	}
}
