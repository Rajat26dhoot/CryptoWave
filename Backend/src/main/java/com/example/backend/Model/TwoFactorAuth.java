package com.example.backend.Model;


import com.example.backend.Domain.VerificationType;
import lombok.Data;
import org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyProperties;

@Data
public class TwoFactorAuth {
    private boolean isEnabled=false;
    private VerificationType sendTo;


}
