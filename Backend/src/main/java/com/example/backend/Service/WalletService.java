package com.example.backend.Service;

import com.example.backend.Model.Order;
import com.example.backend.Model.User;
import com.example.backend.Model.Wallet;
import org.springframework.stereotype.Service;

@Service
public interface WalletService {


    Wallet getUserWallet(User user);
    Wallet addBalance(Wallet wallet, Long money);
    Wallet findWalletById(Long id) throws Exception;
    Wallet walletToWalletTransaction(Wallet receiverwallet, User sender,Long amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;




}
