package com.example.backend.Service;

import com.example.backend.Domain.WalletTransactionType;
import com.example.backend.Model.User;
import com.example.backend.Model.Wallet;
import com.example.backend.Model.WalletTransaction;

import java.util.List;

public interface WalletTransactionService {

    WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, Long amount, String purpose);

    List<WalletTransaction> getUserTransactions(User user);
}
