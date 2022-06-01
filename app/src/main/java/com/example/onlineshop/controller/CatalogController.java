package com.example.onlineshop.controller;

import com.example.onlineshop.service.serviceImpl.CatalogServiceImpl;
import com.example.onlineshop.model.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogs")
public class CatalogController {

    @Autowired
    private CatalogServiceImpl catalogService;

    @PostMapping("/add")
    public ResponseEntity<Catalog> addCatalog(@RequestBody Catalog catalog){
        return new ResponseEntity<>(catalogService.addCatalog(catalog), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Catalog> getAll(){
        return catalogService.getCatalogs();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id){
        catalogService.deleteCatalog(id);
        return new ResponseEntity<>("Catalog with id " + id + " was deleted!", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Catalog> updateCatalog(@RequestBody Catalog catalog){
        return new ResponseEntity<>(catalogService.updateCatalog(catalog), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Catalog> getCatalog(@PathVariable("id") Long id){
        return new ResponseEntity<>(catalogService.getCatalogById(id), HttpStatus.FOUND);
    }
}