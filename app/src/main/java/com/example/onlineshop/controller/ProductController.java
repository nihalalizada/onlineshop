package com.example.onlineshop.controller;

import com.example.onlineshop.model.Product;
import com.example.onlineshop.service.serviceImpl.ProductServiceImpl;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path ="/api/products")
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @GetMapping(path = "/admin")
    public String adminHome() {
        return "adminHome";
    }

    @PostMapping(path =  "/add")
    public ResponseEntity<Product> addProduct (@RequestBody Product product) {
       return new ResponseEntity<>(productService.addProduct(product), HttpStatus.CREATED);
    }

    @PostMapping (path ="/delete/{id}")
    public ResponseEntity<String> deleteProductById (@PathVariable("id") Long productid) {
        productService.deleteProductById(productid);
        return new ResponseEntity<>("Product with ID:" +productid+ "was deleted", HttpStatus.OK);
    }









}
