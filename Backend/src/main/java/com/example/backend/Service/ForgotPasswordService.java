package com.example.backend.Service;

import com.example.backend.Domain.VerificationType;
import com.example.backend.Model.ForgotPasswordToken;
import com.example.backend.Model.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user, String otp,String id , VerificationType verificationType, String sendTo);


    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);

}
