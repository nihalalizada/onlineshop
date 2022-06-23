package com.example.onlineshop.service;

import com.example.onlineshop.model.Catalog;

import java.util.List;

public interface CatalogService {

    Catalog addCatalog(Catalog catalog);

    List<Catalog> getCatalogs();

    void deleteCatalog(Long id);

    Catalog updateCatalog(Catalog catalog);

    Catalog getCatalogById(Long id);

    List<Catalog> searchCatalog(String name);

}
