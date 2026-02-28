package com.oceanview.resort.service;

import com.oceanview.resort.entity.Reservation;
import com.oceanview.resort.entity.Room;
import com.oceanview.resort.entity.User;
import com.oceanview.resort.exception.ResourceNotFoundException;
import com.oceanview.resort.model.ReservationStatus;
import com.oceanview.resort.model.RoomStatus;
import com.oceanview.resort.repository.ReservationRepository;
import com.oceanview.resort.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class ReservationService {
  @Autowired
  private ReservationRepository reservationRepository;

  @Autowired
  private RoomRepository roomRepository;

  public List<Reservation> getAllReservations() {
    return reservationRepository.findAll();
  }

  public List<Reservation> getReservationsByUsername(String username) {
    return reservationRepository.findByUserUsername(username);
  }

  public List<Reservation> searchReservations(String query) {
    return reservationRepository.findByGuestFirstNameContainingIgnoreCaseOrGuestLastNameContainingIgnoreCase(query,
        query);
  }

  public Reservation getReservationById(Long id) {
    return reservationRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
  }

  public Reservation createReservation(Reservation reservation, User user) {
    reservation.setUser(user);
    Room room = roomRepository.findById(reservation.getRoom().getId())
        .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

    if (room.getStatus() != RoomStatus.AVAILABLE) {
      throw new RuntimeException("Room is not available");
    }

    // Calculate total price
    long nights = ChronoUnit.DAYS.between(reservation.getCheckInDate(), reservation.getCheckOutDate());
    if (nights <= 0)
      nights = 1;
    reservation.setTotalPrice(room.getPricePerNight().multiply(BigDecimal.valueOf(nights)));
    reservation.setStatus(ReservationStatus.CONFIRMED);

    // Update room status
    room.setStatus(RoomStatus.OCCUPIED);
    roomRepository.save(room);

    return reservationRepository.save(reservation);
  }

  public Reservation updateReservation(Long id, Reservation reservationDetails) {
    Reservation reservation = getReservationById(id);
    reservation.setCheckInDate(reservationDetails.getCheckInDate());
    reservation.setCheckOutDate(reservationDetails.getCheckOutDate());
    reservation.setStatus(reservationDetails.getStatus());
    // Re-calculate price if dates changed... (simplified here)
    return reservationRepository.save(reservation);
  }

  public void cancelReservation(Long id) {
    Reservation reservation = getReservationById(id);
    reservation.setStatus(ReservationStatus.CANCELLED);
    Room room = reservation.getRoom();
    room.setStatus(RoomStatus.AVAILABLE);
    roomRepository.save(room);
    reservationRepository.save(reservation);
  }
}
