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

    private CatalogRepository catalogRepository;

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
        catalogRepository.findById(catalog.getId()).orElseThrow(
                () -> new CatalogNotFoundException("Catalog was not found")
        );
        catalogRepository.delete(catalog);
    }

    @Override
    public Catalog updateCatalog(Catalog catalog){
        Catalog updateCatalog = catalogRepository.getById(catalog.getId());
        updateCatalog.setId(catalog.getId());
        updateCatalog.setName(catalog.getName());
        updateCatalog.setQuantity(catalog.getQuantity());
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

    @Override
    public void updateCatalogName(Long id, String name) {
        catalogRepository.findById(id).orElseThrow(
                () -> new CatalogNotFoundException("Catalog with id " + id + " was not found!")
        );
        catalogRepository.updateCatalogName(id, name);
    }

    @Override
    public void updateCatalogQuantity(Long id, long quantity) {
        catalogRepository.findById(id).orElseThrow(
                () -> new CatalogNotFoundException("Catalog with id " + id + " was not found!")
        );
        catalogRepository.updateCatalogQuantity(id, quantity);
    }

    @Override
    public void updateCatalogDescription(Long id, String description) {
        catalogRepository.findById(id).orElseThrow(
                () -> new CatalogNotFoundException("Catalog with id " + id + " was not found!")
        );
        catalogRepository.updateCatalogDescription(id, description);
    }
}
