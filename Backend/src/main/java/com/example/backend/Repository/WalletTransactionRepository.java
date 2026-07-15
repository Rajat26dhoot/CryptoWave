package com.example.backend.Repository;

import com.example.backend.Model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

    List<WalletTransaction> findByWalletUserIdOrderByDateDescIdDesc(Long userId);
}
