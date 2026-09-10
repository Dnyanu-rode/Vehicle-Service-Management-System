package com.app.service;

import java.util.List;

import com.app.model.ServiceBooking;

public interface ServiceBookingServicei {

    ServiceBooking addBooking(ServiceBooking booking);

    List<ServiceBooking> getAllBookings();

    ServiceBooking getBookingById(Integer id);

    ServiceBooking updateBooking(Integer id, ServiceBooking booking);

    void deleteBooking(Integer id);

    List<ServiceBooking> getBookingsByVehicleId(Integer vehicleId);

    List<ServiceBooking> getBookingsByStatus(String status);
}