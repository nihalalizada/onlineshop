package com.example.onlineshop.repository;

import com.example.onlineshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String name);

    @Query(value = "select * from products where catalog_id = ?1", nativeQuery = true)
    List<Product> getProductsByCatalogId(Long catalogId);

    @Query(value = "select * from products where name like '%' ?1 '%' OR description like '%' ?1 '%'", nativeQuery = true)
    List<Product> searchProduct(String name);

}
