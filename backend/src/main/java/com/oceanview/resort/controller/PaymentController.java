package com.oceanview.resort.controller;

import com.oceanview.resort.entity.Payment;
import com.oceanview.resort.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payments")
public class PaymentController {
  @Autowired
  private PaymentService paymentService;

  @GetMapping
  public List<Payment> getAllPayments() {
    return paymentService.getAllPayments();
  }

  @GetMapping("/reservation/{id}")
  public ResponseEntity<Payment> getPaymentByReservationId(@PathVariable Long id) {
    return ResponseEntity.ok(paymentService.getPaymentByReservationId(id));
  }

  @PostMapping
  public Payment processPayment(@RequestBody Payment payment) {
    return paymentService.processPayment(payment);
  }
}
