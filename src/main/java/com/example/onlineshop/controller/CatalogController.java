package com.example.onlineshop.controller;

import com.example.onlineshop.service.serviceImpl.CatalogServiceImpl;
import com.example.onlineshop.model.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
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

    @DeleteMapping("/delete")
    public  ResponseEntity<String> delete(@RequestBody Catalog catalog){
        catalogService.delete(catalog);
        return new ResponseEntity<>("Catalog with id " + catalog.getId()+ " was deleted!", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Catalog> updateCatalog(@RequestBody Catalog catalog){
        return new ResponseEntity<>(catalogService.updateCatalog(catalog), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Catalog> getCatalog(@PathVariable("id") Long id){
        return new ResponseEntity<>(catalogService.getCatalogById(id), HttpStatus.FOUND);
    }

    @PutMapping("/update/{id}/name")
    public ResponseEntity<String> updateCatalogName(@PathVariable("id") Long id, @RequestBody String name){
        catalogService.updateCatalogName(id, name);
        return new ResponseEntity<>("Name was successfully updated!", HttpStatus.OK);
    }

    @PutMapping("/update/{id}/quantity")
    public ResponseEntity<String> updateCatalogQuantity(@PathVariable("id") Long id, @RequestBody String quantity){
        catalogService.updateCatalogQuantity(id, Long.parseLong(quantity));
        return new ResponseEntity<>("Quantity was successfully updated!", HttpStatus.OK);
    }

    @PutMapping ("/update/{id}/desc")
    public ResponseEntity<String> updateCatalogDesc(@PathVariable("id") Long id, @RequestBody String description){
        catalogService.updateCatalogDescription(id, description);
        return new ResponseEntity<>("Description was successfully updated!", HttpStatus.OK);
    }
}
