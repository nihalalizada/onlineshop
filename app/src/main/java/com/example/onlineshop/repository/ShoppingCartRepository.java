package com.example.onlineshop.repository;

import com.example.onlineshop.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    ShoppingCart findBySessionToken(String sessionToken);

    @Transactional
    @Modifying
    @Query(value = "UPDATE shopping_cart SET checked_out = 1 WHERE cart_id = ?1", nativeQuery = true)
    void updateCartStatus(Long cartId);

}
