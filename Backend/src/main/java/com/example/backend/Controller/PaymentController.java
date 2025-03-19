package com.example.backend.Controller;


import com.example.backend.Domain.PaymentMethod;
import com.example.backend.Model.PaymentOrder;
import com.example.backend.Model.User;
import com.example.backend.Response.PaymentResponse;
import com.example.backend.Service.PaymentService;
import com.example.backend.Service.UserService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt
            )throws Exception , RazorpayException, StripeException {

        User user=userService.findUserProfileByJWT(jwt);
        PaymentResponse paymentResponse;

        PaymentOrder order=paymentService.createOrder(user,amount,paymentMethod);

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            paymentResponse=paymentService.createRazorpayPaymentLink(user,amount,order.getId());
        }else{
            paymentResponse=paymentService.createStripePaymentLink(user,amount,order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);

    }

}
