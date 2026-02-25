package com.oceanview.resort.repository;

import com.oceanview.resort.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
  List<Reservation> findByGuestId(Long guestId);

  List<Reservation> findByRoomId(Long roomId);
}
