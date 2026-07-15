package com.example.backend.Configuration;

public class JwtConstant {

    public static final String JWT_SECRET = System.getenv().getOrDefault("JWT_SECRET", "ThisIsAStrongLongSecretKey12345!");

    public static final String JWT_HEADER = "Authorization";

}
