package com.example.onlineshop.service.serviceImpl;

import com.example.onlineshop.exception.OutOfStockException;
import com.example.onlineshop.exception.ShoppingCartException;
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

import java.time.LocalDateTime;
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
    public ShoppingCart createNewCart(Long productId, String sessionToken, int quantity) {
        ShoppingCart shoppingCart = new ShoppingCart();
        Product product = productRepository.getById(productId);
        if(!product.isAvailable()){
            throw new OutOfStockException("This product is not available at moment! It may be out of stock. try again later.");
        }
        if(quantity > product.getQuantity()){
            throw new ShoppingCartException("The requested quantity is not available anymore! only " + product.getQuantity() + " items are still available");
        }
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(quantity);
        cartItem.setAddedAt(LocalDateTime.now());
        cartItem.setProduct(product);
        shoppingCart.setSessionToken(sessionToken);
        shoppingCart.setCreationTime(LocalDateTime.now());
        if (shoppingCart.getItems().add(cartItem)){
            product.setQuantity(product.getQuantity()-quantity);
            if(product.getQuantity()<=0){
                product.setAvailable(false);
            }
            productService.updateProduct(product);
            return shoppingCartRepository.save(shoppingCart);
        }
        else
            throw new ShoppingCartException("Product cannot be added to the shopping cart! try again.");
    }

    @Override
    public ShoppingCart addProductToCart(Long productId, String sessionToken, int quantity) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        Product product = productService.getProductById(productId);
        if(!product.isAvailable()){
            throw new OutOfStockException("This product is not available at moment! It may be out of stock. try again later.");
        }
        if(quantity > product.getQuantity()){
            throw new ShoppingCartException("The requested quantity is not available anymore! only " + product.getQuantity() + " items are still available");
        }
        for (CartItem item: shoppingCart.getItems()
             ) {
            if(item.getProduct().getProductId() == productId){
                item.setQuantity(item.getQuantity()+quantity);
                product.setQuantity(product.getQuantity()-quantity);
                if(product.getQuantity()<=0){
                    product.setAvailable(false);
                }
                productService.updateProduct(product);
                return shoppingCartRepository.save(shoppingCart);
            }
        }
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(quantity);
        cartItem.setAddedAt(LocalDateTime.now());
        cartItem.setProduct(product);
        if (shoppingCart.getItems().add(cartItem)){
            product.setQuantity(product.getQuantity()-quantity);
            if(product.getQuantity()<=0){
                product.setAvailable(false);
            }
            productService.updateProduct(product);
            return shoppingCartRepository.save(shoppingCart);
        }
        else
            throw new ShoppingCartException("Product cannot be added to the shopping cart!");
    }

    @Override
    public ShoppingCart deleteProductFromCart(Long itemId, String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        CartItem item = cartItemRepository.getById(itemId);
        int quantity = item.getQuantity();
        if(shoppingCart.getItems().remove(item)){
            Product product = item.getProduct();
            product.setQuantity(product.getQuantity()+quantity);
            if(product.getQuantity()>0){
                product.setAvailable(true);
            }
            productService.updateProduct(product);
            cartItemRepository.delete(item);
            return shoppingCartRepository.save(shoppingCart);
        }
        else
            throw new ShoppingCartException("Item could not be removed from shopping cart!");
    }

    @Override
    public ShoppingCart getCartItems(String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        return shoppingCart;
    }

    @Override
    public ShoppingCart clearCart(String sessionToken) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        Set<CartItem> items = shoppingCart.getItems();
        Iterator<CartItem> iterator = items.iterator();
        while (iterator.hasNext()) {
            CartItem cartItem = iterator.next();
            int quantity = cartItem.getQuantity();
            Product product = cartItem.getProduct();
            product.setQuantity(product.getQuantity()+quantity);
            if(product.getQuantity()>0){
                product.setAvailable(true);
            }
            productService.updateProduct(product);
            iterator.remove();
            cartItemRepository.delete(cartItem);
        }
        shoppingCart.getItems().clear();
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart updateQuantity(Long itemId, String sessionToken, int newQuantity) {
        ShoppingCart shoppingCart = shoppingCartRepository.findBySessionToken(sessionToken);
        CartItem cartItem = cartItemRepository.getById(itemId);
        Product product = cartItem.getProduct();
        if(newQuantity > product.getQuantity()){
            throw new ShoppingCartException("The requested quantity is not available anymore! only " + product.getQuantity() + " items are still available");
        }
        product.setQuantity(product.getQuantity()-(newQuantity-cartItem.getQuantity()));
        if(product.getQuantity()<=0){
            product.setAvailable(false);
        }
        else if(product.getQuantity()>0){
            product.setAvailable(true);
        }
        productService.updateProduct(product);
        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public void updateCartStatus(Long cartId) {
        shoppingCartRepository.updateCartStatus(cartId);
    }

    @Override
    public ShoppingCart getCartById(Long cartId) {
        return shoppingCartRepository.getById(cartId);
    }

}
