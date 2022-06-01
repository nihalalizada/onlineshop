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
    @Column (nullable = false)
    private double price;
    @Column(nullable = false)
    private long quantity = 0;
    private String description;
    @Column(nullable = false)
    private boolean isAvailable = false;
    private String imageURL;

    @ManyToOne
    @JoinColumn(nullable = true, name = "catalog_id")
    private Catalog catalog;






}
