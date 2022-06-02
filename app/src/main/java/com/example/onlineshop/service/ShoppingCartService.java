package com.example.onlineshop.service;

import com.example.onlineshop.model.CartItem;
import com.example.onlineshop.model.Product;
import com.example.onlineshop.model.ShoppingCart;

import java.util.Set;

public interface ShoppingCartService {

    ShoppingCart createNewCart(Long id, String sessionToken, int quantity);
    ShoppingCart addProductToCart(Long id, String sessionToken, int quantity);
    ShoppingCart deleteProductFromCart(long productId, String sessionToken);
    Set<CartItem> getCartItems(String sessionToken);
    void checkout(String sessionToken);
    ShoppingCart clearCart(String sessionToken);
    ShoppingCart updateQuantity(Long id, String sessionToken, int newQuantity);
}
