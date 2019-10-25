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
		this.elementos = new ArrayList<>();
	}
	
	public String getTitulo() {
		return this.titulo;
	}
	
	public List<Elemento> getElementos() {
		return this.elementos;
	}
	
	@Override
	public String toString() {
		return "Pedido [id=" + this.id + ", titulo=" + this.titulo + ", elementos=" + this.elementos + "]";
	}
}
