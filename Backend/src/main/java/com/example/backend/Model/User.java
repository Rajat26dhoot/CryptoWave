package com.example.backend.Model;


import com.example.backend.Domain.USER_ROLE;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private USER_ROLE role=USER_ROLE.CUSTOMER;

    @Embedded
    private  TwoFactorAuth twoFactorAuth=new TwoFactorAuth();


}
