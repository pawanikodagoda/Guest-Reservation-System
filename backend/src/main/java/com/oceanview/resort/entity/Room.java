package com.oceanview.resort.entity;

import com.oceanview.resort.model.RoomStatus;
import com.oceanview.resort.model.RoomType;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "room_number", nullable = false, unique = true)
  private String roomNumber;

  @Enumerated(EnumType.STRING)
  @Column(name = "room_type", nullable = false)
  private RoomType roomType;

  @Column(name = "price_per_night", nullable = false)
  private BigDecimal pricePerNight;

  @Enumerated(EnumType.STRING)
  private RoomStatus status;
}
