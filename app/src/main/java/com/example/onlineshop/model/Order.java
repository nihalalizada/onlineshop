package com.example.onlineshop.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

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
    private Timestamp createdDate;

    @Column(nullable = false)
    private Double totalPrice;

    @Column(nullable = false)
    @OneToOne(mappedBy = "order")
    private ShoppingCart shoppingCart;
}
