package com.example.onlineshop.Service;

import com.example.onlineshop.model.Catalog;
import com.example.onlineshop.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogService {

    private CatalogRepository catalogRepository;

    @Autowired
    public CatalogService(CatalogRepository catalogRepository){
        this.catalogRepository = catalogRepository;
    }

    public Catalog addCatalog(Catalog catalog){
        return catalogRepository.save(catalog);
    }

    public List<Catalog> getCatalogs(){
        return catalogRepository.findAll();
    }

    public void deleteCatalog(Long id){
        catalogRepository.deleteById(id);
    }

    public void delete(Catalog catalog){
        catalogRepository.delete(catalog);
    }
}
