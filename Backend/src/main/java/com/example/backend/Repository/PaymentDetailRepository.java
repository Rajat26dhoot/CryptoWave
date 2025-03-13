package com.example.backend.Repository;

import com.example.backend.Model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetails,Long> {

    PaymentDetails findByUserId(Long userId);
}
