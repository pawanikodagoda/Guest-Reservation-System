package com.oceanview.resort.controller;

import com.oceanview.resort.entity.Room;
import com.oceanview.resort.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rooms")
public class RoomController {
  @Autowired
  private RoomService roomService;

  @GetMapping
  @PreAuthorize("permitAll()")
  public List<Room> getAllRooms() {
    return roomService.getAllRooms();
  }

  @GetMapping("/available")
  @PreAuthorize("permitAll()")
  public List<Room> getAvailableRooms() {
    return roomService.getAvailableRooms();
  }

  @GetMapping("/{id}")
  @PreAuthorize("permitAll()")
  public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
    return ResponseEntity.ok(roomService.getRoomById(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public Room createRoom(@RequestBody Room room) {
    return roomService.createRoom(room);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
    return ResponseEntity.ok(roomService.updateRoom(id, roomDetails));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
    roomService.deleteRoom(id);
    return ResponseEntity.ok().build();
  }
}
