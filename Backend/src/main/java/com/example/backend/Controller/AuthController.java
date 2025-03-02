package com.example.backend.Controller;

import com.example.backend.Configuration.JwtProvider;
import com.example.backend.Model.TwoFactorOtp;
import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Response.AuthResponse;
import com.example.backend.Service.CustomUserDetailsService;
import com.example.backend.Service.EmailService;
import com.example.backend.Service.TwoFactorOtpService;
import com.example.backend.Utils.OtpUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final TwoFactorOtpService twoFactorOtpService;
    private final EmailService emailService;
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomUserDetailsService customUserDetailsService, TwoFactorOtpService twoFactorOtpService,EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.twoFactorOtpService = twoFactorOtpService;
        this.emailService = emailService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody User user) {

        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));
        if (existingUser.isPresent()) {
            AuthResponse errorResponse = new AuthResponse();
            errorResponse.setStatus(false);
            errorResponse.setMessage("Email is already used with another account");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(hashedPassword);

        User savedUser = userRepository.save(newUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(
                savedUser.getEmail(),
                savedUser.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwtToken = JwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtToken);
        authResponse.setStatus(true);
        authResponse.setMessage("Registration successful");

        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {

        String email = user.getEmail();
        String password = user.getPassword();

        Authentication auth = authenticate(email, password);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwtToken = JwtProvider.generateToken(auth);

        User authuser =userRepository.findByEmail(email);

        if(user.getTwoFactorAuth().isEnabled()){
            AuthResponse res = new AuthResponse();
            res.setMessage("Two-factor authentication enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp= OtpUtils.generateOtp();

            TwoFactorOtp oldTwoFactorOtp = twoFactorOtpService.findByUser(authuser.getId());
            if(oldTwoFactorOtp != null){
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOtp);
            }

            TwoFactorOtp newTwoFactorOtp = twoFactorOtpService.createTwoFactorOtp(authuser,otp,jwtToken);

            emailService.sendVerificationOtpEmail(email,otp);


            res.setSession(newTwoFactorOtp.getId());
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);


        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtToken);
        authResponse.setStatus(true);
        authResponse.setMessage("Login successful");

        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }

    private Authentication authenticate(String input, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(input);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or email");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(
                userDetails.getUsername(),
                userDetails.getPassword(),
                userDetails.getAuthorities()
        );
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySiginOtp(@PathVariable String otp,@RequestParam String id){


        TwoFactorOtp twoFactorOtp=twoFactorOtpService.findById(id);
        if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOtp,otp)){
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Two-factor authentication verified");
            authResponse.setTwoFactorAuthEnabled(true);
            authResponse.setToken(twoFactorOtp.getJwt());
            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        }
        throw new BadCredentialsException("Invalid otp");
    }






}
