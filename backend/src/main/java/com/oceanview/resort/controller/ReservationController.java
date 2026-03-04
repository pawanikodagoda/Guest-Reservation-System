package com.oceanview.resort.controller;

import com.oceanview.resort.entity.Reservation;
import com.oceanview.resort.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  @GetMapping
  @PreAuthorize("hasAnyRole('USER','STAFF','ADMIN')")
  public List<Reservation> getAllReservations(Authentication authentication) {
    boolean isUser = authentication.getAuthorities().stream()
        .anyMatch(authority -> "ROLE_USER".equals(authority.getAuthority()));
    if (isUser) {
      return reservationService.getReservationsForUser(authentication.getName());
    }
    return reservationService.getAllReservations();
  }

  @GetMapping("/my")
  @PreAuthorize("hasRole('USER')")
  public List<Reservation> getMyReservations(Authentication authentication) {
    return reservationService.getReservationsForUser(authentication.getName());
  }

  @GetMapping("/search")
  @PreAuthorize("hasAnyRole('STAFF','ADMIN')")
  public List<Reservation> searchReservations(@RequestParam String query) {
    return reservationService.searchReservationsByGuestName(query);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasAnyRole('USER','STAFF','ADMIN')")
  public ResponseEntity<Reservation> getReservationById(@PathVariable Long id, Authentication authentication) {
    boolean isUser = authentication.getAuthorities().stream()
        .anyMatch(authority -> "ROLE_USER".equals(authority.getAuthority()));
    if (isUser) {
      return ResponseEntity.ok(reservationService.getReservationByIdForUser(id, authentication.getName()));
    }
    return ResponseEntity.ok(reservationService.getReservationById(id));
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('USER','STAFF','ADMIN')")
  public Reservation createReservation(@RequestBody Reservation reservation, Authentication authentication) {
    return reservationService.createReservation(reservation, authentication.getName());
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('STAFF','ADMIN')")
  public ResponseEntity<Reservation> updateReservation(@PathVariable Long id,
      @RequestBody Reservation reservationDetails) {
    return ResponseEntity.ok(reservationService.updateReservation(id, reservationDetails));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAnyRole('STAFF','ADMIN')")
  public ResponseEntity<?> cancelReservation(@PathVariable Long id) {
    reservationService.cancelReservation(id);
    return ResponseEntity.ok().build();
  }
}
