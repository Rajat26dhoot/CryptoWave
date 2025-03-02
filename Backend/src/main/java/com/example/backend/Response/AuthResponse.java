package com.example.backend.Response;


import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private boolean status;
    private String message;
    private boolean isTwoFactorAuthEnabled;
    private String session;

}
