package com.example.onlineshop.service;

import com.example.onlineshop.model.Catalog;

import java.util.List;

public interface CatalogService {

    Catalog addCatalog(Catalog catalog);

    List<Catalog> getCatalogs();

    void deleteCatalog(Long id);

    void delete(Catalog catalog);

    Catalog updateCatalog(Catalog catalog);

    Catalog getCatalogById(Long id);

    void updateCatalogName(Long id, String name);

    void updateCatalogQuantity(Long id, long quantity);

    void updateCatalogDescription(Long id, String description);

}
