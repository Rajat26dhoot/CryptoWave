package com.example.backend.Repository;

import com.example.backend.Model.TwoFactorOtp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOtp, String> {

    TwoFactorOtp findByUserId(Long userId);
}
