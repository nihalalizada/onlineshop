package com.example.onlineshop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Product implements Serializable {


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
    private boolean isAvailable = true;
    private String imageURL;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(nullable = true, name = "catalog_id")
    private Catalog catalog;






}
