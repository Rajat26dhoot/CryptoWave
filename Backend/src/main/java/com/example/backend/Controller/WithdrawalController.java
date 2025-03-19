package com.example.backend.Controller;


import com.example.backend.Model.User;
import com.example.backend.Model.Wallet;
import com.example.backend.Model.WalletTransaction;
import com.example.backend.Model.Withdrawal;
import com.example.backend.Service.UserService;
import com.example.backend.Service.WalletService;
import com.example.backend.Service.WithdrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/withdrawal")
public class WithdrawalController {

    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;

    @PostMapping("/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt
    )throws Exception{
        User user=userService.findUserProfileByJWT(jwt);
        Wallet userWallet=walletService.getUserWallet(user);

        Withdrawal withdrawal=withdrawalService.requestWithdrawal(amount,user);
        walletService.addBalance(userWallet,-withdrawal.getAmount());

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);

    }


    @PatchMapping("/admin/{id}/proceed/{accept}")
    public ResponseEntity<?> processWithdrawal(@PathVariable Long id,
                                               @PathVariable boolean accept,
                                               @RequestHeader("Authorization") String jwt)throws Exception{
        User user=userService.findUserProfileByJWT(jwt);

        Withdrawal withdrawal=withdrawalService.procedWithdrawal(id,accept);

        Wallet userWallet=walletService.getUserWallet(user);

        if(!accept){
            walletService.addBalance(userWallet,withdrawal.getAmount());
        }

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        User user=userService.findUserProfileByJWT(jwt);

        List<Withdrawal> withdrawals=withdrawalService.getUserWithdrawalHistory(user);

        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(
            @RequestHeader("Authorization")String jwt
    )throws Exception{
        User user=userService.findUserProfileByJWT(jwt);
        List<Withdrawal> withdrawal=withdrawalService.getAllWithdrawalRequest();

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }





}
