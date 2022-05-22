package com.example.onlineshop.service.serviceImpl;

import com.example.onlineshop.exception.CatalogNotFoundException;
import com.example.onlineshop.model.Catalog;
import com.example.onlineshop.repository.CatalogRepository;
import com.example.onlineshop.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogServiceImpl implements CatalogService {

    private final CatalogRepository catalogRepository;

    @Autowired
    public CatalogServiceImpl(CatalogRepository catalogRepository){
        this.catalogRepository = catalogRepository;
    }

    @Override
    public Catalog addCatalog(Catalog catalog){
        return catalogRepository.save(catalog);
    }

    @Override
    public List<Catalog> getCatalogs(){
        return catalogRepository.findAll();
    }

    @Override
    public void deleteCatalog(Long id){
        catalogRepository.findById(id).orElseThrow(
                () -> new CatalogNotFoundException("Catalog with id " + id + " doesn't exist")
        );
        catalogRepository.deleteById(id);
    }

    @Override
    public void delete(Catalog catalog){
        catalogRepository.findById(catalog.getCatalogId()).orElseThrow(
                () -> new CatalogNotFoundException("Catalog was not found")
        );
        catalogRepository.delete(catalog);
    }

    @Override
    public Catalog updateCatalog(Catalog catalog){
        Catalog updateCatalog = catalogRepository.getById(catalog.getCatalogId());
        updateCatalog.setCatalogId(catalog.getCatalogId());
        updateCatalog.setName(catalog.getName());
        //updateCatalog.setProducts();
        updateCatalog.setDescription(catalog.getDescription());
        return catalogRepository.save(updateCatalog);
    }

    @Override
    public Catalog getCatalogById(Long id) {
        Optional<Catalog> catalog = catalogRepository.findById(id);
        if(catalog.isPresent())
            return catalog.get();
        else
            throw new CatalogNotFoundException("Catalog with id " + id + " was not found!");
    }
}
