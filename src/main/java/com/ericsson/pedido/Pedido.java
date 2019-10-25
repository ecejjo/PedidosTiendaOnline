package com.ericsson.pedido;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pedido {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	String titulo;
	
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
		return this.titulo;
	}
}
