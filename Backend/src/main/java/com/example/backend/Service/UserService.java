package com.example.backend.Service;

import com.example.backend.Domain.VerificationType;
import com.example.backend.Model.User;

public interface UserService {

    public User findUserByEmail(String email);
    public User findUserByJWT(String jwt);
    public User findUserById(Long id);

    public User enableTwoFactorAuthentication(VerificationType verificationType,String sendTo,User user);

    User updatePassword(User user, String newPassword);

    public User findUserProfileByJWT(String jwt);

}
