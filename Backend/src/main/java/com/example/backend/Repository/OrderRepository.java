package com.example.backend.Repository;

import com.example.backend.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

   List<Order> findByUserId(Long userId);
}
