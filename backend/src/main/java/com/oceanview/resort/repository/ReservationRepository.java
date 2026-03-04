package com.oceanview.resort.repository;

import com.oceanview.resort.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
  List<Reservation> findByGuestId(Long guestId);

  List<Reservation> findByRoomId(Long roomId);

  List<Reservation> findByCreatedByUserUsernameOrderByCreatedAtDesc(String username);

  List<Reservation> findAllByOrderByCreatedAtDesc();

  Optional<Reservation> findByIdAndCreatedByUserUsername(Long id, String username);

  @Query("""
      SELECT r FROM Reservation r
      WHERE LOWER(CONCAT(r.guest.firstName, ' ', r.guest.lastName)) LIKE LOWER(CONCAT('%', :query, '%'))
      OR LOWER(r.guest.firstName) LIKE LOWER(CONCAT('%', :query, '%'))
      OR LOWER(r.guest.lastName) LIKE LOWER(CONCAT('%', :query, '%'))
      """)
  List<Reservation> searchByGuestName(@Param("query") String query);
}
