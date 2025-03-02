package com.example.backend.Service;

import com.example.backend.Model.TwoFactorOtp;
import com.example.backend.Model.User;

public interface  TwoFactorOtpService {


    TwoFactorOtp createTwoFactorOtp(User user,String otp,String jwt);

    TwoFactorOtp findByUser(Long userId);

    TwoFactorOtp findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp,String otp);

    void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp);


}
