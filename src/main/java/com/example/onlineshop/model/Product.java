package com.example.onlineshop.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "products")
public class Product {


    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) long productId;
    private @Column (nullable = false, unique = true) String name;

    private long quantity = 0;
    private String description;


    private @Column(nullable = false) boolean isAvailable = false;

    private @ManyToOne Catalog catalog;

    @Column(name = "image", nullable = true)
    private String image;






}
