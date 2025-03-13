package com.example.backend.Service;

import com.example.backend.Model.PaymentDetails;
import com.example.backend.Model.User;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String IFSC, String BankName, User user);

    public PaymentDetails getUserPaymentDetails(User user);
}
