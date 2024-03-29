package com.example.onlineshop.service;

import com.example.onlineshop.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProductService {

    /**  Adding product  */
    Product addProduct(Product product);

    /**  Updating product  */

    Product updateProduct(Product product);


    /**  Getting product  */
    List<Product> getAllProducts();
    Product getProductById(Long productId);

    /**  Deleting Product  */
    void deleteProductById(Long productId);


    /** Searching Product  **/
    List<Product> searchProduct(String name);

    List<Product> getProductsByCatalog(String name);



}
