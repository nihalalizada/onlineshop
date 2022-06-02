package com.example.onlineshop.service.serviceImpl;

import com.example.onlineshop.exception.NoSuchCartItemException;
import com.example.onlineshop.model.CartItem;
import com.example.onlineshop.model.Product;
import com.example.onlineshop.model.ShoppingCart;
import com.example.onlineshop.repository.CartItemRepository;
import com.example.onlineshop.repository.ProductRepository;
import com.example.onlineshop.repository.ShoppingCartRepository;
import com.example.onlineshop.service.ProductService;
import com.example.onlineshop.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@AllArgsConstructor
@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public ShoppingCart createNewCart(Long id, String sessionToken, int quantity) {
        ShoppingCart shoppingCart = new ShoppingCart();
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(quantity);
        cartItem.setDate(new Date());
        cartItem.setProduct(productService.getProductById(id));
        shoppingCart.setSessionToken(sessionToken);
        shoppingCart.getItems().add(cartItem);
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart addProductToCart(Long id, String sessionToken, int quantity) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        for (CartItem item: shoppingCart.getItems()
             ) {
            if(item.getProduct().getProductId() == id){
                item.setQuantity(item.getQuantity()+quantity);
                return shoppingCartRepository.save(shoppingCart);
            }
        }
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(quantity);
        cartItem.setDate(new Date());
        cartItem.setProduct(productService.getProductById(id));
        shoppingCart.getItems().add(cartItem);
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart deleteProductFromCart(long itemId, String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        CartItem item = cartItemRepository.getById(itemId);
        shoppingCart.getItems().remove(item);
        cartItemRepository.delete(item);
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public Set<CartItem> getCartItems(String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        return shoppingCart.getItems();
    }

    @Override
    public void checkout(String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        shoppingCartRepository.delete(shoppingCart);
    }

    @Override
    public ShoppingCart clearCart(String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        shoppingCart.getItems().clear();
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart updateQuantity(Long id, String sessionToken, int newQuantity) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        CartItem cartItem = shoppingCart.getItems()
                .stream()
                .filter(item -> item.getProduct().getProductId() == id)
                        .findAny().orElseThrow(() -> new NoSuchCartItemException("No Cart Item with id="+ id));
        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);
        return shoppingCartRepository.save(shoppingCart);
    }
}
