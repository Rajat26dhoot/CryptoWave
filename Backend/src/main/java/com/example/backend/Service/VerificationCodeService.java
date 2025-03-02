package com.example.backend.Service;

import com.example.backend.Domain.VerificationType;
import com.example.backend.Model.User;
import com.example.backend.Model.VerificationCode;

public interface VerificationCodeService{

    VerificationCode  sendVerificationCode(User user, VerificationType verificationType);

    VerificationCode  getVerificationCodeById(Long id) throws Exception;

    VerificationCode  getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeById(VerificationCode verificationCode);



}
