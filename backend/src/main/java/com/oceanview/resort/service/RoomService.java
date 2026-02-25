package com.oceanview.resort.service;

import com.oceanview.resort.entity.Room;
import com.oceanview.resort.exception.ResourceNotFoundException;
import com.oceanview.resort.model.RoomStatus;
import com.oceanview.resort.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    return roomRepository.save(room);
  }

  public Room updateRoom(Long id, Room roomDetails) {
    Room room = getRoomById(id);
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
}
