package com.example.backend.Controller;

import com.example.backend.Domain.VerificationType;
import com.example.backend.Request.ForgotPasswordTokenRequest;
import com.example.backend.Model.ForgotPasswordToken;
import com.example.backend.Model.User;
import com.example.backend.Model.VerificationCode;
import com.example.backend.Request.ResetPasswordRequest;
import com.example.backend.Response.ApiResponse;
import com.example.backend.Response.AuthResponse;
import com.example.backend.Service.EmailService;
import com.example.backend.Service.ForgotPasswordService;
import com.example.backend.Service.UserService;
import com.example.backend.Service.VerificationCodeService;
import com.example.backend.Utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        User user = userService.findUserProfileByJWT(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestHeader("Authorization") String token,
            @PathVariable VerificationType verificationType) throws Exception {

        User user = userService.findUserProfileByJWT(token);

        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());
        if (verificationCode==null) {
            verificationCode=verificationCodeService.sendVerificationCode(user, verificationType);

        }
        if(verificationCode.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(),verificationCode.getOtp());
        }




        return new ResponseEntity<>("Verification otp send successfully", HttpStatus.OK);
    }

    @PatchMapping("/api/users/email-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @RequestHeader("Authorization") String token,
            @PathVariable String otp) throws Exception {

        User user = userService.findUserProfileByJWT(token);

        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());
        String sendTo=verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail():verificationCode.getMobile();

        boolean isVerified=verificationCode.getOtp().equals(otp);

        if(isVerified) {
            User updatedUser=userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(),sendTo,user);


            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);


        }

        throw new Exception("Wrong otp");
    }


    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(
            @RequestBody ForgotPasswordTokenRequest req) throws Exception {

        User user = userService.findUserByEmail(req.getSendTo());
        String otp= OtpUtils.generateOtp();
        UUID uuid=UUID.randomUUID();
        String id=uuid.toString();

        ForgotPasswordToken token=forgotPasswordService.findByUser(user.getId());
        if(token==null) {
            token=forgotPasswordService.createToken(user,id,otp,req.getVerificationType(),req.getSendTo());
        }

        if(req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(),token.getOtp());
        }

        AuthResponse response=new AuthResponse();
        response.setMessage(token.getId());
        response.setMessage("Password reset otp send successfully");



        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestHeader("Authorization") String token,
            @RequestBody ResetPasswordRequest req,
            @RequestParam String  id) throws Exception {



        ForgotPasswordToken forgotPasswordToken=forgotPasswordService.findById(id);

        boolean isVerified=forgotPasswordToken.getOtp().equals(req.getOtp());

        if(isVerified) {
            userService.updatePassword(forgotPasswordToken.getUser(),req.getPassword());
            ApiResponse res=new ApiResponse();
            res.setMessage("Password update successfully");
            return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
        }
        throw new Exception("Wrong otp");

    }






}
