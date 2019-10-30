package com.ericsson.pedido;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Elemento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	String texto;
	boolean strike;
	
	public Elemento() {}
	
	public Elemento(String texto)
	{
		this.texto = texto;
		this.strike = false;
	}

	@Override
	public String toString() {
		return "Elemento [id=" + this.id + ", texto=" + this.texto + "]";
	}
}
