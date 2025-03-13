package com.example.backend.Service;

import com.example.backend.Model.User;
import com.example.backend.Model.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception;


    List<Withdrawal> getUserWithdrawalHistory(User user);
    List<Withdrawal> getAllWithdrawalRequest();
}
