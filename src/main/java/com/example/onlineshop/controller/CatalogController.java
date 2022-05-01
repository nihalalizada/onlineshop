package com.example.onlineshop.controller;

import com.example.onlineshop.Service.CatalogService;
import com.example.onlineshop.model.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

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
}
