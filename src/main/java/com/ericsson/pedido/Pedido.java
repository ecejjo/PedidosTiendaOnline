package com.ericsson.pedido;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	String titulo;
	
	@OneToMany
	private List<Elemento> elementos = new ArrayList<>();
	
	public Pedido() {}

	public Pedido(
			String titulo)
	{
		this.titulo = titulo;
	}
	
	public String getTitulo() {
		return this.titulo;
	}
	
	@Override
	public String toString() {
		return "Pedido [id=" + this.id + ", titulo=" + this.titulo + ", elementos=" + this.elementos + "]";
	}
}
