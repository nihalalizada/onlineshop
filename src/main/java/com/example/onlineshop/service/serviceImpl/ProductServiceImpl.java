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
        if(productRepository.exists())
        if (!product.isAvailable()) {
            productRepository.setAvailability(product.getProductId(), true);
        }
        productRepository.incrementQuantity(product.getProductId());

        return productRepository.save(product);
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
    public void deleteProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            if (product.get().getQuantity() == 1) {
                productRepository.setAvailability(productId, true);
            }
            productRepository.decrementQuantity(productId);
            productRepository.deleteById(productId);
        }
        else
            throw new ProductNotFoundException("Product with ID:" +productId+ "does not exist");


    }

    @Override
    public List<Product> searchProductByName(Long productId, String name) {
       ArrayList<Product> product = new ArrayList<Product>();
        for (Product p : getAllProducts()) {
            if (p.getName().equals(name)) {
                return Collections.singletonList(p);
            }
        }
        return null;

    }

}

