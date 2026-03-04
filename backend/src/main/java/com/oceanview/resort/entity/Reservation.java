package com.oceanview.resort.entity;

import com.oceanview.resort.model.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "guest_id", nullable = false)
  private Guest guest;

  @ManyToOne
  @JoinColumn(name = "room_id", nullable = false)
  private Room room;

  @ManyToOne
  @JoinColumn(name = "created_by_user_id")
  private User createdByUser;

  @Column(name = "check_in_date", nullable = false)
  private LocalDate checkInDate;

  @Column(name = "check_out_date", nullable = false)
  private LocalDate checkOutDate;

  @Column(name = "total_price", nullable = false)
  private BigDecimal totalPrice;

  @Enumerated(EnumType.STRING)
  private ReservationStatus status;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
  }
}
