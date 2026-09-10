package com.app.service;

import java.util.List;

import com.app.model.Vehicle;

public interface VehicleServicei {

    Vehicle addVehicle(Vehicle vehicle);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleById(Integer id);

    Vehicle updateVehicle(Integer id, Vehicle vehicle);

    void deleteVehicleById(Integer id);

    List<Vehicle> getVehiclesByCustomerId(Integer customerId);
}