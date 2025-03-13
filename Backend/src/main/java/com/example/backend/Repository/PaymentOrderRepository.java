package com.example.backend.Repository;

import com.example.backend.Model.PaymentOrder;
import com.example.backend.Service.PaymentService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long> {

}
