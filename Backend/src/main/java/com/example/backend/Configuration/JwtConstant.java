package com.example.backend.Configuration;

public class JwtConstant {

    // Must be at least 32 characters (256 bits) for HMAC-SHA256
    public static final String JWT_SECRET = System.getenv().getOrDefault("JWT_SECRET", "CryptoWaveDefaultSecretKeyThatIsLongEnough2026!!");

    public static final String JWT_HEADER = "Authorization";

}
