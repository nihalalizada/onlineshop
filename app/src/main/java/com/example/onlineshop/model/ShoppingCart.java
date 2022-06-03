package com.example.onlineshop.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table
public class ShoppingCart implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CartId;
    @Transient
    private int numberOfItems;
    @Transient
    private double totalPrice = 0.0;
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(nullable = false)
    private boolean checkedOut;
    @OneToMany(cascade = CascadeType.ALL )
    private Set<CartItem> items;
    private String sessionToken;

    public ShoppingCart() {
        this.items = new HashSet<>();
    }

    public int getNumberOfItems() {
        return items.size();
    }

    public double getTotalPrice() {
        for (CartItem item: items
             ) {
            totalPrice += item.getProduct().getPrice()*item.getQuantity();
        }
        return totalPrice;
    }

}
