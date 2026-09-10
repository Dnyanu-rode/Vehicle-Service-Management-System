package com.app.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Vehicle;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle, Integer> {

    List<Vehicle> findByCustomerId(Integer customerId);

}