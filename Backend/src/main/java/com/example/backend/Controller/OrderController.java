package com.example.backend.Controller;

import com.example.backend.Domain.OrderType;
import com.example.backend.Model.User;
import com.example.backend.Model.Coin;
import com.example.backend.Model.Order;
import com.example.backend.Request.CreateOrderRequest;
import com.example.backend.Service.CoinService;
import com.example.backend.Service.OrderService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {


    @Autowired
    private OrderService orderService;


    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authroization") String jwt,
            @RequestBody CreateOrderRequest req
            ) throws Exception{
        User user=userService.findUserProfileByJWT(jwt);
        Coin coin=coinService.findById(req.getCoinId());
        Order order=orderService.processOrder(coin,req.getQuantity(),req.getOrderType(),user);
        return ResponseEntity.ok(order);
    }

    @GetMapping("{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String jwtToken,
            @PathVariable Long orderId
    )throws Exception{

        User user=userService.findUserProfileByJWT(jwtToken);

        Order order=orderService.getOrderById(orderId);
        if(order.getUser().getId().equals(user.getId())){
            return ResponseEntity.ok(order);
        }else{
            throw new Exception("You dont have access to this order");
        }
    }

    @GetMapping()
    public  ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam(required = false) OrderType order_type,
            @RequestParam(required = false) String asset_symbol
    )throws Exception{
        Long userId=userService.findUserProfileByJWT(jwtToken).getId();
        List<Order> userOrders=orderService.getAllOrdersofUser(userId,order_type,asset_symbol);
        return ResponseEntity.ok(userOrders);
    }





    
}
