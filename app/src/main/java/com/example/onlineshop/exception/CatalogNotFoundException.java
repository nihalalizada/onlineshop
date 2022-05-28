package com.example.onlineshop.exception;

public class CatalogNotFoundException extends RuntimeException{
    public CatalogNotFoundException(String message) {
        super(message);
    }
}
