package com.example.onlineshop.service;

import com.example.onlineshop.model.CartItem;
import com.example.onlineshop.model.Product;
import com.example.onlineshop.model.ShoppingCart;

import java.util.Date;
import java.util.Set;

public interface ShoppingCartService {

    ShoppingCart createNewCart(Long productId, String sessionToken, int quantity);
    ShoppingCart addProductToCart(Long productId, String sessionToken, int quantity);
    ShoppingCart deleteProductFromCart(Long productId, String sessionToken);
    Set<CartItem> getCartItems(String sessionToken);
    void checkout(String sessionToken);
    ShoppingCart clearCart(String sessionToken);
    ShoppingCart updateQuantity(Long productId, String sessionToken, int newQuantity);
    void deleteCarts();
}
