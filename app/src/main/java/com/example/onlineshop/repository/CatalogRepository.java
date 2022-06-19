package com.example.onlineshop.repository;

import com.example.onlineshop.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    Catalog findCatalogByName(String name);

}
