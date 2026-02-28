package com.oceanview.resort.repository;

import com.oceanview.resort.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
  List<Reservation> findByUserUsername(String username);

  List<Reservation> findByGuestFirstNameContainingIgnoreCaseOrGuestLastNameContainingIgnoreCase(String firstName,
      String lastName);

  List<Reservation> findByGuestId(Long guestId);

  List<Reservation> findByRoomId(Long roomId);
}
