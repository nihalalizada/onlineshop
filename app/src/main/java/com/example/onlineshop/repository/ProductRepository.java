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

    @Transactional
    @Modifying
    @Query(value = "Update products p set is_available =?2 where product_id =?1", nativeQuery = true)
    public void setAvailability(Long productId, boolean isAvailable);

    @Transactional
    @Modifying
    @Query(value = "Update products p set quantity = p.quantity+1 where product_id =?1", nativeQuery = true )
    public int incrementQuantity(Long productId);

    @Transactional
    @Modifying
    @Query(value = "Update products p set quantity = p.quantity-1 where product_id =?1", nativeQuery = true )
    public int decrementQuantity(Long productId);

    Optional<Product> findByName(String name);


}
