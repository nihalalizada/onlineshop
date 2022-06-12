package com.example.onlineshop.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "catalogs")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Catalog implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long catalogId;
    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String imageUrl;

    public Catalog(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
