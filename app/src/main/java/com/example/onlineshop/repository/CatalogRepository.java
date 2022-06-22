package com.example.onlineshop.repository;

import com.example.onlineshop.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    @Query(value = "select * from catalogs where name like '%' ?1 '%'", nativeQuery = true)
    List<Catalog> searchCatalog(String name);

}
