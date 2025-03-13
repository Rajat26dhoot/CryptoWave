package com.example.backend.Model;


import com.example.backend.Domain.PaymentMethod;
import com.example.backend.Domain.PaymentOrderStaus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PaymentOrderStaus status;

    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;
}

