package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.Vehicle;
import com.app.repositary.VehicleRepo;
import com.app.service.VehicleServicei;

@Service
public class VehicleServiceImpl implements VehicleServicei{

	@Autowired
	private VehicleRepo vRepo;

	 @Override
	    public Vehicle addVehicle(Vehicle vehicle) {
	        return vRepo.save(vehicle);
	    }

	 @Override
	 public List<Vehicle> getAllVehicles() {
		return vRepo.findAll();
	 }

	 @Override
	 public Vehicle getVehicleById(Integer id) {
		return vRepo.findById(id).orElse(null);
	 }

	 @Override
	 
	 //eV = Existing Vehicle.
	 public Vehicle updateVehicle(Integer id, Vehicle vehicle) {
		 Vehicle eV = vRepo.findById(id).orElse(null);
		 
		 if(eV != null) {
			 eV.setVehicleNumber(vehicle.getVehicleNumber());
			 eV.setBrand(vehicle.getBrand());
			 eV.setModel(vehicle.getModel());
			 eV.setVehicleType(vehicle.getVehicleType());
			 eV.setCustomer(vehicle.getCustomer());
			 
			 return vRepo.save(eV);
		 }
		return null;
	 }

	 @Override
	 public void deleteVehicleById(Integer id) {
	  vRepo.deleteById(id);
	 }
	 @Override
	 public List<Vehicle> getVehiclesByCustomerId(Integer customerId) {
	     return vRepo.findByCustomerId(customerId);
	 }
}
