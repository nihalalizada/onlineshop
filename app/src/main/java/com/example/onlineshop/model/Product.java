package com.example.onlineshop.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "products")
public class Product {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;
    @Column (nullable = false, unique = true)
    private String name;
    private double price;
    private long quantity = 0;
    private String description;


    @Column(nullable = false)
    private boolean isAvailable = false;

    @ManyToOne
    private Catalog catalog;

    private String imageURL;






}
