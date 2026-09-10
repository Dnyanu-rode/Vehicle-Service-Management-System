package com.app.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.ServiceBooking;

@Repository
public interface ServiceBookingRepo extends JpaRepository<ServiceBooking, Integer> {

    List<ServiceBooking> findByVehicleId(Integer vehicleId);

    List<ServiceBooking> findByStatus(String status);
}