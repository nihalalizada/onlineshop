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
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @PostMapping("/add/{id}/{quantity}")
    public ResponseEntity<ShoppingCart> addProductToCart(HttpServletRequest request, @PathVariable("id") Long id,
                                                         @PathVariable("quantity") int quantity){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        if(sessionToken  == null){
            sessionToken = UUID.randomUUID().toString();
            request.getSession().setAttribute("sessionToken", sessionToken);
           return new ResponseEntity<>(shoppingCartService.createNewCart(id, sessionToken, quantity), HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(shoppingCartService.addProductToCart(id, sessionToken, quantity), HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ShoppingCart> removeProductFromCart(HttpServletRequest request, @PathVariable("id") Long itemId){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        return new ResponseEntity<>(shoppingCartService.deleteProductFromCart(itemId, sessionToken), HttpStatus.OK);
    }

    @GetMapping("/view")
    public ResponseEntity<Set<CartItem>> viewCartItems(HttpServletRequest request){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        if(sessionToken  == null){
            return new ResponseEntity<>(Collections.emptySet(), HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<>(shoppingCartService.getCartItems(sessionToken), HttpStatus.FOUND);
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ShoppingCart> clearCart(HttpServletRequest request){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        return new ResponseEntity<>(shoppingCartService.clearCart(sessionToken), HttpStatus.OK);
    }

    @DeleteMapping("/checkout")
    public void checkout(HttpServletRequest request){
        String sessionToken = (String) request.getSession().getAttribute("sessionToken");
        request.getSession().removeAttribute("sessionToken");
        request.getSession().invalidate();
        shoppingCartService.checkout(sessionToken);
    }
}
