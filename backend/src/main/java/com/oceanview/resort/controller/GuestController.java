package com.oceanview.resort.controller;

import com.oceanview.resort.entity.Guest;
import com.oceanview.resort.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/guests")
public class GuestController {
  @Autowired
  private GuestService guestService;

  @GetMapping
  public List<Guest> getAllGuests() {
    return guestService.getAllGuests();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Guest> getGuestById(@PathVariable Long id) {
    return ResponseEntity.ok(guestService.getGuestById(id));
  }

  @PostMapping
  public Guest createGuest(@RequestBody Guest guest) {
    return guestService.createGuest(guest);
  }

  @PostMapping("/get-or-create")
  public Guest getOrCreateGuest(@RequestBody Guest guest) {
    return guestService.getOrCreateGuest(guest);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Guest> updateGuest(@PathVariable Long id, @RequestBody Guest guestDetails) {
    return ResponseEntity.ok(guestService.updateGuest(id, guestDetails));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteGuest(@PathVariable Long id) {
    guestService.deleteGuest(id);
    return ResponseEntity.ok().build();
  }
}
