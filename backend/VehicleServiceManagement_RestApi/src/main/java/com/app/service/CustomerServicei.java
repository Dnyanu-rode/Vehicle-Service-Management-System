package com.app.service;

import java.util.List;

import com.app.model.Customer;

public interface CustomerServicei {

   Customer addCustomer(Customer customer);

	List<Customer> getAllCustomers();

	Customer getCustomerById(Integer id);

	Customer updateCustomer(Integer id, Customer customer);

	
	void deleteCustomerById(int id);

  
}