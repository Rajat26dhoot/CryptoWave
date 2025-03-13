package com.example.backend.Service;

import com.example.backend.Model.PaymentDetails;
import com.example.backend.Model.User;
import com.example.backend.Repository.PaymentDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {



    @Autowired
    private PaymentDetailRepository paymentDetailRepository;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String IFSC, String BankName, User user) {
        PaymentDetails paymentDetails=new PaymentDetails();

        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setIFSC(IFSC);
        paymentDetails.setBankName(BankName);
        paymentDetails.setUser(user);
        return paymentDetailRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {
        return paymentDetailRepository.findByUserId(user.getId());
    }
}
