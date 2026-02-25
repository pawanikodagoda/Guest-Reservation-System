package com.oceanview.resort.controller;

import com.oceanview.resort.entity.Reservation;
import com.oceanview.resort.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  @GetMapping
  public List<Reservation> getAllReservations() {
    return reservationService.getAllReservations();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
    return ResponseEntity.ok(reservationService.getReservationById(id));
  }

  @PostMapping
  public Reservation createReservation(@RequestBody Reservation reservation) {
    return reservationService.createReservation(reservation);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Reservation> updateReservation(@PathVariable Long id,
      @RequestBody Reservation reservationDetails) {
    return ResponseEntity.ok(reservationService.updateReservation(id, reservationDetails));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> cancelReservation(@PathVariable Long id) {
    reservationService.cancelReservation(id);
    return ResponseEntity.ok().build();
  }
}
