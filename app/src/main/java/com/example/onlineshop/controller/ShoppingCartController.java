package com.example.onlineshop.controller;

import com.example.onlineshop.model.CartItem;
import com.example.onlineshop.model.Product;
import com.example.onlineshop.model.ShoppingCart;
import com.example.onlineshop.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @PostMapping("/add/{product_id}/{quantity}")
    public ResponseEntity<ShoppingCart> addProductToCart(HttpServletRequest request, @PathVariable("product_id") Long productId,
                                                         @PathVariable("quantity") int quantity){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        if(sessionToken  == null){
            sessionToken = UUID.randomUUID().toString();
            request.getSession().setAttribute("sessionToken", sessionToken);
           return new ResponseEntity<>(shoppingCartService.createNewCart(productId, sessionToken, quantity), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(shoppingCartService.addProductToCart(productId, sessionToken, quantity), HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{item_id}")
    public ResponseEntity<ShoppingCart> removeProductFromCart(HttpServletRequest request, @PathVariable("item_id") Long itemId){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        return new ResponseEntity<>(shoppingCartService.deleteProductFromCart(itemId, sessionToken), HttpStatus.OK);
    }

    @GetMapping("/view")
    public ResponseEntity<ShoppingCart> viewCartItems(HttpServletRequest request){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        return new ResponseEntity<>(shoppingCartService.getCartItems(sessionToken), HttpStatus.OK);
    }

    @PutMapping("/update/{item_id}/{quantity}")
    public ResponseEntity<ShoppingCart> updateQuantity(HttpServletRequest request, @PathVariable("item_id") Long itemId,
                                                         @PathVariable("quantity") int newQuantity){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        return new ResponseEntity<>(shoppingCartService.updateQuantity(itemId, sessionToken, newQuantity), HttpStatus.OK);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ShoppingCart> clearCart(HttpServletRequest request){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        return new ResponseEntity<>(shoppingCartService.clearCart(sessionToken), HttpStatus.OK);
    }
}
