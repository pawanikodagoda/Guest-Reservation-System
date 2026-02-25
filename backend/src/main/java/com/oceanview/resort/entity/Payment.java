package com.oceanview.resort.entity;

import com.oceanview.resort.model.PaymentMethod;
import com.oceanview.resort.model.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "reservation_id", nullable = false)
  private Reservation reservation;

  @Column(nullable = false)
  private BigDecimal amount;

  @Column(name = "payment_date")
  private LocalDateTime paymentDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "payment_method", nullable = false)
  private PaymentMethod paymentMethod;

  @Enumerated(EnumType.STRING)
  private PaymentStatus status;

  @PrePersist
  protected void onCreate() {
    paymentDate = LocalDateTime.now();
  }
}
