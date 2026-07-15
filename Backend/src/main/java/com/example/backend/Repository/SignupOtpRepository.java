package com.example.backend.Repository;

import com.example.backend.Model.SignupOtp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignupOtpRepository extends JpaRepository<SignupOtp, String> {
}
