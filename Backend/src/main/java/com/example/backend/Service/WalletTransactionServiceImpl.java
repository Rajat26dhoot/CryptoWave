package com.example.backend.Service;

import com.example.backend.Domain.WalletTransactionType;
import com.example.backend.Model.User;
import com.example.backend.Model.Wallet;
import com.example.backend.Model.WalletTransaction;
import com.example.backend.Repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService {

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Override
    public WalletTransaction createTransaction(Wallet wallet, WalletTransactionType type, Long amount, String purpose) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setPurpose(purpose);
        transaction.setDate(LocalDate.now());

        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getUserTransactions(User user) {
        return walletTransactionRepository.findByWalletUserIdOrderByDateDescIdDesc(user.getId());
    }
}
