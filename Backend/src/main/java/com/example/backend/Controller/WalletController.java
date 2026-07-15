package com.example.backend.Controller;

import com.example.backend.Model.*;
import com.example.backend.Domain.OrderType;
import com.example.backend.Domain.WalletTransactionType;
import com.example.backend.Service.OrderService;
import com.example.backend.Service.PaymentService;
import com.example.backend.Service.UserService;
import com.example.backend.Service.WalletService;
import com.example.backend.Service.WalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private WalletTransactionService walletTransactionService;

    @GetMapping("")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJWT(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<WalletTransaction>> getWalletTransactions(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJWT(jwt);
        List<WalletTransaction> transactions = walletTransactionService.getUserTransactions(user);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long walletId,
            @RequestBody WalletTransaction request) throws Exception {

        User senderUser = userService.findUserProfileByJWT(jwt);
        Wallet receiverWallet = walletService.findWalletById(walletId);
        Wallet wallet = walletService.walletToWalletTransaction(receiverWallet, senderUser, request.getAmount());
        walletTransactionService.createTransaction(
                wallet,
                WalletTransactionType.WALLET_TRANSFER,
                -request.getAmount(),
                "Transfer to wallet #" + receiverWallet.getId()
        );
        walletTransactionService.createTransaction(
                receiverWallet,
                WalletTransactionType.WALLET_TRANSFER,
                request.getAmount(),
                "Transfer from wallet #" + wallet.getId()
        );

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addBalanceToWallet(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(name = "order_id") Long orderId,
            @RequestParam(name = "payment_id") String paymentId) throws Exception {

        User user = userService.findUserProfileByJWT(jwt);
        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder order = paymentService.getPaymentOrderById(orderId);
        Boolean status = paymentService.ProceedPaymentOrder(order, paymentId);

        if(wallet.getBalance()==null){
            wallet.setBalance(BigDecimal.valueOf(0));
        }

        if (status) {
            wallet = walletService.addBalance(wallet, order.getAmount());
            walletTransactionService.createTransaction(
                    wallet,
                    WalletTransactionType.ADD_MONEY,
                    order.getAmount(),
                    "Wallet deposit"
            );
        }
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId) throws Exception {

        User user = userService.findUserProfileByJWT(jwt);
        Order order = orderService.getOrderById(orderId);
        Wallet wallet = walletService.payOrderPayment(order, user);
        Long transactionAmount = order.getPrice().longValue();
        if (order.getOrderType().equals(OrderType.BUY)) {
            transactionAmount = -transactionAmount;
        }

        walletTransactionService.createTransaction(
                wallet,
                order.getOrderType().equals(OrderType.BUY)
                        ? WalletTransactionType.BUY_ASSET
                        : WalletTransactionType.SELL_ASSET,
                transactionAmount,
                order.getOrderType().name() + " asset order #" + order.getId()
        );

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }
}
