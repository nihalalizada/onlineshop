package com.example.onlineshop.service.serviceImpl;

import com.example.onlineshop.model.Order;
import com.example.onlineshop.repository.OrderRepository;
import com.example.onlineshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order saveNewOrder(Order order) {
        return orderRepository.save(order);
    }
}
