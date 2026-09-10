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

import com.app.model.Vehicle;
import com.app.service.VehicleServicei;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {
	
@Autowired
private VehicleServicei vs;


@PostMapping
public String saveVehicle(@RequestBody Vehicle vehicle) {
    vs.addVehicle(vehicle);
    return "Vehicle added successfully";
}

@GetMapping
public List<Vehicle> getAllVehicles(){
	return vs.getAllVehicles();
}

@GetMapping("/customer/{customerId}")
public List<Vehicle> getVehiclesByCustomerId(
        @PathVariable Integer customerId) {

    return vs.getVehiclesByCustomerId(customerId);
}
@GetMapping("/{id}")
public Vehicle getSingleVehicle(@PathVariable Integer id) {
	return vs.getVehicleById(id);
}
@PutMapping("/{id}")
public Vehicle updateVehicle(@PathVariable Integer id, @RequestBody Vehicle vehicle) {
	
	return vs.updateVehicle(id,vehicle);
	
}

@DeleteMapping("/{id}")
public void deleteCustomer(@PathVariable Integer id) {
	 vs.deleteVehicleById(id);
}
}
