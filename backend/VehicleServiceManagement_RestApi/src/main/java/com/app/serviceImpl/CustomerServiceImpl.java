package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.Customer;
import com.app.repositary.CustomerRepo;
import com.app.service.CustomerServicei;

@Service
public class CustomerServiceImpl implements CustomerServicei{

	@Autowired
	private CustomerRepo cRepo;

	@Override
	public Customer addCustomer(Customer customer) {
			return cRepo.save(customer);
	}

	@Override
	public List<Customer> getAllCustomers() {
		return cRepo.findAll();
	}

	@Override
	public Customer getCustomerById(Integer id) {
		return cRepo.findById(id).orElse(null);
	}

	@Override
	public Customer updateCustomer(Integer id, Customer customer) {
//eC = existing Customer
	    Customer eC = cRepo.findById(id).orElse(null);

	    if (eC != null) {

	    	eC.setName(customer.getName());
	    	eC.setEmail(customer.getEmail());
	    	eC.setPhone(customer.getPhone());
	    	eC.setAddress(customer.getAddress());

	        return cRepo.save(eC);
	    }

	    return null;
	}

	@Override
	public void deleteCustomerById(int id) {
		cRepo.deleteById(id);
	}
	
	
	
	
}
