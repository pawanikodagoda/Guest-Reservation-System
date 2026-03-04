package com.oceanview.resort.service;

import com.oceanview.resort.entity.Room;
import com.oceanview.resort.exception.ResourceNotFoundException;
import com.oceanview.resort.model.RoomStatus;
import com.oceanview.resort.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class RoomService {
  @Autowired
  private RoomRepository roomRepository;

  public List<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public List<Room> getAvailableRooms() {
    return roomRepository.findByStatus(RoomStatus.AVAILABLE);
  }

  public Room getRoomById(Long id) {
    return roomRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
  }

  public Room createRoom(Room room) {
    validatePrice(room.getPricePerNight());
    return roomRepository.save(room);
  }

  public Room updateRoom(Long id, Room roomDetails) {
    Room room = getRoomById(id);
    validatePrice(roomDetails.getPricePerNight());
    room.setRoomNumber(roomDetails.getRoomNumber());
    room.setRoomType(roomDetails.getRoomType());
    room.setPricePerNight(roomDetails.getPricePerNight());
    room.setStatus(roomDetails.getStatus());
    return roomRepository.save(room);
  }

  public void deleteRoom(Long id) {
    Room room = getRoomById(id);
    roomRepository.delete(room);
  }

  private void validatePrice(BigDecimal pricePerNight) {
    if (pricePerNight == null || pricePerNight.compareTo(BigDecimal.valueOf(10000)) < 0) {
      throw new IllegalArgumentException("Room price per night must be at least Rs. 10000.00");
    }
  }
}
