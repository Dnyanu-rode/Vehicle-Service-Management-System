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

import com.app.model.ServiceBooking;
import com.app.service.ServiceBookingServicei;
@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceBookingController {
	
    @Autowired
    private ServiceBookingServicei ss;

    @PostMapping
    public String saveBooking(@RequestBody ServiceBooking booking) {
        ss.addBooking(booking);
        return "Service booking added successfully";
    }

    @GetMapping
    public List<ServiceBooking> getAllBookings() {
        return ss.getAllBookings();
    }

    @GetMapping("/vehicle/{vehicleId}")
    public List<ServiceBooking> getBookingsByVehicleId(
            @PathVariable Integer vehicleId) {

        return ss.getBookingsByVehicleId(vehicleId);
    }

    @GetMapping("/status/{status}")
    public List<ServiceBooking> getBookingsByStatus(
            @PathVariable String status) {

        return ss.getBookingsByStatus(status);
    }
    @GetMapping("/{id}")
    public ServiceBooking getSingleBooking(@PathVariable int id) {
        return ss.getBookingById(id);
    }

    @PutMapping("/{id}")
    public ServiceBooking updateBooking(
            @PathVariable int id,
            @RequestBody ServiceBooking booking) {

        return ss.updateBooking(id, booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable int id) {
        ss.deleteBooking(id);
    }
}