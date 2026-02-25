package com.oceanview.resort.service;

import com.oceanview.resort.entity.Payment;
import com.oceanview.resort.exception.ResourceNotFoundException;
import com.oceanview.resort.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
  @Autowired
  private PaymentRepository paymentRepository;

  public List<Payment> getAllPayments() {
    return paymentRepository.findAll();
  }

  public Payment getPaymentByReservationId(Long reservationId) {
    return paymentRepository.findByReservationId(reservationId)
        .orElseThrow(() -> new ResourceNotFoundException("Payment not found for reservation id: " + reservationId));
  }

  public Payment processPayment(Payment payment) {
    return paymentRepository.save(payment);
  }
}
