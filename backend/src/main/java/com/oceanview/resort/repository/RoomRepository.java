package com.oceanview.resort.repository;

import com.oceanview.resort.entity.Room;
import com.oceanview.resort.model.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
  Optional<Room> findByRoomNumber(String roomNumber);

  List<Room> findByStatus(RoomStatus status);
}
