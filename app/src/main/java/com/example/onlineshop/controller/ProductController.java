package com.example.onlineshop.controller;

import com.example.onlineshop.model.Product;
import com.example.onlineshop.service.serviceImpl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path ="/api/products")
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @GetMapping(path = "/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable("productId") Long productId) {
        return new ResponseEntity<>(productService.getProductById(productId), HttpStatus.FOUND);
    }

    @GetMapping(path ="/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @PostMapping(path =  "/add")
    public ResponseEntity<Product> addProduct (@RequestBody Product product) {
       return new ResponseEntity<>(productService.addProduct(product), HttpStatus.CREATED);
    }

    @DeleteMapping (path ="/delete/{productId}")
    public ResponseEntity<String> deleteProductById (@PathVariable("productId") Long productId) {
        productService.deleteProductById(productId);
        return new ResponseEntity<>("Product with ID:" +productId+ " was deleted", HttpStatus.OK);
    }
     @PutMapping(path = "/update")
    public ResponseEntity<Product> updateProduct (@RequestBody Product product) {
        return new ResponseEntity<>(productService.updateProduct(product), HttpStatus.OK);
    }
    @GetMapping(path = "/search")
    public ResponseEntity<List<Product>> searchProductByName(@RequestParam("name") String name) {
        return new ResponseEntity<>( productService.searchProduct(name), HttpStatus.FOUND);
    }

}
