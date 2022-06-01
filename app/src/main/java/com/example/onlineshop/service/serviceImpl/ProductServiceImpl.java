package com.example.onlineshop.service.serviceImpl;


import com.example.onlineshop.exception.ProductNotFoundException;
import com.example.onlineshop.model.Product;
import com.example.onlineshop.repository.ProductRepository;
import com.example.onlineshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    @Autowired  /** in order to access JPA methods (Dependency Injection) */
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override   /** Overiding the main save() method in JPA Repository */
    public Product addProduct(Product product) {
       // productRepository.incrementQuantity(product.getProductId());
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        Product updateProduct = productRepository.getById(product.getProductId());
        //updateProduct.setProductId(product.getProductId());
        updateProduct.setDescription(product.getDescription());
        updateProduct.setName(product.getName());
        updateProduct.setCatalog(product.getCatalog());
        updateProduct.setQuantity(product.getQuantity());
        updateProduct.setPrice(product.getPrice());
        updateProduct.setAvailable(product.isAvailable());
        return productRepository.save(updateProduct);
    }


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if(product.isPresent())
        return product.get();
        else 
            throw new ProductNotFoundException("Product with ID:" +productId+ "was not found");
    }
    @Override
    public Product getProductByName(String name) {
        Optional<Product> product = productRepository.findByName(name);
        if(product.isPresent())
            return product.get();
        else
            throw new ProductNotFoundException("This product:" +name+ "was not found");
    }

    @Override
    public void deleteProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent() & product.get().getQuantity() > 1) {
            productRepository.decrementQuantity(productId);
        } else if (product.get().getQuantity() == 1) {
            productRepository.setAvailability(productId, false);
            System.out.println("The availability is changed");
        }
    }

}

