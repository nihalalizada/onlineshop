package com.example.onlineshop.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private boolean processed = false;
    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private Double totalPrice;

    @OneToOne()
    private ShoppingCart shoppingCart;
}
