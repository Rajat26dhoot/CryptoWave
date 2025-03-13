package com.example.backend.Service;


import com.example.backend.Domain.OrderType;
import com.example.backend.Model.Coin;
import com.example.backend.Model.Order;
import com.example.backend.Model.OrderItem;
import com.example.backend.Model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId);

    List<Order> getAllOrdersofUser(Long userId,OrderType orderType,String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType,User user) throws Exception;


}
