package com.example.onlineshop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class ShoppingCart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CartId;
    @Transient
    private int numberOfItems;
    @Transient
    private double totalPrice;
    @Column(nullable = false)
    private LocalDateTime creationTime;
    @Column(nullable = false)
    private boolean checkedOut;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<CartItem> items;
    private String sessionToken;

    public ShoppingCart() {
        this.items = new HashSet<>();
    }

    public int getNumberOfItems() {
        int numberOfItems = 0;
        for (CartItem item: items
             ) {
            numberOfItems += item.getQuantity();
        }
        return numberOfItems;
    }

    public double getTotalPrice() {
        totalPrice = 0;
        for (CartItem item: items
             ) {
            totalPrice += item.getProduct().getPrice()*item.getQuantity();
        }
        return totalPrice;
    }

}
