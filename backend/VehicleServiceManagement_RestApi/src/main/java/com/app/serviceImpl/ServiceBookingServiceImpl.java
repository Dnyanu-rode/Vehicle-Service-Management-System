package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.ServiceBooking;
import com.app.repositary.ServiceBookingRepo;
import com.app.service.ServiceBookingServicei;

@Service
public class ServiceBookingServiceImpl implements ServiceBookingServicei {

    @Autowired
    private ServiceBookingRepo sbRepo;

    @Override
    public ServiceBooking addBooking(ServiceBooking booking) {
        return sbRepo.save(booking);
    }

    @Override
    public List<ServiceBooking> getAllBookings() {
        return sbRepo.findAll();
    }

    @Override
    public ServiceBooking getBookingById(Integer id) {
        return sbRepo.findById(id).orElse(null);
    }

    @Override
    public ServiceBooking updateBooking(Integer id, ServiceBooking booking) {

        ServiceBooking eb = sbRepo.findById(id).orElse(null);

        if (eb != null) {

            eb.setServiceType(booking.getServiceType());
            eb.setServiceDate(booking.getServiceDate());
            eb.setStatus(booking.getStatus());
            eb.setCost(booking.getCost());
            eb.setVehicle(booking.getVehicle());

            return sbRepo.save(eb);
        }

        return null;
    }

    @Override
    public void deleteBooking(Integer id) {
        sbRepo.deleteById(id);
    }
    
    @Override
    public List<ServiceBooking> getBookingsByVehicleId(Integer vehicleId) {
        return sbRepo.findByVehicleId(vehicleId);
    }
    
    @Override
    public List<ServiceBooking> getBookingsByStatus(String status) {
        return sbRepo.findByStatus(status);
    }
}