package com.example.onlineshop.repository;

import com.example.onlineshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Transactional
    @Modifying
    @Query(value = "Update products p set isAvailable =?2 where productId =?1", nativeQuery = true)
    public void setAvailability(Long productId, boolean isAvailable);

    @Transactional
    @Modifying
    @Query(value = "Update products p set quantity = p.quantity+1 where productId =?1", nativeQuery = true )
    public void incrementQuantity(Long productId);

    @Transactional
    @Modifying
    @Query(value = "Update products p set quantity = p.quantity-1 where productId =?1", nativeQuery = true )
    public void decrementQuantity(Long productId);

}
