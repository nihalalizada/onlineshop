package com.example.onlineshop.service.serviceImpl;


import com.example.onlineshop.exception.CatalogNotFoundException;
import com.example.onlineshop.exception.ProductNotFoundException;
import com.example.onlineshop.model.Catalog;
import com.example.onlineshop.model.Product;
import com.example.onlineshop.repository.CatalogRepository;
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
    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired  /** in order to access JPA methods (Dependency Injection) */
    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override   /** Overiding the main save() method in JPA Repository */
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        Product updateProduct = productRepository.getById(product.getProductId());
        updateProduct.setProductId(product.getProductId());
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
    public List<Product> getProductsByCatalog(String name) {
        List<Catalog> catalogs = catalogRepository.searchCatalog(name);
        if(catalogs.isEmpty()){
            return Collections.emptyList();
        }
        List<Product> products = new ArrayList<>();
        for(Catalog catalog: catalogs){
            products.addAll(productRepository.getProductsByCatalogId(catalog.getCatalogId()));
        }
        return products;
    }

    @Override
    public List<Product> searchProduct(String name) {
        List<Product> products = productRepository.searchProduct(name);
        if(products == null){
            return Collections.emptyList();
        }
        return products;
    }

    @Override
    public void deleteProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            productRepository.deleteById(productId);
        }
        else throw new ProductNotFoundException("Product with ID: " +productId+ " does not exist");
    }

   /** @Override
    public void deleteProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent() & product.get().getQuantity() > 1) {
            productRepository.decrementQuantity(productId);
        } else if (product.get().getQuantity() == 1) {
            productRepository.setAvailability(productId, false);
            System.out.println("The availability is changed");
        }
    } */

}

