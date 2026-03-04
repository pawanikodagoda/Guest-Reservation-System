package com.oceanview.resort.service;

import com.oceanview.resort.entity.Guest;
import com.oceanview.resort.exception.ResourceNotFoundException;
import com.oceanview.resort.repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {
  @Autowired
  private GuestRepository guestRepository;

  public List<Guest> getAllGuests() {
    return guestRepository.findAll();
  }

  public Guest getGuestById(Long id) {
    return guestRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Guest not found with id: " + id));
  }

  public Guest createGuest(Guest guest) {
    return guestRepository.save(guest);
  }

  public Guest getOrCreateGuest(Guest guest) {
    return guestRepository.findByEmail(guest.getEmail())
        .map(existingGuest -> {
          existingGuest.setFirstName(guest.getFirstName());
          existingGuest.setLastName(guest.getLastName());
          existingGuest.setPhone(guest.getPhone());
          existingGuest.setAddress(guest.getAddress());
          return guestRepository.save(existingGuest);
        })
        .orElseGet(() -> guestRepository.save(guest));
  }

  public Guest updateGuest(Long id, Guest guestDetails) {
    Guest guest = getGuestById(id);
    guest.setFirstName(guestDetails.getFirstName());
    guest.setLastName(guestDetails.getLastName());
    guest.setEmail(guestDetails.getEmail());
    guest.setPhone(guestDetails.getPhone());
    guest.setAddress(guestDetails.getAddress());
    return guestRepository.save(guest);
  }

  public void deleteGuest(Long id) {
    Guest guest = getGuestById(id);
    guestRepository.delete(guest);
  }
}
