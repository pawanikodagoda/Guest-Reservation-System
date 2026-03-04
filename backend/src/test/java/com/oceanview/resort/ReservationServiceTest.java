package com.oceanview.resort;

import com.oceanview.resort.entity.Guest;
import com.oceanview.resort.entity.Reservation;
import com.oceanview.resort.entity.Room;
import com.oceanview.resort.model.RoomStatus;
import com.oceanview.resort.entity.User;
import com.oceanview.resort.repository.ReservationRepository;
import com.oceanview.resort.repository.RoomRepository;
import com.oceanview.resort.repository.UserRepository;
import com.oceanview.resort.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ReservationServiceTest {

  @Mock
  private ReservationRepository reservationRepository;

  @Mock
  private RoomRepository roomRepository;

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private ReservationService reservationService;

  @Test
  public void testCreateReservation_Success() {
    Room room = new Room(1L, "101", null, new BigDecimal("100.00"), RoomStatus.AVAILABLE);
    Guest guest = new Guest(1L, "John", "Doe", "john@example.com", "123", "Addr", null);
    Reservation reservation = Reservation.builder()
        .guest(guest)
        .room(room)
        .checkInDate(LocalDate.now())
        .checkOutDate(LocalDate.now().plusDays(2))
        .build();

    User user = User.builder().id(1L).username("admin").build();
    when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
    when(userRepository.findByUsername("admin")).thenReturn(Optional.of(user));
    when(reservationRepository.save(any(Reservation.class))).thenReturn(reservation);

    Reservation created = reservationService.createReservation(reservation, "admin");

    assertNotNull(created);
    assertEquals(new BigDecimal("200.00"), created.getTotalPrice());
    assertEquals(RoomStatus.OCCUPIED, room.getStatus());
    verify(roomRepository, times(1)).save(room);
  }
}
