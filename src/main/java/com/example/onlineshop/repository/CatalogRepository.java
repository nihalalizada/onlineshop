package com.example.onlineshop.repository;

import com.example.onlineshop.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    @Transactional
    @Modifying
    @Query(value = "update catalogs set name = ?2 where id = ?1", nativeQuery = true)
    void updateCatalogName(Long id, String name);

    @Transactional
    @Modifying
    @Query(value = "update catalogs set quantity = ?2 where id = ?1", nativeQuery = true)
    void updateCatalogQuantity(Long id, long quantity);

    @Transactional
    @Modifying
    @Query(value = "update catalogs c set c.description = ?2 where c.id = ?1", nativeQuery = true)
    void updateCatalogDescription(Long id, String description);

}
