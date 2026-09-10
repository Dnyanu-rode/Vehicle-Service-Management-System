package com.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Vehicle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String vehicleNumber;
	private String brand;
	private String model;
	private String vehicleType;
	
	 @ManyToOne
	 @JoinColumn(name = "customer_id")
     private Customer customer;

	 public Vehicle() {
		super();
	 }

	 public Vehicle(Integer id, String vehicleNumber, String brand, String model, String vehicleType,
			Customer customer) {
		super();
		this.id = id;
		this.vehicleNumber = vehicleNumber;
		this.brand = brand;
		this.model = model;
		this.vehicleType = vehicleType;
		this.customer = customer;
	 }

	 public Integer getId() {
		 return id;
	 }

	 public void setId(Integer id) {
		 this.id = id;
	 }

	 public String getVehicleNumber() {
		 return vehicleNumber;
	 }

	 public void setVehicleNumber(String vehicleNumber) {
		 this.vehicleNumber = vehicleNumber;
	 }

	 public String getBrand() {
		 return brand;
	 }

	 public void setBrand(String brand) {
		 this.brand = brand;
	 }

	 public String getModel() {
		 return model;
	 }

	 public void setModel(String model) {
		 this.model = model;
	 }

	 public String getVehicleType() {
		 return vehicleType;
	 }

	 public void setVehicleType(String vehicleType) {
		 this.vehicleType = vehicleType;
	 }

	 public Customer getCustomer() {
		 return customer;
	 }

	 public void setCustomer(Customer customer) {
		 this.customer = customer;
	 }
	
	 
	 
}
