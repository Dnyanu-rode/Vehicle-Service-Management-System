package com.app.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.Customer;
import com.app.service.CustomerServicei;
@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerServicei cs;

    @PostMapping
    public String saveCustomer(@RequestBody Customer customer) {
        cs.addCustomer(customer);
        return "Customer added successfully";
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return cs.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getSingleCustomer(@PathVariable int id) {
        return cs.getCustomerById(id);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable int id,
            @RequestBody Customer customer) {
        return cs.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable int id) {
        cs.deleteCustomerById(id);
    }
}