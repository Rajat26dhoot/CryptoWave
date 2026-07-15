package com.example.backend.Request;

import lombok.Data;

@Data
public class SignupOtpRequest {
    private String email;
    private String otp;
}
